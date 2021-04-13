import { Box, Container, FormControlLabel, Grid, Radio, TextField, MenuItem, FormControl, InputLabel, Select, FormHelperText, RadioGroup, Typography, Paper } from "@material-ui/core";
import React, { PureComponent, useEffect } from "react";
import Booking from '../models/Booking';
import Ticket from '../models/Ticket';




const PassengerInfo = (props) => {
    const [luggage, setLuggage] = React.useState(0);
    const [ticket, setTicket] = React.useState(new Ticket());
    const [booking] = React.useState(new Booking());
    const handleLuggageChange = event => {
        setLuggage(event.target.value);
    };

    const handleBookingChange = (e) => {
        props.updateBooking(e);
    }

    const handleTicketChange = (e) => {
        const { value, name } = e.target;
        var newTicket = ticket;
        newTicket.id = props.id;
        newTicket[name] = value;
        setTicket(newTicket);

        props.updateTickets(ticket);
    }

    const createMainBookerDataFields = () => {
        if (props.id === 1) {
            return (
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="low"
                            required
                            fullWidth
                            id="email address"
                            label="Email Address"
                            defaultValue={props.booking.contactEmail}
                            name="contactEmail"
                            onChange={handleBookingChange}
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
                            defaultValue={props.booking.contactPhonenumber}
                            name="contactPhonenumber"
                            onChange={handleBookingChange}
                        />
                    </Grid>
                </Grid>
            )
        }
    };

    return (
        <Paper>
            <Box border={1} p={3} m={0} mb={2} mt={1} borderRadius={16} color="white">
                <Grid container spacing={1} color="white">
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h6">
                            <b>Passenger {props.id}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <b> Gender: * </b>
                    </Grid>
                    <Grid item xs={12}>
                        <RadioGroup aria-label="gender" name="gender1" defaultValue={props.ticket.gender} row>
                            <Grid item xs={6}>
                                <FormControlLabel value="male" onChange={handleTicketChange} name="gender" control={<Radio />} label="Male" />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel value="female" onChange={handleTicketChange} name="gender" control={<Radio />} label="Female" />
                            </Grid>
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="first name"
                            label="First Name"
                            defaultValue={props.ticket.firstname}
                            name="firstname"
                            onChange={handleTicketChange}
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="last name"
                            label="Last Name"
                            defaultValue={props.ticket.lastname}
                            name="lastname"
                            onChange={handleTicketChange}
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            id="date"
                            label="Date of birth"
                            defaultValue={props.ticket.dateOfBirth}
                            type="date"
                            name="dateOfBirth"
                            onChange={handleTicketChange}
                            fullWidth
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl required>
                            <InputLabel>Luggage</InputLabel>
                            <Select
                                onChange={handleTicketChange}
                                defaultValue={props.ticket.extraLuggage}
                                name="extraLuggage"
                            >
                                <MenuItem name="extraLuggage" value={0}>0 extra bags + $0</MenuItem>
                                <MenuItem name="extraLuggage" value={1}>1 extra bags + $10</MenuItem>
                                <MenuItem name="extraLuggage" value={2}>2 extra bags + $20</MenuItem>
                            </Select>
                            <FormHelperText>Please select your amount of luggage</FormHelperText>
                        </FormControl>
                    </Grid>

                    {createMainBookerDataFields()}
                </Grid>
            </Box>
        </Paper>
    );
}

export default PassengerInfo;