package controllers;
import com.fasterxml.jackson.core.JsonProcessingException;
import models.BookTicket;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.DatatypeConverter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import com.fasterxml.jackson.databind.ObjectMapper;
import models.ReturnTicket;
import services.BookingService;


@Path("/booking-service")
public class BookingController {

    @Inject
    BookingService bookingService;

    String jwtSecretKey = "";
    ObjectMapper objectMapper = new ObjectMapper();

    @POST
    @Path("/ticket")
    @Produces(MediaType.APPLICATION_JSON)
    public Response bookTicket(String ticketJson, @HeaderParam("jwtToken") String jwt) throws JsonProcessingException {
        // Uncomment when a valid jwtToken is sent (for now the userId is hardcoded)
        // int userId = (int)decodeJWT(jwt).get("userId")
        int userId = 1;
        BookTicket bookTicket = objectMapper.readValue(ticketJson, BookTicket.class);
        ReturnTicket returnTicket = bookingService.bookTicket(bookTicket, userId);
        if (returnTicket.isSuccess() == false) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        //TODO: notify flight service that a ticket is booked (messaging)
        return Response.status(Response.Status.OK).entity(objectMapper.writeValueAsString(returnTicket)).build();
    }

    public Claims decodeJWT(String jwt) {
        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(jwtSecretKey))
                .parseClaimsJws(jwt).getBody();
        return claims;
    }
}
