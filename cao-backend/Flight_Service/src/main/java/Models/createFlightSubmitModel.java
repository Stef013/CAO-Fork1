package Models;

import com.fasterxml.jackson.annotation.*;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class createFlightSubmitModel {
    @JsonProperty("airport_id")
    public int airport_id;

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

    @JsonProperty("longStartPos")
    String longStartPos;

    @JsonProperty("latStartPos")
    String latStartPos;

    @JsonProperty("longEndPos")
    String longEndPos;

    @JsonProperty("latEndPos")
    String latEndPos;

    public String getLongStartPos() {
        return longStartPos;
    }

    public void setLongStartPos(String longStartPos) {
        this.longStartPos = longStartPos;
    }

    public String getLatStartPos() {
        return latStartPos;
    }

    public void setLatStartPos(String latStartPos) {
        this.latStartPos = latStartPos;
    }

    public String getLongEndPos() {
        return longEndPos;
    }

    public void setLongEndPos(String longEndPos) {
        this.longEndPos = longEndPos;
    }

    public String getLatEndPos() {
        return latEndPos;
    }

    public void setLatEndPos(String latEndPos) {
        this.latEndPos = latEndPos;
    }

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
