"use client";

import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import Section from "../LandingPageSection/LandingPageSection";

const CarouselCars = () => {
    return (
        <Carousel
            className="w-full h-full mt-20"
            plugins={[
                Autoplay({
                    delay: 4000,
                }),
            ]}
        >
            <CarouselContent className="h-full">
                <CarouselItem className="h-full">
                    <Section
                        modelPath="/models/car.glb"
                        isReverse={false}
                        text="lorem ipsum lorem ipsum"
                        scale={1.3}
                    />
                </CarouselItem>
                <CarouselItem className="h-full">
                    <Section
                        modelPath="/models/car2.glb"
                        isReverse={true}
                        text="lorem ipsum lorem ipsum"
                        scale={0.05}
                    />
                </CarouselItem>
                <CarouselItem className="h-full">
                    <Section
                        modelPath="/models/nissan.glb"
                        isReverse={false}
                        text="lorem ipsum lorem ipsum"
                        scale={0.9}
                    />
                </CarouselItem>
                <CarouselItem className="h-full">
                    <Section
                        modelPath="/models/red_car.glb"
                        isReverse={true}
                        text="lorem ipsum lorem ipsum"
                        scale={1.9}
                    />
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="bg-black" />
            <CarouselNext className="bg-black" />
        </Carousel>
    );
};

export default CarouselCars;
