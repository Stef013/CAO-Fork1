import React from "react";
import { Component, useState } from "react";
import { Redirect } from 'react-router';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@material-ui/core";
import { withRouter } from 'react-router-dom';


class CustomerFlightList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: "false",
            flightList: []
        }
    }

    async componentDidMount() {
        this.props.axios.get("flight/flight").then((response) => {
            console.log(response.data);
            if (response.data.success) {
                this.setState({
                    flightList: response.data.flightList,
                    isLoaded: "true"
                })
            }
        });
    }

    handleFlightUserClickBookNow = (flight) => {
        console.log(flight);

        this.props.history.push({pathname: "/createbooking", state: {flight: flight}})
       

            // <Redirect 
            //     to={{
            //         pathname: "/CreateBooking",
            //         state: { flight: flight }
            //     }}
            // />
    }


    render() {
        var flightList = this.state.flightList.map((flight) => (
            <TableRow
                hover
                key={flight.id}
            >

                <TableCell>
                    {flight.origin}
                </TableCell>
                <TableCell>
                    {flight.departure_time.substr(0, 11) + " [" + flight.departure_time.substr(11, 5)+ "] "}
                </TableCell>
                <TableCell>
                    {flight.destination}
                </TableCell>
                <TableCell>
                    {flight.arrival_time.substr(0, 11) + " [" + flight.arrival_time.substr(11, 5)+ "] "}
                </TableCell>
                <TableCell>
                    ${(flight.ticket_price)}
                </TableCell>
                <TableCell>
                    <Button color="primary" onClick={() => {this.handleFlightUserClickBookNow(flight)}}>
                        <b>Book Now!</b>
                    </Button>
                </TableCell>
            </TableRow>
        ))

        // return null
        if (this.state.isLoaded === "false") {
            return (
                <Typography component="h1" variant="h3" style={{ color: "white" }}>
                    No flights could be loaded at this time. <br /> Please try again later.
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
                                        <b>Destination time</b>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">
                                        <b>Price per ticket</b>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">
                                        <b>Book Flight</b>
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {flightList}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        );
    };
}

export default withRouter(CustomerFlightList);