import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
require("leaflet.markercluster/dist/leaflet.markercluster-src");
import "./page.css";
import "leaflet/dist/leaflet.css";
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

export default function MyMap() {
  useEffect(() => {
    const map = L.map("map").setView([38.423733, 27.142826], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    const icon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
      iconSize: [30, 30],
    });

    const markers = L.markerClusterGroup();
    heavyLoadData.map((location) => {
      markers.addLayer(L.marker(new L.latLng(location.geo)));
    });
    const marker = L.marker(new L.LatLng(38.423733, 27.142826), { icon });
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
    const marker2 = L.marker(new L.LatLng(38.453899, 27.2117), { icon });
    markers.addLayer(marker);
    markers.addLayer(marker2);
    map.addLayer(markers);
    return () => {
      map.off();
      map.remove();
    };
  }, []);

  return <div id="map"></div>;
}
