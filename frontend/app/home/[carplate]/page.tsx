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

import GLBViewer from "@/components/Render3d/Render3d";

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
            alert(err);
            setLoading(false);
            setFound(false);
        });
    }, []);

    function hexToJson(hex: any) {
        const asString = ethers.utils.toUtf8String(hex);
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
                    <div className="flex justify-between flex-grow overflow-hidden">
                        <div className="flex flex-grow items-center justify-center text-xl font-semibold text-center text-black">
                            <div className=" bg-white p-4 rounded-xl shadow-lg">
                                <GLBViewer
                                    glbPath="/models/car2.glb"
                                    sensitivity={8.5}
                                    scale={0.06}
                                />
                                <p>Car not found</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
