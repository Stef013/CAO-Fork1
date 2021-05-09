import React from 'react';
import { Box, Container, Grid, Paper, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
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



export default function BookingOverview(props) {
    const classes = useStyles();
    const history = useHistory();
    const { t } = useTranslation();

    const [bookingFlightCombo, setBookingFlightCombo] = React.useState(props.bookingFlightCombo);

    const calculatePrice = () => {
        //todo: Calculate total price with a loop through each ticket
    }

    const createPassengersOverview = () => {
        var bookingFlightCombo = props.bookingFlightCombo
        console.log(bookingFlightCombo)
        var rows = [];
        props.bookingFlightCombo.booking.tickets.forEach(ticket => {
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
{/* 
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
                    </Grid> */}
                </Grid>
            </div>
        </Container>
    );
}