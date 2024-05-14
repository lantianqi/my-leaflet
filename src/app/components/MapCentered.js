// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Popup,
  Circle,
} from "react-leaflet";
import { CircleMarker } from "react-leaflet/CircleMarker";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";

import "./page.css";
import "leaflet/dist/leaflet.css";
import { Crimson_Pro } from "next/font/google";
require("leaflet/dist/leaflet.css"); // inside .js file
require("react-leaflet-markercluster/dist/styles.min.css"); // inside .js

let heavyLoadData = [];

function getRandomLatLng() {
  return [-9 + 180 * Math.random(), -18 + 360 * Math.random()];
}

for (var i = 0; i < 1000; i += 1) {
  // 100k points
  heavyLoadData.push({
    id: "test",
    geo: getRandomLatLng(),
  });
}

export default function MyMap({ longitude, latitude }) {
  return (
    <MapContainer
      className="markercluster-map"
      center={[51.0, 19.0]}
      zoom={4}
      maxZoom={18}
      style={{ flex: 1, height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <MarkerClusterGroup>
        {heavyLoadData.map((location) => {
          return (
            // <Marker position={location.geo}>
            //   <Tooltip direction="top">{location.id}</Tooltip>
            // </Marker>
            <CircleMarker center={location.geo}>
              <Popup>{location.id}</Popup>
            </CircleMarker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
