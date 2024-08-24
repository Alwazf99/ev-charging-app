import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import FavouriteScreen from '../Screen/FavouriteScreen/FavouriteScreen';
import ProfileScreen from '../Screen/ProfileScreen/ProfileScreen';
import Colors from '../Utils/Colors';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
     }}
    >
        <Tab.Screen name='home'
         component={HomeScreen}
         options={{
            tabBarLabel: 'Search',
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarIcon:  ({color, size}) => (
                <Ionicons name="search" size={size} color={color} />
            )
         }}
        />
        <Tab.Screen name='favourite'
         component={FavouriteScreen}
         options={{
            tabBarLabel: 'Favourite',
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarIcon:  ({color, size}) => (
                <Ionicons name="heart" size={size} color={color} />
            )
         }}
        />
        <Tab.Screen name='profile'
         component={ProfileScreen}
         options={{
            tabBarLabel: 'Profile',
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarIcon:  ({color, size}) => (
                <FontAwesome name="user-circle" size={size} color={color} />
            )
         }}
        />
    </Tab.Navigator>
  )
}