package Models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public class getFlightsReturnModel {


    private boolean success;
    private String error;
    private List<flight> flightList = new ArrayList<>();

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
