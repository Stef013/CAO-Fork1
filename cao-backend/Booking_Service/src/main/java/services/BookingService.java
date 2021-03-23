package services;

import models.*;
import repositories.BookingRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class BookingService {

    @Inject
    BookingRepository bookingRepository;

    public ReturnBooking book(Booking booking, int userId) {
        if (booking.getCustomerId() == userId) {
            return bookingRepository.book(booking, userId);
        }
        return new ReturnBooking(0, false);
    }
}
