package Models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class flightReturnModel {
    private boolean success;
    private String error;
    private flight flight;

    public flight getFlight() {
        return flight;
    }

    public void setFlight(flight flight) {
        this.flight = flight;
    }

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
}
