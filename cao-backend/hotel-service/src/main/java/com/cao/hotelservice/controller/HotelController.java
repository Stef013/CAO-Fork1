package com.cao.hotelservice.controller;

import com.cao.hotelservice.domain.HotelModel;
import com.cao.hotelservice.domain.ReservationModel;
import com.cao.hotelservice.logic.HotelLogic;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class HotelController {

    private HotelLogic hotelLogic;

    public HotelController() {
        hotelLogic = new HotelLogic();
    }

    @RequestMapping(value= "/hotels", method = RequestMethod.GET)
    @CrossOrigin(origins= "*")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ArrayList<HotelModel>> getAllHotels() {
        ArrayList<HotelModel> result = hotelLogic.getAllHotels();

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value= "/hotels/{hotelId}", method = RequestMethod.GET)
    @CrossOrigin(origins= "*")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<HotelModel> getSpecificHotelById(@PathVariable int hotelId) {
        HotelModel result = hotelLogic.getSpecificHotel(hotelId);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value= "/hotels/reservation", method = RequestMethod.POST)
    @CrossOrigin(origins= "*")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ReservationModel> reserveHotel(@RequestBody ReservationModel reservationModel) {
        ReservationModel result = hotelLogic.reserveHotel(reservationModel);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @RequestMapping(value= "/hotels/reservation/{reservationId}", method = RequestMethod.GET)
    @CrossOrigin(origins= "*")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ReservationModel> getSpecificReservationById(@PathVariable int reservationId) {
        ReservationModel result = hotelLogic.getSpecificReservationById(reservationId);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
