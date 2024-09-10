import React from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import AgentDetail from './AgentDetail';
import { MapPin } from 'lucide-react';

const containerStyle = {
    width: '100%',
    height: '300px',
};

function Details({ listingDetail }) {
    const { propertyType, builtIn, area, parking, bedroom, bathroom, description, coords, price, address } = listingDetail || {};

    if (!listingDetail) return null;

    return (
        <div className='my-6 flex flex-col gap-6'>
            <div>
                <h2 className='font-bold text-3xl mb-2'>
                    {propertyType === 'Condo' ? 'Stan' : 'Kuća'} u {area} m² za €{price}
                </h2>
                <h2 className='flex gap-2 text-sm text-gray-700'>
                    <MapPin className='h-4 w-4' />
                    {address}
                </h2>
            </div>

            <div className='bg-white shadow-md rounded-lg p-6 border'>
                <h3 className='font-bold text-2xl mb-4'>Detalji o nekretnini</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <p><strong>Tip nekretnine:</strong> {propertyType === 'Condo' ? 'Stan' : 'Kuća'}</p>
                    <p><strong>Godina izgradnje:</strong> {builtIn}</p>
                    <p><strong>Površina:</strong> {area} m²</p>
                    <p><strong>Broj parkirnih mjesta:</strong> {parking}</p>
                    <p><strong>Broj spavaćih soba:</strong> {bedroom}</p>
                    <p><strong>Broj kupaonica:</strong> {bathroom}</p>
                </div>
            </div>

            <div className='bg-white shadow-md rounded-lg p-6 border mb-6'>
                <h3 className='font-bold text-2xl mb-4'>Opis</h3>
                <p className='break-words'>
                    {description}
                </p>
            </div>
            <div className='bg-white shadow-md rounded-lg p-6 border'>
                <h3 className='font-bold text-2xl mb-4'>Lokacija</h3>
                {coords?.lat && coords?.lng ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{ lat: coords.lat, lng: coords.lng }}
                        zoom={15}
                    >
                        <MarkerF position={{ lat: coords.lat, lng: coords.lng }} />
                    </GoogleMap>
                ) : (
                    <p>Učitavanje karte...</p>
                )}
            </div>

            <div>
                <AgentDetail listingDetail={listingDetail} />
            </div>
        </div>
    );
}

export default Details;
