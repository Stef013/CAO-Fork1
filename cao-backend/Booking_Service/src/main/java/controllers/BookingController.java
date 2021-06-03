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
import org.json.JSONArray;
import org.json.JSONObject;
import services.BookingService;

import java.io.InputStream;
import java.lang.reflect.Array;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
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
    public Response book(String bookingJson, @HeaderParam("authorization") String jwt) throws JsonProcessingException {
        int userId = getUserIdFromJwt(jwt);

        Booking bookingRequest = objectMapper.readValue(bookingJson, Booking.class);
        bookingRequest.setBookingDate(new Date());
        Booking bookingResponse = bookingService.book(bookingRequest, userId);

        if (bookingResponse == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        //TODO: notify flight service that a ticket is booked (RabbitMQ)
        return Response.status(Response.Status.OK).entity(objectMapper.writeValueAsString(bookingResponse)).build();
    }

    @GET
    @Path("/booking/users")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBookingsByUserID(@HeaderParam("authorization") String jwt) {
        int userId = getUserIdFromJwt(jwt);

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

    @POST
    @Path("/booking/interpolrequest")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTicketByUser(String interpolJson) throws JsonProcessingException {
        InterpolRequest interpolRequest = objectMapper.readValue(interpolJson, InterpolRequest.class);
        ArrayList<Ticket> tickets = bookingService.getTicketByUser(interpolRequest);

        if (tickets == null || tickets.isEmpty()) {
            return Response.status(Response.Status.OK).entity("No tickets found.").build();
        } else {
            ArrayList<InterpolFlightTicket> interpolFlightTickets = new ArrayList<>();
            for (Ticket ticket : tickets) {
                var flight = new Object();
                try {
                    URL url = new URL("http://localhost:5678/flight/" + ticket.getFlightId());
                    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestProperty("accept", "application/json");
                    InputStream responseStream = connection.getInputStream();
                    ObjectMapper objectMapper = new ObjectMapper();
                    Map<String, Object> jsonMap = objectMapper.readValue(responseStream, Map.class);
                    flight = jsonMap.get("flight");
                } catch (Exception e) {
                    System.out.println(e);
                }

                InterpolFlightTicket interpolFlightTicket = new InterpolFlightTicket(ticket, flight);
                interpolFlightTickets.add(interpolFlightTicket);
            }
            return Response.status(Response.Status.OK).entity(objectMapper.writeValueAsString(interpolFlightTickets)).build();
        }
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

    @GET
    @Path("/booking/flight/{flightId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTicketsFromFlightId(@PathParam("flightId") int flightId) throws JsonProcessingException {
        ArrayList<Ticket> tickets = bookingService.getTicketsFromFlightId(flightId);
        if (!tickets.isEmpty()) {
            return Response.status(Response.Status.OK).entity(objectMapper.writeValueAsString(tickets)).build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    private int getUserIdFromJwt(String jwt) {
        jwt = jwt.replace("Bearer ", "");
        String[] chunks = jwt.split("\\.");
        Base64.Decoder decoder = Base64.getDecoder();
        String payload = new String(decoder.decode(chunks[1]));
        JSONObject payloadObject = new JSONObject(payload);
        int userId = payloadObject.getInt("userId");
        return userId;
    }
}
