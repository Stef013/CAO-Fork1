package repositories;

import models.Booking;
import models.Ticket;

import javax.enterprise.context.ApplicationScoped;
import java.sql.*;
import java.util.List;

@ApplicationScoped
public class BookingRepository {

    private Connection connection;
//    private String connectionUrl = "jdbc:sqlserver://cao-dbserver.database.windows.net:1433;" +
//            "database=CAO_Booking;user=CaoAdmin@cao-dbserver;password=7tJzrUVGB5i8dxX;encrypt=true;" +
//            "trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";
    private final String connectionUrl = "jdbc:sqlserver://cao-dbserver.database.windows.net:1433;" +
            "database=CAO_Booking;user=CaoAdmin@cao-dbserver;password=7tJzrUVGB5i8dxX;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";

    public Booking book(Booking booking, int userId) {
        System.out.println(booking.toString());
        String query = "INSERT INTO [Booking] (UserId, BookingDate, ContactPhonenumber, " +
                "ContactEmail, EmergencyPhonenumber, EmergencyEmail) VALUES " +
                "(?,?,?,?,?,?)";

//        try {
//            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
//        } catch (ClassNotFoundException e) {
//            System.out.println("classfornameerror");
//            e.printStackTrace();
//        }

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            System.out.println("erin");
            PreparedStatement statement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, userId);
            statement.setString(2, booking.getBookingDate());
            statement.setString(3, booking.getContactPhonenumber());
            statement.setString(4, booking.getContactEmail());
            statement.setString(5, booking.getEmergencyPhonenumber());
            statement.setString(6, booking.getEmergencyEmail());

            statement.executeUpdate();

            ResultSet generatedKeys = statement.getGeneratedKeys();
            if (generatedKeys.next()) {
                int bookingId = generatedKeys.getInt(1);

                boolean ticketsAdded = addTickets(connection, booking.getTickets(), bookingId);

                if (ticketsAdded) {
                    booking.setBookingId(bookingId);
                    return booking;
                }
            }
        } catch (Exception e) {
            System.out.println("Exception book");
            System.out.println(e);
            return null;
        }
        System.out.println("nada");
        return null;
    }

    private boolean addTickets(Connection connection, List<Ticket> tickets, int bookingId) {
        String query = "INSERT INTO [Ticket] (BookingId, FlightId, Firstname, Lastname, Gender, Price, Seat, " +
                "ExtraLuggage, RentedHotel, RentedCar, DateOfBirth) VALUES " +
                "(?,?,?," +
                "?,?,?,?,?,?,?,?)";
        try {
            PreparedStatement statement = connection.prepareStatement(query);
            for (Ticket ticket : tickets) {
                statement.setInt(1, bookingId);
                statement.setInt(2, ticket.getFlightId());
                statement.setString(3, ticket.getFirstname());
                statement.setString(4, ticket.getLastname());
                statement.setString(5, ticket.getGender());
                statement.setFloat(6, ticket.getPrice());
                statement.setString(7, ticket.getSeat());
                statement.setInt(8, ticket.getExtraLuggage());
                statement.setBoolean(9, ticket.isRentedHotel());
                statement.setBoolean(10, ticket.isRentedCar());
                statement.setString(11, ticket.getDateOfBirth());
                statement.addBatch();
            }
            int[] affectedRows = statement.executeBatch();
            if (affectedRows.length == tickets.size()) {
                return true;
            }
            System.out.println("False1");
            return false;
        } catch (Exception e) {
            System.out.println("False2");
            System.out.println(e);
            return false;
        }
    }
}
