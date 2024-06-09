import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function BuyVehicleHeader() {
    return (
        <div className="w-full px-10 py-8 flex items-center justify-between">
            <div className="w-2/12 text-3xl font-bold flex items-center">
                <span className="text-blue-500">Car</span>Tracker
            </div>

            <div className="w-8/12">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Digite a placa do veículo"
                        className="w-full h-16 pl-10 rounded-md border border-gray-300"
                    />
                </div>
            </div>

            <div className="w-2/12 h-16 flex items-center justify-center">
                <Button className="w-8/12 h-16">Pesquisar</Button>
            </div>
        </div>
    );
}
