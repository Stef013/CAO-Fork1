function Booking(userId, contactEmail, contactPhonenumber, emergencyEmail, emergencyPhonenumber, tickets, checkedIn) {
    this.userId = userId;
    this.contactEmail = contactEmail;
    this.contactPhonenumber = contactPhonenumber;
    this.emergencyEmail = emergencyEmail;
    this.emergencyPhonenumber = emergencyPhonenumber;
    this.tickets = [];
    this.checkedIn = checkedIn;
}

export default Booking;