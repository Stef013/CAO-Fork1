import React from 'react';
import { Box, Container, Grid, Paper, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useTranslation } from 'react-i18next';

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



export default function CreateBookingOverview(props) {
    const classes = useStyles();
    const { t } = useTranslation();

    const [booking] = React.useState(props.booking);
    const [hotelReservation] = React.useState(props.hotelReservation);
    const [carRentalReservation] = React.useState(props.carRentalReservation);

    const nextPage = () => {
        props.placeBooking();
    }

    const calculatePrice = () => {
        //todo: Calculate total price with a loop through each ticket
    }

    const generatePricePerDayHotel = () => {
        switch (hotelReservation.roomType) {
            case 1:
                return hotelReservation.hotel.singleRoomPrice
            case 2:
                return hotelReservation.hotel.doubleRoomPrice
            case 3:
                return hotelReservation.hotel.tripleRoomPrice
            case 4:
                return hotelReservation.hotel.quadrupleRoomPrice
            default:
                return 0;
        }
    }

    const createPassengersOverview = () => {
        var rows = [];
        booking.tickets.forEach(ticket => {
            rows.push(
                <Box p={2} m={0} borderRadius={16}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {t('bookingoverview.first name')}: {ticket.firstname}
                        </Grid>
                        <Grid item xs={6}>
                            {t('bookingoverview.last name')}: {ticket.lastname}
                        </Grid>
                        <Grid item xs={6}>
                            {t('bookingoverview.gender')}: {ticket.gender}
                        </Grid>
                        <Grid item xs={6}>
                            {t('bookingoverview.date of birth')}: {ticket.dateOfBirth}
                        </Grid>
                        <Grid item xs={6}>
                            {t('bookingoverview.extra luggage')}: {ticket.extraLuggage} {t('bookingoverview.pieces')}
                        </Grid>
                        <Grid item xs={6}>
                            {t('bookingoverview.seat')}: {ticket.seat}
                        </Grid>
                    </Grid>
                </Box>
            )
        });

        return <div>{rows}</div>;
    };

    const generateCarRentalOverview = () => {
        if (carRentalReservation.nameBooker !== undefined) {
            return (
                <Grid item xs={12}>
                    <Paper>
                        <Box p={2} m={0}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography component="h3">
                                        <b>Rental Car Information</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    Car Rental Company: {carRentalReservation.carRentalCompanyModel.name || ""}
                                </Grid>
                                <Grid item xs={6}>
                                    Location: {carRentalReservation.carRentalCompanyModel.location || ""}
                                </Grid>
                                <Grid item xs={6}>
                                    Price: ${carRentalReservation.carRentalCompanyModel.price || ""}/day
                                </Grid>
                                <Grid item xs={6}>
                                    Guest amount: {carRentalReservation.guestAmount || ""}
                                </Grid>
                                <Grid item xs={6}>
                                    Start of rental period: {carRentalReservation.pickUpDate || ""}
                                </Grid>
                                <Grid item xs={6}>
                                    End of rental period: {carRentalReservation.dropOffDate || ""}
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>

            )
        } else {
            return (null)
        }
    }

        
    const generateHotelOverview = () => {
        if (hotelReservation.nameBooker !== undefined){
            return(
                <Grid item xs={12}>
                    <Paper>
                        <Box p={2} m={0}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography component="h3">
                                        <b>Hotel Information</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    Hotel: {hotelReservation.hotel.name}
                                </Grid>
                                <Grid item xs={6}>
                                    Location: {hotelReservation.hotel.location}
                                </Grid>
                                <Grid item xs={6}>
                                    Price: ${generatePricePerDayHotel()}/day
                                </Grid>
                                <Grid item xs={6}>
                                    Checkin date: {hotelReservation.checkInDate}
                                </Grid>
                                <Grid item xs={6}>
                                    Checkout date: {hotelReservation.checkOutDate}
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
            )
        } else {
            return (null)
        }
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h3" style={{ color: "white" }}>
                            {t('bookingoverview.booking overview')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <Box p={2} m={0}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Typography component="h3">
                                            <b>{t('bookingoverview.flight overview')}</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography component="h3" align="right">
                                            <b>{t('bookingoverview.total costs')}: ${calculatePrice()}</b>
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={1}>
                                        <FlightTakeoffIcon />
                                    </Grid>
                                    <Grid item xs={5}>
                                        Brussel, Belgium
                                    </Grid>
                                    <Grid item xs={1}>
                                        <FlightLandIcon />
                                    </Grid>
                                    <Grid item xs={5}>
                                        Madrid, Spain
                                    </Grid>
                                    <Grid item xs={1}>
                                        <ChevronRightIcon />
                                    </Grid>
                                    <Grid item xs={5}>
                                        01-05-2021 15:00
                                    </Grid>
                                    <Grid item xs={1}>
                                        <ChevronRightIcon />
                                    </Grid>
                                    <Grid item xs={5}>
                                        01-05-2021 16:00
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper>
                            <Box p={2} m={0}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography component="h3">
                                            <b>{t('bookingoverview.passenger overview')}</b>
                                        </Typography>
                                    </Grid>

                                    {createPassengersOverview()}
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper>
                            <Box p={2} m={0}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography component="h3">
                                            <b>{t('bookingoverview.contact overview')}</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                    {t('bookingoverview.first name')}: {booking.tickets[0].firstname}
                                    </Grid>
                                    <Grid item xs={6}>
                                    {t('bookingoverview.last name')}: {booking.tickets[0].lastname}
                                    </Grid>
                                    <Grid item xs={12}>
                                    {t('bookingoverview.email address')}: {booking.contactEmail}
                                    </Grid>
                                    <Grid item xs={12}>
                                    {t('bookingoverview.phone number')}: {booking.contactPhonenumber}
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>

                    {generateCarRentalOverview()}
                    
                    {generateHotelOverview()}

                    <Grid item xs={12}>
                        <Paper>
                            <Box p={2} m={0}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography component="h3">
                                            <b>{t('bookingoverview.emergency contact person')}</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                    {t('bookingoverview.email address')}: {booking.emergencyEmail}
                                    </Grid>
                                    <Grid item xs={12}>
                                    {t('bookingoverview.phone number')}: {booking.emergencyPhonenumber}
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={props.previousPage}
                        >
                            <ArrowBackIcon />
                            {t('bookingoverview.seatpicker')}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={nextPage}
                        >
                            {t('bookingoverview.payment')}
                            <ArrowForwardIcon />
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}