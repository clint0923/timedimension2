import "./styles.css";

import "leaflet/dist/leaflet.css";
import "leaflet-timedimension/dist/leaflet.timedimension.control.min.css";

import L from "leaflet";
import "leaflet-timedimension";
import "./leaflet.timedimension.choropleth";

import data from "./countries.json";

var map = L.map("app", {
  zoom: 3,
  center: [38.705, 1.15],
  timeDimension: true,
  timeDimensionControl: true,
  timeDimensionOptions: {
    currentTime: 1496314227000,
    times: [
      1496314227000,
      1504263027000,
      1512211827000,
      1520160627000,
      1528109427000,
      1536058227000
    ]
  }
});

const values = {
  ES: [35, 75, 150, 300, 600, 1250],
  IT: [1250, 600, 300, 150, 75, 35]
};

var getColor = function(nuts_id) {
  let value = values[nuts_id][map.timeDimension.getCurrentTimeIndex()];
  return value > 1000
    ? "#800026"
    : value > 500
    ? "#BD0026"
    : value > 200
    ? "#E31A1C"
    : value > 100
    ? "#FC4E2A"
    : value > 50
    ? "#FD8D3C"
    : value > 20
    ? "#FEB24C"
    : value > 10
    ? "#FED976"
    : "#FFEDA0";
};

var style = function(feature) {
  return {
    fillColor: getColor(feature.properties.nuts_id),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7
  };
};

const dataLayer = L.geoJson(data, { style: style });
L.timeDimension.layer.choropleth(dataLayer, {}).addTo(map);
