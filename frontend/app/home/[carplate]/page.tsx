"use client";

import Header from "../../../components/BuyVehicleHeader/BuyVehicleHeader";
import Details from "../../../components/BuyVehicleDetails/BuyVehicleDetails";
import VehicleEvents from "../../../components/BuyVehicleEvents/BuyVehicleEvents";
import Sidebar from "@/components/Sidebar/Sidebar";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import axios from "axios";

const mockCarData = {
    status: "success",
    message: {
        ID: 1,
        CreatedAt: "2024-06-13T14:28:33.691828-03:00",
        UpdatedAt: "2024-06-13T14:28:33.691828-03:00",
        DeletedAt: null,
        Plate: "ABC1234",
        Incidents: [
            {
                ID: 1,
                CreatedAt: "2024-06-13T14:28:33.69211-03:00",
                UpdatedAt: "2024-06-13T14:28:33.69211-03:00",
                DeletedAt: null,
                incident_type: {
                    ID: 0,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                    DeletedAt: null,
                    Name: "aaaaaaaaa",
                },
                incident_type_id: 4,
                Description: "Realizada na concessionaria FFA1242",
                incident_date: "2024-06-13T14:28:33.692104-03:00",
                Company: {
                    ID: 0,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                    DeletedAt: null,
                    Name: "",
                    Kind: "",
                    Description: "",
                    Wallet: "",
                    Address: "",
                    Role: 0,
                    Incidents: null,
                    Favorites: null,
                },
                company_id: 4,
                Vehicle: {
                    ID: 0,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                    DeletedAt: null,
                    Plate: "",
                    Incidents: null,
                    Images: null,
                    Kind: {
                        ID: 0,
                        CreatedAt: "0001-01-01T00:00:00Z",
                        UpdatedAt: "0001-01-01T00:00:00Z",
                        DeletedAt: null,
                        FipeID: "",
                        FipePrice: 0,
                        Brand: "",
                        ShortName: "",
                        Name: "",
                        Year: "",
                    },
                    KindID: 0,
                    PredictedPrice: 0,
                },
                vehicle_id: 1,
            },
            {
                ID: 2,
                CreatedAt: "2024-06-13T14:28:33.69215-03:00",
                UpdatedAt: "2024-06-13T14:28:33.69215-03:00",
                DeletedAt: null,
                incident_type: {
                    ID: 0,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                    DeletedAt: null,
                    Name: "bbbbbbb",
                },
                incident_type_id: 1,
                Description: "Roubo de veÃ­culo",
                incident_date: "2024-06-13T14:28:33.692104-03:00",
                Company: {
                    ID: 0,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                    DeletedAt: null,
                    Name: "",
                    Kind: "",
                    Description: "",
                    Wallet: "",
                    Address: "",
                    Role: 0,
                    Incidents: null,
                    Favorites: null,
                },
                company_id: 1,
                Vehicle: {
                    ID: 0,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                    DeletedAt: null,
                    Plate: "",
                    Incidents: null,
                    Images: null,
                    Kind: {
                        ID: 0,
                        CreatedAt: "0001-01-01T00:00:00Z",
                        UpdatedAt: "0001-01-01T00:00:00Z",
                        DeletedAt: null,
                        FipeID: "",
                        FipePrice: 0,
                        Brand: "",
                        ShortName: "",
                        Name: "",
                        Year: "",
                    },
                    KindID: 0,
                    PredictedPrice: 0,
                },
                vehicle_id: 1,
            },
            {
                ID: 2,
                CreatedAt: "2024-06-13T14:28:33.69215-03:00",
                UpdatedAt: "2024-06-13T14:28:33.69215-03:00",
                DeletedAt: null,
                incident_type: {
                    ID: 0,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                    DeletedAt: null,
                    Name: "bbbbbbb",
                },
                incident_type_id: 1,
                Description: "Roubo de veÃ­culo",
                incident_date: "2024-06-13T14:28:33.692104-03:00",
                Company: {
                    ID: 0,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                    DeletedAt: null,
                    Name: "",
                    Kind: "",
                    Description: "",
                    Wallet: "",
                    Address: "",
                    Role: 0,
                    Incidents: null,
                    Favorites: null,
                },
                company_id: 1,
                Vehicle: {
                    ID: 0,
                    CreatedAt: "0001-01-01T00:00:00Z",
                    UpdatedAt: "0001-01-01T00:00:00Z",
                    DeletedAt: null,
                    Plate: "",
                    Incidents: null,
                    Images: null,
                    Kind: {
                        ID: 0,
                        CreatedAt: "0001-01-01T00:00:00Z",
                        UpdatedAt: "0001-01-01T00:00:00Z",
                        DeletedAt: null,
                        FipeID: "",
                        FipePrice: 0,
                        Brand: "",
                        ShortName: "",
                        Name: "",
                        Year: "",
                    },
                    KindID: 0,
                    PredictedPrice: 0,
                },
                vehicle_id: 1,
            },
        ],
        Images: [
            {
                ID: 1,
                CreatedAt: "2024-06-13T14:28:33.691867-03:00",
                UpdatedAt: "2024-06-13T14:28:33.691867-03:00",
                DeletedAt: null,
                VehicleID: 1,
                IPFSURL: "QmSPUyR9fwdKpZnybRTAC2WnPHnPtM46KA1BhSir6KQ5ev",
            },
        ],
        Kind: {
            ID: 0,
            CreatedAt: "0001-01-01T00:00:00Z",
            UpdatedAt: "0001-01-01T00:00:00Z",
            DeletedAt: null,
            FipeID: "",
            FipePrice: 0,
            Brand: "Jeep",
            ShortName: "Jeep Renegade",
            Name: "Jeep Renegade Turbo flamengo arrascaeta",
            Year: "2022",
        },
        KindID: 1,
        PredictedPrice: 10000,
    },
};

export default function BuyVehiclePage({}) {
    const { carplate } = useParams();

    const [carData, setCarData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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

        setTimeout(() => {
            setCarData(mockCarData.message);
            setLoading(false);
        }, 1000);
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
                {loading ? (
                    <div className="h-full w-full flex items-center justify-center">
                        <Bars height="100" color="#000" />
                    </div>
                ) : (
                    <>
                        <Details carData={carData} />
                        <VehicleEvents carPlate={carplate} carData={carData} />
                    </>
                )}
            </div>
        </div>
    );
}
