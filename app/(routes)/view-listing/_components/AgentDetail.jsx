import Image from 'next/image'
import React from 'react'

function AgentDetail({listingDetail}) {
  return (
    <div className='flex gap-5 items-center p-5 rounded-lg shadow-md border'>
    <div>
        <Image src={listingDetail?.profileImage} width={60} height={60} alt="agent" className="rounded-full" />
        <div>
            <h2 className='text-lg font-bold'>{listingDetail?.fullName}</h2>
            <h2 className='text-gray-500'>{listingDetail?.created_by}</h2>
        </div>
    </div>
    </div>
  )
}

export default AgentDetail