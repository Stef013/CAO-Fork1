package Repository;

import Model.FoundPersonModel;
import Model.SearchModel;
import Model.UserModel;
import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class PoliceRepo {

    private final String connectionUrl = "jdbc:sqlserver://cao-dbserver.database.windows.net:1433;database=CAO_PoliceReport;user=CaoAdmin@cao-dbserver;password=7tJzrUVGB5i8dxX;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";
    private static Statement statement;

    Gson gson = new Gson();

    public FoundPersonModel searchPerson(SearchModel personToFind) throws IOException {

            FoundPersonModel foundPerson = null;

            URL url = new URL("http://localhost:8081/booking/interpolrequest"); //TODO: call naar boeking microservice

            String body = gson.toJson(personToFind);

            URLConnection conn = url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Content-Length", Integer.toString(body.length()));

            try (DataOutputStream dos = new DataOutputStream(conn.getOutputStream())) {
                dos.writeBytes(body);
            }

            try (BufferedReader bf = new BufferedReader(new InputStreamReader(
                    conn.getInputStream()))) {
                String line;
                while ((line = bf.readLine()) != null) {
                    System.out.println(line);
                }

                foundPerson =  gson.fromJson(line, FoundPersonModel.class);
            }
            return foundPerson;
    }

    public boolean createWarrant(SearchModel personToFind) {

        try (Connection connection = DriverManager.getConnection(connectionUrl);
             CallableStatement cstmnt = connection.prepareCall("{call createWarrent(?,?,?)}")) {
            cstmnt.setString(1, personToFind.getFirstname());
            cstmnt.setString(2, personToFind.getLastname());
            cstmnt.setString(3, personToFind.getDateOfBirth());
            cstmnt.executeUpdate();

            cstmnt.close();
            return true;

        } catch (SQLException throwables) {
            throwables.printStackTrace();

        }
        return false;
    }

}
