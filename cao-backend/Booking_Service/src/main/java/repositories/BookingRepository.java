package repositories;

import models.BookTicket;
import models.ReturnTicket;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class BookingRepository {

    public ReturnTicket bookTicket(BookTicket bookTicket, int userId) {
        //TODO: persist to database
        return new ReturnTicket(true, 1, bookTicket.getFlightId());
    }
}
