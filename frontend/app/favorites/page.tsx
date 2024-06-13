"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

import BuyVehicleHeader from "@/components/BuyVehicleHeader/BuyVehicleHeader";
import FavoritesCard from "@/components/FavoritesCard/FavoritesCard";

export default function Favorites() {
    return (
        <div className="w-full h-screen px-14 flex flex-col bg-[#E1E8F0]">
            <BuyVehicleHeader />
            <ScrollArea className="w-full h-full rounded-xl px-6 py-4">
                <div className="grid grid-cols-6 gap-4">
                    <FavoritesCard />
                    <FavoritesCard />
                    <FavoritesCard />
                    <FavoritesCard />
                    <FavoritesCard />
                    <FavoritesCard />
                    <FavoritesCard />
                </div>
            </ScrollArea>
        </div>
    );
}
