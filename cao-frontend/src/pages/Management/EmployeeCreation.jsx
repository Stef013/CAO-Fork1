import React, { Component } from "react";
import MenuAppBar from "../../Components/MenuAppBar";
import { Typography, Button, TextField, Grid, MenuItem, Card } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({

    title: {
        marginTop: 30,
        color: "white"
    },
    card: {
        width: 275,
        height: 260,
        margin: 10,
        align: "center",
    },
});

class EmployeeCreation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            setConfPassword: "",
            showError: false,
            helperText: "",
        };

        this.account = {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            role: "",
        };

        // this.handleChange = this.handleChange.bind(this);
    }

    // componentDidMount() {
    //     document.body.style.backgroundColor = "#3166b0"
    // }

    checkPasswords() {
        // if (account.password == confPassword) {
        //     console.log(account.password)
        //     console.log(confPassword)
        //     return true;
        // }
        // else {
        //     setShowError(true);
        //     setHelperText("Passwords don't match!")
        //     console.log(account.password)
        //     console.log(confPassword)
        //     return false;
        // }
    }

    handleChange(event) {
        this.account[event.target.name] = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();

        // if (checkPasswords()) {
        //     account.nationality = country;

        //     const Customer = account;
        //     console.log(Customer);
        //     Customer.dateOfBirth = moment(Customer.dateOfBirth).format("DD/MM/YYYY");

        //     axios.post('http://localhost:8080/account/', Customer, {
        //         headers: {
        //             "Content-Type": 'application/json', 'Accept': 'application/json'
        //         }
        //     })
        //         .then(res => {
        //             console.log(res);
        //             console.log(res.data);
        //             handleClose();
        //         })
        //         .catch(error => console.log(error));
        // }
    }
    render() {
        const { classes } = this.props;
        return (
            <div style={{ height: "100%" }}>
                <MenuAppBar></MenuAppBar>
                <Typography className={classes.title} align="center" variant="h3" >
                    New Employee Account
                </Typography>
                <Card className={classes.card} align="center">
                    <form className={classes.form} onSubmit={(event) => this.handleSubmit(event)} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastname"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onInput={this.handleChange}
                                />
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
                                    onInput={this.handleChange}
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
                                    onInput={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confPassword"
                                    autoComplete="current-password"
                                    helperText={this.state.helperText}
                                    error={this.state.showError}
                                    onInput={e => this.setState({ confPassword: e.target.value })}
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
                            Sign Up
                        </Button>
                    </form>
                </Card>
            </div>
        )
    }
}



export default (withStyles(useStyles)(EmployeeCreation))