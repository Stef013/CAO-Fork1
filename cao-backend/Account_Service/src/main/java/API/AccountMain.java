package API;

import Controller.CustomerController;
import Controller.EmployeeController;
import Repository.EmployeeSqlRepository;
import spark.Spark;

import java.net.Inet4Address;
import java.net.UnknownHostException;

public class AccountMain {

    public static void main(String[] args) throws UnknownHostException {

        String ip = Inet4Address.getLocalHost().getHostAddress();
        Spark.ipAddress("127.0.0.1");

        Spark.path("/customer", () -> {
            new CustomerController(new String());
        });
        Spark.path("/employee", () -> {
            new EmployeeController(new EmployeeSqlRepository());
        });
    }

}
