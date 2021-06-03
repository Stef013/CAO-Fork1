package com.cao.hotelservice.domain;

import java.util.Date;

public class ReservationModel {
    private int id;
    private HotelModel hotel;
    private String nameBooker;
    private String emailBooker;
    private int guestAmount;
    private int roomType;
    private Date checkInDate;
    private Date checkOutDate;

    public ReservationModel() {
    }

    public ReservationModel(int id, HotelModel hotel, String nameBooker, String emailBooker, int guestAmount, int roomType, Date checkInDate, Date checkOutDate) {
        this.id = id;
        this.hotel = hotel;
        this.nameBooker = nameBooker;
        this.emailBooker = emailBooker;
        this.guestAmount = guestAmount;
        this.roomType = roomType;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public HotelModel getHotel() {
        return hotel;
    }

    public void setHotel(HotelModel hotel) {
        this.hotel = hotel;
    }

    public String getNameBooker() {
        return nameBooker;
    }

    public void setNameBooker(String nameBooker) {
        this.nameBooker = nameBooker;
    }

    public String getEmailBooker() {
        return emailBooker;
    }

    public void setEmailBooker(String emailBooker) {
        this.emailBooker = emailBooker;
    }

    public int getGuestAmount() {
        return guestAmount;
    }

    public void setGuestAmount(int guestAmount) {
        this.guestAmount = guestAmount;
    }

    public int getRoomType() {
        return roomType;
    }

    public void setRoomType(int roomType) {
        this.roomType = roomType;
    }

    public Date getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(Date checkInDate) {
        this.checkInDate = checkInDate;
    }

    public Date getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(Date checkOutDate) {
        this.checkOutDate = checkOutDate;
    }
}
