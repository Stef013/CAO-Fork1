import React, { Component } from "react";
import MenuAppBar from "../components/MenuAppBar";
import { Typography, Button, TextField, Grid, Paper, Container, Snackbar, Dialog, DialogTitle, DialogContent, Divider } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';

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
        maxWidth: 600,
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
    },

});

class PoliceReport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            confPassword: "",
            showError: false,
            helperText: "",
            openSuccess: false,
            openError: false,
            open: false,
            foundSuspect: false,
        };

        this.report = {
            firstname: "",
            lastname: "",
            dateOfBirth: "",
        };

        this.suspect = [];
        this.handleChange = this.handleChange.bind(this);
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSuccess: false });
        this.setState({ openError: false });
    };

    handleChange(event) {
        this.report[event.target.name] = event.target.value;
    }

    handlePopupOpen = () => {
        this.setState({ open: true });
    };

    handlePopupClose = () => {
        this.setState({ open: false });
    };

    async handleSubmit(event) {
        event.preventDefault();

        var result = "";

        console.log(this.report);

        await axios.post('http://20.82.46.255/police/report', this.report, {
            headers: {
                "Content-Type": 'application/json', 'Accept': 'application/json'
            }
        }).then(res => {
            console.log(res);
            console.log(res.data);
            result = res.data;
            document.getElementById("form").reset();
        }).catch(error => console.log(error));

        if (result) {
            if (result === "No tickets found.") {
                this.setState({ openError: true });
            }
            else {
                this.suspect = result;
                this.setState({ foundSuspect: true });
                this.handlePopupOpen();
                this.setState({ openError: false });
            }
        }
        else {
            this.setState({ openError: true });
        }
    }
    render() {
        const { classes } = this.props;
        const { openSuccess, openError, foundSuspect } = this.state;
        return (
            <div style={{ height: "100%" }}>
                <MenuAppBar></MenuAppBar>
                <Typography className={classes.title} align="center" variant="h3" >
                    New Police Report
                </Typography>
                <Container align="center">
                    <Paper className={classes.paper} >

                        <div className={classes.root}>
                            <Snackbar open={openError} autoHideDuration={6000} onClose={this.handleClose}>
                                <Alert onClose={this.handleClose} severity="error" variant="filled" className={classes.alert}>
                                    No suspect found.
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
                {foundSuspect ?
                    (
                        <Dialog open={this.state.open} maxWidth="md" onClose={this.handlePopupClose} aria-labelledby="form-dialog-title">
                            <DialogTitle style={{ padding: 10, marginTop: 30, marginLeft: 20 }} id="form-dialog-title">SUSPECT FOUND</DialogTitle>
                            <DialogContent style={{ padding: 10, marginLeft: 20, marginBottom: 30 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={5}>
                                        <Typography style={{ display: 'inline-block', marginRight: 10, fontWeight: 600 }} >Firstname: </Typography>
                                        <Typography style={{ display: 'inline-block' }}>{this.suspect[0].ticket.firstname}</Typography>
                                    </Grid>

                                    <Grid item xs={7}>
                                        <Typography style={{ display: 'inline-block', marginRight: 10, fontWeight: 600 }} >Lastname: </Typography>
                                        <Typography style={{ display: 'inline-block' }}>{this.suspect[0].ticket.lastname}</Typography>
                                    </Grid>

                                    <Grid item xs={5}>
                                        <Typography style={{ display: 'inline-block', marginRight: 10, fontWeight: 600 }}>Gender: </Typography>
                                        <Typography style={{ display: 'inline-block' }}>{this.suspect[0].ticket.gender}</Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography style={{ display: 'inline-block', marginRight: 10, fontWeight: 600 }}>DateOfBirth: </Typography>
                                        <Typography style={{ display: 'inline-block' }}>{this.suspect[0].ticket.dateOfBirth}</Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Divider fullWidth style={{ marginTop: 20, marginBottom: 20 }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Ticket / Flight:</Typography>
                                    </Grid>

                                    <Grid item xs={5}>
                                        <Typography style={{ display: 'inline-block', marginRight: 10, fontWeight: 600 }}>Departure: </Typography>
                                        <Typography style={{ display: 'inline-block' }}>Sidney, Australia </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography style={{ display: 'inline-block', marginRight: 10, fontWeight: 600 }}>Destination: </Typography>
                                        <Typography style={{ display: 'inline-block' }}>Amsterdam, The Netherlands</Typography>
                                    </Grid>

                                    <Grid item xs={5}>
                                        <Typography style={{ display: 'inline-block', marginRight: 10, fontWeight: 600 }}>Departure Time: </Typography>
                                        <Typography style={{ display: 'inline-block' }}> 13:00 </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography style={{ display: 'inline-block', marginRight: 10, fontWeight: 600 }}>Arrival Time: </Typography>
                                        <Typography style={{ display: 'inline-block' }}> 22:00 </Typography>
                                    </Grid>

                                    <Grid item xs={5}>
                                        <Typography style={{ display: 'inline-block', marginRight: 10, fontWeight: 600 }}>Seat: </Typography>
                                        <Typography style={{ display: 'inline-block' }}> {this.suspect[0].ticket.seat} </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography style={{ display: 'inline-block', marginRight: 10, fontWeight: 600 }}>Extra Luggage: </Typography>
                                        <Typography style={{ display: 'inline-block' }}>{this.suspect[0].ticket.extraLuggage} </Typography>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                        </Dialog>
                    )
                    :
                    (
                        <Typography className={classes.title} align="center" variant="h4" >

                        </Typography>
                    )
                }

            </div >
        )
    }
}

export default (withStyles(useStyles)(PoliceReport))