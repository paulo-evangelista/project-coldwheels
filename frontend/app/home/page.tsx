'use client'
import Header from "../../components/BuyVehicleHeader/BuyVehicleHeader";
import Details from "../../components/BuyVehicleDetails/BuyVehicleDetails";
import VehicleEvents from "../../components/BuyVehicleEvents/BuyVehicleEvents";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function BuyVehiclePage({ }) {
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
