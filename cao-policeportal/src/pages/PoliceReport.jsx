import React, { Component } from "react";
import MenuAppBar from "../components/MenuAppBar";
import { Typography, Button, TextField, Grid, MenuItem, Paper, Container, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import { CountryRegionData } from 'react-country-region-selector';

const useStyles = (theme) => ({

    title: {
        marginTop: 30,
        color: "white"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 50,
        paddingLeft: 40,
        paddingRight: 40,
        maxWidth: 800,
    },
    submit: {
        margin: theme.spacing(4, 0, 0),
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    alert: {
        marginBottom: 15
    }
});

class PoliceReport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            confPassword: "",
            showError: false,
            helperText: "",
            role: "",
            openSuccess: false,
            openError: false,
            country: "",
        };

        this.account = {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            role: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSuccess: false });
        this.setState({ openError: false });
    };

    checkPasswords() {
        if (this.account.password === this.state.confPassword) {
            return true;
        }
        else {
            this.setState({ showError: true });
            this.setState({ helperText: "Passwords don't match!" });
            return false;
        }
    }

    handleChange(event) {
        this.account[event.target.name] = event.target.value;
    }

    async handleSubmit(event) {
        event.preventDefault();

        if (this.checkPasswords()) {
            if (this.state.role !== "") {

                this.account.role = this.state.role;

                var result = "";

                await axios.post('http://localhost:8080/account/employee', this.account, {
                    headers: {
                        "Content-Type": 'application/json', 'Accept': 'application/json'
                    }
                }).then(res => {
                    console.log(res);
                    console.log(res.data);
                    result = res.data;
                    document.getElementById("form").reset();
                }).catch(error => console.log(error));

                if (result === "Account created successfully!") {
                    this.setState({ openSuccess: true });
                    this.setState({ openError: false });
                }
                else {
                    this.setState({ openError: true });
                    this.setState({ openSuccess: false });
                }
            }
        }
    }
    render() {
        const { classes } = this.props;
        const { openSuccess, openError } = this.state;
        return (
            <div style={{ height: "100%" }}>
                <MenuAppBar></MenuAppBar>
                <Typography className={classes.title} align="center" variant="h3" >
                    New Police Report
                </Typography>
                <Container align="center">
                    <Paper className={classes.paper} >
                        <div className={classes.root}>
                            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={this.handleClose}>
                                <Alert onClose={this.handleClose} variant="filled" severity="success" className={classes.alert}>
                                    Report created successfully!
                             </Alert>
                            </Snackbar>
                        </div>
                        <div className={classes.root}>
                            <Snackbar open={openError} autoHideDuration={6000} onClose={this.handleClose}>
                                <Alert onClose={this.handleClose} severity="error" variant="filled" className={classes.alert}>
                                    An Error Has Occured!
                             </Alert>
                            </Snackbar>
                        </div>
                        <form id="form" onSubmit={(event) => this.handleSubmit(event)} >
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstname"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        onInput={this.handleChange}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastname"
                                        label="Last Name"
                                        name="lastname"
                                        autoComplete="lname"
                                        onInput={this.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        id="date"
                                        name="dateOfBirth"
                                        label="Date of birth"
                                        type="date"
                                        format="DD-MM-YYYY"
                                        fullWidth
                                        onChange={this.handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        id="CountrySelect"
                                        select
                                        label='Select nationality'
                                        fullWidth
                                        value={this.state.country}
                                        onChange={e => this.setState({ country: e.target.value })}
                                    >
                                        {CountryRegionData.map((option) => (
                                            <MenuItem key={option[0]} value={option[0]}>
                                                {option[0]}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Create
                        </Button>
                        </form>
                    </Paper>
                </Container>
            </div >
        )
    }
}

export default (withStyles(useStyles)(PoliceReport))