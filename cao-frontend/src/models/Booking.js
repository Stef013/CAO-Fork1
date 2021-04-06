function Booking(userId, contactEmail, contactPhonenumber, emergencyEmail, emergencyPhonenumber, tickets) {
    this.userId = userId;
    this.contactEmail = contactEmail;
    this.contactPhonenumber = contactPhonenumber;
    this.emergencyEmail = emergencyEmail;
    this.emergencyPhonenumber = emergencyPhonenumber;
    this.tickets = []
}

export default Booking;