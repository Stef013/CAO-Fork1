package services;

import models.BookTicket;
import models.ReturnTicket;
import repositories.BookingRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class BookingService {

    @Inject
    BookingRepository bookingRepository;

    public ReturnTicket bookTicket(BookTicket bookTicket, int userId) {
        return bookingRepository.bookTicket(bookTicket, userId);
    }
}
