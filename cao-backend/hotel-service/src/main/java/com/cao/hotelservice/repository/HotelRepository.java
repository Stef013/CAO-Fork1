package com.cao.hotelservice.repository;

import com.cao.hotelservice.domain.HotelModel;
import com.cao.hotelservice.domain.ReservationModel;
import jdk.jshell.spi.ExecutionControl;

import java.sql.*;
import java.util.ArrayList;

public class HotelRepository {

    private final String connectionUrl = "jdbc:sqlserver://cao-dbserver.database.windows.net:1433;" +
            "database=CAO_HotelReservation;user=CaoAdmin@cao-dbserver;password=7tJzrUVGB5i8dxX;encrypt=true;" +
            "trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";


    public ArrayList<HotelModel> getAllHotels() {
        String query = "SELECT * FROM Hotel";

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet rs = statement.executeQuery();

            ArrayList<HotelModel> allHotelModels = new ArrayList<>();
            while (rs.next()) {
                allHotelModels.add(createHotelModelFromResultSet(rs));
            }

            return allHotelModels;
        } catch (Exception e) {
            return null;
        }
    }

    public HotelModel getSpecificHotel(int hotelId) {
        String query = "SELECT * FROM Hotel WHERE Id = ?";

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, hotelId);
            ResultSet rs = statement.executeQuery();

            HotelModel hotelModel = new HotelModel();
            while (rs.next()) {
                hotelModel = createHotelModelFromResultSet(rs);
            }

            return hotelModel;
        } catch (Exception e) {
            return null;
        }
    }

    public ReservationModel reserveHotel(ReservationModel reservationModel) {
        String query = "INSERT INTO Reservation (Hotel_Id, Name_Booker, Email_Booker, Guest_Amount, Room_Type, Check_In_Date, Check_Out_Date) VALUES (?,?,?,?,?,?,?)";

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            PreparedStatement statement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, reservationModel.getHotel().getId());
            statement.setString(2, reservationModel.getNameBooker());
            statement.setString(3, reservationModel.getEmailBooker());
            statement.setInt(4, reservationModel.getGuestAmount());
            statement.setInt(5, reservationModel.getRoomType());
            statement.setDate(6, new java.sql.Date(reservationModel.getCheckInDate().getTime()));
            statement.setDate(7, new java.sql.Date(reservationModel.getCheckOutDate().getTime()));

            statement.executeUpdate();
            ResultSet generatedKeys = statement.getGeneratedKeys();
            if (generatedKeys.next()) {
                reservationModel.setId(generatedKeys.getInt(1));
            }

            return reservationModel;
        } catch (Exception e) {
            return null;
        }
    }

    public ReservationModel getSpecificReservationById(int reservationId) {
        String query = "SELECT * FROM Reservation WHERE Id = ?";

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, reservationId);
            ResultSet rs = statement.executeQuery();

            ReservationModel reservationModel = new ReservationModel();
            while (rs.next()) {
                reservationModel = createHotelReservationModelFromResultSet(rs);
            }

            return reservationModel;
        } catch (Exception e) {
            return null;
        }
    }

    private HotelModel createHotelModelFromResultSet(ResultSet rs) throws SQLException {
        return new HotelModel(
                rs.getInt("Id"),
                rs.getString("Name"),
                rs.getInt("Stars"),
                rs.getBigDecimal("Solo_Room_Price"),
                rs.getBigDecimal("Double_Room_Price"),
                rs.getBigDecimal("Triple_Room_Price"),
                rs.getBigDecimal("Quadruple_Room_Price"),
                rs.getString("Location")
        );
    }

    private ReservationModel createHotelReservationModelFromResultSet(ResultSet rs) throws SQLException {
        return new ReservationModel(
                rs.getInt("Id"),
                new HotelModel(rs.getInt("Hotel_Id")),
                rs.getString("Name_Booker"),
                rs.getString("Email_Booker"),
                rs.getInt("Guest_Amount"),
                rs.getInt("Room_Type"),
                rs.getDate("Check_In_Date"),
                rs.getDate("Check_Out_Date")
        );
    }
}
