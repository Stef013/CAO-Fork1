import "../App.css";
import React, { Component } from "react";
import MenuAppBar from "../Components/MenuAppBar";
import FlightSummaryList from "../Components/FlightSummaryList"
import { withStyles } from "@material-ui/core";

const useStyles = (theme) => ({
    listStyle: {
        margin: "10px",
    },
});

class FlightSummary extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <MenuAppBar></MenuAppBar>
                <div className={classes.listStyle}>
                    <FlightSummaryList></FlightSummaryList>
                </div>
            </div>
        );
    }
}
export default withStyles(useStyles)(FlightSummary);