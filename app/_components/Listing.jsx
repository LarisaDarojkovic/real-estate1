import { Bath, BedDouble, MapPin, Ruler, Search } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import GoogleAddressSearch from './GoogleAddressSearch'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Listing({ listing, handleSearchClick, searchedAddress, setCoordinates }) {
    const [address, setAddress]=useState();
  return (
    <div>
      <div className='p-3 flex items-center gap-4'>
        <div className='flex-1'>
          <GoogleAddressSearch
            selectedAddress={(address) => {searchedAddress(address); setAddress(address)}}
            setCoordinates={setCoordinates}
          />
        </div>
        <Button className='flex-shrink-0 flex items-center gap-2'
        onClick={handleSearchClick}
        > 
          <Search className='h-4 w-4' /> 
          Pretraga 
        </Button>
      </div>
      {address && <div className='px-3'>
        <h2 className='text-lg'>{listing?.length} rezultata za <span>{address?.label}</span></h2>
      </div>}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
      {listing.map((item, index) => (
  <Link href={'/view-listing/' + item.id} key={index}>
    <div className='p-3 hover:border hover:border-primary cursor-pointer rounded-lg'>
      {item.listingImages && item.listingImages.length > 0 ? (
        <Image
          src={item.listingImages[0].url}
          width={800}
          height={150}
          className='rounded-lg object-cover h-[180px]'
          alt="Preview"
        />
      ) : (
        <div className='bg-gray-300 rounded-lg object-cover h-[180px] flex justify-center items-center'>
          <p>No Image Available</p>
        </div>
      )}
      <div className='flex mt-2 flex-col gap-2'>
        <h2 className='font-bold text-xl'>€{item.price}</h2>
        <h2 className='flex gap-2 text-sm text-gray-700'>
          <MapPin className='h-4 w-4' />
          {item.address}
        </h2>
        <div className='flex gap-2 mt-2'>
          <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 items-center'>
            <BedDouble className='h-4 w-4' /> {item.bedroom}
          </h2>
          <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 items-center'>
            <Bath className='h-4 w-4' /> {item.bathroom}
          </h2>
          <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 items-center'>
            <Ruler className='h-4 w-4' /> {item.area}
            <p>m<sup>2</sup></p>
          </h2>
        </div>
      </div>
    </div>
  </Link>
))}

      </div>
    </div>
  )
}

export default Listing