"use client";

import Header from "../../../components/BuyVehicleHeader/BuyVehicleHeader";
import Details from "../../../components/BuyVehicleDetails/BuyVehicleDetails";
import VehicleEvents from "../../../components/BuyVehicleEvents/BuyVehicleEvents";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BuyVehiclePage({}) {
    const router = useRouter();
    const { carplate } = router.query;

    const [carData, setCarData] = useState(null);

    useEffect(() => {
        //send inspect and get return
    }, []);

    return (
        <div className="h-screen px-14 flex flex-col">
            <div className="flex-shrink-0">
                <Header />
            </div>
            <div className="flex justify-between flex-grow overflow-hidden">
                <Details />
                <VehicleEvents />
            </div>
        </div>
    );
}
