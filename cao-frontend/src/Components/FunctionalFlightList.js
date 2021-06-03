import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { makeStyles, Button } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import FlightInfoPopup from "../Components/FlightInfoPopup";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
  },
}));

function renderButton(params) {
  return <FlightInfoPopup flightId={params.value}></FlightInfoPopup>;
}

export default function ValueGetterGrid(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = useState();
  // const [dataRows, setDataRows] = useState();

  useEffect(async () => {
    await axios
      .get("http://localhost:8080/flight/flight")
      .then((res) => {
        //setData(res.data);
        console.log(res.data);

        res.data.flightList.map(function (flight) {
          var flight = {
            id: flight.id,
            origin: flight.origin,
            destination: flight.destination,
            departure_time: flight.departure_time,
            arrival_time: flight.arrival_time,
            ticket_price: flight.ticket_price,
            get_info: flight.id,
          };

          dataRows.push(flight);
        });

        setLoading(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(dataRows);
  }, []);

  const [rows, setRows] = React.useState(dataRows);

  const handleEditCellChangeCommitted = React.useCallback(
    ({ id, field, props }) => {
      if (field === "ticket_price") {
        const data = props; // Fix eslint value is missing in prop-types for JS files

        axios.put("http://localhost:8080/flight/flight/updateFlightPrice", {
          id: id,
          ticket_price: data.value,
        });

        console.log(id, field, props);
        console.log(props);
        const updatedRows = rows.map((row) => {
          if (row.id === id) {
            return { ...row };
          }
          return row;
        });
        setRows(updatedRows);
      }
    },
    [rows]
  );

  return (
    <div style={{ height: 800, width: "100%" }}>
      {loading ? (
        <DataGrid
          className={classes.root}
          rows={dataRows}
          columns={columns}
          onEditCellChangeCommitted={handleEditCellChangeCommitted}
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

const columns = [
  {
    field: "origin",
    headerName: "Origin",
    width: 250,
  },
  {
    field: "destination",
    headerName: "Destination",
    width: 250,
  },
  {
    field: "departure_time",
    headerName: "Departure Time",
    width: 250,
  },
  {
    field: "arrival_time",
    headerName: "ArrivalTIme",
    width: 250,
  },
  {
    field: "ticket_price",
    headerName: "Ticket Price",
    width: 250,
    editable: true,
    sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),
  },
  {
    field: "get_info",
    headerName: "Information",
    width: 250,
    renderCell: renderButton,
  },
];

const dataRows = [];
