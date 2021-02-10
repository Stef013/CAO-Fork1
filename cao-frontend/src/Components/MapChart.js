import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  setTooltipContent,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const markers = [
  { markerOffset: 10, name: "MH17", coordinates: [-68.1193, -16.4897] },
  { markerOffset: 10, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
  { markerOffset: 10, name: "Santiago", coordinates: [-70.6693, -33.4489] },
  { markerOffset: 10, name: "Sesamstraat", coordinates: [-74.0721, 4.711] },
  { markerOffset: 10, name: "Quito", coordinates: [-78.4678, -0.1807] },
  { markerOffset: 10, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
  { markerOffset: 10, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
  { markerOffset: 10, name: "Paramaribo", coordinates: [-55.2038, 5.852] },
  { markerOffset: 10, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
  { markerOffset: 10, name: "Caracas", coordinates: [-66.9036, 10.4806] },
  { markerOffset: 10, name: "Lima", coordinates: [-77.0428, -12.0464] },
];

const MapChart = ({ setTooltipContent }) => {
  return (
    <div>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, CONTINENT } = geo.properties;
                    setTooltipContent(`${NAME} - ${CONTINENT}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset }) => (
            <Marker key={name} coordinates={coordinates}>
              <g
                fill="none"
                stroke="#FF5533"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
              >
                <path
                  fill="#FF5533"
                  d="M403.233,288.574c13.831-15.959,20.406-30.375,15.334-36.447c-3.509-4.203-11.969-3.604-22.862,0.714l-3.835-18.231   c12.295-15.36,17.592-29.028,12.362-35.549c-3.399-4.237-10.758-4.747-20.318-2.23l-10.098-47.954   C433.2,78.469,457.742,19.853,442.367,4.478c-15.375-15.375-73.991,9.173-144.398,68.558l-47.953-10.098   c2.516-9.561,2.006-16.918-2.23-20.318c-6.515-5.229-20.183,0.068-35.55,12.362l-18.231-3.835   c4.318-10.887,4.917-19.346,0.714-22.861c-6.072-5.073-20.481,1.503-36.448,15.334L86.55,28.522L48.082,66.99l66.015,34.095   c-5.63,12.566-6.848,22.481-2.203,26.357c5.44,4.542,17.564-0.245,31.504-11.227l16.109,8.323   c-5.392,13.729-6.065,24.568-0.625,28.934c6.358,5.1,19.523,0.177,34.421-11.479l22.678,11.709   c-0.667,0.755-1.333,1.482-1.999,2.244c-42.48,48.409-80.614,93.819-108.447,131.458l-76.677-8.847L0.006,307.41l67.796,38.481   c-9.275,18.599-11.757,31.987-5.291,38.454s19.856,3.985,38.454-5.29l38.481,67.796l28.853-28.853l-8.847-76.677   c37.645-27.833,83.049-65.967,131.458-108.446c0.761-0.667,1.488-1.333,2.243-1.999l11.71,22.678   c-11.655,14.898-16.578,28.063-11.479,34.422c4.366,5.439,15.205,4.767,28.935-0.626l8.323,16.109   c-10.982,13.939-15.77,26.064-11.228,31.504c3.876,4.645,13.798,3.421,26.357-2.203l34.095,66.015l38.468-38.468L403.233,288.574z"
                />
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
