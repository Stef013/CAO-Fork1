package Repository;

import Interface.IEmployeeRepo;
import Model.Employee;
import Model.UpdateEmployee;
import Utilities.Cryptography;
import Enum.Roles;
import Utilities.Logging;

import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class EmployeeRepo implements IEmployeeRepo {

    private final String connectionUrl = "jdbc:sqlserver://cao-dbserver.database.windows.net:1433;database=CAO_Account;user=CaoAdmin@cao-dbserver;password=7tJzrUVGB5i8dxX;encrypt=false;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";
    private static Statement statement;

    Logging logger = new Logging();

    Cryptography cryptography = new Cryptography();

    public void closeConnection() {
        // TODO Auto-generated method stub

    }

    @Override
    public boolean create(Employee newEmployee) {
        String hashedPassword = cryptography.hash(newEmployee.getPassword());

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {

            boolean userExists = checkEmail(newEmployee.getEmail());

            if (!userExists) {

                try {
                    CallableStatement cstmnt = connection.prepareCall("{call createEmployee(?,?,?,?,?)}");
                    cstmnt.setString(1, newEmployee.getEmail());
                    cstmnt.setString(2, hashedPassword);
                    cstmnt.setString(3, newEmployee.getFirstname());
                    cstmnt.setString(4, newEmployee.getLastname());
                    cstmnt.setString(5, newEmployee.getRole().toString());
                    cstmnt.executeUpdate();

                    newEmployee = null;
                    hashedPassword = null;

                    return true;
                } catch (SQLException e) {
                    System.out.println(e.toString());
                }
            } else {
                return false;
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return false;
    }

    @Override
    public Employee get(String userEmail) {

        Employee employee = null;

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            try {
                CallableStatement cstmnt = connection.prepareCall("{call getOneEmployee(?)}");
                cstmnt.setString(1, userEmail);
                ResultSet rs = cstmnt.executeQuery();

                while (rs.next()) {
                    int id = rs.getInt("id");
                    String email = rs.getString("email");
                    String password = rs.getString("password");
                    String firstname = rs.getString("firstname");
                    String lastname = rs.getString("lastname");
                    String role = rs.getString("role");

                    employee = new Employee(id, email, password, firstname, lastname, Roles.valueOf(role));

                }

                System.out.println(employee.getFirstname() + " " + employee.getLastname());
            } catch (SQLException e) {
                System.out.println(e.toString());
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return employee;
    }

    public List<Employee> getAll() {

        List<Employee> allEmployees = new ArrayList<>();
        Employee employee;

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            try {
                CallableStatement cstmnt = connection.prepareCall("{call getAllEmployees()}");
                ResultSet rs = cstmnt.executeQuery();

                while (rs.next()) {
                    int id = rs.getInt("id");
                    String email = rs.getString("email");
                    String password = rs.getString("password");
                    String firstname = rs.getString("firstname");
                    String lastname = rs.getString("lastname");
                    String role = rs.getString("role");

                    employee = new Employee(id, email, password, firstname, lastname, Roles.valueOf(role));
                    allEmployees.add(employee);

                }

            } catch (SQLException e) {
                System.out.println(e.toString());
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return allEmployees;
    }

    public boolean checkEmail(String email) {

        boolean exists = false;

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            try {
                CallableStatement cstmnt = connection.prepareCall("{call getOneEmployee(?)}");
                cstmnt.setString(1, email);
                ResultSet rs = cstmnt.executeQuery();

                while (rs.next()) {
                    int id = rs.getInt("id");
                    Employee dummy = new Employee(id, null, null, null, null, null);

                    exists = true;
                }

            } catch (SQLException e) {
                System.out.println(e.toString());
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return exists;
    }

    @Override
    public boolean update(Employee employee) {

        String hashedPassword = cryptography.hash(employee.getPassword());

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {

            try {
                CallableStatement cstmnt = connection.prepareCall("{call updateEmployee(?,?,?,?,?,?)}");
                cstmnt.setInt(1, employee.getId());
                cstmnt.setString(2, employee.getEmail());
                cstmnt.setString(3, hashedPassword);
                cstmnt.setString(4, employee.getFirstname());
                cstmnt.setString(5, employee.getLastname());
                cstmnt.setString(6, employee.getRole().toString());
                cstmnt.executeUpdate();

                hashedPassword = null;
                employee = null;
                logger.logUserAction(getClass().getName(),
                        "Employee " + String.valueOf(employee.getId()) + "has been updated", "1");
                return true;
            } catch (SQLException e) {
                System.out.println(e.toString());
            } catch (IOException e) {
                e.printStackTrace();
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return false;
    }

    public boolean updateEmployee(UpdateEmployee updateRole) {

        String hashedPW = cryptography.hash(updateRole.getPassword());

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {

            try {
                CallableStatement cstmnt = connection.prepareCall("{call updateEmployeeInfo(?,?,?)}");
                cstmnt.setInt(1, updateRole.getUserId());
                cstmnt.setString(2, updateRole.getRole().toString());
                cstmnt.setString(3, hashedPW);
                cstmnt.executeUpdate();

                updateRole = null;
                hashedPW = null;

                return true;
            } catch (SQLException e) {
                System.out.println(e.toString());
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return false;
    }

    @Override
    public boolean updateRole(UpdateEmployee updateRole) {

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {

            try {
                CallableStatement cstmnt = connection.prepareCall("{call updateRole(?,?)}");
                cstmnt.setInt(1, updateRole.getUserId());
                cstmnt.setString(2, updateRole.getRole().toString());
                cstmnt.executeUpdate();

                return true;
            } catch (SQLException e) {
                System.out.println(e.toString());
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return false;
    }

    @Override
    public boolean delete(int id) {

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {

            try {
                CallableStatement cstmnt = connection.prepareCall("{call deleteEmployee(?)}");
                cstmnt.setInt(1, 4);
                cstmnt.executeUpdate();

                id = 0;

                return true;

            } catch (SQLException e) {
                System.out.println(e.toString());
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return false;
    }

}
