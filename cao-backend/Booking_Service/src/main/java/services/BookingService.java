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
            System.out.println("een ticket");
            if (ticket.getExtraLuggage() > 2) {
                System.out.println("groter dan 2");
                return null;
            }
        }

        if (booking.getContactPhonenumber().equals(booking.getEmergencyPhonenumber())) {
            System.out.println("vershil");
            return null;
        }

        if (booking.getUserId() == userId) {
            System.out.println("repo call");
            return bookingRepository.book(booking, userId);
        }

        System.out.println("niks");

        return null;
    }
}
