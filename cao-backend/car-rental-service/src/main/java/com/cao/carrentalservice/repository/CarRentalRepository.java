package com.cao.carrentalservice.repository;

import com.cao.carrentalservice.domain.CarRentalCompanyModel;
import com.cao.carrentalservice.domain.ReservationModel;

import java.sql.*;
import java.util.ArrayList;

public class CarRentalRepository {

    private final String connectionUrl = "jdbc:sqlserver://cao-dbserver.database.windows.net:1433;" +
            "database=CAO_CarRental;user=CaoAdmin@cao-dbserver;password=7tJzrUVGB5i8dxX;encrypt=true;" +
            "trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";;

    public ArrayList<CarRentalCompanyModel> getAllCarRentalCompanies() {
        String query = "SELECT * FROM Car_Rental_Company";

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet rs = statement.executeQuery();

            ArrayList<CarRentalCompanyModel> allCarRentalCompanyModelsList = new ArrayList<>();
            while (rs.next()) {
                allCarRentalCompanyModelsList.add(createCarRentalCompanyModelFromResultSet(rs));
            }

            return allCarRentalCompanyModelsList;
        } catch (Exception e) {
            return null;
        }
    }

    public CarRentalCompanyModel getSpecificCarRentalCompanyById(int carRentalCompanyId) {
        String query = "SELECT * FROM Car_Rental_Company WHERE Id = ?";

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, carRentalCompanyId);
            ResultSet rs = statement.executeQuery();

            CarRentalCompanyModel carRentalCompanyModel = new CarRentalCompanyModel();
            while (rs.next()) {
                carRentalCompanyModel = createCarRentalCompanyModelFromResultSet(rs);
            }

            return carRentalCompanyModel;
        } catch (Exception e) {
            return null;
        }
    }

    public ReservationModel placeReservationForCarRental(ReservationModel reservationModel) {
        String query = "INSERT INTO Reservation (Car_Rental_Company_Id, Name_Booker, Email_Booker, Guest_Amount, Pickup_Date, Dropoff_Date) VALUES (?,?,?,?,?,?)";

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            PreparedStatement statement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, reservationModel.getCarRentalCompanyModel().getId());
            statement.setString(2, reservationModel.getNameBooker());
            statement.setString(3, reservationModel.getEmailBooker());
            statement.setInt(4, reservationModel.getGuestAmount());
            statement.setDate(5, new java.sql.Date(reservationModel.getPickUpDate().getTime()));
            statement.setDate(6, new java.sql.Date(reservationModel.getDropOffDate().getTime()));

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

    public ReservationModel getSpecificCarRentalReservationById(int carReservationId) {
        String query = "SELECT * FROM Reservation WHERE Id = ?";

        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, carReservationId);
            ResultSet rs = statement.executeQuery();

            ReservationModel reservationModel = new ReservationModel();
            while (rs.next()) {
                reservationModel = createCarRentalReservationModelFromResultSet(rs);
            }

            return reservationModel;
        } catch (Exception e) {
            return null;
        }
    }

    private CarRentalCompanyModel createCarRentalCompanyModelFromResultSet(ResultSet rs) throws SQLException {
        return new CarRentalCompanyModel(
            rs.getInt("Id"),
            rs.getString("Name"),
            rs.getBigDecimal("Price"),
            rs.getString("Location")
        );
    }

    private ReservationModel createCarRentalReservationModelFromResultSet(ResultSet rs) throws SQLException {
        return new ReservationModel(
                rs.getInt("Id"),
                new CarRentalCompanyModel(rs.getInt("Car_Rental_Company_Id")),
                rs.getString("Name_Booker"),
                rs.getString("Email_Booker"),
                rs.getInt("Guest_Amount"),
                rs.getDate("Pickup_Date"),
                rs.getDate("Dropoff_Date")
        );
    }
}
