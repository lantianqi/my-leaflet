import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
require("leaflet.markercluster/dist/leaflet.markercluster");
import "./page.css";
require("leaflet/dist/leaflet.css"); // inside .js file
require("react-leaflet-markercluster/dist/styles.min.css"); // inside .js

let heavyLoadData = [];

function getRandomLatLng() {
  return [-9 + 180 * Math.random(), -18 + 360 * Math.random()];
}

for (var i = 0; i < 10000; i += 1) {
  heavyLoadData.push({
    key: i,
    id: "test",
    geo: getRandomLatLng(),
  });
}

export default function MyMap() {
  useEffect(() => {
    const map = L.map("map").setView([38.423733, 27.142826], 4);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // const icon = L.icon({
    //   iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
    //   iconSize: [30, 30],
    // });

    const markers = L.markerClusterGroup({
      spiderfyOnEveryZoom: true,
      showCoverageOnHover: true,
    });

    var myRenderer = L.canvas({ padding: 0.5 });
    heavyLoadData.map((location) => {
      L.circleMarker(location.geo, {
        color: "darkgreen",
        radius: 10,
        renderer: myRenderer,
      })
        .addTo(markers)
        .bindPopup(location.id);
    });
    map.addLayer(markers);

    return () => {
      map.off();
      map.remove();
    };
  }, []);

  return <div id="map"></div>;
}
