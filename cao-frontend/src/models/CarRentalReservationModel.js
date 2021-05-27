function CarRentalReservationModel(carRentalCompanyModel, nameBooker, emailBooker, guestAmount, pickUpDate, dropOffDate) {
    this.carRentalCompanyModel = carRentalCompanyModel;
    this.nameBooker = nameBooker;
    this.emailBooker = emailBooker;
    this.guestAmount = guestAmount;
    this.pickUpDate = pickUpDate;
    this.dropOffDate = dropOffDate;
}

export default CarRentalReservationModel;