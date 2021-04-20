package Services;

import Context.FlightDatabaseContext;
import Interface.IFlight;
import Models.createFlightReturnModel;
import Models.getFlightsReturnModel;
import io.smallrye.mutiny.tuples.Tuple;
import org.graalvm.polyglot.impl.AbstractPolyglotImpl;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
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

        getLatLng(destination);

        return context.createFlight(airport_id, ticket_price, destination, origin, departure_time, arrival_time, null, null, null, null);
    }

    public getFlightsReturnModel getFlights (){
        return context.getFlights();
    }

    public String[] getLatLng(String location) {
        String call= "http://open.mapquestapi.com/geocoding/v1/address?key=tfeYapd5em98p1WiUDnI5iy3z67tgnUO&location="+ location;
        try {
            URL url = new URL(call);
            HttpURLConnection urlConnection = (HttpURLConnection)url.openConnection();
            urlConnection.setRequestProperty("Accept-Charset", "UTF-8");
            InputStream response = urlConnection.getInputStream();
            System.out.println(response);

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}