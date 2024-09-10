import { MarkerF, OverlayView } from '@react-google-maps/api';
import React, { useState } from 'react';
import MarkerListingItem from './MarkerListingItem';

function MarkerItem({ item }) {
    if (!item.coords || !item.coords.lat || !item.coords.lng) {
        return null; // Avoid rendering if coordinates are not available
    }

    const [selectedListing, setSelectedListing]=useState();

    return (
        <MarkerF
            position={{ lat: item.coords.lat, lng: item.coords.lng }}
            onClick={() => {
                setSelectedListing(item);
            }}
        >
            {selectedListing && <OverlayView
                position={selectedListing.coords}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                    <div>
                        <MarkerListingItem
                        closeHandler={()=>setSelectedListing(null)}
                        item={selectedListing} />
                    </div>
            </OverlayView>}

        </MarkerF>
    );
}

export default MarkerItem;
