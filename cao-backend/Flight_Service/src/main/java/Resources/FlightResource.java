package Resources;

import Models.*;
import Services.FlightService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.inject.Inject;
import javax.print.attribute.standard.Media;
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
    public Response getFlights() throws JsonProcessingException {

        getFlightsReturnModel returnModel = service.getFlights();
        if(returnModel == null){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(returnModel).build();
        }
        return Response.status(Response.Status.OK).entity(objectMapper.writeValueAsString(returnModel)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/flight/current")
    public Response CurrentFlights() throws JsonProcessingException{
        getFlightsReturnModel returnModel = service.CurrentFlights();
        return Response.status(Response.Status.OK).entity(objectMapper.writeValueAsString(returnModel)).build();
    }

    @GET
    @Path("/flight/{id}")
    public Response FlightyById(@PathParam("id") int id) throws JsonProcessingException {
        if (id == 0) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        flightReturnModel returnModel = service.FlightById(id);
        return Response.status(Response.Status.OK).entity(objectMapper.writeValueAsString(returnModel)).build();
    }

    @PUT
    @Path("/flight/updateFlightPrice")
    public Response updateFlightPrice(String json)throws JsonProcessingException {
        priceUpdateModel model = objectMapper.readValue(json, priceUpdateModel.class);
        int id = model.getId();
        String ticket_price = model.getTicket_price();

        if (id == 0 || ticket_price.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        try {
            service.updateFlightPrice(model);
            return Response.status(Response.Status.OK).entity(objectMapper.writeValueAsString(model)).build();
        }catch (Exception ex) {
            return Response.status(Response.Status.BAD_REQUEST).entity(objectMapper.writeValueAsString(model)).build();
        }
    }
}
