"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";

import BuyVehicleHeader from "@/components/BuyVehicleHeader/BuyVehicleHeader";
import FavoritesCard from "@/components/FavoritesCard/FavoritesCard";

export default function Favorites() {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const currentlocalStorageList = localStorage.getItem("carPlateList");
        if (!currentlocalStorageList) return;

        const carPlateList = JSON.parse(currentlocalStorageList);

        setFavorites([...carPlateList]);
    }, []);

    return (
        <div className="w-full h-screen px-14 flex flex-col bg-[#E1E8F0]">
            <BuyVehicleHeader />
            <ScrollArea className="w-full h-full rounded-xl px-6 py-4">
                <div className="grid grid-cols-6 gap-4">
                    {favorites.map((carPlate: any) => (
                        <FavoritesCard key={carPlate} carPlate={carPlate} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
