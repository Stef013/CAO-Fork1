import React from 'react';
import BookingPassengers from '../Components/CreateBookingPassengers'
import BookingSeatpicker from '../Components/CreateBookingSeatpicker'
import BookingOverview from '../Components/CreateBookingOverview'
import Error from './Error'
import Booking from '../models/Booking';
import CarRentalReservationModel from '../models/CarRentalReservationModel';
import axios from 'axios'
import i18n from '../Components/i18n'

class CreateBookingMain extends React.Component {
    constructor() {
        super()
        this.state = {
            currentPage: 1,
            booking: new Booking(),
            carRentalReservation: new CarRentalReservationModel(),
            currentPassengers: 1
        };
    }

    setPassengers = (newPassengers) => {
        this.setState({currentPassengers: newPassengers});
    }

    previousPage = () => {
        this.setState({ currentPage: this.state.currentPage - 1 })
    }

    storePassengerData = (data) => {
        var newBooking = this.state.booking;

        newBooking.contactEmail = data.contactEmail;
        newBooking.contactPhonenumber = data.contactPhonenumber;
        newBooking.emergencyEmail = data.emergencyEmail;
        newBooking.emergencyPhonenumber = data.emergencyPhonenumber;
        newBooking.tickets = data.tickets;

        console.log(data);
        this.setState({ booking: newBooking });

        var invalidBookingData = !(this.state.booking.contactEmail || this.state.booking.contactPhonenumber || this.state.booking.emergencyEmail || this.state.booking.emergencyPhonenumber || this.state.booking.tickets.length)
        var invalidTicketData;
        this.state.booking.tickets.forEach(ticket => {
            invalidTicketData = !(ticket.firstname);
            invalidTicketData = !(ticket.lastname);
            invalidTicketData = !(ticket.gender);
            invalidTicketData = !(ticket.dateOfBirth);
            invalidTicketData = !(ticket.extraLuggage);
        });

        if (invalidBookingData || invalidTicketData) {
            alert(i18n.t('bookingmain.fields empty error'));
        } else {
            console.log(this.state.booking);
            this.setState({ currentPage: this.state.currentPage + 1 })
        }
    }

    placeBooking = () => {
        var carRentalId;
        //Send data to CarRental API with ID response expected

        var newBooking = this.state.booking;
        newBooking.checkedIn = false;
        newBooking.tickets.forEach(ticket => {
            ticket.seat = "A1";
            ticket.price = 110;
            ticket.flightId = 3;
            ticket.rentedCar = false;
            ticket.rentedHotel = false;
        })

        // TODO: use jwt
        console.log(newBooking)


        axios(
            {
                method: 'post',
                url: 'http://localhost:8080/booking/booking',
                data: newBooking
            })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    alert("Booking succesfull!")
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }



    //CarRental
    setCarRentalReservation = (newCarRentalReservation) => {
        this.setState({carRentalReservation: newCarRentalReservation});
    }


    //Page navigation
    selectPage = () => {
        console.log(this)
        switch (this.state.currentPage) {
            case 0:
                return(<p>failed page load</p>)
            case 1:
                return (<BookingPassengers axios={this.props.axios} carRentalReservation={this.state.carRentalReservation} setPassengers={this.setPassengers} setCarRentalReservation={this.setCarRentalReservation} booking={this.state.booking} currentPassengers={this.state.currentPassengers} storePassengerData={this.storePassengerData} previousPage={this.previousPage} />);
            case 2:
                return (<BookingSeatpicker previousPage={this.previousPage} booking={this.state.booking} storePassengerData={this.storePassengerData} />);
            case 3:
                return (<BookingOverview previousPage={this.previousPage} booking={this.state.booking} placeBooking={this.placeBooking} />);
            default:
                return (<Error />);
        }
    }

    render() {
        return this.selectPage();
    }
}

export default CreateBookingMain