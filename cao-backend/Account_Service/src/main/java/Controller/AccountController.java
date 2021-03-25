package Controller;

import Model.Customer;
import Repository.RegistrationRepo;
import spark.Spark;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import static spark.Spark.*;

public class AccountController {

    private RegistrationRepo registrationRepo;
    private Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();;

    public AccountController(final String a) {

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

        Spark.get("/", ((request, response) -> {

            System.out.println("Get /");
            String json;

            try {
                String email = request.queryParams("id");
                System.out.println(email);

                registrationRepo = new RegistrationRepo();
                Customer customer = registrationRepo.get(email);

                json = gson.toJson(customer);
            } catch (Exception ex) {
                System.out.println(ex);
                json = "Cant find user.";
            }

            System.out.println(json);

            return json;
        }));

        Spark.post("/", ((request, response) -> {

            System.out.println("Post /");
            String body = request.body();
            System.out.println(body);
            String message = "";

            try {
                Customer customer = gson.fromJson(body, Customer.class);

                registrationRepo = new RegistrationRepo();

                if (!registrationRepo.checkEmail(customer.getEmail())) {
                    boolean result = registrationRepo.create(customer);

                    if (result) {
                        message = "Account created successfully!";
                    }
                } else {
                    message = "Email already in use.";
                }
            } catch (Exception ex) {
                System.out.println(ex);
                message = "Something went wrong.";
            }

            return message;
        }));

        Spark.put("/", ((request, response) -> {

            System.out.println("Put /");
            String body = request.body();
            String message = "";

            try {
                Customer customer = gson.fromJson(body, Customer.class);

                registrationRepo = new RegistrationRepo();

                boolean result = registrationRepo.update(customer);

                if (result) {
                    message = "Account setting updated!";
                } else {
                    message = "Database error.";
                }

            } catch (Exception ex) {
                System.out.println(ex);
                message = "Something went wrong.";
            }
            return message;

        }));

        Spark.delete("/", ((request, response) -> {

            System.out.println("Delete /");
            String body = request.body();
            String message = "";

            try {
                Customer customer = gson.fromJson(body, Customer.class);
                registrationRepo = new RegistrationRepo();

                boolean result = registrationRepo.delete(customer);

                if (result) {
                    message = "Account deleted!";
                } else {
                    message = "Database error.";
                }

            } catch (Exception ex) {
                System.out.println(ex);
                message = "Something went wrong.";
            }
            return message;

        }));
    }
}
