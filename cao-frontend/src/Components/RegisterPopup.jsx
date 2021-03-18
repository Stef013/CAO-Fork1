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
    const [account, setAccount] = React.useState({
        email: " ",
        password: " ",
        firstname: " ",
        lastname: " ",
        nationality: " ",
        dateOfBirth: " "
    });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function selectCountry(val) {
        setCountry({ val }, () => console.log(country));
    }

    function handleSubmit() {

        // setAccount({
        //     email: 'test@test.nl',
        //     password: 'wollah'
        // })

        const user = account;
        console.log(user);
        console.log(CountryRegionData[0][0]);

        // axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //     })
    }

    return (
        <div>
            <Link href="#" variant="body2" onClick={handleClickOpen}>
                Don't have an account? Sign Up
            </Link>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                <DialogContent>
                    <form className={classes.form} noValidate >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
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
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onInput={e => account.lastname = e.target.value}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    defaultValue="2017-05-24"
                                    style={{ width: 220 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    value={country}
                                    onChange={(val) => setCountry(val)}
                                    helperText="Please select your currency"
                                >
                                    {CountryRegionData.map((option) => (
                                        <MenuItem key={option.value[0]} value={option.value[0]}>
                                            {option.label}
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
                                    label="Email Address"
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
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onInput={e => account.password = e.target.value}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                            <CountryDropdown
                                value={country}
                                onChange={(val) => setCountry(val)} />
                        </Grid>
                        <Button

                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Sign Up
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
}