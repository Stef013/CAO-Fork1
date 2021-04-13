package models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;
import java.util.List;

public class Booking {
    @JsonProperty("bookingId")
    private int bookingId;

    @JsonProperty("userId")
    private int userId;

    @JsonProperty("contactPhonenumber")
    private String contactPhonenumber;

    @JsonProperty("contactEmail")
    private String contactEmail;

    @JsonProperty("bookingDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date bookingDate;

    @JsonProperty("tickets")
    private List<Ticket> tickets;

    @JsonProperty("emergencyEmail")
    private String emergencyEmail;

    @JsonProperty("emergencyPhonenumber")
    private String emergencyPhonenumber;

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getContactPhonenumber() {
        return contactPhonenumber;
    }

    public void setContactPhonenumber(String contactPhonenumber) {
        this.contactPhonenumber = contactPhonenumber;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = bookingDate;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public String getEmergencyEmail() {
        return emergencyEmail;
    }

    public void setEmergencyEmail(String emergencyEmail) {
        this.emergencyEmail = emergencyEmail;
    }

    public String getEmergencyPhonenumber() {
        return emergencyPhonenumber;
    }

    public void setEmergencyPhonenumber(String emergencyPhonenumber) {
        this.emergencyPhonenumber = emergencyPhonenumber;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "bookingId=" + bookingId +
                ", userId=" + userId +
                ", contactPhonenumber='" + contactPhonenumber + '\'' +
                ", contactEmail='" + contactEmail + '\'' +
                ", bookingDate='" + bookingDate + '\'' +
                ", tickets=" + tickets.toString() +
                ", emergencyEmail='" + emergencyEmail + '\'' +
                ", emergencyPhonenumber='" + emergencyPhonenumber + '\'' +
                '}';
    }
}
