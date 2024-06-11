import {
    ArrowLeft,
    ShieldCheck,
    Wrench,
    KeySquare,
    CheckCircle,
    Copy,
} from "lucide-react";

import EventCard from "./EventCard";

export default function BuyVehicleEvents({ width = "w-6/12" }) {
    return (
        <div className={`${width} pb-10`}>
            <div className="w-16 h-16 flex justify-center items-center bg-[#EA580C] rounded-full absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <ArrowLeft size={38} />
            </div>

            <div className=" bg-[#F3F3F3] h-full rounded-lg p-10">
                <div className="relative before:content-[''] before:absolute before:left-[40px] before:top-0 before:bottom-0 before:rounded-full before:w-[10px] before:bg-[#000] timeline">
                    <EventCard
                        title="Aquisição"
                        description="Adquirido na concessionária"
                        date="13/06/2003"
                        icon={<KeySquare size={24} color="#EA580C" />}
                    />
                    <EventCard
                        title="Blindagem"
                        description="Blindagem aplicada tipo A-III"
                        date="22/06/2003"
                        icon={<KeySquare size={24} color="#EA580C" />}
                    />
                    <EventCard
                        title="Revisão blindagem"
                        description="Realizada na autorizada"
                        date="22/06/2003"
                        icon={<KeySquare size={24} color="#EA580C" />}
                    />
                    <EventCard
                        title="Revisão"
                        description="Blindagem aplicada tipo A-III"
                        date="22/06/2003"
                        icon={<KeySquare size={24} color="#EA580C" />}
                    />
                    <EventCard
                        title="Revisão"
                        description="Blindagem aplicada tipo A-III"
                        date="22/06/2003"
                        icon={<KeySquare size={24} color="#EA580C" />}
                    />
                </div>
            </div>
        </div>
    );
}
