package Context;

import Interface.IFlight;
import Models.createFlightReturnModel;
import Models.flightReturnModel;
import Models.getFlightsReturnModel;

import java.text.ParseException;
import java.util.List;

public class FlightLocalContext implements IFlight {

    @Override
    public createFlightReturnModel createFlight(int airport_id, String ticket_price, String destination, String origin, String departure_time, String arrival_time, String longStartPos, String latStartPos, String longEndPos, String latEndPos) throws ParseException {
        //TODO: Add to local file
        createFlightReturnModel returnModel = new createFlightReturnModel();

        returnModel.setSuccess(false);
        returnModel.setError("There is no local file connected yet");
        return returnModel;
    }

    @Override
    public getFlightsReturnModel getFlights() {
        return null;
    }
    public getFlightsReturnModel CurrentFlights() {return null;}
    public flightReturnModel FlightById(int FlightId) {return null;}
}
