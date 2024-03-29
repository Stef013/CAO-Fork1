package Repository;

import Interface.ICustomerRepository;
import Model.Customer;
import Model.Employee;
import Utilities.Cryptography;
import Utilities.Logging;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CustomerSqlRepository implements ICustomerRepository {

    private final String connectionUrl = "jdbc:sqlserver://cao-dbserver.database.windows.net:1433;database=CAO_Account;user=CaoAdmin@cao-dbserver;password=7tJzrUVGB5i8dxX;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";
    private static Statement statement;

    Cryptography cryptography = new Cryptography();
    Logging logger = new Logging();

    public void closeConnection() {
        // TODO Auto-generated method stub

    }

    @Override
    public boolean create(Customer newCustomer) {
        String hashedPassword = cryptography.hash(newCustomer.getPassword());

        boolean exist = false;

        try (Connection connection = DriverManager.getConnection(connectionUrl);) {

            if (!checkEmail(newCustomer.getEmail())) {
                try {
                    CallableStatement cstmnt = connection.prepareCall("{call createCustomer(?,?,?,?,?,?)}");
                    cstmnt.setString(1, newCustomer.getEmail());
                    cstmnt.setString(2, hashedPassword);
                    cstmnt.setString(3, newCustomer.getFirstname());
                    cstmnt.setString(4, newCustomer.getLastname());
                    cstmnt.setString(5, newCustomer.getNationality());
                    cstmnt.setString(6, new SimpleDateFormat("dd/MM/yyyy").format(newCustomer.getDateOfBirth()));
                    cstmnt.executeUpdate();

                    newCustomer = null;
                    hashedPassword = null;

                    cstmnt.close();
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
    public Customer get(String userEmail) {

        Customer customer = null;

        try (Connection connection = DriverManager.getConnection(connectionUrl);
                CallableStatement cstmnt = connection.prepareCall("{call getOneCustomer(?)}")) {
            cstmnt.setString(1, userEmail);
            ResultSet rs = cstmnt.executeQuery();

            while (rs.next()) {
                int id = rs.getInt("id");
                String email = rs.getString("email");
                String password = rs.getString("password");
                String firstname = rs.getString("firstname");
                String lastname = rs.getString("lastname");
                String nationality = rs.getString("nationality");
                String dateOfBirth = rs.getString("dateOfBirth");

                Date date = new SimpleDateFormat("dd/MM/yyyy").parse(dateOfBirth);

                customer = new Customer(id, email, password, firstname, lastname, nationality, date);

            }

            System.out.println(customer.getFirstname() + " " + customer.getLastname());
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return customer;
    }

    @Override
    public List<Customer> getAll() {

        List<Customer> allCustomers = new ArrayList<>();
        Customer customer = null;

        try (Connection connection = DriverManager.getConnection(connectionUrl);) {
            try {
                CallableStatement cstmnt = connection.prepareCall("{call getAllCustomers()}");
                ResultSet rs = cstmnt.executeQuery();

                while (rs.next()) {
                    int id = rs.getInt("id");
                    String email = rs.getString("email");
                    String password = rs.getString("password");
                    String firstname = rs.getString("firstname");
                    String lastname = rs.getString("lastname");
                    String nationality = rs.getString("nationality");
                    String dateOfBirth = rs.getString("dateOfBirth");

                    Date date = new SimpleDateFormat("dd/MM/yyyy").parse(dateOfBirth);

                    customer = new Customer(id, email, password, firstname, lastname, nationality, date);
                    allCustomers.add(customer);
                }

                System.out.println(customer.getFirstname() + " " + customer.getLastname());
            } catch (SQLException e) {
                System.out.println(e.toString());
            } catch (ParseException e) {
                e.printStackTrace();
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return allCustomers;
    }

    public boolean checkEmail(String email) {

        boolean exists = false;

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            try {
                CallableStatement cstmnt = connection.prepareCall("{call getOneCustomer(?)}");
                cstmnt.setString(1, email);
                ResultSet rs = cstmnt.executeQuery();

                while (rs.next()) {
                    String dummyemail = rs.getString("email");
                    Customer dummy = new Customer(dummyemail, null, null, null, null, null);

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
    public boolean update(Customer customer) {

        String hashedPassword = cryptography.hash(customer.getPassword());

        try (Connection connection = DriverManager.getConnection(connectionUrl);
                CallableStatement cstmnt = connection.prepareCall("{call updateCustomer(?,?,?,?,?,?,?)}")) {
            cstmnt.setInt(1, customer.getId());
            cstmnt.setString(2, customer.getEmail());
            cstmnt.setString(3, hashedPassword);
            cstmnt.setString(4, customer.getFirstname());
            cstmnt.setString(5, customer.getLastname());
            cstmnt.setString(6, customer.getNationality());
            cstmnt.setString(7, customer.getDateOfBirth().toString());
            cstmnt.executeUpdate();

            hashedPassword = null;
            customer = null;

            return true;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return false;

    }

    @Override
    public boolean delete(int id) {

        try (Connection connection = DriverManager.getConnection(connectionUrl);
                CallableStatement cstmnt = connection.prepareCall("{call deleteCustomer(?)}")) {
            cstmnt.setInt(1, 4);
            cstmnt.executeUpdate();

            id = 0;

            return true;
        } catch (SQLException throwable) {
            throwable.printStackTrace();
        }
        return false;

    }
}
