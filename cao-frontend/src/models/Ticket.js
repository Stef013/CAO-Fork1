function Ticket(id, seat, firstname, lastname, gender, dateOfBirth, price, flightId, extraLuggage, rentedCar, rentedHotel) {
    this.id = id;
    this.seat = seat;
    this.firstname = firstname;
    this.lastname = lastname;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.price = price;
    this.flightId = flightId;
    this.extraLuggage = extraLuggage;
    this.rentedCar = rentedCar;
    this.rentedHotel = rentedHotel;
}

export default Ticket;