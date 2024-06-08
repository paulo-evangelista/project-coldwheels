import {
    ShieldCheck,
    Wrench,
    KeySquare,
    CheckCircle,
    Copy,
} from "lucide-react";
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import CarTrackerCard from "@/components/CarTrackerCard/CarTrackerCard";
import CarTrackerCarCard from "@/components/CarTrackerCarCard/CarTrackerCarCard";
import CarTrackerTopbar from "@/components/CarTrackerTopbar/CarTrackerTopbar";

export default function CarTracker() {
    return (
        <>
            <CarTrackerTopbar />
            <p className="font-bold text-3xl px-10 mt-4 ">Resultado</p>

            <CarTrackerCarCard />
            <Card className="max-w-lg my-2 w-5/6 mx-auto bg-[#4737d7] text-white shadow-lg">
                <CardHeader>
                    <CardTitle className="flex gap-2">
                        <CheckCircle color="#78db78" strokeWidth={3} />
                        Veículo verificado
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-2 flex gap-2 items-center">
                        <span className="font-semibold">Inscrição: </span>
                        0x478a91245...
                        <Copy size={15} strokeWidth={3} color="#999999" />
                    </div>
                    <div className="mb-2 flex gap-2 items-center">
                        <span className="font-semibold">
                            Última atualização:{" "}
                        </span>
                        07/01/2004
                    </div>
                </CardContent>
                <CardFooter>
                    <a
                        href="https://etherscan.com/"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <Button variant="secondary">
                            Ver inscrição e transações
                        </Button>
                    </a>
                </CardFooter>
            </Card>

            <p className="font-bold text-3xl px-10 pb-4 mt-4 ">Histórico</p>
            <div className="px-10 pb-6 max-w-lg mx-auto text-white font-pulp text-xl text-center">
                <div className="relative pl-12 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:rounded-full before:w-2 before:bg-blue-700 timeline">
                    <CarTrackerCard
                        title={"Aquisição"}
                        date={"13/06/2003"}
                        icon={<KeySquare size={50} color="#4737d7" />}
                        description={"Adquirido na concessionária"}
                    />{" "}
                    <CarTrackerCard
                        title={"Blindagem"}
                        date={"22/06/2003"}
                        icon={<ShieldCheck size={50} color="#4737d7" />}
                        description={"Blindagem aplicada tipo A-III"}
                    />{" "}
                    <CarTrackerCard
                        title={"Revisão blindagem"}
                        date={"22/08/2003"}
                        icon={<Wrench size={50} color="#4737d7" />}
                        description={"Realizada na autorizada"}
                    />{" "}
                    <CarTrackerCard
                        title={"Revisão blindagem"}
                        date={"22/10/2003"}
                        icon={<Wrench size={50} color="#4737d7" />}
                        description={"Realizada na autorizada"}
                    />{" "}
                    <CarTrackerCard
                        title={"Revisão blindagem"}
                        date={"07/01/2004"}
                        icon={<Wrench size={50} color="#4737d7" />}
                        description={"Realizada na autorizada"}
                    />{" "}
                </div>
            </div>
        </>
    );
}
