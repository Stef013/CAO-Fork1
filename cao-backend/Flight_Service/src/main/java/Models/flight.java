package Models;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class flight {

    private int id;
    private String ticket_price;

    private int airport_id;

    private String destination;

    private String origin;

    private String departure_time;

    private String arrival_time;

    public String longStartPos;

    public String latStartPos;

    public String longEndPos;

    public String latEndPos;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTicket_price() {
        return ticket_price;
    }

    public void setTicket_price(String ticket_price) {
        this.ticket_price = ticket_price;
    }

    public int getAirport_id() {
        return airport_id;
    }

    public void setAirport_id(int airport_id) {
        this.airport_id = airport_id;
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

    public flight() {

    }
}
