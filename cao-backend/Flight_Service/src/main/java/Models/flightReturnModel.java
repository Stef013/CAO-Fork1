package Models;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class flightReturnModel {
    public boolean success;
    public String error;
    public flight flight;

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

    public flightReturnModel(){
        
    }
}
