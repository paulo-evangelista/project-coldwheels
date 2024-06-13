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
}

export default function BuyVehicleEvents({
    width = "w-[37%]",
    carPlate,
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

    return (
        <div className={`${width} pb-10`}>
            <ScrollArea className="bg-white shadow-lg w-full h-full rounded-xl px-6 py-4">
                <div className="w-full h-[80px] flex justify-between items-center mb-4">
                    <div className="h-5/6 flex items-center justify-center bg-[#FF9900] p-4 rounded-xl shadow-sm">
                        <MapPin className="mr-2" />
                        Juiz de Fora, MG
                    </div>

                    <div className="h-5/6 flex items-center justify-center bg-[#FF9900] p-4 rounded-xl shadow-sm">
                        Última atualização: 15/03/2003
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
                </div>
            </ScrollArea>
        </div>
    );
}
