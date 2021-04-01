import React from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";

function getData() {
  axios.get("https://api.github.com/users/mapbox").then((response) => {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
}

export default function FlightSummaryList() {
  const columns = [
    "FlightID",
    "Destination",
    "Origin",
    "Departure Time",
    "Arrival Time (ETA)",
  ];

  const data = [
    [
      "Gabby George",
      "Business Analyst",
      "Minneapolis",
      "Minneapolis",
      "Minneapolis",
    ],
  ];

  return (
    <React.Fragment>
      <MUIDataTable title={"Flight Summary"} data={data} columns={columns} />
    </React.Fragment>
  );
}
