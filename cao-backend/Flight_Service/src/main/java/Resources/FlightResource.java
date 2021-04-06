package Resources;

import Models.createFlightReturnModel;
import Models.createFlightSubmitModel;
import Models.getFlightsReturnModel;
import Services.FlightService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@Path("")
public class FlightResource {

    @Inject
    FlightService service;
    @Inject
    createFlightSubmitModel createFlightSubmitModel;

    ObjectMapper objectMapper = new ObjectMapper();

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/flight")
    public Response createFlight(String json) throws JsonProcessingException, ParseException {
        createFlightSubmitModel createFlightSubmitModel = objectMapper.readValue(json, createFlightSubmitModel.class);

        int airport_id = createFlightSubmitModel.getAirport_id();
        String ticket_price = createFlightSubmitModel.getTicket_price();
        String destination = createFlightSubmitModel.getDestination();
        String origin = createFlightSubmitModel.getOrigin();
        String departure_time = createFlightSubmitModel.getDeparture_time();
        String arrival_time = createFlightSubmitModel.getArrival_time();

        if (airport_id == 0 || ticket_price.isEmpty() || destination.isEmpty() || origin.isEmpty() ||
                departure_time.isEmpty() || arrival_time.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        createFlightReturnModel returnModel = service.createFlight(airport_id, ticket_price, destination, origin, departure_time, arrival_time);
        if (returnModel.isSuccess()) {
            return Response.status(Response.Status.OK).entity(objectMapper.writeValueAsString(returnModel)).build();
        }
        return Response.status(Response.Status.BAD_REQUEST).entity(objectMapper.writeValueAsString(returnModel)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/flight")
    public Response getFlights() {

        getFlightsReturnModel returnModel = service.getFlights();
        if(returnModel == null){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(returnModel).build();
        }

        return Response.status(Response.Status.OK).entity(returnModel).build();
    }

}
