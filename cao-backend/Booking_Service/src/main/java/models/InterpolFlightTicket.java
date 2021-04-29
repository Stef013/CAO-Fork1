package models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class InterpolFlightTicket {

    @JsonProperty("ticket")
    private Ticket ticket;
    @JsonProperty("flight")
    private String flight;

    public InterpolFlightTicket(Ticket ticket, String flight) {
        this.ticket = ticket;
        this.flight = flight;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public String getFlight() {
        return flight;
    }

    public void setFlight(String flight) {
        this.flight = flight;
    }
}
