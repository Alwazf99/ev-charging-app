import React, { useContext } from "react";
import { Marker, Image } from "react-native-maps";
import { SelectedMarkerContext } from "../../Context/SelectedMarkerContext";

export default function Markers({ index, place }) {
  // Ensure that place and place.location exist before rendering the Marker
  if (!place || !place.location) return null;

  const { latitude, longitude } = place.location;

  // Check if latitude and longitude are valid numbers before rendering the Marker
  if (isNaN(latitude) || isNaN(longitude)) return null;

  const { selectedMarker, setSelectedMarker } = useContext(
    SelectedMarkerContext
  );

  return (
    <Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      onPress={() => setSelectedMarker(index)}
    >
      <Image
        source={require("./../../../assets/images/marker.png")}
        style={{ width: 70, height: 70 }}
      />
    </Marker>
  );
}
