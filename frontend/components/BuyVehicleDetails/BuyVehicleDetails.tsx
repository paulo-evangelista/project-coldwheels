import Renegade from "./rene.png";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import Color from "../../assets/icons/Color";
import Plate from "../../assets/icons/Plate";
import Year from "../../assets/icons/Year";
import Truck from "../../assets/icons/Truck";
import { FaRegCircleCheck } from "react-icons/fa6";

import VehicleInfoBox from "./VehicleInfoBox";

export default function ({ width = "w-6/12", carData }: any) {
    function formatCurrencyBRL(value: number): string {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    }

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
        <div className={`${width} pb-10 h-full flex flex-col justify-between`}>
            {carData ? (
                <>
                    <div className="shadow-lg pb-6 rounded-xl bg-[#fff]">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <h1 className="font-bold pt-4 pl-4 text-3xl">
                                    {carData.kind.short_name}
                                </h1>
                                <h1 className="font-bold text-lg pl-5 text-[#9A9A9A]">
                                    {carData.kind.name}
                                </h1>
                            </div>
                            <div className="flex flex-col text-right">
                                <h1 className="font-bold text-3xl pr-10 pt-4">
                                    {formatCurrencyBRL(999)}
                                </h1>
                                <h1 className="font-bold text-lg pr-11 text-[#9A9A9A]">
                                    Suggested Price
                                </h1>
                            </div>
                        </div>
                        <div className="flex justify-center pt-10">
                            <Image
                                src={
                                    "https://ipfs.io/ipfs/" +
                                    carData.images[0].ipfs_url
                                }
                                alt="Renegade"
                                width={450}
                                height={200}
                                className="rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="flex justify-between">
                            <VehicleInfoBox
                                label="Year"
                                value={carData.kind.year}
                                color="blue"
                                icon={<Year width="24" height="24" />}
                            />
                            <VehicleInfoBox
                                label="Plate"
                                value={carData.plate}
                                color="green"
                                icon={<Plate width="24" height="24" />}
                            />
                            <VehicleInfoBox
                                label="Odometer"
                                value={carData.odometer + "km"}
                                color="red"
                                icon={<Truck width="24" height="24" />}
                            />
                            <VehicleInfoBox
                                label="Color"
                                value={carData.color}
                                color="purple"
                                icon={<Color width="24" height="24" />}
                            />
                        </div>
                    </div>

                    <div className="flex w-full py-4">
                        <div className="w-1/2">
                            <div className="w-4/6 h-full bg-[#FF9900] flex items-center justify-center rounded-xl shadow-lg">
                                <FaRegCircleCheck className="text-black mr-4" />
                                <p className="font-semibold">
                                    Verified vehicle
                                </p>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <p>
                                {carData
                                    ? carData.location
                                    : "Juiz de Fora, MG"}
                            </p>
                            <p>
                                Last update:{" "}
                                {carData
                                    ? formatDate(
                                          carData.incidents[
                                              carData.incidents.length - 1
                                          ].updated_at
                                      )
                                    : "23/11/2019"}
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                // ctrl c pra mockar
                <>
                    <div className="shadow-lg pb-6 rounded-xl bg-[#fff]">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <h1 className="font-bold pt-4 pl-4 text-3xl">
                                    {"Jeep Renegade"}
                                </h1>
                                <h1 className="font-bold text-lg pl-5 text-[#9A9A9A]">
                                    {"Jeep Renegade 2.0 Turbo"}
                                </h1>
                            </div>
                            <div className="flex flex-col text-right">
                                <h1 className="font-bold text-3xl pr-10 pt-4">
                                    {"R$ 100.000,00"}
                                </h1>
                                <h1 className="font-bold text-lg pr-11 text-[#9A9A9A]">
                                    Suggested Price
                                </h1>
                            </div>
                        </div>
                        <div className="flex justify-center pt-10">
                            <Image
                                src={
                                    "https://ipfs.io/ipfs/" +
                                    "QmSPUyR9fwdKpZnybRTAC2WnPHnPtM46KA1BhSir6KQ5ev"
                                }
                                alt="Renegade"
                                width={450}
                                height={200}
                                className="rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="flex justify-between">
                            <VehicleInfoBox
                                label="Year"
                                value={"2023"}
                                color="blue"
                                icon={<Year width="24" height="24" />}
                            />
                            <VehicleInfoBox
                                label="Plate"
                                value={"AAA1234"}
                                color="green"
                                icon={<Plate width="24" height="24" />}
                            />
                            <VehicleInfoBox
                                label="Odometer"
                                value="12.345km"
                                color="red"
                                icon={<Truck width="24" height="24" />}
                            />
                            <VehicleInfoBox
                                label="Color"
                                value="Orange"
                                color="purple"
                                icon={<Color width="24" height="24" />}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
