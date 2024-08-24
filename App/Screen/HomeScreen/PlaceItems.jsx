import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ToastAndroid,
  Platform,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../Utils/Colors";
import GlobalApi from "../../Utils/GlobalApi";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { deleteDoc, getFirestore } from "firebase/firestore";
import { app } from "../../Utils/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

export default function PlaceItems({ place, isFav, markedFav }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    // Fetch photos for the place if available
    if (place.photos && place.photos.length > 0) {
      const photoReference = place.photos[0].photo_reference;
      const photoWidth = 400; // Adjust width as needed
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${photoWidth}&photoreference=${photoReference}&key=${GlobalApi.API_KEY}`;
      setPhotoUrl(photoUrl);
    }
  }, [place]);

  const { user } = useUser();
  const db = getFirestore(app);
  const onSetFav = async (app) => {
    await setDoc(doc(db, "ev-fav-place", place.place_id.toString()), {
      place: place,
      email: user?.primaryEmailAddress?.emailAddress,
    });
    markedFav();

    ToastAndroid.show("Fav Added!", ToastAndroid.TOP);
  };

  const onRemoveFav = async (placeId) => {
    await deleteDoc(doc(db, "ev-fav-place", placeId));
    ToastAndroid.show("Removed from Fav!", ToastAndroid.TOP);
    //markedFav()
  };

  const onDirectionClick = () => {
    const url = Platform.select({
      ios:
        "maps:" +
        place?.location?.latitude +
        "," +
        place?.location?.longitude +
        "?q=" +
        place?.vicinity,
      android:
        "geo:" +
        place?.location?.latitude +
        "," +
        place?.location?.longitude +
        "?q=" +
        place?.vicinity,
    });

    Linking.openURL(url);
  };

  return (
    <View
      style={{
        backgroundColor: Colors.CREAM,
        margin: 10,
        borderRadius: 15,
        width: Dimensions.get("screen").width * 0.8,
      }}
    >
      <LinearGradient colors={["transparent", "#ffffff"]}>
        {!isFav ? (
          <Pressable
            style={{ position: "absolute", right: 0, margin: 5 }}
            onPress={() => onSetFav()}
          >
            <Ionicons name="heart-outline" size={30} color="white" />
          </Pressable>
        ) : (
          <Pressable
            style={{ position: "absolute", right: 0, margin: 5 }}
            onPress={() => onRemoveFav(place.place_id)}
          >
            <Ionicons name="heart-sharp" size={30} color="red" />
          </Pressable>
        )}

        {photoUrl && place.rating !== null ? (
          <Image
            source={{ uri: photoUrl }}
            style={{
              width: "100%",
              borderRadius: 10,
              height: 160,
              zIndex: -1,
            }}
          />
        ) : (
          <Image
            source={require("./../../../assets/images/logo1.png")} // Default image if no photo available
            style={{ width: "100%", borderRadius: 10, height: 160 }}
          />
        )}

        <View style={{ padding: 5 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "outfit-medium",
            }}
          >
            {place.name}
          </Text>
          <Text
            style={{
              color: Colors.GRAY,
              fontFamily: "outfit",
            }}
          >
            {place.vicinity}
          </Text>

          <Text
            style={{
              fontFamily: "outfit-medium",

              fontSize: 17,
            }}
          >
            Rating
          </Text>

          <Text
            style={{
              fontFamily: "outfit",
              color: Colors.GRAY,
              fontSize: 20,
              marginTop: 2,
            }}
          >
            {place.rating}
          </Text>
          <Pressable
            onPress={() => onDirectionClick()}
            style={{
              padding: 10,
              backgroundColor: Colors.PRIMARY,
              borderRadius: 6,
              paddingHorizontal: 10,
              marginLeft: "auto",
            }}
          >
            <FontAwesome5 name="location-arrow" size={25} color="white" />
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}
