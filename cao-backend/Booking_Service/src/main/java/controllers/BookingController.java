package controllers;
import com.fasterxml.jackson.core.JsonProcessingException;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.DatatypeConverter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import com.fasterxml.jackson.databind.ObjectMapper;
import models.Booking;
import models.Ticket;
import services.BookingService;

import java.util.Date;

@Path("/booking-service")
public class BookingController {

    @Inject
    BookingService bookingService;

    String jwtSecretKey = "";
    ObjectMapper objectMapper = new ObjectMapper();

    @POST
    @Path("/book")
    @Produces(MediaType.APPLICATION_JSON)
    public Response book(String bookingJson, @HeaderParam("jwtToken") String jwt) throws JsonProcessingException {
        // Uncomment when a valid jwtToken is sent (for now the userId is hardcoded)
        // int userId = (int)decodeJWT(jwt).get("userId")
        System.out.println(bookingJson);
        Booking bookingRequest = objectMapper.readValue(bookingJson, Booking.class);
        bookingRequest.setBookingDate("20-04-2021");
        Booking bookingResponse = bookingService.book(bookingRequest, 1);

        if (bookingResponse == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        //TODO: notify flight service that a ticket is booked (RabbitMQ)
        return Response.status(Response.Status.OK).entity(objectMapper.writeValueAsString(bookingResponse)).build();
    }

    public Claims decodeJWT(String jwt) {
        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(jwtSecretKey))
                .parseClaimsJws(jwt).getBody();
        return claims;
    }
}
