import io.quarkus.test.junit.QuarkusTest;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

@QuarkusTest
public class BookingControllerTest {

    @Test
    public void ValidBookTicketEndpointTest() {
        //First ticket
        JSONObject ticket1Json = new JSONObject();
        ticket1Json.put("firstName", "Mart");
        ticket1Json.put("lastName", "van Nijnatten");
        ticket1Json.put("gender", "male");
        ticket1Json.put("flightId", 1);
        ticket1Json.put("price", 80.50);
        ticket1Json.put("seat", "A22");
        ticket1Json.put("extraLuggage", false);
        ticket1Json.put("bookedHotel", false);
        ticket1Json.put("rentedCar", false);

        //Second ticket
        JSONObject ticket2Json = new JSONObject();
        ticket2Json.put("firstName", "Jan");
        ticket2Json.put("lastName", "Pieter");
        ticket2Json.put("gender", "male");
        ticket2Json.put("flightId", 1);
        ticket2Json.put("price", 80.50);
        ticket2Json.put("seat", "A22");
        ticket2Json.put("extraLuggage", false);
        ticket2Json.put("bookedHotel", false);
        ticket2Json.put("rentedCar", false);

        JSONArray ticketsJson = new JSONArray();
        ticketsJson.put(ticket1Json);
        ticketsJson.put(ticket2Json);

        //Booking
        JSONObject bookingJson = new JSONObject();
        bookingJson.put("customerId", 1);
        bookingJson.put("tickets", new JSONArray(ticketsJson));

        given()
                .body(bookingJson.toString())
                .when().post("/booking-service/book")
                .then()
                    .statusCode(200);
    }
}
