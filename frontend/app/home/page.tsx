"use client";
import Header from "../../components/BuyVehicleHeader/BuyVehicleHeader";
import Details from "../../components/BuyVehicleDetails/BuyVehicleDetails";
import VehicleEvents from "../../components/BuyVehicleEvents/BuyVehicleEvents";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

import GLBViewer from "@/components/Render3d/Render3d";

export default function BuyVehiclePage({}) {
    return (
        <div className="h-screen px-14 flex flex-col bg-[#E1E8F0]">
            <div className="flex-shrink-0">
                <Header />
            </div>
            <div className="flex justify-between flex-grow overflow-hidden">
                <Sidebar />
                <div className="flex flex-grow items-center justify-center text-xl font-semibold text-center text-black">
                    <div className=" bg-white p-4 rounded-xl shadow-lg">
                        <GLBViewer
                            glbPath="/models/car2.glb"
                            sensitivity={8.5}
                            scale={0.06}
                        />
                        <p>Search for a car</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
