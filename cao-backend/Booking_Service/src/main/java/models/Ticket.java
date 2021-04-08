package models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class Ticket {
    @JsonProperty("firstname")
    private String firstname;

    @JsonProperty("lastname")
    private String lastname;

    @JsonProperty("gender")
    private String gender;

    @JsonProperty("flightId")
    private int flightId;

    @JsonProperty("price")
    private float price;

    @JsonProperty("seat")
    private String seat;

    @JsonProperty("extraLuggage")
    private int extraLuggage;

    @JsonProperty("rentedHotel")
    private boolean rentedHotel;

    @JsonProperty("rentedCar")
    private boolean rentedCar;

    @JsonProperty("dateOfBirth")
    private String dateOfBirth;

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getFlightId() {
        return flightId;
    }

    public void setFlightId(int flightId) {
        this.flightId = flightId;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getSeat() {
        return seat;
    }

    public void setSeat(String seat) {
        this.seat = seat;
    }

    public int getExtraLuggage() {
        return extraLuggage;
    }

    public void setExtraLuggage(int extraLuggage) {
        this.extraLuggage = extraLuggage;
    }

    public boolean isRentedHotel() {
        return rentedHotel;
    }

    public void setRentedHotel(boolean rentedHotel) {
        this.rentedHotel = rentedHotel;
    }

    public boolean isRentedCar() {
        return rentedCar;
    }

    public void setRentedCar(boolean rentedCar) {
        this.rentedCar = rentedCar;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
}
