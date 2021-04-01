package Context;

import Interface.IFlight;
import Models.createFlightReturnModel;

public class FlightLocalContext implements IFlight {

    @Override
    public createFlightReturnModel createFlight(int airport_id, String ticket_price, String destination, String origin, String departure_time, String arrival_time) {
        //TODO: Add to local file
        createFlightReturnModel returnModel = new createFlightReturnModel();

        returnModel.setSuccess(false);
        returnModel.setError("There is no local file connected yet");
        return returnModel;
    }
}
