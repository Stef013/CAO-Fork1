package services;

import models.*;
import repositories.BookingRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

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

        if (booking.getUserId() == userId) {
            return bookingRepository.book(booking, userId);
        }

        return null;
    }
}
