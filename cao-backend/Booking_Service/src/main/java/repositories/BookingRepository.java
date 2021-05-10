package repositories;

import models.Booking;
import models.Ticket;

import javax.enterprise.context.ApplicationScoped;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class BookingRepository {

    private final String connectionUrl = "jdbc:sqlserver://cao-dbserver.database.windows.net:1433;" +
            "database=CAO_Booking;user=CaoAdmin@cao-dbserver;password=7tJzrUVGB5i8dxX;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";

    public Booking book(Booking booking, int userId) {
        String query = "INSERT INTO [Booking] (UserId, BookingDate, ContactPhonenumber, " +
                "ContactEmail, EmergencyPhonenumber, EmergencyEmail) VALUES " +
                "(?,?,?,?,?,?)";

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            PreparedStatement statement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, userId);
            statement.setDate(2, new java.sql.Date(booking.getBookingDate().getTime()));
            statement.setString(3, booking.getContactPhonenumber());
            statement.setString(4, booking.getContactEmail());
            statement.setString(5, booking.getEmergencyPhonenumber());
            statement.setString(6, booking.getEmergencyEmail());

            statement.executeUpdate();

            ResultSet generatedKeys = statement.getGeneratedKeys();
            if (generatedKeys.next()) {
                Booking newBooking = booking;
                int bookingId = generatedKeys.getInt(1);

                boolean ticketsAdded = addTickets(connection, booking.getTickets(), bookingId);

                if (ticketsAdded) {
                    newBooking.setBookingId(bookingId);
                    newBooking.setUserId(userId);
                    for (Ticket t : newBooking.getTickets()) {
                        t.setTicketId(-1);
                    }
                    return newBooking;
                }
            }
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
        return null;
    }

    private boolean addTickets(Connection connection, List<Ticket> tickets, int bookingId) {
        String query = "INSERT INTO [Ticket] (BookingId, FlightId, Firstname, Lastname, Gender, Price, Seat, " +
                "ExtraLuggage, RentedHotel, RentedCar, DateOfBirth) VALUES " +
                "(?,?,?," +
                "?,?,?,?,?,?,?,?)";
        try {
            PreparedStatement statement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
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
                statement.setDate(11, new java.sql.Date(ticket.getDateOfBirth().getTime()));
                statement.addBatch();
            }
            int[] affectedRows = statement.executeBatch();
            if (affectedRows.length == tickets.size()) {
                return true;
            }
            return false;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }
}
