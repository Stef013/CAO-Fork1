function HotelReservation(hotel, nameBooker, emailBooker, roomType, checkInDate, checkOutDate) {
    this.hotel = hotel;
    this.nameBooker = nameBooker;
    this.emailBooker = emailBooker;
    this.roomType = roomType;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
}

export default HotelReservation;