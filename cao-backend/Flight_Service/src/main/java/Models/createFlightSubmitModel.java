package Models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class createFlightSubmitModel {
    @JsonProperty("airport_id")
    private int airport_id;

    @JsonProperty("ticket_price")
    String ticket_price;

    @JsonProperty("destination")
    String destination;

    @JsonProperty("origin")
    String origin;

    @JsonProperty("departure_time")
    String departure_time;

    @JsonProperty("arrival_time")
    String arrival_time;

    public int getAirport_id() {
        return airport_id;
    }

    public void setAirport_id(int airport_id) {
        this.airport_id = airport_id;
    }

    public String getTicket_price() {
        return ticket_price;
    }

    public void setTicket_price(String ticket_price) {
        this.ticket_price = ticket_price;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDeparture_time() {
        return departure_time;
    }

    public void setDeparture_time(String departure_time) {
        this.departure_time = departure_time;
    }

    public String getArrival_time() {
        return arrival_time;
    }

    public void setArrival_time(String arrival_time) {
        this.arrival_time = arrival_time;
    }
}
