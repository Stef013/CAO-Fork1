import io.quarkus.test.junit.QuarkusTest;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static io.restassured.RestAssured.given;

@QuarkusTest
public class BookingControllerTest {

    @Test
    public void ValidBookTicketEndpointTest() {
        //First ticket
        JSONObject ticket1Json = new JSONObject();
        ticket1Json.put("firstname", "Mart");
        ticket1Json.put("lastname", "van Nijnatten");
        ticket1Json.put("gender", "male");
        ticket1Json.put("flightId", 1);
        ticket1Json.put("price", 80.50);
        ticket1Json.put("seat", "A22");
        ticket1Json.put("extraLuggage", 1);
        ticket1Json.put("rentedHotel", false);
        ticket1Json.put("rentedCar", false);
        ticket1Json.put("dateOfBirth", "2010-05-22");

        //Second ticket
        JSONObject ticket2Json = new JSONObject();
        ticket2Json.put("firstname", "Jan");
        ticket2Json.put("lastname", "Pieter");
        ticket2Json.put("gender", "male");
        ticket2Json.put("flightId", 1);
        ticket2Json.put("price", 80.50);
        ticket2Json.put("seat", "A22");
        ticket2Json.put("extraLuggage", 1);
        ticket2Json.put("rentedHotel", false);
        ticket2Json.put("rentedCar", false);
        ticket2Json.put("dateOfBirth", "2010-05-22");

        JSONArray ticketsJson = new JSONArray();
        ticketsJson.put(ticket1Json);
        ticketsJson.put(ticket2Json);

        //Booking
        JSONObject bookingJson = new JSONObject();
        bookingJson.put("userId", 1);
        bookingJson.put("contactPhonenumber", "0612345678");
        bookingJson.put("contactEmail", "klaas@gmail.com");
        bookingJson.put("emergencyEmail", "klaashoi@gmail.com");
        bookingJson.put("emergencyPhonenumber", "0611223344");
        bookingJson.put("tickets", new JSONArray(ticketsJson));
        bookingJson.put("checkedIn", false);

        given()
                .body(bookingJson.toString())
                .when().post("/booking")
                .then()
                    .statusCode(200);
    }

    @Test
    public void getBookingsByUserIdTest() {
        given()
                .when().get("/booking/users/1")
                .then().statusCode(200);
    }
}
