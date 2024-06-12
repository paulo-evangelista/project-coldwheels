import {
    ArrowLeft,
    ShieldCheck,
    Wrench,
    KeySquare,
    CheckCircle,
    Copy,
} from "lucide-react";

import { ScrollArea } from "../ui/scroll-area";
import EventCard from "./EventCard";

export default function BuyVehicleEvents({ width = "w-[37%]" }) {
    return (
        <div className={`${width} pb-10`}>
            <ScrollArea className="bg-white shadow-lg h-full rounded-xl px-6 py-4">
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
