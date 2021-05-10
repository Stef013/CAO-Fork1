import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, Paper, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Icon, InlineIcon } from '@iconify/react';
import baselineFlight from '@iconify-icons/ic/baseline-flight';
import { useTranslation } from 'react-i18next';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import axios from "axios";

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckIn = () => {

    axios.put("http://localhost:8080/booking/booking/checkin/" + props.bookingFlightCombo[1].bookingId).then((response) => {
      if (response.status === 200) {
        window.location.reload();
      }
      else {
        alert(response.status)
      }
    })
  };

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
