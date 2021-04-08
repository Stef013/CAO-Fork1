package models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Ticket {
    @JsonProperty("firstName")
    private String firstName;

    @JsonProperty("lastName")
    private String lastName;

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

    @JsonProperty("bookedHotel")
    private boolean bookedHotel;

    @JsonProperty("rentedCar")
    private boolean rentedCar;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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

    public boolean isBookedHotel() {
        return bookedHotel;
    }

    public void setBookedHotel(boolean bookedHotel) {
        this.bookedHotel = bookedHotel;
    }

    public boolean isRentedCar() {
        return rentedCar;
    }

    public void setRentedCar(boolean rentedCar) {
        this.rentedCar = rentedCar;
    }
}
