package models;

import java.util.Date;

public class ReturnTicket {
    private boolean isSuccess;
    private int ticketId;
    private int userId;
    private Date date;

    public ReturnTicket(boolean isSuccess, int ticketId, int userId) {
        this.isSuccess = isSuccess;
        this.ticketId = ticketId;
        this.userId = userId;
        this.date = new Date();
    }

    public boolean isSuccess() {
        return isSuccess;
    }

    public int getTicketId() {
        return ticketId;
    }

    public int getUserId() {
        return userId;
    }

    public Date getDate() {
        return date;
    }
}
