import { Search, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Logo from "../../assets/icons/Logo";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BuyVehicleHeader() {
    const router = useRouter();

    const [inputValue, setInputValue] = useState("");

    function handleClick() {
        router.push(`/home/${inputValue}`);
    }

    return (
        <div className="w-full py-6 flex items-center justify-between">
            <div className="flex items-center justify-between w-full">
                {/* <div className="flex items-center">
                    <p className="text-3xl font-bold text-black">
                        <span className="text-[#EA580C]">Car</span>Tracker
                    </p>
                </div> */}
                <Link href="/">
                    <Logo />
                </Link>

                <div className="flex">
                    <div className="relative w-full max-w-lg">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Search by plate"
                            className="w-full h-12 pl-12 rounded-l-lg bg-[#F3F3F3] border-none"
                        />
                    </div>
                    <Button
                        onClick={handleClick}
                        className="bg-[#1F91E3] w-32 h-12 rounded-r-lg shadow-lg hover:bg-[#0577C9] text-white font-semibold ml-8"
                    >
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
}
