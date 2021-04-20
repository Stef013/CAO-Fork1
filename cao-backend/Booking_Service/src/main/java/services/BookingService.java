package services;

import models.*;
import repositories.BookingRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;

@ApplicationScoped
public class BookingService {

    @Inject
    BookingRepository bookingRepository;

    public Booking book(Booking booking, int userId) {
        for (Ticket ticket : booking.getTickets()) {
            if (ticket.getExtraLuggage() > 2) {
                return null;
            }
        }

        if (booking.getContactPhonenumber().equals(booking.getEmergencyPhonenumber())) {
            return null;
        }

        return bookingRepository.book(booking, userId);
    }

    public ArrayList<Booking> getBookingsByUserID(int userId) {
        return bookingRepository.getBookingsByUserID(userId);
    }
}
