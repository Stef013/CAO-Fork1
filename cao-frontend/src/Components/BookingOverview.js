import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Icon } from '@iconify/react';
import baselineFlight from '@iconify-icons/ic/baseline-flight';
import { useTranslation } from 'react-i18next';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const [carRentalReservation, setCarRentalReservation] = React.useState("");
  const [hotelReservation, setHotelReservation] = React.useState("");

  const handleClickOpen = () => {
    props.axios.get("carRental/carRentalReservation/" + props.bookingFlightCombo[1].tickets[0].rentedCar).then((response) => {
        if (response.status === 200) {
            setCarRentalReservation(response.data);
        }
        else {
            console.log(response.status)
        }
    })
    props.axios.get("hotels/hotels/reservation/" + props.bookingFlightCombo[1].tickets[0].rentedHotel).then((response) => {
        if (response.status === 200) {
            setHotelReservation(response.data);
        }
        else {
            console.log(response.status)
        }
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckIn = () => {

    props.axios.put("booking/booking/checkin/" + props.bookingFlightCombo[1].bookingId).then((response) => {
      if (response.status === 200) {
        window.location.reload();
      }
      else {
        alert(response.status)
      }
    })
  };  

  const generatePricePerDayHotel = () => {
    switch (hotelReservation.roomType) {
      case 1:
        return hotelReservation.hotel.soloRoomPrice
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
    props.bookingFlightCombo[1].tickets.forEach(ticket => {
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
                                  Start of rental period: {carRentalReservation.pickUpDate || ""}
                              </Grid>
                              <Grid item xs={6}>
                                  End of rental period: {carRentalReservation.dropOffDate || ""}
                              </Grid>
                              <Grid item xs={6}>
                                  Price: ${carRentalReservation.carRentalCompanyModel.price || ""}/day
                              </Grid>
                              <Grid item xs={6}>
                                  Guest amount: {carRentalReservation.guestAmount || ""}
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
                                  Checkin date: {hotelReservation.checkInDate}
                              </Grid>
                              <Grid item xs={6}>
                                  Checkout date: {hotelReservation.checkOutDate}
                              </Grid>
                              <Grid item xs={6}>
                                  Price: ${generatePricePerDayHotel()}/day
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
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        View booking
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="md">
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.bookingFlightCombo[0].origin} <Icon icon={baselineFlight} rotate="90deg" /> {props.bookingFlightCombo[0].destination}
        </DialogTitle>
        <DialogContent dividers>

          <Grid container spacing={2}>
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
                        <b>{t('bookingoverview.total costs')}: ${props.bookingFlightCombo[0].ticket_price * props.bookingFlightCombo[1].tickets.length}</b>
                      </Typography>
                    </Grid>

                    <Grid item xs={1}>
                      <FlightTakeoffIcon />
                    </Grid>
                    <Grid item xs={5}>
                      {props.bookingFlightCombo[0].origin}
                    </Grid>
                    <Grid item xs={1}>
                      <FlightLandIcon />
                    </Grid>
                    <Grid item xs={5}>
                      {props.bookingFlightCombo[0].destination}
                    </Grid>
                    <Grid item xs={1}>
                      <ChevronRightIcon />
                    </Grid>
                    <Grid item xs={5}>
                      {props.bookingFlightCombo[0].departure_time.substr(0, 16)}
                    </Grid>
                    <Grid item xs={1}>
                      <ChevronRightIcon />
                    </Grid>
                    <Grid item xs={5}>
                      {props.bookingFlightCombo[0].arrival_time.substr(0, 16)}
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
                      {t('bookingoverview.first name')}: {props.bookingFlightCombo[1].tickets[0].firstname}
                    </Grid>
                    <Grid item xs={6}>
                      {t('bookingoverview.last name')}: {props.bookingFlightCombo[1].tickets[0].lastname}
                    </Grid>
                    <Grid item xs={6}>
                      {t('bookingoverview.email address')}: {props.bookingFlightCombo[1].contactEmail}
                    </Grid>
                    <Grid item xs={6}>
                      {t('bookingoverview.phone number')}: {props.bookingFlightCombo[1].contactPhonenumber}
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
                    <Grid item xs={6}>
                      {t('bookingoverview.email address')}: {props.bookingFlightCombo[1].emergencyEmail}
                    </Grid>
                    <Grid item xs={6}>
                      {t('bookingoverview.phone number')}: {props.bookingFlightCombo[1].emergencyPhonenumber}
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleCheckIn}
            type="submit"
            color="primary"
            variant="contained"
            disabled={props.bookingFlightCombo[1].checkedIn}>
            Check in
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
