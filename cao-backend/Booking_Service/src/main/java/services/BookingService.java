package services;

import models.*;
import repositories.BookingRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

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

        if (booking.getCustomerPhoneNumber() == booking.getContactPersonPhoneNumber()) {
            return null;
        }

        if (booking.getCustomerId() == userId) {
            return bookingRepository.book(booking, userId);
        }

        return null;
    }
}
