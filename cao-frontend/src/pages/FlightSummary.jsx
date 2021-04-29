import "../App.css";
import React, { Component } from "react";
import MenuAppBar from "../Components/MenuAppBar";
import FlightList from "../Components/FlightList"
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
                    <FlightList></FlightList>
                </div>
            </div>
        );
    }
}
export default withStyles(useStyles)(FlightSummary);