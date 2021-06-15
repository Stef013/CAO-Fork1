package services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import models.*;
import repositories.BookingRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.Random;

@ApplicationScoped
public class BookingService {

    @Inject
    BookingRepository bookingRepository;

    ObjectMapper objectMapper = new ObjectMapper();



    public Booking book(Booking booking, int userId) {
        for (Ticket ticket : booking.getTickets()) {
            if (ticket.getExtraLuggage() > 2) {
                return null;
            }
            ticket.setSeat(generateSeatNumber());
        }

        if (booking.getContactPhonenumber().equals(booking.getEmergencyPhonenumber())) {
            return null;
        }

        return bookingRepository.book(booking, userId);
    }

    private String generateSeatNumber() {
        Random rnd = new Random();
        ArrayList<String> seatLetters = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E", "F"));

        int rowNumber = rnd.nextInt(32) + 1;
        int seatNumber = rnd.nextInt(6);

        String seat = rowNumber + seatLetters.get(seatNumber);
        return seat;
    }

    public ArrayList<Booking> getBookingsByUserID(int userId) {
        return bookingRepository.getBookingsByUserID(userId);
    }

    public ArrayList<InterpolFlightTicket> getTicketByUser(String interpolJson) throws JsonProcessingException {
        bookingRepository = new BookingRepository();
        InterpolRequest interpolRequest = objectMapper.readValue(interpolJson, InterpolRequest.class);
        ArrayList<Ticket> tickets = bookingRepository.getTicketByUser(interpolRequest);

        ArrayList<InterpolFlightTicket> interpolFlightTickets = new ArrayList<>();
        for (Ticket ticket : tickets) {
            var flight = new Object();
            try {
                URL url = new URL("http://localhost:5678/flight/" + ticket.getFlightId());
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestProperty("accept", "application/json");
                InputStream responseStream = connection.getInputStream();
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, Object> jsonMap = objectMapper.readValue(responseStream, Map.class);
                flight = jsonMap.get("flight");
            } catch (Exception e) {
                System.out.println(e);
            }
            InterpolFlightTicket interpolFlightTicket = new InterpolFlightTicket(ticket, flight);
            interpolFlightTickets.add(interpolFlightTicket);
        }
        return interpolFlightTickets;
    }

    public boolean checkInBooking(int bookingId) {
        return bookingRepository.checkInBooking(bookingId);
    }

    public ArrayList<Ticket> getTicketsFromFlightId(int flightId) {
        return bookingRepository.getTicketsFromFlightId(flightId);
    }

}
