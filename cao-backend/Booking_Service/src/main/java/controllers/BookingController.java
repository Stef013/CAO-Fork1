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
import models.InterpolFlightTicket;
import models.InterpolRequest;
import models.Ticket;
import org.json.JSONObject;
import services.BookingService;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

@Path("/")
public class BookingController {

    @Inject
    BookingService bookingService;

    String jwtSecretKey = "";
    ObjectMapper objectMapper = new ObjectMapper();

    @POST
    @Path("/booking")
    @Produces(MediaType.APPLICATION_JSON)
    public Response book(String bookingJson, @HeaderParam("jwtToken") String jwt) throws JsonProcessingException {
        // Uncomment when a valid jwtToken is sent (for now the userId is hardcoded)
        // int userId = (int)decodeJWT(jwt).get("userId")
        Booking bookingRequest = objectMapper.readValue(bookingJson, Booking.class);
        bookingRequest.setBookingDate(new Date());
        Booking bookingResponse = bookingService.book(bookingRequest, 1);

        if (bookingResponse == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        //TODO: notify flight service that a ticket is booked (RabbitMQ)
        return Response.status(Response.Status.OK).entity(objectMapper.writeValueAsString(bookingResponse)).build();
    }

    @GET
    @Path("/booking/users/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBookingsByUserID(@PathParam("userId") int userId) {
        int jwtUserId = userId; // TODO: get jwtUserId from jwt token
        if (userId != jwtUserId) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }

        ArrayList<Booking> returnBookings;
        try {
            returnBookings = bookingService.getBookingsByUserID(userId);
            return Response.status(Response.Status.OK).entity(objectMapper.writeValueAsString(returnBookings)).build();
        } catch(Exception e) {
            return Response.status(Response.Status.fromStatusCode(409)).build();
        }
    }

    @GET
    @Path("/booking/{bookingId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBookingByID(@PathParam("bookingId") int bookingId) {
        return null;
    }

    public Claims decodeJWT(String jwt) {
        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(jwtSecretKey))
                .parseClaimsJws(jwt).getBody();
        return claims;
    }


    @PUT
    @Path("/booking/checkin/{bookingId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response checkInBooking(@PathParam("bookingId") int bookingId) throws JsonProcessingException {
        if (bookingService.checkInBooking(bookingId)) {
            return Response.status(Response.Status.OK).build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }
}
