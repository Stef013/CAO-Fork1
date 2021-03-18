package API;

import Controller.RegistrationController;
import spark.Spark;

import java.net.Inet4Address;
import java.net.UnknownHostException;

public class AccountMain {

    public static void main(String[] args) throws UnknownHostException {

        String ip = Inet4Address.getLocalHost().getHostAddress();
        Spark.ipAddress(ip);

        new RegistrationController();
    }

}
