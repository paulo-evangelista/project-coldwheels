import {
    ArrowLeft,
    ShieldCheck,
    Wrench,
    KeySquare,
    CheckCircle,
    Copy,
    MapPin,
    Star,
} from "lucide-react";

import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import EventCard from "./EventCard";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import { useState } from "react";

interface BuyVehicleEventsProps {
    width?: string;
    carPlate: any;
    carData: any;
}

export default function BuyVehicleEvents({
    width = "w-[45%]",
    carPlate,
    carData,
}: BuyVehicleEventsProps) {
    const [reload, setReload] = useState(false);

    const handleFavorite = () => {
        //add carPlate to localstorage carPlateList if not exists, remove if exists
        const currentlocalStorageList = localStorage.getItem("carPlateList");
        if (currentlocalStorageList) {
            const carPlateList = JSON.parse(currentlocalStorageList);
            if (carPlateList.includes(carPlate)) {
                const newCarPlateList = carPlateList.filter(
                    (plate: any) => plate !== carPlate
                );
                localStorage.setItem(
                    "carPlateList",
                    JSON.stringify(newCarPlateList)
                );
            } else {
                localStorage.setItem(
                    "carPlateList",
                    JSON.stringify([...carPlateList, carPlate])
                );
            }
        } else {
            localStorage.setItem("carPlateList", JSON.stringify([carPlate]));
        }

        setReload(!reload);
    };

    const checkIfAtFavorites = () => {
        const currentLocalStorageList = localStorage.getItem("carPlateList");

        if (currentLocalStorageList) {
            const carPlateList = JSON.parse(currentLocalStorageList);
            return carPlateList.includes(carPlate);
        }

        return false;
    };

    function formatDate(timestamp: any) {
        // Create a new Date object from the timestamp string
        const date = new Date(timestamp);

        // Get the day, month, and year from the date object
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString().substr(-2);

        // Return the formatted string
        return `${day}/${month}/${year}`;
    }

    return (
        <div className={`${width} pb-10`}>
            <ScrollArea className="bg-white shadow-lg w-full h-full rounded-xl px-6 py-4">
                <div className="w-full h-[80px] flex justify-between items-center mb-4">
                    <p className="text-4xl font-bold">History</p>

                    <div
                        className="flex items-center justify-center p-2 rounded-lg shadow-lg cursor-pointer bg-[#1F91E3] hover:bg-[#0577C9]"
                        onClick={() =>
                            window.open(
                                "https://etherscan.io/",
                                "_blank",
                                "noopener,noreferrer"
                            )
                        }
                    >
                        <p className="text-white text-lg font-semibold px-4 py-1">
                            Verify transactions
                        </p>
                    </div>

                    {checkIfAtFavorites() ? (
                        <IoIosStar
                            size={25}
                            color="#FF9900"
                            onClick={handleFavorite}
                            cursor={"pointer"}
                        />
                    ) : (
                        <IoIosStarOutline
                            size={25}
                            color="#000"
                            onClick={handleFavorite}
                            cursor={"pointer"}
                        />
                    )}
                </div>
                <div className="relative before:content-[''] before:absolute before:left-[40px] before:top-[35px] before:rounded-full before:w-[10px] before:bg-[#000] timeline">
                    {carData ? (
                        carData.incidents ? (
                            carData.incidents.map(
                                (incident: any, index: number) => {
                                    return (
                                        <EventCard
                                            key={index}
                                            title={incident.incident_type.name}
                                            description={incident.description}
                                            date={formatDate(
                                                incident.incident_date
                                            )}
                                            icon={
                                                <KeySquare
                                                    size={24}
                                                    color="black"
                                                />
                                            }
                                        />
                                    );
                                }
                            )
                        ) : (
                            <p>No incidents have been recorded</p>
                        )
                    ) : (
                        <>
                            <EventCard
                                title="Acquisition"
                                description="Purchased from dealership"
                                date="13/06/2003"
                                icon={<KeySquare size={24} color="black" />}
                            />
                            <EventCard
                                title="Shield"
                                description="Shield type A-III applied"
                                date="22/06/2003"
                                icon={<KeySquare size={24} color="black" />}
                            />
                            <EventCard
                                title="Review"
                                description="Reviewed from dealership"
                                date="22/06/2003"
                                icon={<KeySquare size={24} color="black" />}
                            />
                            <EventCard
                                title="Shield Review"
                                description="Reviewed from dealership"
                                date="22/06/2003"
                                icon={<KeySquare size={24} color="black" />}
                            />
                            <EventCard
                                title="Shield Review"
                                description="Reviewed from dealership"
                                date="22/06/2003"
                                icon={<KeySquare size={24} color="black" />}
                            />
                        </>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
