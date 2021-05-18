package Model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FoundPersonModel {

    @JsonProperty("ticket")
    private Ticket ticket;
    @JsonProperty("flight")
    private Object flight;

    public FoundPersonModel(Ticket ticket, Object flight) {
        this.ticket = ticket;
        this.flight = flight;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public Object getFlight() {
        return flight;
    }

    public void setFlight(Object flight) {
        this.flight = flight;
    }
}
