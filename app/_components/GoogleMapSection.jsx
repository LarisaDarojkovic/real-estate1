import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MarkerItem from './MarkerItem';

const containerStyle = {
    width: '100%',
    height: '80vh',
};

function GoogleMapSection({ coords, listing }) {
    const [center, setCenter] = useState({
        lat: -3.745,
        lng: -38.523,
    });

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY,
    });

    useEffect(() => {
        if (coords && coords.lat && coords.lng) {
            setCenter({
                lat: coords.lat,
                lng: coords.lng,
            });
        }
    }, [coords]);

    const onLoad = useCallback((map) => {
        if (center && center.lat && center.lng) {
            map.panTo(center);
        }
    }, [center]);

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
        >
            {listing.map((item, index) => (
                <MarkerItem key={index} item={item} />
            ))}
        </GoogleMap>
    );
}

export default GoogleMapSection;
