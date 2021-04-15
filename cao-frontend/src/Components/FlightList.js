import React from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Component } from "react";


const columns = [
  {label: "Destination", name:"destination"},
  {label: "Origin", name:"origin"},
  {label: "Departure Time", name: "departure_time"},
  {label:"Arrival Time (ETA)", name: "arrival_time"},
];

class FlightList extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        isLoaded: "false",
        flightlist: []
      }
    }

    async componentDidMount() {
      axios.get("http://localhost:5678/flight").then((response) => {
        this.setState({
          flightlist: response.data.flightList,
          isLoaded: "true"
        })
      });
    }
      
  render() {
    if (this.state.isLoaded === "false") {
      return null;
    }
    const { classes } = this.props;
    return (
        <div>
            <MUIDataTable title={"Flight Summary"} data={this.state.flightlist} columns={columns}/>
            {console.log(this.state.flightlist)}
        </div>
    );
  };

}
export default FlightList;