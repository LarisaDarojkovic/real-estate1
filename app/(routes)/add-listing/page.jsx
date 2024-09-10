"use client"

import GoogleAddressSearch from '@/app/_components/GoogleAddressSearch'
import { Button } from '@/components/ui/button'
import { supabase } from '@/utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function AddListing() {
    const [selectedAddress, setSelectedAddress] = useState();
    const [coordinates, setCoordinates] = useState();
    const { user } = useUser();
    const router = useRouter();

    const nextHandler = async () => {
        if (!user) {
            // redirect ako nije sign inan
            router.push('/sign-in');
            return;
        }
        console.log(selectedAddress, coordinates)

        const { data, error } = await supabase
            .from('listing')
            .insert([
                { 
                    address: selectedAddress.label, 
                    coords: coordinates, 
                    created_by: user?.primaryEmailAddress.emailAddress,
                    active: false
                },
            ])
            .select()

        if (data && data.length > 0) {
            console.log("New Data added", data[0])
            const newListingId = data[0].id;
            router.push(`/edit-listing/${newListingId}`);
        }
        if (error) {
            console.log("Error", error)
        }
    }
    return (
        <div className='mt-10 md:mx-56 lg:mx-80'>
            <div className='p-10 flex flex-col gap-5 items-center justify-center'>
                <h2 className='font-bold text-2xl'>Dodaj Oglas</h2>
                <div className='p-10 rounded-lg border shadow-md flex flex-col gap-4 w-full'>
                    <h2 className='text-gray'> Ovdje unesite adresu nekretnine. </h2>
                    <GoogleAddressSearch
                        selectedAddress={(value) => setSelectedAddress(value)}
                        setCoordinates={(value) => setCoordinates(value)}
                    />
                    <Button disabled={!selectedAddress || !coordinates} onClick={nextHandler}>Sljedeće</Button>
                </div>
            </div>
        </div>
    )
}

export default AddListing
