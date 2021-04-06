import { Box, Container, FormControlLabel, Grid, Radio, TextField, MenuItem, FormControl, InputLabel, Select, FormHelperText, RadioGroup, Typography } from "@material-ui/core";
import React, { PureComponent } from "react";
import Booking from '../models/Booking';
import Ticket from '../models/Ticket';



const PassengerInfo = (props) => {
    const [luggage, setLuggage] = React.useState(0);
    const handleLuggageChange = event => {
        setLuggage(event.target.value);
    };

    const handleBookingChange = (e) => {
        props.updateBooking(e);
    }

    const handleTicketChange = (e) => {
        props.updateTickets(e, props.id);
    }

    const createMainBookerDataFields = () => {
        if (props.id === 0) {
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
                            name="contactPhonenumber"
                            onChange={handleBookingChange}
                        />
                    </Grid>
                </Grid>
            )
        }
    };

    return (
        <Box border={1} p={3} m={0} mb={2} mt={1} borderRadius={16}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h6">
                        <b>Passenger {props.id}</b>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <b> Gender: * </b>
                </Grid>
                <Grid item xs={12}>
                    <RadioGroup aria-label="gender" name="gender1" row>
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
    );
}

export default PassengerInfo;