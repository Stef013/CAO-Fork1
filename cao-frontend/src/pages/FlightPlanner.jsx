import "../App.css";
import React, { Component } from "react";
import MenuAppBar from "../Components/MenuAppBar";
import FlightPlannerForm from "../Components/FlightPlannerForm";

class FlightPlanner extends Component {
    render() {
        return (
            <div>
                <MenuAppBar></MenuAppBar>
                <FlightPlannerForm></FlightPlannerForm>
            </div>
        );
    }
}

export default FlightPlanner;