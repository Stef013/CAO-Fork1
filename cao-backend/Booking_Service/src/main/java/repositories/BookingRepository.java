package repositories;

import models.ReturnBooking;
import models.Booking;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class BookingRepository {

    public ReturnBooking book(Booking booking, int userId) {
        //TODO: persist to database
        return new ReturnBooking(1, true);
    }
}
