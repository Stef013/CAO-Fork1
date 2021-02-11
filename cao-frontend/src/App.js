import "./App.css";
import React, { useState, Component, useEffect } from "react";
import MenuAppBar from "./Components/MenuAppBar";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import AirplanePin from "./Components/AirplanePin";
import AirplaneInfo from "./Components/AirplaneInfo";

const APIKey =
  "pk.eyJ1IjoiYm9nYXRvbSIsImEiOiJja2wwb3diN28xMmx1Mm9wMHk1djB5dHBpIn0.82cfw_vIFD7_PrVNIQXdXg";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({ MockAirplaneInfo: this.getAirplaneInfo() });
  }

  componentDidMount() {
    this.calcMove();
    this.state = {
      viewport: {
        latitude: 38.751569,
        longitude: 1.675063,
        zoom: 1.7,
        bearing: 0,
        pitch: 0,
      },
      AirplaneInfo: null,
      MockAirplaneInfo: null,
      AllMarkers: null,
      mounted: true,
    };
    this.movePlanes();
  }

  getAirplaneInfo() {
    const mockData = require("./testData/mock.json");
    return mockData;
  }

  calcMove() {
    this.state.MockAirplaneInfo.map(function (plane) {
      plane.latToMove =
        (plane.endLatitude - plane.latitude) / plane.minutesToFly;
      plane.longToMove =
        (plane.endLongitude - plane.longitude) / plane.minutesToFly;
    });
  }

  movePlanes() {
    const interval = setInterval(() => {
      this.state.MockAirplaneInfo.map(function (plane) {
        if (plane.minutesToFly > 0) {
          plane.latitude = plane.latitude + plane.latToMove;
          plane.longitude = plane.longitude + plane.longToMove;
          plane.minutesToFly -= 1;
          console.log(plane.latitude);
        }
      });
    }, 200);
  }

  rAirplaneMarker = (AirplaneInfo, index) => {
    console.log(AirplaneInfo);
    console.log(index);
    return (
      <Marker
        key={`marker-${index}`}
        longitude={AirplaneInfo.longitude}
        latitude={AirplaneInfo.latitude}
        offsetLeft={-20}
        offsetTop={-20}
      >
        <AirplanePin
          onClick={() => this.setState({ PopUpInfo: AirplaneInfo })}
        />
      </Marker>
    );
  };

  renderPopup() {
    const { PopUpInfo } = this.state;

    return (
      PopUpInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={PopUpInfo.longitude}
          latitude={PopUpInfo.latitude}
          closeOnClick={true}
          onClose={() => this.setState({ PopUpInfo: null })}
        >
          <AirplaneInfo info={PopUpInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    return (
      <div>
        <MenuAppBar></MenuAppBar>
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100vh"
          minZoom={2}
          maxZoom={10}
          mapStyle="mapbox://styles/mapbox/outdoors-v11"
          onViewportChange={(viewport) => this.setState({ viewport })}
          mapboxApiAccessToken={APIKey}
          style={{ top: "0" }}
        >
          {this.state.MockAirplaneInfo.map(this.rAirplaneMarker)}
          {this.renderPopup()}
        </ReactMapGL>
      </div>
    );
  }
}

export default App;
