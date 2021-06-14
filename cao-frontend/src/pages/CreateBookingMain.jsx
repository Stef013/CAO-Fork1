import React from 'react';
import BookingPassengers from '../Components/CreateBookingPassengers'
import BookingSeatpicker from '../Components/CreateBookingSeatpicker'
import BookingOverview from '../Components/CreateBookingOverview'
import Error from './Error'
import Booking from '../models/Booking';
import CarRentalReservationModel from '../models/CarRentalReservationModel';
import HotelReservation from '../models/HotelReservation';
import i18n from '../Components/i18n'
import { withRouter } from 'react-router-dom';


class CreateBookingMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            booking: new Booking(),
            carRentalReservation: new CarRentalReservationModel(),
            hotelReservation: new HotelReservation(),
            carRentalReservationId: 0,
            hotelReservationId: 0,
            currentPassengers: 1
        };
    }
    
    componentDidMount() {
        if (this.props.location.state === undefined) {
            this.props.history.push({pathname: "/flightList"})
        }
    }

    setPassengers = (newPassengers) => {
        this.setState({ currentPassengers: newPassengers });
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
        this.startPlacingBooking(this.state);
    }

    async startPlacingBooking(state) {
        var finalCarRentalReservation = state.carRentalReservation
        finalCarRentalReservation.guestAmount = parseInt(finalCarRentalReservation.guestAmount)
        this.setState({carRentalReservation: finalCarRentalReservation})

        if (this.state.carRentalReservation.nameBooker !== undefined){
            await this.placeCarRentalBooking();
            console.log("Finished car")
        }

        if (this.state.hotelReservation.nameBooker !== undefined){
            await this.placeHotelBooking();
            console.log("Finished hotel")
        }

        await this.placeFinalBooking();
        console.log("Finished booking")
    }

    async placeCarRentalBooking() {
        console.log("processing car")
        await this.props.axios(
            {
                method: 'post',
                url: 'carRental/reserveCarRental',
                data: this.state.carRentalReservation
            }
        ).then((response) => {
            if (response.status === 200) {
                console.log(response)
                console.log(response.data.id)
                this.setState({carRentalReservationId: response.data.id})
            }
            else {
                console.log("First zero auto")
            }
        })
    }

    async placeHotelBooking() {
        console.log("processing hotel")
        await this.props.axios(
            {
                method: 'post',
                url: 'hotels/hotels/reservation',
                data: this.state.hotelReservation
            }
        ).then((response) => {
            if (response.status === 200) {
                console.log(response)
                console.log(response.data.id)
                this.setState({hotelReservationId: response.data.id})
            }
            else {
                console.log("First zero hotel")
            }
        })
    }

    async placeFinalBooking() {
        console.log("processing booking with carID: " + this.state.carRentalReservationId + ", and hotelID: " + this.state.hotelReservationId)
        var newBooking = this.state.booking;
        newBooking.checkedIn = false;
        newBooking.tickets.forEach(ticket => {
            //TODO: UNHARDCODE THE SEAT
            ticket.seat = "A1";
            ticket.price = this.props.location.state.flight.ticket_price;
            ticket.flightId = this.props.location.state.flight.id;
            ticket.rentedCar = this.state.carRentalReservationId;
            ticket.rentedHotel = this.state.hotelReservationId;
        })

        await this.props.axios(
            {
                method: 'post',
                url: 'http://localhost:8080/booking/booking',
                data: newBooking
            })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    alert("Booking succesfull!")
                    window.location.href="/bookingList"
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }

    setCarRentalReservation = (newCarRentalReservation) => {
        this.setState({ carRentalReservation: newCarRentalReservation });
    }

    setHotelReservation = (newHotelReservation) => {
        this.setState({ hotelReservation: newHotelReservation })
    }

    //Page navigation
    selectPage = () => {
        console.log(this)
        switch (this.state.currentPage) {
            case 0:
                return (<p>failed page load</p>)
            case 1:
                return (<BookingPassengers axios={this.props.axios} carRentalReservation={this.state.carRentalReservation} hotelReservation={this.state.hotelReservation} setHotelReservation={this.setHotelReservation} setPassengers={this.setPassengers} setCarRentalReservation={this.setCarRentalReservation} booking={this.state.booking} currentPassengers={this.state.currentPassengers} storePassengerData={this.storePassengerData} previousPage={this.previousPage} />);
            case 2:
                return (<BookingSeatpicker previousPage={this.previousPage} booking={this.state.booking} storePassengerData={this.storePassengerData} />);
            case 3:
                return (<BookingOverview flight={this.props.location.state.flight} previousPage={this.previousPage} booking={this.state.booking} carRentalReservation={this.state.carRentalReservation} hotelReservation={this.state.hotelReservation} placeBooking={this.placeBooking} />);
            default:
                return (<Error />);
        }
    }

    render() {
        return this.selectPage();
    }
}

export default withRouter(CreateBookingMain)