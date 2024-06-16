"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";

import BuyVehicleDetails from "../BuyVehicleDetails/BuyVehicleDetails";

export default function FavoritesCard({
    carPlate,
    height = "h-full",
}: {
    carPlate: string;
    height?: string;
}) {
    const router = useRouter();

    const [carData, setCarData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(false);

    useEffect(() => {
        const promise = axios.post("http://localhost:8080/inspect", {
            kind: "get_vehicle_by_plate",
            payload: {
                plate: carPlate,
            },
        });

        promise.then((res) => {
            if (res.data.status == "Accepted") {
                const payload = res.data.reports[0].payload;
                const carData = hexToJson(payload);

                setCarData(() => {
                    return { ...carData };
                });
                setLoading(false);
                setFound(true);
            } else {
                setLoading(false);
                setFound(false);
            }
        });

        promise.catch((err) => {
            setLoading(false);
            setFound(false);
        });
    }, []);

    function handleClicl() {
        router.push(`/home/${carData.plate}`);
    }

    function hexToJson(hex: any) {
        const asString = ethers.utils.toUtf8String(hex);
        return JSON.parse(asString);
    }

    return (
        <div
            className={`w-[40%] ${height} rounded-xl flex items-center justify-center bg-white border cursor-pointer hover:shadow-xl transition duration-300 ease-in-out`}
            onClick={handleClicl}
        >
            {loading ? (
                <div className="h-full w-full flex items-center justify-center">
                    Loading...
                </div>
            ) : found ? (
                <BuyVehicleDetails carData={carData} width="w-5/6" />
            ) : (
                <></>
            )}
        </div>
    );
}
