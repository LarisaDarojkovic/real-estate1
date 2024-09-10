"use client";
import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Formik } from 'formik';
import { supabase } from '@/utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import FileUpload from '../_components/FileUpload';

function EditListing({ params }) {
    const { user } = useUser();
    const router = useRouter();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (user) {
            verifyUserRecord();
        }
    }, [user]);

    const verifyUserRecord = async () => {
        const { data, error } = await supabase
            .from('listing')
            .select('*, listingImages(listing_id, url)')
            .eq('created_by', user?.primaryEmailAddress.emailAddress)
            .eq('id', params.id);

        if (data && data.length > 0) {
            setListing(data[0]);
        } else {
            router.replace('/');
        }
        setLoading(false);
    };

    const onSubmitHandler = async (formValue) => {
        const { data, error } = await supabase
            .from('listing')
            .update(formValue)
            .eq('id', params.id)
            .select();

        if (data) {
            console.log('Data updated successfully:', data);
        }
        for (const image of images) {
            const file=image;
            const fileName=Date.now().toString();
            const fileExt=fileName.split('.').pop();
            const {data, error}=await supabase.storage.from('listingImages').upload(`${fileName}`, file, {
                upsert: false,
                contentType: `image/${fileExt}`,
            });

            if (error) {
                console.log('Error:', error.message);
            }
            else {
                const imageUrl=process.env.NEXT_PUBLIC_IMAGE_URL+fileName;
                const {data, error}=await supabase.from('listingImages').insert([
                    {
                        url: imageUrl,
                        listing_id: params?.id,
                    }
                ]).select()
            }
        }
        

        //if (error) {
        //    console.log('Error:', error.message);
        //}
    };

    const publishBtnHandler = async ()=> {
        const { data, error } = await supabase
            .from('listing')
            .update({active: true})
            .eq('id', params?.id)
            .select();

        if (data) {
            console.log('Data updated successfully:', data);
            router.push('/')
        }
    }
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='px-4 md:px-10 lg:px-36 my-10'>
            <h2 className='text-xl font-semibold mb-6'>
                Unesite dodatne detalje o nekretnini.
            </h2>

            {listing && (
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        profileImage:user?.imageUrl,
                        fullName:user?.fullName,
                        type: listing.type || 'Sell',
                        propertyType: listing.propertyType || '',
                        bedroom: listing.bedroom || 0,
                        bathroom: listing.bathroom || 0,
                        area: listing.area || 0,
                        price: listing.price || 0,
                        description: listing.description || '',
                        parking: listing.parking || 0,
                        builtIn: listing.builtIn || '',
                    }}
                    onSubmit={(values) => {
                        onSubmitHandler(values);
                    }}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        setFieldValue
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className='p-8 rounded-lg shadow-md'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                    {/* Za najam ili prodaju */}
                                    <div className='flex flex-col gap-2'>
                                        <h2>Za najam ili prodaju?</h2>
                                        <RadioGroup defaultValue={values.type} onValueChange={(v) => setFieldValue('type', v)}>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Rent" id="Rent" />
                                                <Label htmlFor="Rent">Najam</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Sell" id="Sell" />
                                                <Label htmlFor="Sell">Prodaja</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    {/* Tip nekretnine */}
                                    <div className='flex flex-col gap-2'>
                                        <h2>Tip nekretnine</h2>
                                        <Select defaultValue={values.propertyType} onValueChange={(v) => setFieldValue('propertyType', v)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Tip nekretnine" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="House">Kuća</SelectItem>
                                                <SelectItem value="Condo">Stan</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Broj spavaćih soba */}
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor="bedroom">Broj spavaćih soba</Label>
                                        <Input
                                            type="number"
                                            id="bedroom"
                                            placeholder="Broj spavaćih soba"
                                            onChange={handleChange}
                                            value={values.bedroom}
                                        />
                                    </div>

                                    {/* Broj kupaonica */}
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor="bathroom">Broj kupaonica</Label>
                                        <Input
                                            type="number"
                                            id="bathroom"
                                            placeholder="Broj kupaonica"
                                            onChange={handleChange}
                                            value={values.bathroom}
                                        />
                                    </div>

                                    {/* Površina */}
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor="area">Površina (m²)</Label>
                                        <Input
                                            type="number"
                                            id="area"
                                            placeholder="Površina (u m²)"
                                            onChange={handleChange}
                                            value={values.area}
                                        />
                                    </div>

                                    {/* Cijena */}
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor="price">Cijena</Label>
                                        <Input
                                            type="number"
                                            id="price"
                                            placeholder="Cijena (u EUR)"
                                            onChange={handleChange}
                                            value={values.price}
                                        />
                                    </div>

                                    {/* Godina izgradnje */}
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor="builtIn">Godina izgradnje</Label>
                                        <Input
                                            type="number"
                                            id="builtIn"
                                            placeholder="Godina izgradnje"
                                            onChange={handleChange}
                                            value={values.builtIn}
                                        />
                                    </div>

                                    {/* Broj parkinga */}
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor="parking">Broj parkinga</Label>
                                        <Input
                                            type="number"
                                            id="parking"
                                            placeholder="Broj parkinga"
                                            onChange={handleChange}
                                            value={values.parking}
                                        />
                                    </div>

                                    {/* Opis */}
                                    <div className='flex flex-col gap-2 md:col-span-2 lg:col-span-3'>
                                        <Label htmlFor="description">Opis nekretnine</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Unesite opis nekretnine"
                                            rows={5}
                                            onChange={handleChange}
                                            value={values.description}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h2 className='text-gray-500 my-2'>Prijenos slika</h2>
                                    <FileUpload setImages={(value)=>setImages(value)}
                                        imageList={listing.listingImages}
                                        />
                                </div>
                                <div className="flex justify-end mt-6 gap-4">
                                    <Button onClick={()=>publishBtnHandler()}>Spremi i Objavi</Button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            )}
        </div>
    );
}

export default EditListing;
