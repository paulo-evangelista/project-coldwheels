import {
    ArrowLeft,
    ShieldCheck,
    Wrench,
    KeySquare,
    CheckCircle,
    Copy,
} from "lucide-react";

import EventCard from "./EventCard";

export default function BuyVehicleEvents({ width = "w-4/12" }) {
    return (
        <div className={`${width} pb-10`}>
            <div className=" bg-white shadow-lg h-full rounded-lg p-10">
                <div className="relative before:content-[''] before:absolute before:left-[40px] before:top-0 before:bottom-0 before:rounded-full before:w-[10px] before:bg-[#000] timeline">
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

                </div>
            </div>
        </div>
    );
}
