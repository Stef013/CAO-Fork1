package com.cao.hotelservice.logic;

import com.cao.hotelservice.domain.HotelModel;
import com.cao.hotelservice.domain.ReservationModel;
import com.cao.hotelservice.repository.HotelRepository;

import java.util.ArrayList;

public class HotelLogic {

    private HotelRepository hotelRepository;

    public HotelLogic() {
        hotelRepository = new HotelRepository();
    }

    public ArrayList<HotelModel> getAllHotels() {
        return hotelRepository.getAllHotels();
    }

    public HotelModel getSpecificHotel(int hotelId) {
        return hotelRepository.getSpecificHotel(hotelId);
    }

    public ReservationModel reserveHotel(ReservationModel reservationModel) {
        return hotelRepository.reserveHotel(reservationModel);
    }

    public ReservationModel getSpecificReservationById(int reservationId) {
        ReservationModel reservationModel = hotelRepository.getSpecificReservationById(reservationId);
        if (reservationModel.getHotel() != null || reservationModel.getHotel().getId() != -1) {
            reservationModel.setHotel(hotelRepository.getSpecificHotel(reservationModel.getHotel().getId()));
        }

        return reservationModel;
    }
}
