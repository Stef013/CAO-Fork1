import io.quarkus.test.junit.QuarkusTest;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

@QuarkusTest
public class BookingControllerTest {

    @Test
    public void ValidBookTicketEndpointTest() {
        JSONObject bookTicketJson = new JSONObject();
        bookTicketJson.put("flightId", 1);
        bookTicketJson.put("price", 10);
        bookTicketJson.put("bookedHotel", false);
        bookTicketJson.put("rentedCar", false);
        bookTicketJson.put("checkedIn", false);
        bookTicketJson.put("extraLuggage", 2);
        bookTicketJson.put("seat", "A22");

        given()
                .body(bookTicketJson.toString())
                .when().post("/booking-service/ticket")
                .then()
                    .statusCode(200);
    }
}
