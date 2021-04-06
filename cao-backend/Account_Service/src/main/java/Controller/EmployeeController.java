package Controller;

import Interface.IEmployeeRepository;
import Model.Employee;
import Model.AccountCredentials;
import Model.RoleUpdate;
import Repository.EmployeeSqlRepository;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import spark.Spark;

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
            AccountCredentials credentials = gson.fromJson(request.body(), AccountCredentials.class);

            // Get Employee with matching email
            Employee employee = employeeRepository.get(credentials.getEmail());

            //Check if credentials match
            if( credentials.isMatchingAccount(employee) ) {
                return gson.toJson(employee);
            }
            return gson.toJson(false);
//            return new Employee(
//                    1,
//                    "axel@connectedairlines.com",
//                    null,
//                    "Axel",
//                    "Kohler",
//                    Roles.EMPLOYEE
//            );
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
