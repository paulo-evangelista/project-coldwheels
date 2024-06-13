"use client";

import Header from "../../../components/BuyVehicleHeader/BuyVehicleHeader";
import Details from "../../../components/BuyVehicleDetails/BuyVehicleDetails";
import VehicleEvents from "../../../components/BuyVehicleEvents/BuyVehicleEvents";
import Sidebar from "@/components/Sidebar/Sidebar";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BuyVehiclePage({}) {
    const { carplate } = useParams();

    const [carData, setCarData] = useState(null);

    useEffect(() => {
        // const promise = axios.post("http://localhost:8080/inspect", {
        //     kind: "get_vehicle_by_plate",
        //     payload: {
        //         plate: carplate,
        //     },
        // });
        // promise.then((res) => {
        //     if (res.data.status != "Accepted") return;
        //     const payload = res.data.reports[0].payload;
        //     //convert from hex and load as json at var carData
        //     setCarData(
        //         JSON.parse(Buffer.from(payload, "hex").toString("utf-8"))
        //     );
        // });
    }, []);

    function hexToString(hex: any) {
        return Buffer.from(hex, "hex").toString("utf8");
    }

    return (
        <div className="h-screen px-14 flex flex-col bg-[#E1E8F0]">
            <div className="flex-shrink-0">
                <Header />
            </div>
            <div className="flex justify-between flex-grow overflow-hidden">
                <Sidebar />
                <Details />
                <VehicleEvents carPlate={carplate} />
            </div>
        </div>
    );
}
