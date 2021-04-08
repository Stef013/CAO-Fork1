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

    const createPassengersOverview = () => {
        var rows = [];
        for (var i = 1; i < 3 + 1; i++) {
            rows.push(
                <Box p={2} m={0} borderRadius={16}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            First name passenger {i}
                        </Grid>
                        <Grid item xs={6}>
                            Last name passenger {i}
                        </Grid>
                        <Grid item xs={6}>
                            Gender
                        </Grid>
                        <Grid item xs={6}>
                            Date of birth
                        </Grid>
                        <Grid item xs={6}>
                            2x Luggage $20
                        </Grid>
                        <Grid item xs={6}>
                            Seat F4
                        </Grid>
                    </Grid>
                </Box>
            )
        }

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
                                        <b>Total costs: $price</b>
                                    </Typography>
                                </Grid>

                                <Grid item xs={1}>
                                    <FlightTakeoffIcon />
                                </Grid>
                                <Grid item xs={5}>
                                    Departure location
                            </Grid>
                                <Grid item xs={1}>
                                    <FlightLandIcon />
                                </Grid>
                                <Grid item xs={5}>
                                    Arrival location
                            </Grid>
                                <Grid item xs={1}>
                                    <ChevronRightIcon />
                                </Grid>
                                <Grid item xs={5}>
                                    Departure date and time
                            </Grid>
                                <Grid item xs={1}>
                                    <ChevronRightIcon />
                                </Grid>
                                <Grid item xs={5}>
                                    Arrival date and time
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
                                    First Name (passenger 1)
                                </Grid>
                                <Grid item xs={6}>
                                    Last Name (passenger 1)
                                </Grid>
                                <Grid item xs={12}>
                                    Email Address (passenger 1)
                                </Grid>
                                <Grid item xs={12}>
                                    Phone Number (passenger 1)
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
                                    Email Address
                                </Grid>
                                <Grid item xs={12}>
                                    Phone Number
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
                            onClick={props.nextPage}
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