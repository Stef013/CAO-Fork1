import "../App.css";
import React, { Component } from "react";
import FlightList from "../Components/FlightList"
import { withStyles } from "@material-ui/core";

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
                <FlightList axios={this.props.axios} />
            </div>
        );
    }
}
export default withStyles(useStyles)(FlightSummary);