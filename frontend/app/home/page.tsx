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
        <div className="w-full h-screen flex bg-white">
            <Sidebar />
            <div className="w-full h-full flex flex-col px-14">
                <Header />
                <div className="w-full h-full flex items-center justify-center">
                    <div className="bg-white p-4 rounded-xl">
                        <div className="">
                            <GLBViewer
                                glbPath="/models/car2.glb"
                                sensitivity={8.5}
                                scale={0.06}
                            />
                        </div>
                        <p className="text-xl font-semibold text-center text-black">
                            Search for a car
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
