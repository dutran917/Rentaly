import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";

import styles from "./map.module.scss";

const NextMap = ({
  lat,
  long,
  name,
}: {
  lat: number;
  long: number;
  name: string;
}) => {
  const libraries = useMemo(() => ["places"], []);
  const mapCenter = {
    lat: +lat,
    lng: +long,
  };

  const [isOpen, setIsOpen] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env
      .NEXT_PUBLIC_GOOGLE_MAP_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.homeWrapper}>
      <GoogleMap
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{
          width: "100%",
          height: "400px",
        }}
        onLoad={(map) => console.log("Map Loaded")}
      >
        <Marker
          onClick={() => setIsOpen(!isOpen)}
          position={mapCenter}
          onLoad={() => console.log("Marker Loaded")}
        >
          {isOpen && (
            <InfoWindow
              position={{
                lat: +lat,
                lng: +long,
              }}
            >
              <div
                style={{
                  padding: "5px",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                <p>{name}</p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
    </div>
  );
};

export default NextMap;
