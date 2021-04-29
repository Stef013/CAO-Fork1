import React, { PureComponent } from "react";
import TextField from "@material-ui/core/TextField";
import { Typography, withStyles } from "@material-ui/core";
import { Container, Grid, Button } from "@material-ui/core";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import axios from "axios";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: "16px",
    textAlign: "center",
    backgroundColor: "white",
    margin: "10px",
  },
  GridContainer: {
    paddingTop: "20px",
    justifyContent: "center",
  },
  typography: {
    textAlign: "left",
    lineHeight: "56px",
    fontWeight: "bold",
  },
  Button: {
    width: "100%",
  },
  currencyText: {
    textAlign: "left",
    width: "100%",
  },
  textField: {
    width: "100%",
  },
});

class FlightPlannerForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ticket_price: "",
      destination: "",
      origin: "",
      departure_time: "",
      arrival_time: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const response = await axios({
      method: "post",
      url: `http://localhost:5678/flight`,
      data: {
        airport_id: "1",
        ticket_price: this.state.ticket_price,
        destination: this.state.destination,
        origin: this.state.origin,
        departure_time: new Date(new Date(this.state.departure_time).toISOString().slice(0, 19).replace('T', ' ')),
        arrival_time: new Date(new Date(this.state.arrival_time).toISOString().slice(0, 19).replace('T', ' ')),
      },
    });
    alert(
      "A flight was created from " +
        this.state.origin +
        " to " +
        this.state.destination
    );
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
    console.log(this.state);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Container component="main" maxWidth="md">
          <div className={classes.paper}>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" className={classes.typography}>
                    Departure
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="origin"
                    value={this.state.origin}
                    id="departure"
                    label="Location"
                    autoComplete="lname"
                    onChange={this.handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" className={classes.typography}>
                    Arrival
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="arrival"
                    label="Location"
                    name="destination"
                    value={this.state.destination}
                    autoComplete="lname"
                    onChange={this.handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" className={classes.typography}>
                    Departure Time
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    id="datetime-local"
                    name="departure_time"
                    value={this.state.departure_time}
                    label="Set Date & Time"
                    type="datetime-local"
                    onChange={this.handleInputChange}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" className={classes.typography}>
                    Arrival Time
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    id="datetime-local"
                    name="arrival_time"
                    onChange={this.handleInputChange}
                    value={this.state.arrival_time}
                    label="Set Date & Time"
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" className={classes.typography}>
                    Ticket Price
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <CurrencyTextField
                    className={classes.currencyText}
                    label="Amount"
                    onChange={this.handleInputChange}
                    variant="standard"
                    name="ticket_price"
                    value={this.state.ticket_price}
                    currencySymbol="$"
                    outputFormat="string"
                    decimalCharacter="."
                    digitGroupSeparator=","
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    className={classes.Button}
                    variant="contained"
                    color="primary"
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(useStyles)(FlightPlannerForm);
