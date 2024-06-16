"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import styled from "styled-components";

import BuyVehicleHeader from "@/components/BuyVehicleHeader/BuyVehicleHeader";
import FavoritesCard from "@/components/FavoritesCard/FavoritesCard";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Favorites() {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const currentlocalStorageList = localStorage.getItem("carPlateList");
        if (!currentlocalStorageList) return;

        const carPlateList = JSON.parse(currentlocalStorageList);
        setFavorites([...carPlateList]);
    }, []);

    return (
        <div className="w-full h-screen flex">
            <Sidebar />
            <div className="w-full flex flex-col px-14">
                <BuyVehicleHeader />
                <StyledContainer>
                    {favorites.map((carPlate: any) => (
                        <FavoritesCard carPlate={carPlate} height="100%" />
                    ))}
                </StyledContainer>
            </div>
        </div>
    );
}

// muito chato colocar estilo no scroll pelo tailwind
const StyledContainer = styled.div`
    width: 100%;
    height: 100%;

    padding-bottom: 50px;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;

    overflow-y: scroll;
    scrollbar-color: red;

    &::-webkit-scrollbar {
        width: 12px;
        border-radius: 10px;
        background-color: #f4f4f4;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #c4c4c4;
    }
`;
