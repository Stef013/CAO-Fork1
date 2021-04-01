package Services;

import Context.FlightDatabaseContext;
import Interface.IFlight;
import Models.createFlightReturnModel;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.text.ParseException;

@ApplicationScoped
public class FlightService {
    IFlight context = new FlightDatabaseContext();

    public createFlightReturnModel createFlight(int airport_id, String ticket_price, String destination,
                                                String origin, String departure_time, String arrival_time) throws ParseException {

        return context.createFlight(airport_id, ticket_price, destination, origin, departure_time, arrival_time);
    }
}