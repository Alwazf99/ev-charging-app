import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../Utils/Colors";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { app } from "../../Utils/FirebaseConfig";
import PlaceItems from "../HomeScreen/PlaceItems";

export default function FavouriteScreen() {
  const db = getFirestore(app);
  const { user } = useUser();
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && getFav();
  }, [user]);
  const getFav = async () => {
    setFavList([]);
    setLoading(true);
    const q = query(
      collection(db, "ev-fav-place"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFavList((favList) => [...favList, doc.data()]);
      setLoading(false);
    });
  };
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontFamily: "outfit-medium",
          marginTop: 5,
          fontSize: 30,
          padding: 5,
        }}
      >
        My Favourite <Text style={{ color: Colors.PRIMARY }}>List</Text>
      </Text>
      {!favList ? (
        <View
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} />
          <Text style={{ fontFamily: "outfit", margin: 5 }}>Loading...</Text>
        </View>
      ) : null}

      <FlatList
        data={favList}
        onRefresh={() => getFav()}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <PlaceItems
            place={item.place}
            isFav={true}
            markedFav={() => getFav()}
          />
        )}
      />
    </View>
  );
}
