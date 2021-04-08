import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BookingPassengers from '../Components/BookingPassengers'
import BookingSeatpicker from '../Components/BookingSeatpicker'
import BookingOverview from '../Components/BookingOverview'
import Error from './Error'
import { Route, Switch } from 'react-router';
import { Button, TextField } from '@material-ui/core';
import Booking from '../models/Booking';
import Ticket from '../models/Ticket';

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
        this.setState({currentPage: this.state.currentPage - 1})
    }

    storePassengerData = (data) => {
        var newBooking = this.state.booking;
        
        newBooking.contactEmail = data.contactEmail;
        newBooking.contactPhonenumber = data.contactPhonenumber;
        newBooking.emergencyEmail = data.emergencyEmail;
        newBooking.emergencyPhonenumber = data.emergencyPhonenumber;
        newBooking.tickets = data.tickets;

        console.log(data);
        this.setState({booking: newBooking});
        console.log(this.state.booking);
        this.setState({currentPage: this.state.currentPage + 1})
    }



    render() {
        switch (this.state.currentPage) {
            case 1:
                return (<BookingPassengers setPassengers={this.setPassengers} booking={this.state.booking} currentPassengers={this.state.currentPassengers} storePassengerData={this.storePassengerData} previousPage={this.previousPage} />);
            case 2:
                return (<BookingSeatpicker previousPage={this.previousPage} />);
            case 3:
                return (<BookingOverview previousPage={this.previousPage} />);
            default:
                return (<Error />);
        }
    }
}

export default BookingMain