import {
    ArrowLeft,
    ShieldCheck,
    Wrench,
    KeySquare,
    CheckCircle,
    Copy,
    MapPin,
} from "lucide-react";

import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import EventCard from "./EventCard";

export default function BuyVehicleEvents({ width = "w-[37%]" }) {
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
