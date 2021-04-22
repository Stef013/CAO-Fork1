package Repository;

import Model.SearchModel;
import Model.UserModel;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class PoliceRepo {

    private final String connectionUrl = "jdbc:sqlserver://cao-dbserver.database.windows.net:1433;database=CAO_PoliceReport;user=CaoAdmin@cao-dbserver;password=7tJzrUVGB5i8dxX;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";
    private static Statement statement;

    public UserModel searchPerson(SearchModel personToFind)
    {
        return null;
        //TODO: Messaging naar account microservice voor checken of customer bestaat
    }

    public boolean createWarrant(SearchModel personToFind) {

        try (Connection connection = DriverManager.getConnection(connectionUrl);
             CallableStatement cstmnt = connection.prepareCall("{call createWarrent(?,?,?,?)}")) {
            cstmnt.setString(1, personToFind.getFirstname());
            cstmnt.setString(2, personToFind.getLastname());
            cstmnt.setString(3, personToFind.getDateOfBirth());
            cstmnt.setString(4, personToFind.getNationality());
            cstmnt.executeUpdate();

            cstmnt.close();
            return true;

        } catch (SQLException throwables) {
            throwables.printStackTrace();

        }
        return false;
    }

}
