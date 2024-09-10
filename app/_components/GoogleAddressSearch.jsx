"use client"

import React from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

function GoogleAddressSearch({ selectedAddress, setCoordinates }) {
  const handleAddressChange = (address) => {
    if (address) {
      selectedAddress(address)
      geocodeByAddress(address.label)
        .then(result => getLatLng(result[0]))
        .then(({ lat, lng }) => {
          setCoordinates({ lat, lng })
        })
        .catch(error => console.error("Geocode error: ", error))
    } else {
      // Handle the case where address is cleared
      selectedAddress(null)
      setCoordinates(null)
    }
  }

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
        selectProps={{
          placeholder: 'Unesite adresu',
          isClearable: true,
          className: 'w-full p-2',
          onChange: handleAddressChange,
        }}
      />
    </div>
  )
}

export default GoogleAddressSearch
