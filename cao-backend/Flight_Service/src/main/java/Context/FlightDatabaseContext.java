package Context;

import Interface.IFlight;
import Models.createFlightReturnModel;
import Models.flight;
import Models.flightReturnModel;
import Models.getFlightsReturnModel;

import java.sql.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Callable;

public class FlightDatabaseContext implements IFlight {

    private final String connectionUrl = "jdbc:sqlserver://cao-dbserver.database.windows.net:1433;database=CAO_Flight;user=CaoAdmin@cao-dbserver;password=7tJzrUVGB5i8dxX;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";
    private static Statement statement;

    public void closeConnection() {
        // TODO Auto-generated method stub

    }

    @Override
    public createFlightReturnModel createFlight(int airport_id, String ticket_price, String destination, String origin, String departure_time, String arrival_time, String longStartPos, String latStartPos, String longEndPos, String latEndPos) throws ParseException {
        createFlightReturnModel returnModel = new createFlightReturnModel();
        try (Connection connection = DriverManager.getConnection(connectionUrl)){
            try {
                CallableStatement cstmnt = connection.prepareCall("{CALL createFlight(?,?,?,?,?,?,?,?,?,?)}");
                cstmnt.setInt(1, airport_id);
                cstmnt.setString(2, ticket_price);
                cstmnt.setString(3, destination);
                cstmnt.setString(4, origin);
                cstmnt.setString(5, departure_time);
                cstmnt.setString(6, arrival_time);
                cstmnt.setString(7, longStartPos);
                cstmnt.setString(8, latStartPos);
                cstmnt.setString(9, longEndPos);
                cstmnt.setString(10, latEndPos);


                cstmnt.executeUpdate();

                returnModel.setSuccess(true);
            } catch (SQLException throwables) {
                returnModel.setSuccess(false);
                returnModel.setError(throwables.toString());
            }
        } catch (SQLException e) {
            returnModel.setSuccess(false);
            returnModel.setError(e.toString());
        }

        return returnModel;
    }



    @Override
    public getFlightsReturnModel getFlights() {
        getFlightsReturnModel returnModel = new getFlightsReturnModel();
        try (Connection connection = DriverManager.getConnection(connectionUrl)){
            try {
                CallableStatement cstmt = connection.prepareCall("{CALL getFlights()}");
                cstmt.execute();

                ResultSet rs = cstmt.getResultSet();
                while (rs.next()) {
                    flight newFlight = new flight();
                    newFlight.setAirport_id(rs.getInt("airport_id"));
                    newFlight.setArrival_time(rs.getString("arrival_time"));
                    newFlight.setDeparture_time(rs.getString("departure_time"));
                    newFlight.setDestination(rs.getString("destination"));
                    newFlight.setOrigin(rs.getString("origin"));
                    newFlight.setTicket_price(rs.getString("ticket_price"));
                    newFlight.setLatStartPos(rs.getString("lat_start"));
                    newFlight.setLongStartPos(rs.getString("long_start"));
                    newFlight.setLatEndPos(rs.getString("lat_end"));
                    newFlight.setLongEndPos(rs.getString("long_end"));

                    returnModel.addFlight(newFlight);
                }
                returnModel.setSuccess(true);

            } catch (SQLException throwables) {
                returnModel.setError(throwables.toString());
                returnModel.setSuccess(false);
            }
        } catch (SQLException e) {
            returnModel.setError(e.toString());
            returnModel.setSuccess(false);
        }

        return returnModel;
    }

    public getFlightsReturnModel CurrentFlights(){
        getFlightsReturnModel returnModel = new getFlightsReturnModel();
        try (Connection connection = DriverManager.getConnection(connectionUrl)){
            try {
                CallableStatement cstmt = connection.prepareCall("{CALL getCurrentFlights}");
                cstmt.execute();

                ResultSet rs = cstmt.getResultSet();
                while (rs.next()) {
                    flight newFlight = new flight();
                    newFlight.setAirport_id(rs.getInt("airport_id"));
                    newFlight.setArrival_time(rs.getString("arrival_time"));
                    newFlight.setDeparture_time(rs.getString("departure_time"));
                    newFlight.setDestination(rs.getString("destination"));
                    newFlight.setOrigin(rs.getString("origin"));
                    newFlight.setTicket_price(rs.getString("ticket_price"));
                    newFlight.setLatStartPos(rs.getString("lat_start"));
                    newFlight.setLongStartPos(rs.getString("long_start"));
                    newFlight.setLatEndPos(rs.getString("lat_end"));
                    newFlight.setLongEndPos(rs.getString("long_end"));

                    returnModel.addFlight(newFlight);
                }
                returnModel.setSuccess(true);

            } catch (SQLException throwables) {
                returnModel.setError(throwables.toString());
                returnModel.setSuccess(false);
            }
        } catch (SQLException e) {
            returnModel.setError(e.toString());
            returnModel.setSuccess(false);
        }
        return returnModel;
    }

    public flightReturnModel FlightById(int Id){
        flightReturnModel returnModel = new flightReturnModel();
        try (Connection connection = DriverManager.getConnection(connectionUrl)){
            try {
                CallableStatement cstmt = connection.prepareCall("{CALL FlightById(?)}");
                cstmt.setInt(1, Id);
                cstmt.execute();

                ResultSet rs = cstmt.getResultSet();
                if (rs.next()) {
                    flight newFlight = new flight();
                    newFlight.setAirport_id(rs.getInt("airport_id"));
                    newFlight.setArrival_time(rs.getString("arrival_time"));
                    newFlight.setDeparture_time(rs.getString("departure_time"));
                    newFlight.setDestination(rs.getString("destination"));
                    newFlight.setOrigin(rs.getString("origin"));
                    newFlight.setTicket_price(rs.getString("ticket_price"));
                    newFlight.setLatStartPos(rs.getString("lat_start"));
                    newFlight.setLongStartPos(rs.getString("long_start"));
                    newFlight.setLatEndPos(rs.getString("lat_end"));
                    newFlight.setLongEndPos(rs.getString("long_end"));

                    returnModel.setFlight(newFlight);
                }
                returnModel.setSuccess(true);

            } catch (SQLException throwables) {
                returnModel.setError(throwables.toString());
                returnModel.setSuccess(false);
            }
        } catch (SQLException e) {
            returnModel.setError(e.toString());
            returnModel.setSuccess(false);
        }
        return returnModel;
    }
}
