import React from "react";
import axios from "axios";
import { Component } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import BookingOverview from "./BookingOverview"

const columns = [
    { label: "Departure location" },
    { label: "Departure time" },
    { label: "Destination" },
    { label: "Amound of tickets" },
    { label: "Total price" },
];

class BookingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: "false",
            bookingList: []
        }
    }

    async componentDidMount() {
        //TODO: fix user id
        axios.get("http://localhost:8080/booking/booking/users/1").then((response) => {

            response.data.forEach(booking => {
                console.log("flightID:" + booking.tickets[0].flightId);
                axios.get("http://localhost:5678/flight/" + booking.tickets[0].flightId).then((response) => {
                    var flight = response.data.flight;
                    console.log(flight);
                    var combiFlightBooking = [];

                    combiFlightBooking.push(flight);
                    combiFlightBooking.push(booking);

                    var tempBookingList = this.state.bookingList;
                    tempBookingList.push(combiFlightBooking);

                    this.setState({
                        bookingList: tempBookingList,
                        isLoaded: "true"
                    })
                    console.log(this.state.bookingList)
                })
            });
        });
    }


    render() {
        var bookinglist = this.state.bookingList.map((bookingFlightCombo) => (
            <TableRow
                hover
                key={bookingFlightCombo}
            >

                <TableCell>
                    {bookingFlightCombo[0].origin}
                </TableCell>
                <TableCell>
                    {bookingFlightCombo[0].departure_time.substr(0, 11) + " -> " + bookingFlightCombo[0].departure_time.substr(11, 5)}
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
                    <BookingOverview bookingFlightCombo={bookingFlightCombo}></BookingOverview>
                </TableCell>
            </TableRow>
        ))

        // return null
        if (this.state.isLoaded === "false") {
            return (
                <Typography component="h1" variant="h3" style={{ color: "white" }}>
                    No bookings could be loaded at this time. <br /> Please try again later.
                </Typography>)
        }

        return (
            <Paper>
                <TableContainer style={{ maxHeight: 600 }}>
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