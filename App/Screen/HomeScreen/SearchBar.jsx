import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function SearchBar({searchedLocation}) {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search EV Station'
      fetchDetails={true}
      enablePoweredByContainer={false}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetail = true
        searchedLocation(details?.geometry?.location)
      }}
      query={{
        key: 'AIzaSyD2Q6ZU376FfXEz9BREFaNOWAlvJ2ncqIY',
        language: 'en',
      }}
    />
  )
}