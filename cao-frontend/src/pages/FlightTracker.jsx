import "../App.css";
import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import AirplanePin from "../Components/AirplanePin";
import AirplaneInfo from "../Components/AirplaneInfo";
import axios from "axios";

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
            loaded: false,
            AllMarkers: null,
            MockAirplaneInfo: [],
        };
    }

    componentDidMount() {
        this.getAirplaneInfo();
    }

    async getAirplaneInfo() {
        const mockData = await axios({
            method: 'get',
            url: `http://localhost:5678/flight/current`
        })
        this.setState({
            MockAirplaneInfo: mockData.data.flightList,
            loaded: true
        })
        
        this.calcMove();
        this.movePlanes();
    }

    calcMove() {
        this.setState({
            
            MockAirplaneInfo: this.state.MockAirplaneInfo.map((plane) => {
                var currentTime = new Date();
                var startTime = new Date(plane.departure_time); 
                var endTime = new Date(plane.arrival_time);

                var preflyDiff = currentTime.getTime() - startTime.getTime();
                var ticks = Math.round(preflyDiff / 1000);
               
                var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
                plane.minutesToFly = Math.round(difference / 1000);
                const directionLatitude = plane.latEndPos - plane.latStartPos;
                const directionLongitude = plane.longEndPos - plane.longStartPos;
                const angle =
                    (Math.atan2(directionLongitude, directionLatitude) * 180) / Math.PI;
                    
                var toMove = parseFloat((directionLatitude / plane.minutesToFly))
                var toMoveLong = parseFloat((directionLongitude / plane.minutesToFly))

                var latToMove = toMove * ticks
                var longToMove = toMoveLong * ticks

                plane.minutesToFly = plane.minutesToFly - ticks;
                return {
                    ...plane,
                    latToMove: directionLatitude / (plane.minutesToFly + ticks),
                    longToMove: directionLongitude / (plane.minutesToFly + ticks),
                    angle: angle,
                    latStartPos: parseFloat(plane.latStartPos) + parseFloat(latToMove),
                    longStartPos: parseFloat(plane.longStartPos) + parseFloat(longToMove)
                };
            }),
        });
    }


    movePlanes() {
        setInterval(() => {
            this.setState({
                MockAirplaneInfo: this.state.MockAirplaneInfo.map((plane) => {
                    if (plane.minutesToFly <= 0) {
                        return plane;
                    }
                    return {
                        ...plane,
                        latStartPos: parseFloat(plane.latStartPos + plane.latToMove),
                        longStartPos: parseFloat(plane.longStartPos + plane.longToMove),
                        minutesToFly: --plane.minutesToFly,
                    };
                }),
            });
        }, 1000);
    }

    rAirplaneMarker = (plane, index) => {
        return (
            <Marker
                key={`marker-${index}`}
                longitude={parseFloat(plane.longStartPos)}
                latitude={parseFloat(plane.latStartPos)}
                offsetLeft={-20}
                offsetTop={-20}
            >
                <AirplanePin
                    onClick={() => this.setState({ PopUpInfo: plane })}
                    angle={plane.angle}
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
                    longitude={parseFloat(PopUpInfo.longStartPos)}
                    latitude={parseFloat(PopUpInfo.latStartPos)}
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
        );
    }
}

export default App;
