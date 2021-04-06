package Repository;

import Interface.IEmployeeRepository;
import Model.AccountCredentials;
import Model.Employee;
import Enum.Roles;
import Model.RoleUpdate;
import Utilities.Cryptography;

import java.sql.*;

public class EmployeeSqlRepository implements IEmployeeRepository
{
    private final String connectionUrl = "jdbc:sqlserver://cao-dbserver.database.windows.net:1433;database=CAO_Account;user=CaoAdmin@cao-dbserver;password=7tJzrUVGB5i8dxX;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";
    final Cryptography cryptography = new Cryptography();

    @Override
    public boolean create(Employee newEmployee) {
        String hashedPassword = cryptography.hash(newEmployee.getPassword());

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {

            try {
                CallableStatement cstmnt = connection.prepareCall("{call createEmployee(?,?,?,?,?)}");
                cstmnt.setString(1, newEmployee.getEmail());
                cstmnt.setString(2, hashedPassword);
                cstmnt.setString(3, newEmployee.getFirstname());
                cstmnt.setString(4, newEmployee.getLastname());
                cstmnt.setString(5, newEmployee.getRole().toString());
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
    public Employee get(String email) {
        Employee employee = null;

        try (
                Connection connection = DriverManager.getConnection(connectionUrl);
                CallableStatement cstmnt = connection.prepareCall("{call getOneEmployee(?)}");
            ) {
                cstmnt.setString(1, email);
                ResultSet rs = cstmnt.executeQuery();

                if (rs.next()) {
                    employee = new Employee(
                            rs.getInt("id"),
                            rs.getString("email"),
                            rs.getString("password"),
                            rs.getString("firstname"),
                            rs.getString("lastname"),
                            Roles.valueOf( rs.getString("role") )
                    );
                }

                System.out.println(employee.getFirstname() + " " + employee.getLastname());
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return employee;
    }

    @Override
    public boolean update(Employee employee) {
        return false;
    }

    @Override
    public boolean setRole(RoleUpdate newRole) {
        return false;
    }

    @Override
    public boolean delete(int id) {
        return false;
    }

    @Override
    public boolean accountWithEmailExists(String email) {
        return false;
    }
}
