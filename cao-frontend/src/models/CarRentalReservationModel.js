function CarRentalReservationModel(carRentalCompany, nameBooker, emailBooker, guestAmount, pickUpDate, dropOffDate) {
    this.carRentalCompany = carRentalCompany;
    this.nameBooker = nameBooker;
    this.emailBooker = emailBooker;
    this.guestAmount = guestAmount;
    this.pickUpDate = pickUpDate;
    this.dropOffDate = dropOffDate;
}

export default CarRentalReservationModel;