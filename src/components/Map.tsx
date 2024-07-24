import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCities from "../hooks/useCities";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import styles from "./Map.module.scss";
import { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";

const Map = () => {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState<LatLngTuple>([40, 0]);
  const { lat: mapLat, lng: mapLng } = useUrlPosition();
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup>
              {city.emoji} {city.cityName}
            </Popup>
          </Marker>
        ))}

        <ChangeCerter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

const ChangeCerter = ({ position }: { position: LatLngTuple }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`, {
        replace: true,
      });
    },
  });
  return null;
};

export default Map;
