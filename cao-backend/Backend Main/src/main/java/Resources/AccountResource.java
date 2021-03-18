package Resources;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import Models.RegisterModel;
import Services.AccountService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.jboss.resteasy.annotations.jaxrs.PathParam;
import com.fasterxml.jackson.databind.ObjectMapper;

@Path("")
public class AccountResource {
    @Inject
    AccountService service;

    RegisterModel registerModel;
    ObjectMapper objectMapper = new ObjectMapper();

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/account/register")
    public String register(String json) {
        RegisterModel registerModel = null;
        try {
            registerModel = objectMapper.readValue(json, RegisterModel.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return service.register(registerModel);
    }

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/account/login")
    public String login(@PathParam("json") String name) {
        return "false";
    }
}
