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

    this.state = {
      viewport: {
        latitude: 38.751569,
        longitude: 1.675063,
        zoom: 1.7,
        bearing: 0,
        pitch: 0,
      },
      AllMarkers: null,
      MockAirplaneInfo: this.getAirplaneInfo()
    }
  }

  componentDidMount() {
    this.calcMove();
    this.movePlanes();
  }

  getAirplaneInfo() {
    const mockData = require("./testData/mock.json");
    return mockData;
  }

  calcMove() {
    this.setState({
      MockAirplaneInfo: this.state.MockAirplaneInfo.map(plane => {
        const directionLatitude = plane.endLatitude - plane.latitude;
        const directionLongitude = plane.endLongitude - plane.longitude;
        const angle = Math.atan2(directionLongitude, directionLatitude) * 180 / Math.PI;

        return {
          ...plane,
          latToMove: directionLatitude / plane.minutesToFly,
          longToMove: directionLongitude / plane.minutesToFly,
          angle: angle
        };
      })
    });
  }

  movePlanes() {
    setInterval(() => {
      this.setState({
        MockAirplaneInfo: this.state.MockAirplaneInfo.map(plane => {
          if (plane.minutesToFly <= 0) {
            return plane;
          }
          
          return {
            ...plane,
            latitude: plane.latitude + plane.latToMove,
            longitude: plane.longitude + plane.longToMove,
            minutesToFly: --plane.minutesToFly
          };
        })
      });
    }, 20);
  }

  rAirplaneMarker = (plane, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={plane.longitude}
        latitude={plane.latitude}
        offsetLeft={-20}
        offsetTop={-20}
      >
        <AirplanePin
          onClick = {() => this.setState({ PopUpInfo: plane })}
          angle = { plane.angle }
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
