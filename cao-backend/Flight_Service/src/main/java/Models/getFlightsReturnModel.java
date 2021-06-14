package Models;

import java.util.ArrayList;
import java.util.List;

public class getFlightsReturnModel {


    public boolean success;
    public String error;
    public List<flight> flightList = new ArrayList<>();

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public List<flight> getFlightList() {
        return flightList;
    }

    public void addFlight(flight newFlight) {
        this.flightList.add(newFlight);
    }
}
