import Renegade from "./car.webp";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

import VehicleInfoBox from "./VehicleInfoBox";

export default function ({ width = "w-5/12" }) {
    return (
        <div className={`${width} pb-10 h-full flex flex-col justify-between `}>
            <div className="">
                <h1 className="font-bold text-3xl">
                    Renegade 1.3 Turbo T270 4X2
                </h1>
                <div className="inline-block px-4 py-1 bg-[#EA580C] font-bold text-lg rounded-lg my-4">
                    Jeep
                </div>
            </div>

            <div className="flex justify-center">
                <Image src={Renegade} alt="Renegade" width={450} height={200} />
            </div>

            <div className="flex flex-col justify-center">
                <div className="flex justify-between">
                    <VehicleInfoBox label="Ano" value="2003" />
                    <VehicleInfoBox label="Placa" value="DSC-1461" />
                    <VehicleInfoBox label="Odômetro" value="12.345km" />
                    <VehicleInfoBox label="Cor" value="Preto ônix" />
                </div>

                <div className="flex space-between items-center">
                    <div className="w-6/12 flex items-center justify-start">
                        <div className="h-16 flex justify-between items-center px-10 py-2 my-8 bg-[#EA580C] rounded-lg">
                            <ShieldCheck />
                            <p className="font-bold">Veículo verificado</p>
                        </div>
                    </div>

                    <div className="w-6/12 flex items-center justify-end">
                        <div className="h-16 flex flex-col justify-center items-center px-8 py-2 my-8 bg-[#EA580C] rounded-lg">
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
