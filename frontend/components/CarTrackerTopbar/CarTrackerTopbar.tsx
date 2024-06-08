import { ShieldCheck, Wrench, KeySquare, Car, Menu } from "lucide-react";

export default function CarTrackerTopbar() {
    return (
        <div className="bg-blue-700 p-4 pb-3 justify-between flex">
            <div className="text-center  text-white font-pulp flex">
                <div className="flex items-center">
                    <Car fill="#ffffff" className="pb-1" />
                    <div className="font-extrabold relative text-2xl">
                        <p className=" text-center">
                            Car
                            <span className="text-white">Tracker</span>
                        </p>
                    </div>
                </div>
                <div className="text-gray-400 pl-1 pb-1 flex text-sm items-end">
                    <p>
                        by <span className="font-bold">Cathena°</span>
                    </p>
                </div>
            </div>
            <div className="flex text-right items-center pb-1 text-white">
                <Menu size={35}></Menu>
            </div>
        </div>
    );
}
