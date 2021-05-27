package com.cao.carrentalservice.logic;

import com.cao.carrentalservice.domain.CarRentalCompanyModel;
import com.cao.carrentalservice.domain.ReservationModel;
import com.cao.carrentalservice.repository.CarRentalRepository;

import java.util.ArrayList;

public class CarRentalLogic {

    private CarRentalRepository carRentalRepository;

    public CarRentalLogic() {
        this.carRentalRepository = new CarRentalRepository();
    }

    public ArrayList<CarRentalCompanyModel> getAllCarRentalCompanies() {
        return carRentalRepository.getAllCarRentalCompanies();
    }

    public CarRentalCompanyModel getSpecificCarRentalCompanyById(int carRentalCompanyId) {
        return carRentalRepository.getSpecificCarRentalCompanyById(carRentalCompanyId);
    }

    public ReservationModel placeReservationForCarRental(ReservationModel reservationModel) {
        return carRentalRepository.placeReservationForCarRental(reservationModel);
    }

    public ReservationModel getSpecificCarRentalReservationById(int carReservationId) {
        ReservationModel reservationModel = carRentalRepository.getSpecificCarRentalReservationById(carReservationId);
        if (reservationModel.getCarRentalCompanyModel().getId() != -1) {
            reservationModel.setCarRentalCompanyModel(carRentalRepository.getSpecificCarRentalCompanyById(reservationModel.getCarRentalCompanyModel().getId()));
        }

        return reservationModel;
    }
}
