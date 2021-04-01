package Controller;

import Interface.IEmployeeRepository;
import Model.Employee;
import Model.RoleUpdate;
import spark.Spark;

public class EmployeeController {
    private IEmployeeRepository employeeRepository;

    public EmployeeController(final IEmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;

        Spark.get("/login", ((request, response) -> {
            return employeeRepository.checkLogin("axel@connectedairlines.com", "Fontys");
        }));

        Spark.get("/employee", ((request, response) -> {

            //System.out.println("Get /");
            String json;

            try {
                String email = request.queryParams("id");
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

                boolean result = RL.updateEmployee(employee);

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
                RoleUpdate updateRole = gson.fromJson(body, RoleUpdate.class);

                boolean result = RL.updateRole(updateRole);

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
                System.out.println(ex);
                message = "Something went wrong.";
            }
            return message;

        }));
    }
}
