package models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BookTicket {
    @JsonProperty("flightId")
    private int flightId;

    @JsonProperty("price")
    private double price;

    @JsonProperty("bookedHotel")
    private boolean bookedHotel;

    @JsonProperty("rentedCar")
    private boolean rentedCar;

    @JsonProperty("checkedIn")
    private boolean checkedIn;

    @JsonProperty("extraLuggage")
    private int extraLuggage;

    @JsonProperty("seat")
    private String seat;

    public int getFlightId() {
        return flightId;
    }

    public void setFlightId(int flightId) {
        this.flightId = flightId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
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

    public boolean isCheckedIn() {
        return checkedIn;
    }

    public void setCheckedIn(boolean checkedIn) {
        this.checkedIn = checkedIn;
    }

    public int getExtraLuggage() {
        return extraLuggage;
    }

    public void setExtraLuggage(int extraLuggage) {
        this.extraLuggage = extraLuggage;
    }

    public String getSeat() {
        return seat;
    }

    public void setSeat(String seat) {
        this.seat = seat;
    }
}
