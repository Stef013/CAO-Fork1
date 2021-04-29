package Services;

import Context.FlightDatabaseContext;
import Interface.IFlight;
import Models.createFlightReturnModel;
import Models.flightReturnModel;
import Models.getFlightsReturnModel;
import io.smallrye.mutiny.tuples.Tuple;
import io.vertx.core.json.JsonArray;
import org.apache.http.HttpEntity;
import org.apache.http.util.EntityUtils;
import org.graalvm.polyglot.impl.AbstractPolyglotImpl;
import org.json.JSONException;
import org.json.JSONObject;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
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

        Double[] dest = getLatLng(destination);
        Double[] orig = getLatLng(origin);
        return context.createFlight(airport_id, ticket_price, destination, origin, departure_time, arrival_time, orig[1].toString(), orig[0].toString(), dest[1].toString(), dest[0].toString());
    }

    public getFlightsReturnModel getFlights (){
        return context.getFlights();
    }
    public getFlightsReturnModel CurrentFlights () {return context.CurrentFlights();}
    public flightReturnModel FlightById (int FlightId) {return context.FlightById(FlightId);}

    public Double[] getLatLng(String location) {
        String call= "http://open.mapquestapi.com/geocoding/v1/address?key=tfeYapd5em98p1WiUDnI5iy3z67tgnUO&location="+ location;
        try {
            URL url = new URL(call);
            HttpURLConnection urlConnection = (HttpURLConnection)url.openConnection();
            urlConnection.setRequestProperty("Accept-Charset", "UTF-8");
            BufferedReader br = new BufferedReader(new InputStreamReader((urlConnection.getInputStream())));
            StringBuilder sb = new StringBuilder();
            String output;
            while ((output = br.readLine()) != null) {
                sb.append(output);
            }
            JSONObject jsonObj = new JSONObject(sb.toString());
            Double lat = jsonObj.getJSONArray("results").getJSONObject(0).getJSONArray("locations").getJSONObject(0).getJSONObject("displayLatLng").getDouble("lat");
            Double lng = jsonObj.getJSONArray("results").getJSONObject(0).getJSONArray("locations").getJSONObject(0).getJSONObject("displayLatLng").getDouble("lng");
            return new Double[] {lat, lng};

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return null;
    }
}