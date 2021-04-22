import React from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Component } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";

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

    handleBookingClick = (booking) => {
        console.log(booking);
    }

    async componentDidMount() {
        //TODO: fix user id
        axios.get("http://localhost:8080/booking/booking/users/1").then((response) => {

            response.data.forEach(booking => {
                // axios.get("Toekomstige flightCall a.k.a. huppeldepup + flightId").then((response) => {


                var combiFlightBooking = [];
                combiFlightBooking.push("Eindhoven Airport"); //Departure
                combiFlightBooking.push("11:15"); //Departure time
                combiFlightBooking.push("Madrid Airport"); //Destination
                combiFlightBooking.push(booking.tickets.length); //Amount of tickets
                combiFlightBooking.push("€1100"); //Total price
                combiFlightBooking.push(booking);

                var tempBookingList = this.state.bookingList;
                tempBookingList.push(combiFlightBooking);
                this.setState({
                    bookingList: tempBookingList,
                    isLoaded: "true"
                })
                // })
            });
        });
    }


    render() {
        var bookinglist = this.state.bookingList.map((booking) => (
            <TableRow hover onClick={() => this.handleBookingClick(booking)} style={{cursor:"pointer"}}>
                <TableCell>
                    {booking[0]}
                </TableCell>
                <TableCell>
                    {booking[1]}
                </TableCell>
                <TableCell>
                    {booking[2]}
                </TableCell>
                <TableCell>
                    {booking[3]}
                </TableCell>
                <TableCell>
                    {booking[4]}
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