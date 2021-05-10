import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Grid, Button, Typography } from '@material-ui/core';
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



export default function CreateBookingSeatpicker(props) {
    const classes = useStyles();
    const history = useHistory();
    const { t } = useTranslation();

    const [booking, setBooking] = React.useState(props.booking);

    const nextPage = () => {
        props.storePassengerData(booking)
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h3" style={{color:"white"}}>
                            {t('bookingseatpicker.seatpicker')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5" style={{color:"white"}}>
                            {t('bookingseatpicker.to be implemented')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={props.previousPage}
                        >
                            <ArrowBackIcon />
                            {t('bookingseatpicker.passenger information')}
                    </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={nextPage}
                        >
                            {t('bookingseatpicker.booking overview')}
                            <ArrowForwardIcon />
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}