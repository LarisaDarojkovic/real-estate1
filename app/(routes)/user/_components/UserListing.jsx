import { Button } from '@/components/ui/button'
import { supabase } from '@/utils/supabase/client'
import { useUser } from '@clerk/nextjs'
import { Bath, BedDouble, MapPin, Ruler } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function UserListing() {
    const { user } = useUser()
    const [listing, setListing] = useState([])

    useEffect(() => {
        if (user) {
            GetUserListing()
        }
    }, [user])

    const GetUserListing = async () => {
        const { data, error } = await supabase
            .from('listing')
            .select('*, listingImages(url, listing_id)')
            .eq('created_by', user?.primaryEmailAddress.emailAddress)

        if (error) {
            console.error('Error fetching listings:', error)
        } else {
            setListing(data)
        }
    }

    const deleteListing = async (id) => {
        if (confirm('Jeste li sigurni da želite izbrisati ovaj oglas?')) {
            try {
                // Delete listing images first
                const { error: imageError } = await supabase
                    .from('listingImages')
                    .delete()
                    .eq('listing_id', id)

                if (imageError) throw imageError

                // Delete the listing
                const { error: listingError } = await supabase
                    .from('listing')
                    .delete()
                    .eq('id', id)

                if (listingError) throw listingError

                // Remove the deleted listing from the state
                setListing(prevListings => prevListings.filter(item => item.id !== id))
            } catch (error) {
                console.error('Error deleting listing:', error)
            }
        }
    }

    return (
        <div>
            <h2 className='font-bold text-2xl mb-4'>
                Moji oglasi
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {listing && listing.map((item) => (
                    <div key={item.id} className='relative p-3 hover:border hover:border-primary cursor-pointer rounded-lg overflow-hidden'>
                        <h2 className='bg-primary text-white px-2 absolute top-2 left-2 rounded'>
                            {item.active ? 'Objavljen' : 'Skica'}
                        </h2>
                        <Image
                            src={item?.listingImages[0] ? item?.listingImages[0]?.url : '/landscape-placeholder.svg'}
                            width={800}
                            height={150}
                            className='rounded-lg object-cover h-[180px]'
                            alt="Preview"
                        />
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
                            <div className='flex gap-2 mt-2'>
                                <Link href={`/edit-listing/${item.id}`} className='w-full'>
                                    <Button size='sm' variant='outline' className='w-full'>Uredi</Button>
                                </Link>
                                <Button
                                    size='sm'
                                    variant='destructive'
                                    className='w-full'
                                    onClick={(e) => {
                                        e.stopPropagation() // Prevents navigation when clicking the delete button
                                        deleteListing(item.id)
                                    }}
                                >
                                    Izbriši
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserListing
