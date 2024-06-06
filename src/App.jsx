import React from "react";
import { MapContainer, TileLayer, Polygon, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { stateData } from './assets/maps/Township';

function App() {

  const parseCoordinates = (geometry) => {
    if (geometry.type === "Polygon") {
      return geometry.coordinates.map(ring => ring.map(coord => [coord[1], coord[0]]));
    } else if (geometry.type === "MultiPolygon") {
      return geometry.coordinates.map(polygon => polygon.map(ring => ring.map(coord => [coord[1], coord[0]])));
    }
  };

  return (
    <MapContainer center={[16.8661, 96.1951]} zoom={6} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {
        stateData.features.map((state, idx) => {
          const coordinates = parseCoordinates(state.geometry);

          if (state.geometry.type === "Polygon") {
            console.log(state.properties.DT);
            return (
              <Polygon
                key={idx}
                pathOptions={{
                  fillColor: '#FD8D3C',
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  dashArray: 3,
                  color: 'white'
                }}
                positions={coordinates}
              >
                <Tooltip sticky>{state.properties.DT}</Tooltip>
              </Polygon>

            );
          } else if (state.geometry.type === "MultiPolygon") {
            return coordinates.map((polygon, index) => (

              < Polygon
                key={`${idx}-${index}`}
                pathOptions={{
                  fillColor: '#FD8D3C',
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  dashArray: 3,
                  color: 'white'
                }}
                positions={polygon}
              >
                <Tooltip sticky>{state.properties.TS}</Tooltip>
              </Polygon>

            ));
          }

          return null;
        })
      }

    </MapContainer >
  );
}

export default App;
