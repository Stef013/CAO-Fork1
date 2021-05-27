import "../App.css";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import FunctionalFlightList from "../Components/FunctionalFlightList"


const useStyles = (theme) => ({
    listStyle: {
        margin: "10px",
    },
});

class FlightSummary extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.listStyle}>
                <FunctionalFlightList></FunctionalFlightList>
            </div>
        );
    }
}
export default withStyles(useStyles)(FlightSummary);