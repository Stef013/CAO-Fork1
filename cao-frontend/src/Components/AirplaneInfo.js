import React, { PureComponent } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default class AirplaneInfo extends PureComponent {
  render() {
    const { info } = this.props;

    const popUpStyle = {
      padding: "10px 15px",
    };

    return (
      <div style={{ ...popUpStyle }}>
        <h2>{info.Airplane}</h2>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableRow>
              <TableCell>
                <b>Take Off Place</b>
              </TableCell>
              <TableCell>{info.TakeOffPlace}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Landing Place</b>
              </TableCell>
              <TableCell>{info.LandingPlace}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Latitude</b>
              </TableCell>
              <TableCell>{info.latitude}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Longitude</b>
              </TableCell>
              <TableCell>{info.longitude}</TableCell>
            </TableRow>
          </Table>
        </TableContainer>
        <br></br>
        <img
          style={{ borderRadius: "10px", width: "100%" }}
          src={info.Image}
        ></img>
      </div>
    );
  }
}
