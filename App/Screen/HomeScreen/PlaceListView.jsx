import { View, Text, FlatList, Dimensions } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import PlaceItems from "./PlaceItems";
import { SelectedMarkerContext } from "../../Context/SelectedMarkerContext";
import { getFirestore } from "firebase/firestore";
import { app } from "../../Utils/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

export default function PlaceListView({ placeList }) {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);
  const flatListRef = useRef(null);
  const { selectedMarker, setSelectedMarker } = useContext(
    SelectedMarkerContext
  );

  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  const getItemLayout = (_, index) => ({
    length: Dimensions.get("window").width,
    offset: Dimensions.get("window").width * index,
    index,
  });

  // Get data from firestore
  const db = getFirestore(app);
  useEffect(() => {
    user && getFav();
  }, [user]);

  const getFav = async () => {
    setFavList([]);
    const q = query(
      collection(db, "ev-fav-place"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFavList((favList) => [...favList, doc.data()]);
    });
  };

  const isFav = (place) => {
    const result = favList.find(
      (item) => item.place.place_id == place.place_id
    );
    console.log(result);
    return result ? true : false;
  };

  return (
    <View>
      <FlatList
        data={placeList}
        horizontal={true}
        pagingEnabled
        ref={flatListRef}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <PlaceItems
              place={item}
              isFav={isFav(item)}
              markedFav={() => getFav()}
            />
          </View>
        )}
      />
    </View>
  );
}
