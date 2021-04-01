package Interface;

import Models.createFlightReturnModel;

import java.text.ParseException;

public interface IFlight {
    createFlightReturnModel createFlight(int airport_id, String ticket_price, String destination,
                                         String origin, String departure_time, String arrival_time) throws ParseException;
}
