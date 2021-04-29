import React, { PureComponent } from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import i18n from './i18n';
import TableBody from '@material-ui/core/TableBody';

export default class AirplaneInfo extends PureComponent {

  constructor(props) {
    super(props);
  }
  render() {
    const popUpStyle = {
      padding: "10px 15px",
    };

    return (
      <div style={{ ...popUpStyle }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>
                <b>{i18n.t('airplaneinfo.take off place')}</b>
              </TableCell>
              <TableCell>{this.props.info.origin}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>{i18n.t('airplaneinfo.landing place')}</b>
              </TableCell>
              <TableCell>{this.props.info.destination}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>{i18n.t('airplaneinfo.ETA')}</b>
              </TableCell>
              <TableCell>{this.props.info.arrival_time}</TableCell>
            </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
