import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Logo from "../../assets/icons/Logo"

export default function BuyVehicleHeader() {
    return (
        <div className="w-full py-6 flex items-center justify-between">
            <div className="flex items-center justify-end w-full">
                <div className="relative w-full max-w-lg">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search by plate"
                        className="w-full h-12 pl-12 rounded-l-lg bg-[#F3F3F3] border-none"
                    />
                </div>
                <Button className="bg-[#1F91E3] w-32 h-12 rounded-r-lg shadow-lg hover:bg-[#0577C9] text-white font-semibold ml-8">
                    Search
                </Button>
            </div>
        </div>
    );
}
