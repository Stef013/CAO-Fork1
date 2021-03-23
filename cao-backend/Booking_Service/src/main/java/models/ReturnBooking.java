package models;

public class ReturnBooking {

    private int bookingId;
    private boolean isSuccess;

    public ReturnBooking(int bookingId, boolean isSuccess) {
        this.bookingId = bookingId;
        this.isSuccess = isSuccess;
    }

    public int getBookingId() {
        return bookingId;
    }

    public boolean isSuccess() {
        return isSuccess;
    }
}
