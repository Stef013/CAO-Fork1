package Controller;

import Interface.IEmployeeRepository;
import Model.Employee;
import Model.AccountCredentials;
import Model.JwtResponse;
import Model.RoleUpdate;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import spark.Spark;

import java.security.Key;

public class EmployeeController {
    private final Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
    private final IEmployeeRepository employeeRepository;

    /**
     * Handles registering and logging in Employee accounts
     * @param employeeRepository The Employee repository to be used
     */
    public EmployeeController(final IEmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;

        Spark.get("/login", ((request, response) -> {
            response.type("application/json");
            AccountCredentials credentials = gson.fromJson(request.body(), AccountCredentials.class);
            Employee employee = employeeRepository.get(credentials.getEmail());
            JwtResponse jwtResponse = new JwtResponse();

            if( credentials.isMatchingAccount(employee) ) {
                Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
                String jws = Jwts.builder().setSubject("Joe").signWith(key).compact();
                jwtResponse.setToken(jws);
            }
            else {
                response.status(401);
                jwtResponse.setMessage("The user and password combination is incorrect");
            }
            return gson.toJson(jwtResponse);
        }));

        Spark.get("/", ((request, response) -> {
            String json;

            try {
                String email = request.queryParams("id");
                System.out.println(email);


                Employee employee = employeeRepository.get(email);

                json = gson.toJson(employee);

            } catch (Exception ex) {
                System.out.println(ex.toString());
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
                Employee employee = gson.fromJson(body, Employee.class);

                if (!employeeRepository.accountWithEmailExists(employee.getEmail())) {
                    boolean result = employeeRepository.create(employee);

                    if (result) {
                        message = "Account created successfully!";
                    }
                } else {
                    message = "Email already in use.";
                }
            } catch (Exception ex) {
                System.out.println(ex.toString());
                message = "Something went wrong.";
            }

            return message;
        }));

        Spark.put("/", ((request, response) -> {

            System.out.println("Put /");
            String body = request.body();
            String message;

            try {
                Employee employee = gson.fromJson(body, Employee.class);

                boolean result = employeeRepository.update(employee);

                if (result) {
                    message = "Account setting updated!";
                } else {
                    message = "Database error.";
                }

            } catch (Exception ex) {
                System.out.println(ex.toString());
                message = "Something went wrong.";
            }
            return message;

        }));

        Spark.put("/role", ((request, response) -> {

            System.out.println("Put /");
            String body = request.body();
            String message;

            try {
                RoleUpdate newRole = gson.fromJson(body, RoleUpdate.class);

                boolean result = employeeRepository.setRole(newRole);

                if (result) {
                    message = "Account setting updated!";
                } else {
                    message = "Database error.";
                }

            } catch (Exception ex) {
                System.out.println(ex.toString());
                message = "Something went wrong.";
            }
            return message;

        }));

        Spark.delete("/", ((request, response) -> {

            System.out.println("Delete /");
            String body = request.body();
            String message;

            try {
                Employee employee = gson.fromJson(body, Employee.class);


                boolean result = employeeRepository.delete(employee.getId());

                if (result) {
                    message = "Account deleted!";
                } else {
                    message = "Database error.";
                }

            } catch (Exception ex) {
                System.out.println(ex.toString());
                message = "Something went wrong.";
            }
            return message;

        }));
    }
}
