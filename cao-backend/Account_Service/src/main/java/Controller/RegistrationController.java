package Controller;

import Logic.Registration;
import Model.Customer;
import Repository.RegistrationRepo;
import spark.Spark;

import static spark.Spark.options;

import java.util.Date;

public class RegistrationController {

    private static String persistenceUnit = "Account_Service_PU";
    private RegistrationRepo registrationRepo;

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

        // before((request, response) -> response.header("Access-Control-Allow-Origin",
        // "*"));

        Spark.get("/", ((request, response) -> {

            // RL.registrateCustomer(null);

            String json = "Get helemaal niets";
            Date date = new Date();
            Customer testCustomer = new Customer("email@email.nl", "password", "firstname", "lastname", "nationality",
                    date);

            registrationRepo = new RegistrationRepo(persistenceUnit);
            boolean result = registrationRepo.insertCustomer(testCustomer);
            registrationRepo.closeConnection();

            response.status(200);
            return result;

        }));

        /*
         * Spark.post("/availability/", ((request, response) -> { //TODO: Niet
         * geimplementeerd?? System.out.println("In Schedule/availability");
         * 
         * String body = request.body();
         * 
         * String json = gson.toJson("Schedule/availability - Not implemented yet");
         * response.status(200); return json;
         * 
         * }));
         * 
         */

    }

}
