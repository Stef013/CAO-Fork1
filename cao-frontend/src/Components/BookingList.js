import React from "react";
import { Component } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import BookingOverview from "./BookingOverview";
import { Icon } from '@iconify/react';
import checkIcon from '@iconify-icons/akar-icons/check';
import crossIcon from '@iconify-icons/akar-icons/cross';



class BookingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            bookingList: []
        }
    }

    async componentDidMount() {
        this.props.axios.get("booking/booking/users").then((response) => {

            console.log(response.data)
            if (response.data.length > 0) {
                response.data.forEach(booking => {
                    console.log("flightID:" + booking.tickets[0].flightId);
                    this.props.axios.get("/flight/flight/" + booking.tickets[0].flightId).then((response) => {
                        var flight = response.data.flight;
                        var combiFlightBooking = [];
    
                        combiFlightBooking.push(flight);
                        combiFlightBooking.push(booking);
    
                        var tempBookingList = this.state.bookingList;
                        tempBookingList.push(combiFlightBooking);
    
                        this.setState({
                            bookingList: tempBookingList,
                            isLoaded: true
                        })
    
                        console.log(this.state.bookingList);
                    })
                });
            } 
        });
    }


    render() {
        var checkedInIcon = (bookingFlightCombo) => {
            if (bookingFlightCombo[1].checkedIn) {
                return (<Icon icon={checkIcon} />)
            } else {
                return (<Icon icon={crossIcon} />)
            }
        }
        var bookinglist = this.state.bookingList.map((bookingFlightCombo) => (
            <TableRow
                hover
                key={bookingFlightCombo}
            >

                <TableCell>
                    {bookingFlightCombo[0].origin}
                </TableCell>
                <TableCell>
                    {bookingFlightCombo[0].departure_time.substr(0, 11) + " [" + bookingFlightCombo[0].departure_time.substr(11, 5)+ "] "}
                </TableCell>
                <TableCell>
                    {bookingFlightCombo[0].destination}
                </TableCell>
                <TableCell>
                    {bookingFlightCombo[1].tickets.length}
                </TableCell>
                <TableCell>
                    €{(bookingFlightCombo[1].tickets.length * bookingFlightCombo[0].ticket_price)}
                </TableCell>
                <TableCell>
                    {checkedInIcon(bookingFlightCombo)}
                </TableCell>
                <TableCell>
                    <BookingOverview bookingFlightCombo={bookingFlightCombo} axios={this.props.axios} ></BookingOverview>
                </TableCell>
            </TableRow>
        ))

        // return null
        if (this.state.isLoaded === false) {
            return (
                <Typography component="h1" variant="h3" style={{ color: "white" }}>
                    No bookings could be loaded at this time. <br /> Please try again later.
                </Typography>)
        }

        return (
            <Paper>
                <TableContainer style={{ maxHeight: 1000 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6">
                                        <b>Departure location</b>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">
                                        <b>Departure time</b>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">
                                        <b>Destination</b>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">
                                        <b>Tickets</b>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">
                                        <b>Total price</b>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">
                                        <b>Checked in</b>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">
                                        <b>More info</b>
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookinglist}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        );
    };
}

export default BookingList;