import React, { PureComponent } from "react";
import Airplane from "../Images/Airplane.png";

const pinStyle = {
  cursor: "pointer",
  fill: "rgba(206, 59, 23)",
};

export default class AirplanePin extends PureComponent {
  render() {
    const { onClick, angle } = this.props;

    return (
      <img
        style={{
          ...pinStyle,
          width: "8%",
          transform: "rotate(" + angle + "deg)",
        }}
        onClick={onClick}
        src={Airplane}
        alt="airplane-marker"
      />
    );
  }
}
