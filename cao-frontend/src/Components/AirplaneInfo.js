import React, { PureComponent } from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import i18n from './i18n'

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
                <b>{i18n.t('airplaneinfo.take off place')}</b>
              </TableCell>
              <TableCell>{info.TakeOffPlace}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>{i18n.t('airplaneinfo.landing place')}</b>
              </TableCell>
              <TableCell>{info.LandingPlace}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>{i18n.t('airplaneinfo.ETA')}</b>
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
