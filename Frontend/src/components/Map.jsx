import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { useMyLocation } from "../hooks/useMyLocation";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
function Map() {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isPositionLoading,
    position: getLocationPosition,
    getPosition,
  } = useMyLocation();
  const [mapLat, mapLng] = useUrlPosition();

  console.log(mapLat, mapLng);

  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (getLocationPosition) {
        setMapPosition([getLocationPosition.lat, getLocationPosition.lng]);
      }
    },
    [getLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!getLocationPosition && (
        <Button Button type="position" onClick={getPosition}>
          {isPositionLoading ? "Loading..." : "USE YOUR LOCATION"}
        </Button>
      )}
      <MapContainer
        center={[mapLat, mapLng]}
        zoom={6}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position?.lat, city.position?.lng]}
              key={city._id}
            >
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng?.lat}&lng=${e.latlng?.lng}`);
    },
  });
}
export default Map;
