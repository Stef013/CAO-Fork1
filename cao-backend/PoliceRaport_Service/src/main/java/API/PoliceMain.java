package API;

import Controller.PoliceController;
import spark.Spark;

public class PoliceMain {

    public static void main(String[] args) {
        Spark.ipAddress("127.0.0.1");
        Spark.port(5678);

        // Spark.path("/customer", () -> new CustomerController());
        // Spark.path("/employee", () -> new EmployeeController(new
        // EmployeeSqlRepository()));

        new PoliceController();


    }

}
