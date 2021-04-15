package Controller;

import Logic.Registration;
import Model.Customer;
import Model.Employee;
import Model.UpdateEmployee;
import Utilities.Logging;
import spark.Spark;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.List;

import static spark.Spark.*;

public class CustomerController {

    //private CustomerRepo customerRepo;
    private Registration RL = new Registration();
    private Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy").create();

    Logging logger = new Logging();


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

        Spark.get("/customer/:id", ((request, response) -> {

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

        Spark.get("/customer", ((request, response) -> {

            String json;

            try {
                logger.logInfo(getClass().getName(), "In /customers");
                List<Customer> customer = RL.getAllCustomer();

                json = gson.toJson(customer);
            } catch (Exception ex) {
                System.out.println(ex);
                json = "No users.";
            }

            System.out.println(json);

            return json;
        }));

        Spark.post("/customer", ((request, response) -> {

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

        Spark.put("/customer", ((request, response) -> {

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

        Spark.delete("/customer", ((request, response) -> {

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

        //////////////Employee//////////////////////

        Spark.get("/employee/:id", ((request, response) -> {

            //System.out.println("Get /");
            String json;

            try {
                String email = request.params("id");
                System.out.println(email);


                Employee employee = RL.getEmployee(email);

                json = gson.toJson(employee);

            } catch (Exception ex) {
                System.out.println(ex);
                json = "Cant find user.";
            }

            System.out.println(json);

            return json;
        }));

        Spark.get("/employee", ((request, response) -> {

            //System.out.println("Get /");
            String json;

            try {

                List<Employee> employees = RL.getAllEmployee();

                json = gson.toJson(employees);

            } catch (Exception ex) {
                System.out.println(ex);
                json = "No employees";
            }

            System.out.println(json);

            return json;
        }));

        Spark.post("/employee", ((request, response) -> {

            System.out.println("Post /");
            String body = request.body();
            System.out.println(body);
            String message = "";

            try {
                Employee employee = gson.fromJson(body, Employee.class);



                if (!RL.checkEmployee(employee.getEmail())) {
                    boolean result = RL.registerEmployee(employee);

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

        Spark.put("/employee", ((request, response) -> {

            System.out.println("Put /");
            String body = request.body();
            String message = "";

            try {
                Employee employee = gson.fromJson(body, Employee.class);

                boolean result = RL.update(employee);

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

        Spark.put("/employee/role", ((request, response) -> {

            System.out.println("Put /");
            String body = request.body();
            String message = "";

            try {
                UpdateEmployee updateEmployee = gson.fromJson(body, UpdateEmployee.class);

                boolean result = RL.updateEmployee(updateEmployee);

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

        Spark.delete("/employee", ((request, response) -> {

            System.out.println("Delete /");
            String body = request.body();
            String message = "";

            try {
                Employee employee = gson.fromJson(body, Employee.class);


                boolean result = RL.deleteEmployee(employee.getId());

                if (result) {
                    message = "Account deleted!";
                } else {
                    message = "Database error.";
                }

            } catch (Exception ex) {
                response.status(404);
                message = ERROR_MESSAGE;
            }
            return message;

        }));
    }
}
