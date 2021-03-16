import React, { PureComponent } from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

export default class AirplaneInfo extends PureComponent {
  state = {
    currentTime: null,
  };

  render() {
    const { info } = this.props;
    this.setState({
      currentTime: moment()
        .add(info.minutesToFly / 600, "m")
        .format("HH:mm:ss"),
    });

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
                <b>ETA</b>
              </TableCell>
              <TableCell>{this.state.currentTime}</TableCell>
            </TableRow>
          </Table>
        </TableContainer>
        <br></br>
        <img
          style={{ borderRadius: "10px", width: "100%" }}
          src={info.Image}
          alt="airplane"
        ></img>
      </div>
    );
  }
}
