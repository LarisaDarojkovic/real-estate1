"use client"
import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import { supabase } from '@/utils/supabase/client'
import GoogleMapSection from './GoogleMapSection';

function ListingMapView({type}) {

    const [listing, setListing]=useState([]);
    const [searchedAddress, setSearchedAddress] = useState();
    const [coords, setCoords]=useState();

    useEffect(()=>{
        getLatestListing()
    }, [])

    const getLatestListing=async()=>{
        const {data, error}=await supabase.from('listing').select('*, listingImages(url, listing_id)').order('created_at', {ascending: false})
        .eq('active', true)
        .eq('type', type)

        if(data) {
            setListing(data)
        }
        if(error) {
            console.log(error)
        }
    }

    const handleSearchClick=async()=>{
        console.log(searchedAddress)
        const searchTerm=searchedAddress?.value?.structured_formatting?.main_text
       const {data, error}=await supabase.from('listing').select('*, listingImages(url, listing_id)').order('id', {ascending: false})
       .eq('active', true)
       .eq('type', type)
       .like('address', '%'+searchTerm+'%')

       if(data) {
            setListing(data)
       }
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
            <Listing listing={listing} 
            handleSearchClick={handleSearchClick}
            searchedAddress={(v)=>setSearchedAddress(v)}
            setCoordinates={setCoords}
            />
        </div>
        <div className='fixed right-10 h-full md:w-[350px] lg:w-[450px] xl:w-[650px]'>
            <GoogleMapSection
                listing={listing}
                coords={coords}
            />
        </div>

    </div>
  )
}

export default ListingMapView