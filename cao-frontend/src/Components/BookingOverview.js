import React from 'react';
import { Box, Container, Grid, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme) => ({

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function BookingOverview(props) {
    const classes = useStyles();
    const history = useHistory();

    const [booking, setBooking] = React.useState(props.booking);

    const nextPage = () => {
        props.placeBooking();
    }

    const calculatePrice = () => {
        //todo: Calculate total price with a loop through each ticket
    }

    const createPassengersOverview = () => {
        var rows = [];
        booking.tickets.forEach(ticket => {
            rows.push(
                <Box p={2} m={0} borderRadius={16}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            Firstname: {ticket.firstname}
                        </Grid>
                        <Grid item xs={6}>
                            Lastname: {ticket.lastname}
                        </Grid>
                        <Grid item xs={6}>
                            Gender: {ticket.gender}
                        </Grid>
                        <Grid item xs={6}>
                            Date of Birth: {ticket.dateOfBirth}
                        </Grid>
                        <Grid item xs={6}>
                            Extra Luggage: {ticket.extraLuggage} stuks
                        </Grid>
                        <Grid item xs={6}>
                            Seat: {ticket.seat}
                        </Grid>
                    </Grid>
                </Box>
            )
        });

        return <div>{rows}</div>;
    };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h3">
                            Booking overview
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box border={1} p={2} m={0} borderRadius={16}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Typography component="h3">
                                        <b>Flight overview</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography component="h3" align="right">
                                        <b>Total costs: ${calculatePrice()}</b>
                                    </Typography>
                                </Grid>

                                <Grid item xs={1}>
                                    <FlightTakeoffIcon />
                                </Grid>
                                <Grid item xs={5}>
                                    PH-Departure location
                            </Grid>
                                <Grid item xs={1}>
                                    <FlightLandIcon />
                                </Grid>
                                <Grid item xs={5}>
                                    PH-Arrival location
                            </Grid>
                                <Grid item xs={1}>
                                    <ChevronRightIcon />
                                </Grid>
                                <Grid item xs={5}>
                                    PH-Departure date and time
                            </Grid>
                                <Grid item xs={1}>
                                    <ChevronRightIcon />
                                </Grid>
                                <Grid item xs={5}>
                                    PH-Arrival date and time
                            </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box border={1} p={2} m={0} borderRadius={16}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography component="h3">
                                        <b>Passenger overview</b>
                                    </Typography>
                                </Grid>

                                {createPassengersOverview()}
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box border={1} p={2} m={0} borderRadius={16}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography component="h3">
                                        <b>Contact overview</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    First name: {booking.tickets[0].firstname}
                                </Grid>
                                <Grid item xs={6}>
                                    Last name: {booking.tickets[0].lastname}
                                </Grid>
                                <Grid item xs={12}>
                                    Email Address: {booking.contactEmail}
                                </Grid>
                                <Grid item xs={12}>
                                    Phone Number: {booking.contactPhonenumber}
                            </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box border={1} p={2} m={0} borderRadius={16}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography component="h3">
                                        <b>Emergency Contact overview</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    Email Address: {booking.emergencyEmail}
                                </Grid>
                                <Grid item xs={12}>
                                    Phone Number: {booking.emergencyPhonenumber}
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={props.previousPage}
                        >
                            <ArrowBackIcon />
                            Seatpicker
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={nextPage}
                        >
                            Payment
                            <ArrowForwardIcon />
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}