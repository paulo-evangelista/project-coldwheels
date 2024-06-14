"use client";

import Header from "../../../components/BuyVehicleHeader/BuyVehicleHeader";
import Details from "../../../components/BuyVehicleDetails/BuyVehicleDetails";
import VehicleEvents from "../../../components/BuyVehicleEvents/BuyVehicleEvents";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { ethers } from "ethers";
import axios from "axios";

export default function BuyVehiclePage({}) {
    const { carplate } = useParams();

    const [carData, setCarData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(false);

    useEffect(() => {
        const promise = axios.post("http://localhost:8080/inspect", {
            kind: "get_vehicle_by_plate",
            payload: {
                plate: carplate,
            },
        });

        promise.then((res) => {
            if (res.data.status != "Accepted") return;
            const payload = res.data.reports[0].payload;

            setCarData(() => {
                return { ...hexToJson(payload) };
            });
            setLoading(false);
            setFound(true);
        });
    }, []);

    function hexToJson(hex: any) {
        const asString = ethers.utils.toUtf8String(hex);
        //printa tipo de dado
        console.log(typeof asString);
        return JSON.parse(asString);
    }

    return (
        <div className="h-screen px-14 flex flex-col bg-[#E1E8F0]">
            <div className="flex-shrink-0">
                <Header />
            </div>
            <div className="flex justify-between flex-grow overflow-hidden">
                <Sidebar />
                {loading ? (
                    <div className="h-full w-full flex items-center justify-center">
                        <Bars height="100" color="#000" />
                    </div>
                ) : found ? (
                    <>
                        <Details carData={carData} />
                        <VehicleEvents carData={carData} carPlate={carplate} />
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-black text-3xl">
                        <h1>Veículo não encontrado</h1>
                    </div>
                )}
            </div>
        </div>
    );
}
