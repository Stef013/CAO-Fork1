package API;

import Controller.CustomerController;
import Controller.EmployeeController;
import Repository.EmployeeSqlRepository;
import spark.Spark;

public class AccountMain {

    public static void main(String[] args) {
        Spark.ipAddress("0.0.0.0");

        Spark.path("/customer", () -> new CustomerController());
        Spark.path("/employee", () -> new EmployeeController(new EmployeeSqlRepository()));
    }

}
