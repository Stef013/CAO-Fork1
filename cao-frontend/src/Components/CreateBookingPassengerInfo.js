import { Box, FormControlLabel, Grid, Radio, TextField, MenuItem, FormControl, InputLabel, Select, FormHelperText, RadioGroup, Typography, Paper } from "@material-ui/core";
import React from "react";
import Booking from '../models/Booking';
import Ticket from '../models/Ticket';
import { useTranslation } from 'react-i18next';



const CreateBookingPassengerInfo = (props) => {
    const { t } = useTranslation();

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
                            label={t('bookingpassengers.email address')}
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
                            label={t('bookingpassengers.phone number')}
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
            <Box p={3} m={0} mb={2} mt={1}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h6">
                            <b>{t('bookingpassengers.passenger')} {props.id}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <b> {t('bookingpassengers.gender')}: * </b>
                    </Grid>
                    <Grid item xs={12}>
                        <RadioGroup aria-label="gender" name="gender1" defaultValue={props.ticket.gender} row>
                            <Grid item xs={6}>
                                <FormControlLabel value="male" onChange={handleTicketChange} name="gender" control={<Radio />} label={t('bookingpassengers.male')} />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel value="female" onChange={handleTicketChange} name="gender" control={<Radio />} label={t('bookingpassengers.female')} />
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
                            label={t('bookingpassengers.first name')}
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
                            label={t('bookingpassengers.last name')}
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
                            label={t('bookingpassengers.date of birth')}
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
                            <InputLabel>{t('bookingpassengers.luggage')}</InputLabel>
                            <Select
                                onChange={handleTicketChange}
                                defaultValue={props.ticket.extraLuggage}
                                name="extraLuggage"
                            >
                                <MenuItem name="extraLuggage" value={0}>0 extra bags + $0</MenuItem>
                                <MenuItem name="extraLuggage" value={1}>1 extra bags + $10</MenuItem>
                                <MenuItem name="extraLuggage" value={2}>2 extra bags + $20</MenuItem>
                            </Select>
                            <FormHelperText>{t('bookingpassengers.luggage description')}</FormHelperText>
                        </FormControl>
                    </Grid>

                    {createMainBookerDataFields()}
                </Grid>
            </Box>
        </Paper>
    );
}

export default CreateBookingPassengerInfo;