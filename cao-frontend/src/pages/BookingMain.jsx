import React from 'react';
import BookingPassengers from '../Components/BookingPassengers'
import BookingSeatpicker from '../Components/BookingSeatpicker'
import BookingOverview from '../Components/BookingOverview'
import Error from './Error'
import Booking from '../models/Booking';
import axios from 'axios'
import { Paper } from '@material-ui/core';

class BookingMain extends React.Component {
    constructor() {
        super()
        this.state = {
            currentPage: 1,
            booking: new Booking(),
            currentPassengers: 1
        }
    }

    setPassengers = (newPassengers) => {
        this.state.currentPassengers = newPassengers;
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
        console.log(this.state.booking);
        this.setState({ currentPage: this.state.currentPage + 1 })
    }

    placeBooking = () => {

        var newBooking = this.state.booking; 
        newBooking.tickets.forEach(ticket => {
            ticket.seat = "A1";
            ticket.price = 110;
            ticket.flightId = 1;
            ticket.rentedCar = false;
            ticket.rentedHotel = false;
        })

        // TODO: use jwt token
        console.log(newBooking)

        axios(
            {
                method: 'post',
                url: 'http://localhost:8080/booking/book',
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



    render() {
        switch (this.state.currentPage) {
            case 0:
            //TODO: return to loginpage/mainpage
            case 1:
                return (<BookingPassengers setPassengers={this.setPassengers} booking={this.state.booking} currentPassengers={this.state.currentPassengers} storePassengerData={this.storePassengerData} previousPage={this.previousPage} />);
            case 2:
                return (<BookingSeatpicker previousPage={this.previousPage} booking={this.state.booking} storePassengerData={this.storePassengerData} />);
            case 3:
                return (<BookingOverview previousPage={this.previousPage} booking={this.state.booking} placeBooking={this.placeBooking} />);
            default:
                return (<Error />);
        }
    }
}

export default BookingMain