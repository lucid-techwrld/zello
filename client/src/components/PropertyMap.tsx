import {
  GoogleMap,
  Marker,
  StreetViewPanorama,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState } from "react";

type PropertyMapProps = {
  latitude: number;
  longitude: number;
};

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
};

export default function PropertyMap({ latitude, longitude }: PropertyMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const center = { lat: latitude, lng: longitude };

  const [showStreetView, setShowStreetView] = useState(false);

  return (
    <div className="mt-4">
      {isLoaded ? (
        <div>
          <button
            onClick={() => setShowStreetView(!showStreetView)}
            className="mb-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {showStreetView ? "Hide Street View" : "Show Street View"}
          </button>

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={{
              zoomControl: true, // zoom in/out buttons
              streetViewControl: false, // we control it manually
              mapTypeControl: true, // roadmap/satellite toggle
              draggable: true, // allow drag
              scrollwheel: true, // zoom with mouse wheel
            }}
          >
            {!showStreetView && <Marker position={center} />}
            {showStreetView && (
              <StreetViewPanorama
                options={{
                  position: center,
                  pov: { heading: 100, pitch: 0 },
                  zoom: 1,
                }}
              />
            )}
          </GoogleMap>
        </div>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
}
