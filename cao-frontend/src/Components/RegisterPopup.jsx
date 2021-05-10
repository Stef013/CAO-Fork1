import React from 'react';
import { Button, TextField, Dialog, DialogContent, DialogTitle, Link, Grid, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CountryRegionData } from 'react-country-region-selector';

import axios from 'axios';
import moment from 'moment';
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [country, setCountry] = React.useState('');
    const [confPassword, setConfPassword] = React.useState('');
    const [showError, setShowError] = React.useState(false);
    const [helperText, setHelperText] = React.useState();
    const [account, setAccount] = React.useState({
        email: " ",
        password: " ",
        firstname: " ",
        lastname: " ",
        nationality: " ",
        dateOfBirth: " "
    });
    const { t } = useTranslation()


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function checkPasswords() {
        if (account.password === confPassword) {
            console.log(account.password)
            console.log(confPassword)
            return true;
        }
        else {
            setShowError(true);
            setHelperText("Passwords don't match!")
            console.log(account.password)
            console.log(confPassword)
            return false;
        }
    }

    function handleChange(event) {
        account[event.target.name] = event.target.value;
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (checkPasswords()) {
            account.nationality = country;

            const Customer = account;
            console.log(Customer);
            Customer.dateOfBirth = moment(Customer.dateOfBirth).format("DD/MM/YYYY");

            axios.post('http://localhost:8080/account/customer', Customer, {
                headers: {
                    "Content-Type": 'application/json', 'Accept': 'application/json'
                }
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
                .catch(error => console.log(error));
        }
    }

    return (
        <div>
            <Link href="#" variant="body2" onClick={handleClickOpen}>
                {t('loginpage.no account sign up')}
            </Link>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{t('registerpage.sign up header')}</DialogTitle>
                <DialogContent>
                    <form className={classes.form} onSubmit={(event) => handleSubmit(event)} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label={t('registerpage.first name')}
                                    onInput={handleChange}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastname"
                                    label={t('registerpage.last name')}
                                    name="lastName"
                                    autoComplete="lname"
                                    onInput={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    id="date"
                                    name="dateOfBirth"
                                    label={t('registerpage.date of birth')}
                                    type="date"
                                    format="DD-MM-YYYY"
                                    fullWidth
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    id="CountrySelect"
                                    select
                                    label={t('registerpage.country placeholder')}
                                    fullWidth
                                    value={country}
                                    onChange={e => setCountry(e.target.value)}
                                    helperText={t('registerpage.country description')}
                                >
                                    {CountryRegionData.map((option) => (
                                        <MenuItem key={option[0]} value={option[0]}>
                                            {option[0]}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label={t('registerpage.email address')}
                                    name="email"
                                    autoComplete="email"
                                    onInput={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label={t('registerpage.password')}
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onInput={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confPassword"
                                    label={t('registerpage.repeat password')}
                                    type="password"
                                    id="confPassword"
                                    autoComplete="current-password"
                                    helperText={helperText}
                                    error={showError}
                                    onInput={e => setConfPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {t('registerpage.sign up button')}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
}