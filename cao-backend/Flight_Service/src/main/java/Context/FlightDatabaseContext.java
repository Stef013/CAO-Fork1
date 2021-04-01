package Context;

import Interface.IFlight;
import Models.createFlightReturnModel;

import java.sql.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class FlightDatabaseContext implements IFlight {

    private final String connectionUrl = "jdbc:sqlserver://cao-dbserver.database.windows.net:1433;database=CAO_Flight;user=CaoAdmin@cao-dbserver;password=7tJzrUVGB5i8dxX;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";
    private static Statement statement;

    public void closeConnection() {
        // TODO Auto-generated method stub

    }

    @Override
    public createFlightReturnModel createFlight(int airport_id, String ticket_price, String destination, String origin, String departure_time, String arrival_time) throws ParseException {
        createFlightReturnModel returnModel = new createFlightReturnModel();
        try (Connection connection = DriverManager.getConnection(connectionUrl)){
            try {
                CallableStatement cstmnt = connection.prepareCall("INSERT INTO `flight` (`airport_id`, `ticket_price`, `destination`, `origin`, `departure_time`, `arrival_time`) VALUES(?,?,?,?,?,?)");
                cstmnt.setInt(1, airport_id);
                cstmnt.setString(2, ticket_price);
                cstmnt.setString(3, destination);
                cstmnt.setString(4, origin);
                cstmnt.setString(5, departure_time);
                cstmnt.setString(6, arrival_time);

                cstmnt.executeUpdate();
            } catch (SQLException throwables) {
                returnModel.setSuccess(false);
                returnModel.setError(throwables.toString());
            }
        } catch (SQLException e) {
            returnModel.setSuccess(false);
            returnModel.setError(e.toString());
        }
        returnModel.setSuccess(true);

        return returnModel;
    }
}
