import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';

function Slider({ imageList }) {
    return (
        <div className="relative">
            {imageList ? (
                <Carousel>
                    <CarouselContent>
                        {imageList.map((image, index) => (
                            <CarouselItem key={index}>
                                <Image
                                    src={image.url}
                                    width={800}
                                    height={300}
                                    alt="img"
                                    className="rounded-xl object-cover h-[300px] w-full"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg" />
                    <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg" />
                </Carousel>
            ) : (
                <div className="w-full h-[200px] bg-slate-200 animate-pulse rounded-lg" />
            )}
        </div>
    );
}

export default Slider;
