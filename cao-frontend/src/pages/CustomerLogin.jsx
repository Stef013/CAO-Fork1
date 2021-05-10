import React from 'react';
import { Avatar, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import RegisterPopup from '../Components/RegisterPopup';
import { Trans, useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30,
        paddingLeft: 40,
        paddingRight: 40,
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

export default function SignIn(props) {
    const classes = useStyles();
    const history = useHistory();
    const { t } = useTranslation();

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Paper className={classes.paper} >
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    <Trans t={t} i18nKey="loginpage.Sign in" />
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={t('loginpage.email address')}
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('loginpage.password')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label={t('loginpage.remember me')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => history.push('/FlightTracker')}
                    >
                        <Trans t={t} i18nKey="loginpage.Sign in" />
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                <Trans t={t} i18nKey="loginpage.forgot password" />
                            </Link>
                        </Grid>
                        <Grid item>
                            <RegisterPopup axios={props.axios} />
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}