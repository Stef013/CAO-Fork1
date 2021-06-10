package Controller;

import Logic.Registration;
import Model.AccountCredentials;
import Model.Customer;
import Model.Employee;
import Model.JwtResponse;
import Model.UpdateEmployee;
import Repository.CustomerSqlRepository;
import Utilities.Logging;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import spark.Spark;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.security.Key;
import java.util.Date;
import java.util.Calendar;
import java.util.List;

import javax.crypto.spec.SecretKeySpec;

import static spark.Spark.*;

public class CustomerController {

    // private CustomerRepo customerRepo;
    private Registration RL = new Registration();
    private Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
    private CustomerSqlRepository customerRepo;

    Logging logger = new Logging();
    private final String ERROR_MESSAGE = "Something went wrong.";

    public CustomerController() {

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

            System.out.println("Get /");
            String json;

            try {
                String email = request.params("id");
                System.out.println(email);

                Customer customer = RL.getCustomer(email);

                json = gson.toJson(customer);
            } catch (Exception ex) {
                response.status(404);
                json = "Cant find user.";
            }

            return json;
        }));

        Spark.post("/login", ((request, response) -> {
            response.type("application/json");
            AccountCredentials credentials = gson.fromJson(request.body(), AccountCredentials.class);
            customerRepo = new CustomerSqlRepository();
            Customer customer = customerRepo.get(credentials.getEmail());
            JwtResponse jwtResponse = new JwtResponse();

            if (credentials.isMatchingAccount(customer)) {
                SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
                byte[] apiKeySecretBytes = "mnbv*9XllnLSf8Nxu4$%lbRH15cVQa^T".getBytes();
                Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

                Calendar nbf = Calendar.getInstance();
                nbf.add(Calendar.MINUTE, -10);
                Calendar expiration = Calendar.getInstance();
                expiration.add(Calendar.MINUTE, 60);
                String jws = Jwts.builder().setSubject(customer.getEmail()).claim("userId", customer.getId())
                        .setNotBefore(nbf.getTime()).setIssuedAt(new Date()).setExpiration(expiration.getTime())
                        .signWith(signingKey).compact();
                jwtResponse.setToken(jws);
            } else {
                response.status(401);
                jwtResponse.setMessage("The user and password combination is incorrect");
            }
            return gson.toJson(jwtResponse);
        }));

        Spark.get("/", ((request, response) -> {
            response.type("application/json");
            String json;

            try {
                //logger.logInfo(getClass().getName(), "In /customers");
                List<Customer> customer = RL.getAllCustomer();

                json = gson.toJson(customer);
            } catch (Exception ex) {
                response.status(404);
                json = "No users.";
            }

            return json;
        }));

        Spark.post("/", ((request, response) -> {

            System.out.println("Post /");
            String body = request.body();
            String message = "";

            try {
                Customer customer = gson.fromJson(body, Customer.class);

                if (!RL.checkCustomer(customer.getEmail())) {
                    boolean result = RL.registerCustomer(customer);

                    if (result) {
                        message = "Account created successfully!";
                    }
                } else {
                    message = "Email already in use.";
                }
            } catch (Exception ex) {
                message = ERROR_MESSAGE;
            }

            return message;
        }));

        Spark.put("/", ((request, response) -> {

            System.out.println("Put /");
            String body = request.body();
            String message = "";

            try {
                Customer customer = gson.fromJson(body, Customer.class);

                boolean result = RL.updateCustomer(customer);

                if (result) {
                    message = "Account setting updated!";
                } else {
                    message = "Database error.";
                }

            } catch (Exception ex) {
                message = ERROR_MESSAGE;
            }
            return message;

        }));

        Spark.delete("/", ((request, response) -> {

            System.out.println("Delete /");
            String body = request.body();
            String message = "";

            try {
                Customer customer = gson.fromJson(body, Customer.class);

                boolean result = RL.deleteCustomer(customer.getId());

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
