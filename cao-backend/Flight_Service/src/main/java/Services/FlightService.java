package Services;

import Context.FlightDatabaseContext;
import Interface.IFlight;
import Models.createFlightReturnModel;
import Models.getFlightsReturnModel;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.text.ParseException;
import java.util.List;

@ApplicationScoped
public class FlightService {
    IFlight context = new FlightDatabaseContext();

    public createFlightReturnModel createFlight(
            int airport_id,
            String ticket_price,
            String destination,
            String origin,
            String departure_time,
            String arrival_time) throws ParseException {
        return context.createFlight(airport_id, ticket_price, destination, origin, departure_time, arrival_time);
    }

    public getFlightsReturnModel getFlights (){
        return context.getFlights();
    }
}