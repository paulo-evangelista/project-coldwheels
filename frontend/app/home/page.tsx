"use client";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../../components/BuyVehicleHeader/BuyVehicleHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import GLBViewer from "@/components/Render3d/Render3d";
import { Input } from "@/components/ui/input";

export default function BuyVehiclePage({}) {
	const router = useRouter();

	const [inputValue, setInputValue] = useState("");

	function handleClick() {
		router.push(`/home/${inputValue.toUpperCase()}`);
	}

	return (
		<div className="w-full h-screen flex bg-white">
			<Sidebar />
			<div className="w-full h-full flex flex-col px-14">
				<Header />
				<div className="w-full h-full flex flex-col items-center justify-center">
					<div className="bg-white p-4 rounded-xl">
						<div className="">
							<GLBViewer
								glbPath="/models/car2.glb"
								sensitivity={8.5}
								scale={0.06}
							/>
						</div>
					</div>

					<div className="flex">
						<div className="relative w-full">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<Input
								value={inputValue}
								onChange={(e) =>
									setInputValue(e.target.value.toUpperCase())
								}
                                maxLength={7}
								placeholder="Search by plate"
								className="w-full h-12 pl-12 rounded-l-lg bg-[#F3F3F3] border-none"
							/>
						</div>
						<Button
							onClick={handleClick}
							className="bg-[#1F91E3] w-32 h-12 rounded-lg shadow-lg hover:bg-[#0577C9] text-white text-lg font-semibold ml-2 animate-bounce"
						>
							Search
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
