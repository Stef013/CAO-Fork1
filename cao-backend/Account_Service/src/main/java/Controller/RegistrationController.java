package Controller;

import Logic.Registration;
import spark.Spark;

import static spark.Spark.options;

public class RegistrationController {

    Registration RL = new Registration();

    public RegistrationController() {

        options("*/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }
            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        //before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));


        Spark.get("/", ((request, response) -> {

            RL.registrateCustomer(null);

            String json = "Get helemaal niets";

            response.status(200);
            return json;

        }));


        /*
         Spark.post("/availability/", ((request, response) -> {
            //TODO: Niet geimplementeerd??
            System.out.println("In Schedule/availability");

            String body = request.body();

            String json = gson.toJson("Schedule/availability - Not implemented yet");
            response.status(200);
            return json;

        }));

         */

    }

}
