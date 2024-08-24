import { View, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppMapView from "./AppMapView";
import Header from "./Header";
import SearchBar from "./SearchBar";
import GlobalApi from "../../Utils/GlobalApi";
import { UserLocationContext } from "../../Context/UserLocationContext";
import PlaceListView from "./PlaceListView";
import { SelectedMarkerContext } from "../../Context/SelectedMarkerContext";

export default function HomeScreen() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState([]);

  useEffect(() => {
    location && GetNearByPlace();
  }, [location]);

  const GetNearByPlace = () => {
    GlobalApi.newNearbyPlace(location)
      .then((response) => {
        console.log(JSON.stringify(response.data.results));
        setPlaceList(response.data?.results);
      })
      .catch((error) => {
        console.error("Error fetching nearby places:", error);
      });
  };

  return (
    <SelectedMarkerContext.Provider
      value={{ selectedMarker, setSelectedMarker }}
    >
      <View>
        <View style={styles.headerContainer}>
          <Header />
          <SearchBar
            searchedLocation={(location) =>
              setLocation({
                latitude: location.lat,
                longitude: location.lng,
              })
            }
          />
        </View>

        {placeList && <AppMapView placeList={placeList} />}

        <View style={styles.placeListContainer}>
          {placeList && <PlaceListView placeList={placeList} />}
        </View>
      </View>
    </SelectedMarkerContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
  placeListContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    width: "100%",
  },
});
