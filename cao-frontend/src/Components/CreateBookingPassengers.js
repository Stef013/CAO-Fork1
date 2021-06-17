import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Box, FormControl, Grid, Input, InputLabel, MenuItem, Paper, Select, Slider, Switch } from '@material-ui/core';
import PassengerInfo from './CreateBookingPassengerInfo';
import Ticket from '../models/Ticket';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

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


const CreateBookingPassengers = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const [value, setValue] = React.useState(props.currentPassengers);
    const [booking, setBooking] = React.useState(props.booking);

    // Car
    const [carRentalChecked, setCarRentalChecked] = React.useState(false);
    const [selectedCarRentalCompany, setSelectedCarRentalCompany] = React.useState(props.carRentalReservation.carRentalCompanyModel);
    const [carRentalCompanyList, setCarRentalCompanyList] = React.useState([]);
    const [carRentalReservation, setCarRentalReservation] = React.useState(props.carRentalReservation);

    // Hotel
    const [hotelChecked, setHotelChecked] = React.useState(false);
    const [selectedHotel, setSelectedHotel] = React.useState(props.hotelReservation.hotel);
    const [hotelList, setHotelList] = React.useState([]);
    const [hotelReservation, setHotelReservation] = React.useState(props.hotelReservation);

    useEffect(() => {
        if (carRentalCompanyList.length === 0) {
            props.axios.get("carRental/carRentalCompany").then((response) => {
                if (response.status === 200) {
                    setCarRentalCompanyList(response.data);
                }
                else {
                    alert(response.status)
                }
            })
        }

        if (carRentalCompanyList.length === 0) {
            props.axios.get("hotels/hotels").then((response) => {
                if (response.status === 200) {
                    setHotelList(response.data);
                }
                else {
                    alert(response.status)
                }
            })
        }
    });


    const handleSliderChange = (event, newValue) => {
        if (value > newValue) {
            var deleteValue = value - newValue;
            removeLastPassenger(deleteValue);
        }
        else if (value < newValue) {
            var addValue = newValue - value;
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
        setValue(event.target.value);

    };

    const handleBlur = () => {
        if (value < 1) {
            setValue(1);
        } else if (value > 25) {
            setValue(25);
        }
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
            var newTicket = new Ticket()
            newTicket.id = newBooking.tickets.length + 1;
            newBooking.tickets.push(newTicket);
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
        let ticket = newBooking.tickets.find(ticket => ticket.id === newTicket.id);

        if (ticket !== undefined) {
            newBooking.tickets.splice(newTicket.id - 1, 1, newTicket);
            setBooking(newBooking);
        }
        else {
            alert("No ticket found")
        }
    }

    const sendPassengerData = () => {
        props.setPassengers(value);
        props.storePassengerData(booking);
        if (carRentalChecked) {
            fillCarRentalBooking();
            props.setCarRentalReservation(carRentalReservation);
        }
        if (hotelChecked) {
            fillHotelBooking();
            props.setHotelReservation(hotelReservation);
        }
    }

    const fillCarRentalBooking = () => {
        var newCarRentalReservation = carRentalReservation;
        newCarRentalReservation.nameBooker = booking.tickets[0].firstname + " " + booking.tickets[0].lastname;
        newCarRentalReservation.emailBooker = booking.contactEmail;
    }

    const fillHotelBooking = () => {
        var newHotelReservation = hotelReservation;
        newHotelReservation.nameBooker = booking.tickets[0].firstname + " " + booking.tickets[0].lastname;
        newHotelReservation.emailBooker = booking.contactEmail;
    }

    //Car methods
    const toggleCarChecked = () => {
        setCarRentalChecked((prev) => !prev);
    };

    const handleCarRentalCompanyChange = (event) => {
        setSelectedCarRentalCompany(event.target.value);
        carRentalReservation.carRentalCompanyModel = event.target.value;
    };

    const generateDropDownCarRental = () => {
        console.log("CAR STATE UPDATED")
        if (carRentalCompanyList.length > 0) {
            var rows = [];
            carRentalCompanyList.forEach(carRentalCompany => {
                rows.push(<MenuItem value={carRentalCompany}>{carRentalCompany.name + " || " + carRentalCompany.location + " || $" + carRentalCompany.price + "/day"}</MenuItem>)
            });
            return rows;
        }
    }

    const updateCarRentalReservation = (data) => {
        const { value, name } = data.target;
        var newCarRentalReservation = carRentalReservation;
        newCarRentalReservation[name] = value;
        setCarRentalReservation(newCarRentalReservation);
    }

    //Hotel methods
    const toggleHotelChecked = () => {
        setHotelChecked((prev) => !prev);
    };

    const handleHotelChange = (event) => {
        const newHotelReservation = hotelReservation
        newHotelReservation.hotel = event.target.value
        setHotelReservation(newHotelReservation)
        setSelectedHotel(event.target.value)
    }

    const handleHotelRoomChange = (event) => {
        var newHotelReservation = hotelReservation
        hotelReservation.roomType = event.target.value
        setHotelReservation(newHotelReservation)
    }

    const generateHotels = () => {
        if (hotelList.length > 0) {
            var rows = [];
            hotelList.forEach(hotel => {
                rows.push(<MenuItem value={hotel}>{hotel.name + " || " + hotel.stars + "✩ || " + hotel.location}</MenuItem>)
            });
            return rows;
        }
    }

    const generateHotelRooms = () => {
        console.log("helloerferf")
        if (hotelReservation.hotel !== undefined) {
            var rows = [];
            rows.push(<MenuItem value={1}>Single Room || ${hotelReservation.hotel.soloRoomPrice}/day</MenuItem>)
            rows.push(<MenuItem value={2}>Double Room || ${hotelReservation.hotel.doubleRoomPrice}/day</MenuItem>)
            rows.push(<MenuItem value={3}>Triple Room || ${hotelReservation.hotel.tripleRoomPrice}/day</MenuItem>)
            rows.push(<MenuItem value={4}>Quadruple Room || ${hotelReservation.hotel.quadrupleRoomPrice}/day</MenuItem>)
            return rows;
        }
    }

    const updateHotelReservation = (data) => {
        const { value, name } = data.target;
        var newHotelReservation = hotelReservation;
        newHotelReservation[name] = value;
        setHotelReservation(newHotelReservation);
    }

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "0.01",
                    },
                },
            ],
        });
    };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h3" style={{ color: "white" }}>
                            {t('bookingpassengers.passenger information')}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography component="h3" style={{ color: "white" }}>
                            {t('bookingpassengers.number of passengers')}:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Slider
                            style={{ color: "white" }}
                            value={value}
                            onChange={handleSliderChange}
                            min={1}
                            max={25}
                            step={1}
                            marks
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Input
                            style={{ color: "white" }}
                            className={classes.input}
                            value={value}
                            margin="dense"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
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
                    <Paper>
                        <Box p={2} m={0} mb={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={10}>
                                    <Typography component="h1" variant="h6">
                                        <b>Huurauto boeking</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Switch
                                        checked={carRentalChecked}
                                        onChange={toggleCarChecked}
                                        color="primary"
                                        name="checkedA"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                                        <InputLabel>Car Selection</InputLabel>
                                        <Select
                                            disabled={(!carRentalChecked)}
                                            label="Car Selection"
                                            value={carRentalReservation.carRentalCompanyModel}
                                            onChange={handleCarRentalCompanyChange}
                                        >
                                            {generateDropDownCarRental()}
                                        </Select>
                                    </FormControl>
                                </Grid>


                                <Grid item xs={12}>
                                    <TextField
                                        disabled={(!carRentalChecked)}
                                        variant="outlined"
                                        margin="low"
                                        fullWidth
                                        type="number"
                                        label="Car Rental Guest Amount"
                                        defaultValue={carRentalReservation.guestAmount}
                                        name="guestAmount"
                                        onChange={updateCarRentalReservation}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled={(!carRentalChecked)}
                                        variant="outlined"
                                        margin="low"
                                        fullWidth
                                        type="date"
                                        label="Pick Up Date"
                                        defaultValue={carRentalReservation.pickUpDate}
                                        name="pickUpDate"
                                        onChange={updateCarRentalReservation}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled={(!carRentalChecked)}
                                        variant="outlined"
                                        margin="low"
                                        fullWidth
                                        type="date"
                                        label="Drop Off Date"
                                        defaultValue={carRentalReservation.dropOffDate}
                                        name="dropOffDate"
                                        onChange={updateCarRentalReservation}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper>
                        <Box p={2} m={0} mb={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={10}>
                                    <Typography component="h1" variant="h6">
                                        <b>Extra hotel boeking</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Switch
                                        checked={hotelChecked}
                                        onChange={toggleHotelChecked}
                                        color="primary"
                                        name="checkedA"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                                        <InputLabel>Hotel Selection</InputLabel>
                                        <Select
                                            disabled={(!hotelChecked)}
                                            label="Hotel Selection"
                                            value={hotelReservation.hotel}
                                            onChange={handleHotelChange}
                                        >
                                            {generateHotels()}
                                        </Select>
                                    </FormControl>
                                </Grid>


                                <Grid item xs={12}>
                                    <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                                        <InputLabel>Hotel Room</InputLabel>
                                        <Select
                                            disabled={(!hotelChecked) || selectedHotel === undefined}
                                            label="Hotel Selection"
                                            value={hotelReservation.roomType}
                                            onChange={handleHotelRoomChange}
                                        >
                                            {generateHotelRooms()}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled={(!hotelChecked)}
                                        variant="outlined"
                                        margin="low"
                                        fullWidth
                                        type="date"
                                        label="Check In Date"
                                        defaultValue={carRentalReservation.pickUpDate}
                                        name="checkInDate"
                                        onChange={updateHotelReservation}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled={(!hotelChecked)}
                                        variant="outlined"
                                        margin="low"
                                        fullWidth
                                        type="date"
                                        label="Check Out Date"
                                        defaultValue={carRentalReservation.dropOffDate}
                                        name="checkOutDate"
                                        onChange={updateHotelReservation}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper>
                        <Box p={2} m={0} mb={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography component="h1" variant="h6">
                                        <b>{t('bookingpassengers.emergency contact person')}</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="low"
                                        required
                                        fullWidth
                                        id="emergency email address"
                                        label={t('bookingpassengers.email address')}
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
                                        id="emergency phone number"
                                        label={t('bookingpassengers.phone number')}
                                        defaultValue={booking.emergencyPhonenumber}
                                        name="emergencyPhonenumber"
                                        onChange={updateBooking}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>

                <Grid container spacing={2} >
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        // onClick={props.previousPage}
                        >
                            <ArrowBackIcon />
                            {t('bookingpassengers.flight menu')}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={sendPassengerData}
                        >
                            {t('bookingpassengers.booking overview')}    
                            <ArrowForwardIcon />
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}

export default CreateBookingPassengers;