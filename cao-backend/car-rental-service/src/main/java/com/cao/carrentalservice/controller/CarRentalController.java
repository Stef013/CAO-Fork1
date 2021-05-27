package com.cao.carrentalservice.controller;

import com.cao.carrentalservice.domain.CarRentalCompanyModel;
import com.cao.carrentalservice.domain.ReservationModel;
import com.cao.carrentalservice.logic.CarRentalLogic;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class CarRentalController {

    private CarRentalLogic carRentalLogic;

    public CarRentalController() {
        this.carRentalLogic = new CarRentalLogic();
    }

    @RequestMapping(value= "/carRentalCompany", method = RequestMethod.GET)
    @CrossOrigin(origins= "*")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ArrayList<CarRentalCompanyModel>> getAllCarRentalCompanies() {
        ArrayList<CarRentalCompanyModel> result = carRentalLogic.getAllCarRentalCompanies();

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/CarRentalCompany/{carRentalCompanyId}", method = RequestMethod.GET)
    @CrossOrigin(origins = "*")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<CarRentalCompanyModel> getSpecificCarRentalCompany(@PathVariable int carRentalCompanyId) {
        CarRentalCompanyModel result = carRentalLogic.getSpecificCarRentalCompanyById(carRentalCompanyId);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }

    @RequestMapping(value = "/reserveCarRental", method = RequestMethod.POST)
    @CrossOrigin(origins = "*")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ReservationModel> reserveCarRental(@RequestBody ReservationModel reservationModel) {
        ReservationModel result = carRentalLogic.placeReservationForCarRental(reservationModel);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }

    @RequestMapping(value = "/carRentalReservation/{carReservationId}", method = RequestMethod.GET)
    @CrossOrigin(origins = "*")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ReservationModel> getSpecificCarReservation(@PathVariable int carReservationId) {
        ReservationModel result = carRentalLogic.getSpecificCarRentalReservationById(carReservationId);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }
}
