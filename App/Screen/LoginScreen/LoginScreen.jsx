import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import  Colors  from './../../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../../hooks/warmUpBrowser';
import { useOAuth } from "@clerk/clerk-expo";


WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = async() =>{
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }


  return (
    <View style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 80
    }}>
      <Image source={require('./../../../assets/images/logo1.png')} 
      style={styles.logoImage}
      />
      <Image source={require('./../../../assets/images/ev-car-charging.png')} 
      style={styles.bgImage}
      />

      <View>
        <Text style={styles.heading}>Your Ultimate Ev Charging Station Finder</Text>
        <Text style={styles.desc}>Find EV charging stations near you, plan your trip and much more</Text>

        <TouchableOpacity 
         onPress={onPress}
        style={styles.button}>
          <Text style={{
            textAlign: 'center',
            fontFamily: 'outfit',
            color: Colors.WHITE,
            fontSize: 15,
          
          }}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    logoImage: {
        width: 200,
        height: 50,
        objectFit: 'contain',
    },

    bgImage: {
      height: 200,
      width: '100%',
      marginTop: 20,
      objectFit: 'cover',
    },

    heading: {
      fontSize: 25,
      fontFamily: 'outfit-bold',
      textAlign: 'center',
      marginTop: 30,
    },

    desc: {
      fontSize: 15,
      fontFamily: 'outfit',
      textAlign: 'center',
      marginTop: 10,
      color: Colors.GRAY
    },

    button:{
      backgroundColor: Colors.PRIMARY,
      padding:16,
      display: 'flex',
      borderRadius: 99,
      marginTop: 60
    }
    
})