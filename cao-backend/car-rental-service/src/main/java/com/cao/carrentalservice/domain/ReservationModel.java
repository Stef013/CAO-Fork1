package com.cao.carrentalservice.domain;

import java.util.Date;

public class ReservationModel {
    private int id;
    private CarRentalCompanyModel carRentalCompanyModel;
    private String nameBooker;
    private String emailBooker;
    private int guestAmount;
    private Date pickupDate;
    private Date dropOffDate;

    public ReservationModel() {
    }

    public ReservationModel(int id, CarRentalCompanyModel carRentalCompanyModel, String nameBooker, String emailBooker, int guestAmount, Date pickupDate, Date dropOffDate) {
        this.id = id;
        this.carRentalCompanyModel = carRentalCompanyModel;
        this.nameBooker = nameBooker;
        this.emailBooker = emailBooker;
        this.guestAmount = guestAmount;
        this.pickupDate = pickupDate;
        this.dropOffDate = dropOffDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public CarRentalCompanyModel getCarRentalCompanyModel() {
        return carRentalCompanyModel;
    }

    public void setCarRentalCompanyModel(CarRentalCompanyModel carRentalCompanyModel) {
        this.carRentalCompanyModel = carRentalCompanyModel;
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

    public Date getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(Date pickupDate) {
        this.pickupDate = pickupDate;
    }

    public Date getDropOffDate() {
        return dropOffDate;
    }

    public void setDropOffDate(Date dropOffDate) {
        this.dropOffDate = dropOffDate;
    }
}
