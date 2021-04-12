package Controller;

import Logic.Registration;
import Model.Customer;
import Utilities.Logging;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import spark.Spark;

import java.util.List;

import static spark.Spark.before;
import static spark.Spark.options;

public class CustomerController {

    private final Registration registration = new Registration();
    private final Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
    private final Logging logger = new Logging();

    public CustomerController(final String a) {

        options("/*", (request, response) -> {

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

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

        Spark.get("/:id", ((request, response) -> {
            String json;

            try {
                String email = request.params("id");
                Customer customer = registration.getCustomer(email);
                json = gson.toJson(customer);
            } catch (Exception ex) {
                response.status(404);
                json = "Cant find user.";
            }

            System.out.println(json);

            return json;
        }));

        Spark.get("/", ((request, response) -> {
            response.type("application/json");
            String json;

            try {
                logger.logInfo(getClass().getName(), "In /customers");
                List<Customer> customer = registration.getAllCustomer();

                json = gson.toJson(customer);
            } catch (Exception ex) {
                response.status(404);
                json = "No users.";
            }

            return json;
        }));

        Spark.post("/", ((request, response) -> {
            String body = request.body();
            String message = "";

            try {
                Customer customer = gson.fromJson(body, Customer.class);

                if (!registration.checkCustomer(customer.getEmail())) {
                    boolean result = registration.registerCustomer(customer);

                    if (result) {
                        message = "Account created successfully!";
                    }
                } else {
                    message = "Email already in use.";
                }
            } catch (Exception ex) {
                message = "Something went wrong.";
            }

            return message;
        }));

        Spark.put("/", ((request, response) -> {
            String body = request.body();
            String message = "";

            try {
                Customer customer = gson.fromJson(body, Customer.class);

                boolean result = registration.updateCustomer(customer);

                if (result) {
                    message = "Account setting updated!";
                } else {
                    message = "Database error.";
                }

            } catch (Exception ex) {
                message = "Something went wrong.";
            }
            return message;

        }));

        Spark.delete("/", ((request, response) -> {
            String body = request.body();
            String message = "";

            try {
                Customer customer = gson.fromJson(body, Customer.class);
                boolean result = registration.deleteCustomer(customer.getId());
                message = result ? "Account deleted!" : "Database error.";
            } catch (Exception ex) {
                response.status(404);
                message = "Something went wrong.";
            }
            return message;

        }));
    }
}
