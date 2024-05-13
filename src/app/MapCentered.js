import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "./page.css";
import "leaflet/dist/leaflet.css";

export default function MyMap({
  longitude,
  latitude
}) {
  return (
    <MapContainer center={[longitude, latitude]} zoom={1} scrollWheelZoom={false} style={{ flex: 1, height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[longitude, latitude]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
