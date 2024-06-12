import Renegade from "./rene.png";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import Color from "../../assets/icons/Color";
import Plate from "../../assets/icons/Plate";
import Year from "../../assets/icons/Year";
import Truck from "../../assets/icons/Truck";

import VehicleInfoBox from "./VehicleInfoBox";

export default function ({ width = "w-5/12" }) {
    return (
        <div className={`${width} pb-10 h-full flex flex-col justify-between`}>
            <div className="shadow-lg pb-6 rounded-xl">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <h1 className="font-bold pt-4 pl-4 text-3xl">
                            Jeep Renegade
                        </h1>
                        <h1 className="font-bold text-lg pl-5 text-[#9A9A9A]">
                            1.3 Turbo T270 4X2
                        </h1>
                    </div>
                    <div className="flex flex-col text-right">
                        <h1 className="font-bold text-3xl pr-10 pt-4">
                            R$ 86.000
                        </h1>
                        <h1 className="font-bold text-lg pr-11 text-[#9A9A9A]">
                            Suggested Price
                        </h1>
                    </div>
                </div>
                <div className="flex justify-center pt-10">
                    <Image src={Renegade} alt="Renegade" width={450} height={200} className="rounded-xl"/>
                </div>
            </div>



            <div className="flex flex-col justify-center">
                <div className="flex justify-between">
                    <VehicleInfoBox label="Year" value="2003" color="blue" icon={<Year width="24" height="24"/>}/>
                    <VehicleInfoBox label="Plate" value="DSC-1461" color="green" icon={<Plate width="24" height="24"/>}/>
                    <VehicleInfoBox label="Odometer" value="12.345km" color="red" icon={<Truck width="24" height="24"/>}/>
                    <VehicleInfoBox label="Color" value="Orange" color="purple" icon={<Color width="24" height="24"/>}/>
                </div>

                <div className="flex space-between items-center">
                    <div className="w-6/12 flex items-center justify-start">
                        <div className="h-16 flex justify-between items-center px-8 py-2 my-8 bg-[#FF9900] rounded-lg border border-stone-800">
                            <ShieldCheck />
                            <p className="font-bold pl-4">Verified Vehicle</p>
                        </div>
                    </div>

                    <div className="w-6/12 flex items-center justify-end">
                        <div className="h-16 flex flex-col justify-center items-center px-8 py-2 my-8 bg-[#FF9900] rounded-lg border border-stone-800">
                            <p className="font-bold">
                                Inscrição:0x478a91245...
                            </p>
                            <p className="font-bold">
                                Última atualização:07/01/2004
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
