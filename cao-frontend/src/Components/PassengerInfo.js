import { Container, Grid, TextField } from "@material-ui/core";
import React, { PureComponent } from "react";


const PassengerInfo = (props) => {
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                Passenger {props.id}
            </Grid>
            <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="first name"
                    label="First Name"
                    name="first name"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="last name"
                    label="Last Name"
                    name="last name"
                    autoComplete="current-password"
                />
            </Grid>
        </Grid>
    );
}

export default PassengerInfo;