import { Button } from '@/components/ui/button'
import { Bath, BedDouble, MapPin, Ruler, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function MarkerListingItem({item, closeHandler}) {
  return (
    <div>
        <div className='cursor-pointer rounded-lg w-[180px]'>
            <X onClick={()=>closeHandler()} />
            <Image
              src={item.listingImages[0].url}
              width={800}
              height={150}
              className='rounded-lg object-cover h-[120px] w-[180px]'
              alt="Preview"
            />
            <div className='flex mt-2 flex-col gap-2 p-2 bg-white'>
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
              </div>
              <Link href={'/view-listing/'+item.id} className='w-full'> <Button size="sm">Detalji</Button></Link>
            </div>
          </div>
    </div>
  )
}

export default MarkerListingItem