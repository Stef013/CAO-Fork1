package Repository;

import Model.FoundPersonModel;
import Model.InterpolFlightTicket;
import Model.SearchModel;
import Model.UserModel;
import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.sql.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeoutException;
import java.util.UUID;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeoutException;

import com.google.gson.reflect.TypeToken;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.AMQP;

public class PoliceRepo {

    private final String connectionUrl = "jdbc:sqlserver://cao-dbserver.database.windows.net:1433;database=CAO_PoliceReport;user=CaoAdmin@cao-dbserver;password=7tJzrUVGB5i8dxX;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";
    private static Statement statement;

    private Connection connection;
    private Channel channel;
    private String requestQueueName = "PoliceReport1";
    ArrayList<InterpolFlightTicket> flights;

    Gson gson = new Gson();
    private final static String QUEUE_NAME = "PoliceReport";

    public ArrayList<InterpolFlightTicket> searchPerson(SearchModel personToFind) throws IOException {
        //MESSAGING
        /*ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            String message = gson.toJson(personToFind);
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes(StandardCharsets.UTF_8));
            System.out.println(" [x] Sent '" + message + "'");
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
        return null;*/



        /////////////////////////////////////////////////////////////////


        final String corrId = UUID.randomUUID().toString();

        String message = gson.toJson(personToFind);
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        try {
            connection = factory.newConnection();
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
        channel = connection.createChannel();

        String replyQueueName = channel.queueDeclare().getQueue();
        AMQP.BasicProperties props = new AMQP.BasicProperties
                .Builder()
                .correlationId(corrId)
                .replyTo(replyQueueName)
                .build();

        channel.basicPublish("", requestQueueName, props, message.getBytes("UTF-8"));

        final BlockingQueue<String> response = new ArrayBlockingQueue<>(1);

        String ctag = channel.basicConsume(replyQueueName, true, (consumerTag, delivery) -> {
            if (delivery.getProperties().getCorrelationId().equals(corrId)) {
                response.offer(new String(delivery.getBody(), "UTF-8"));
                //System.out.println(new String(delivery.getBody()));
                String responseMessage = new String(delivery.getBody());

                flights = gson.fromJson(responseMessage, new TypeToken<List<InterpolFlightTicket>>(){}.getType());

            }
        }, consumerTag -> {
        });

        String result = null;
        try {
            result = response.take();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        channel.basicCancel(ctag);
        return flights;
    }

    public void close() throws IOException {
        connection.close();
    }




    /*public String searchPerson(SearchModel personToFind) throws IOException {

        String foundPerson = null;

        URL url = new URL("http://localhost:8081/booking/interpolrequest"); // TODO: call naar boeking
                                                                            // microservice

        String body = gson.toJson(personToFind);

        URLConnection conn = url.openConnection();
        conn.setDoOutput(true);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Content-Length", Integer.toString(body.length()));

        try (DataOutputStream dos = new DataOutputStream(conn.getOutputStream())) {
            dos.writeBytes(body);
        }

        try (BufferedReader bf = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
            String line;
            while ((line = bf.readLine()) != null) {
                System.out.println(line);
                foundPerson = line;
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return foundPerson;
    }*/

    /*public boolean createWarrant(SearchModel personToFind) {

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
    }*/

}
