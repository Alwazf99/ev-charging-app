import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { FontAwesome5 } from '@expo/vector-icons';

export default function Header() {
    const {user} = useUser();
  return (
    <View style={styles.container}>
      <Image source ={{uri: user?.imageUrl}}
          style={{width: 45, height: 45, borderRadius: 99}}
      />
      <Image source={require('./../../../assets/images/logo1.png')} 
         style={{width: 200, height: 45, objectFit:'contain'}}
      />
      <FontAwesome5 name="filter" size={26} color="black" />
    </View>
  )
}

const styles= StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    }
})