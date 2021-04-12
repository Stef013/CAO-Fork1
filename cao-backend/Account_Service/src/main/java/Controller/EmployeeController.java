package Controller;

import Interface.IEmployeeRepository;
import Model.AccountCredentials;
import Model.Employee;
import Model.JwtResponse;
import Model.UpdateEmployeeRole;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import spark.Spark;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class EmployeeController {
    private final Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();
    private final IEmployeeRepository employeeRepository;

    /**
     * Handles registering and logging in Employee accounts
     *
     * @param employeeRepository The Employee repository to be used
     */
    public EmployeeController(final IEmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;

        Spark.get("/login", ((request, response) -> {
            response.type("application/json");
            AccountCredentials credentials = gson.fromJson(request.body(), AccountCredentials.class);
            Employee employee = this.employeeRepository.get(credentials.getEmail());
            JwtResponse jwtResponse = new JwtResponse();

            if (credentials.isMatchingAccount(employee)) {
                SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
                byte[] apiKeySecretBytes = "mnbv*9XllnLSf8Nxu4$%lbRH15cVQa^T".getBytes();
                Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

                Calendar nbf = Calendar.getInstance();
                nbf.add(Calendar.MINUTE, -10);
                Calendar expiration = Calendar.getInstance();
                expiration.add(Calendar.MINUTE, 60);
                String jws = Jwts.builder()
                        .setSubject(employee.getEmail())
                        .setNotBefore(nbf.getTime())
                        .setIssuedAt(new Date())
                        .setExpiration(expiration.getTime())
                        .signWith(signingKey)
                        .compact();
                jwtResponse.setToken(jws);
            } else {
                response.status(401);
                jwtResponse.setMessage("The user and password combination is incorrect");
            }
            return gson.toJson(jwtResponse);
        }));

        Spark.get("/:id", ((request, response) -> {
            String json;

            try {
                String email = request.params("id");
                Employee employee = employeeRepository.get(email);
                json = gson.toJson(employee);
            } catch (Exception ex) {
                json = "Cant find user.";
            }

            return json;
        }));

        Spark.get("/employee", ((request, response) -> {
            String json;

            try {
                List<Employee> employees = employeeRepository.getAll();
                json = gson.toJson(employees);
            } catch (Exception ex) {
                json = "No employees";
            }

            return json;
        }));

        Spark.post("/", ((request, response) -> {
            String body = request.body();
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
                message = "Something went wrong.";
            }

            return message;
        }));

        Spark.put("/", ((request, response) -> {
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
                message = "Something went wrong.";
            }
            return message;

        }));

        Spark.put("/role", ((request, response) -> {
            String body = request.body();
            String message;

            try {
                UpdateEmployeeRole updateEmployeeRole = gson.fromJson(body, UpdateEmployeeRole.class);

                boolean result = employeeRepository.updateRole(updateEmployeeRole);

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
                message = "Something went wrong.";
            }
            return message;

        }));
    }
}
