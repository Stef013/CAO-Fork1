import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Box, Grid, Input, MenuItem, Slider } from '@material-ui/core';
import PassengerInfo from './BookingPassengerInfo'
import Ticket from '../models/Ticket';

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


export default function BookingPassengers(props) {
    const classes = useStyles();
    const history = useHistory();

    const [value, setValue] = React.useState(props.currentPassengers);
    const [booking, setBooking] = React.useState(props.booking);

    const handleSliderChange = (event, newValue) => {
        if (value > newValue) {
            var deleteValue = value - newValue;
            removeLastPassenger(deleteValue);
        }
        else if (value < event.target.value) {
            var addValue = event.target.value - value;
            addNewTickets(addValue)
        }
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        if (value > event.target.value) {
            var deleteValue = value - event.target.value;
            removeLastPassenger(deleteValue);
        }
        else if (value < event.target.value) {
            var addValue = event.target.value - value;
            addNewTickets(addValue)
        }
        setValue(event.target.value === '' ? '' : Number(event.target.value));

    };

    const removeLastPassenger = (deleteValue) => {
        var newBooking = booking;
        for (var i = 1; i <= deleteValue; i++) {
            newBooking.tickets.splice(-1, deleteValue);
        }
        setBooking(newBooking);
    }

    const addNewTickets = (newValue) => {
        var newBooking = booking;
        for (var i = 1; i <= newValue; i++) {
            newBooking.tickets.push(new Ticket());
        }
        setBooking(newBooking);
    }

    const createDataFieldsForEachPerson = () => {
        if (booking.tickets.length === 0) {
            var newBooking = booking;
            var newTicket = new Ticket();
            newTicket.id = 1;
            newBooking.tickets.push(newTicket);
            setBooking(newBooking);
        }

        var rows = [];
        for (var i = 1; i <= value; i++) {
            rows.push(<PassengerInfo id={i} booking={booking} ticket={booking.tickets[i - 1]} updateBooking={updateBooking} updateTickets={updateTickets} />)
        }
        return <div>{rows}</div>;
    };

    const updateBooking = (data) => {
        const { value, name } = data.target;
        var newBooking = booking;
        newBooking[name] = value;
        setBooking(newBooking);
    }

    const updateTickets = (newTicket) => {
        var newBooking = booking;
        let ticket = newBooking.tickets.find(ticket => ticket.id == newTicket.id);

        if (ticket != undefined) {
            newBooking.tickets.splice(newTicket.id - 1, 1, newTicket);
            setBooking(newBooking);
        }
        else {
            alert("No ticket found")
        }
    }

    const sendPassengerData = () => {
        console.log("DATA SEND")
        props.setPassengers(value);
        props.storePassengerData(booking);
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h3">
                            Passengers information
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography component="h3">
                            Number of passengers:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Slider
                            value={typeof value === 'number' ? value : 0}
                            onChange={handleSliderChange}
                            min={1}
                            max={25}
                            step={1}
                            marks
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Input
                            className={classes.input}
                            value={value}
                            margin="dense"
                            onChange={handleInputChange}
                            inputProps={{
                                step: 1,
                                min: 1,
                                max: 25,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    {createDataFieldsForEachPerson()}
                </Grid>

                <Grid item xs={12}>
                    <Box border={1} p={2} m={0} mb={2} borderRadius={16}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography component="h1" variant="h6">
                                    <b>Emergency Contact Person</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="low"
                                    required
                                    fullWidth
                                    id="email address"
                                    label="Email Address"
                                    defaultValue={booking.emergencyEmail}
                                    name="emergencyEmail"
                                    onChange={updateBooking}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="low"
                                    required
                                    fullWidth
                                    id="phone number"
                                    label="Phone Number"
                                    defaultValue={booking.emergencyPhonenumber}
                                    name="emergencyPhonenumber"
                                    onChange={updateBooking}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid container spacing={2} >
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={props.previousPage}
                        >
                            <ArrowBackIcon />
                            Flight menu
                    </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={sendPassengerData}
                        >
                            Seatpicker
                            <ArrowForwardIcon />
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}