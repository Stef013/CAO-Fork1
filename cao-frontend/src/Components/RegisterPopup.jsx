import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
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
    const [Repassword, setRePassword] = React.useState('');
    const [account, setAccount] = React.useState({
        id: 6,
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

    function selectCountry(val) {
        setCountry({ val }, () => console.log(country));
    }

    function handleSubmit(event) {
        event.preventDefault();

        // const user = account;
        account.nationality = country;


        const Customer = account;
        console.log(Customer);
        console.log(country);
        Customer.dateOfBirth = moment(Customer.dateOfBirth).format("DD/MM/YYYY");

        console.log(Customer.dateOfBirth)
        axios.post('http://localhost:8080/account/', Customer, {
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

    return (
        <div>
            <Link href="#" variant="body2" onClick={handleClickOpen}>
                {t('loginpage.no account sign up')}
            </Link>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{t('registerpage.sign up header')}</DialogTitle>
                <DialogContent>
                    <form className={classes.form} noValidate onSubmit={(event) => handleSubmit(event)} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label={t('registerpage.first name')}
                                    onInput={e => account.firstname = e.target.value}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label={t('registerpage.last name')}
                                    name="lastName"
                                    autoComplete="lname"
                                    onInput={e => account.lastname = e.target.value}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    id="date"
                                    label={t('registerpage.date of birth')}
                                    type="date"
                                    format="DD-MM-YYYY"
                                    fullWidth
                                    onChange={e => account.dateOfBirth = e.target.value}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
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
                                    onInput={e => account.email = e.target.value}
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
                                    onInput={e => account.password = e.target.value}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="Rpassword"
                                    label={t('registerpage.repeat password')}
                                    type="password"
                                    id="Rpassword"
                                    autoComplete="current-password"
                                    onInput={e => account.password = e.target.value}
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