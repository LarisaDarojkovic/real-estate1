"use client"

import { Button } from '@/components/ui/button'
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function Header() {
    const path = usePathname();
    const { user, isSignedIn } = useUser();

    useEffect(() => {
        console.log(path)
    }, [])
    return (
        <div className='p-6 px-10 flex justify-between items-center shadow-sm fixed top-0 w-full bg-white z-50'>
            <div className='flex gap-10 items-center'>
                <Image src={'/logo.svg'} width={150} height={150} alt='logo' />
                <ul className='hidden md:flex gap-10'>
                    <Link href={'/'}>
                        <li className={`'hover:opacity-50 font-medium cursor-pointer' ${path == '/' && 'opacity-50'}`}>Kupnja Nekretnine</li>
                    </Link>
                    <Link href={'/rent'}>
                        <li className={`'hover:opacity-50 font-medium cursor-pointer' ${path == '/rent' && 'opacity-50'}`}>Najam Nekretnine</li>
                    </Link>
                </ul>
            </div>
            <div className='flex gap-4 items-center'>
                <Link href={'/add-listing'}>
                    <Button className='flex gap-2'><Plus />Objava oglasa</Button>
                </Link>
                {isSignedIn ? 
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Image src={user?.imageUrl} width={35} height={35} alt='user' className='rounded-full'/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    <DropdownMenuLabel>Moj račun</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link href={'/user'}>Profil</Link></DropdownMenuItem>
                    <DropdownMenuItem> <SignOutButton>Odjava</SignOutButton></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                    : <Link href={'/sign-in'}> <Button variant="outline">Prijava</Button> </Link>}
            </div>
        </div>
    )
}

export default Header