package Interface;

import Models.createFlightReturnModel;
import Models.getFlightsReturnModel;

import java.text.ParseException;
import java.util.List;

public interface IFlight {
    createFlightReturnModel createFlight(
            int airport_id,
            String ticket_price,
            String destination,
            String origin,
            String departure_time,
            String arrival_time) throws ParseException;

    getFlightsReturnModel getFlights();
}
