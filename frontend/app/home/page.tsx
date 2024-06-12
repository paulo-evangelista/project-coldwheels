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
    const [isChecking, setIsChecking] = useState<boolean>(true);
    const { address: wallet, isConnected } = useAccount();
    // const router = useRouter();

    // const getWallet = async () => {
    //     var accountCreatedStatus = false
    //     const response = await axios.post('http://localhost:8080/inspect', { "kind": "company", "payload": { wallet } }).then((response) => {
    //         return response;
    //     }).catch((error) => {
    //         console.error("error is ", error);
    //         return error;
    //     });

    //     if (response.data.status === "Accepted") {
    //         accountCreatedStatus = true;
    //     } else {
    //         accountCreatedStatus = false;
    //     }

    //     return accountCreatedStatus;
    // }

    // useEffect(() => {
    //     const checkAccountStatus = async () => {
    //         if (!isConnected) {
    //             const accountExists = await getWallet();
    //             setIsChecking(accountExists);
    //             if (accountExists) {
    //                 toast.info("Redirecting to dashboard...");
    //                 // setTimeout(() => {
    //                 //     router.push('/home');
    //                 // }, 1500);
    //             }
    //         }
    //     };
    //     checkAccountStatus();
    // }, [isConnected]);

    return (
        <div className="h-screen px-14 flex flex-col">
            {/* <div className="flex h-screen bg-white"> */}
            {/* <Sidebar /> */}
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
