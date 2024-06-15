"use client";
import Header from "../../components/BuyVehicleHeader/BuyVehicleHeader";
import Details from "../../components/BuyVehicleDetails/BuyVehicleDetails";
import VehicleEvents from "../../components/BuyVehicleEvents/BuyVehicleEvents";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

export default function BuyVehiclePage({}) {
    return (
        <div className="h-screen px-14 flex flex-col bg-[#E1E8F0]">
            <div className="flex-shrink-0">
                <Header />
            </div>
            <div className="flex justify-between flex-grow overflow-hidden">
                <Sidebar />
                <div className="flex flex-grow items-center justify-center text-2xl text-black">
                    <div className=" bg-white p-4 rounded-xl shadow-lg">
                        Search for a vehicle
                    </div>
                </div>
            </div>
        </div>
    );
}
