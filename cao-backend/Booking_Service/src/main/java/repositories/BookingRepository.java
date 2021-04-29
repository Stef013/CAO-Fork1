package repositories;

import models.Booking;
import models.InterpolRequest;
import models.Ticket;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.core.Response;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class BookingRepository {

    private final String connectionUrl = "jdbc:sqlserver://cao-dbserver.database.windows.net:1433;" +
            "database=CAO_Booking;user=CaoAdmin@cao-dbserver;password=7tJzrUVGB5i8dxX;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";

    public Booking book(Booking booking, int userId) {
        String query = "INSERT INTO [Booking] (UserId, BookingDate, ContactPhonenumber, " +
                "ContactEmail, EmergencyPhonenumber, EmergencyEmail, CheckedIn) VALUES " +
                "(?,?,?,?,?,?,?)";

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            PreparedStatement statement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, userId);
            statement.setDate(2, new java.sql.Date(booking.getBookingDate().getTime()));
            statement.setString(3, booking.getContactPhonenumber());
            statement.setString(4, booking.getContactEmail());
            statement.setString(5, booking.getEmergencyPhonenumber());
            statement.setString(6, booking.getEmergencyEmail());
            statement.setBoolean(7, booking.isCheckedIn());

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

    public ArrayList<Booking> getBookingsByUserID(int userId) {
        String query = "SELECT DISTINCT * FROM [Booking] b INNER JOIN [Ticket] t on (b.BookingId = t.BookingId) " +
                "WHERE b.UserId = ?";

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, userId);
            ResultSet rs = statement.executeQuery();

            ArrayList<Booking> allBookings = new ArrayList<Booking>();
            Booking currentBooking = new Booking();
            while (rs.next()) {
                int bookingId = rs.getInt("BookingId");
                if (bookingId != currentBooking.getBookingId()) {
                    if (currentBooking.getBookingId() != 0) {
                        allBookings.add(currentBooking);
                    }
                    currentBooking = bookingFromResultSet(rs);
                }
                currentBooking.addTicket(ticketFromResultSet(rs));
            }
            allBookings.add(currentBooking);
            return allBookings;
        } catch (Exception e) {
            return null;
        }
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

    private Booking bookingFromResultSet(ResultSet rs) throws SQLException {
        Booking booking = new Booking(
                rs.getInt("BookingId"),
                rs.getInt("UserId"),
                rs.getString("ContactPhonenumber"),
                rs.getString("ContactEmail"),
                rs.getDate("BookingDate"),
                new ArrayList<Ticket>(),
                rs.getString("EmergencyEmail"),
                rs.getString("EmergencyPhonenumber"),
                rs.getBoolean("CheckedIn")
        );
        return booking;
    }

    private Ticket ticketFromResultSet(ResultSet rs) throws SQLException {
        Ticket ticket = new Ticket(
                rs.getInt("TicketId"),
                rs.getString("Firstname"),
                rs.getString("Lastname"),
                rs.getString("Gender"),
                rs.getInt("FlightId"),
                rs.getFloat("Price"),
                rs.getString("Seat"),
                rs.getInt("ExtraLuggage"),
                rs.getBoolean("RentedHotel"),
                rs.getBoolean("RentedCar"),
                rs.getDate("DateOfBirth")
        );
        return ticket;
    }

    public ArrayList<Ticket> getTicketByUser(InterpolRequest interpolRequest) {
        String query = "SELECT * FROM [Ticket] WHERE Firstname = ? AND Lastname = ? AND DateOfBirth = ?";

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, interpolRequest.getFirstname());
            statement.setString(2, interpolRequest.getLastname());
            statement.setDate(3, new java.sql.Date(interpolRequest.getDateOfBirth().getTime()));
            ResultSet rs = statement.executeQuery();

            ArrayList<Ticket> allTickets = new ArrayList<Ticket>();
            while (rs.next()) {
                allTickets.add(ticketFromResultSet(rs));
            }

            return allTickets;
        } catch (Exception e) {
            return null;
        }
    }

    public boolean checkInBooking(int bookingId) {
        String query = "UPDATE [Booking] SET CheckedIn = ? WHERE BookingId = ?";
        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setBoolean(1, true);
            statement.setInt(2, bookingId);
            int rowsChanged = statement.executeUpdate();

            if (rowsChanged == 1) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }
}
