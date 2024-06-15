"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";

export default function FavoritesCard({ carPlate }: { carPlate: string }) {
    const [carData, setCarData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const promise = axios.post("http://localhost:8080/inspect", {
            kind: "get_vehicle_by_plate",
            payload: {
                plate: carPlate,
            },
        });
        promise.then((res) => {
            if (res.data.status != "Accepted") return;
            const payload = res.data.reports[0].payload;
            const asString = ethers.utils.toUtf8String(payload);
            alert(asString);
        });
    });

    return (
        <div className="w-[200px] h-[200px] bg-white rounded-xl flex items-center justify-center">
            Card
        </div>
    );
}
