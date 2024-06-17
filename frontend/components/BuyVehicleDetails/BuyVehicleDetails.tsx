import Renegade from "./rene.png";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import Color from "../../assets/icons/Color";
import Plate from "../../assets/icons/Plate";
import Year from "../../assets/icons/Year";
import Truck from "../../assets/icons/Truck";
import { FaRegCircleCheck } from "react-icons/fa6";
import { ethers } from "ethers";

import VehicleInfoBox from "./VehicleInfoBox";
import { a2hex } from "@/lib/utils";
import { toast } from "react-toastify";
import { abi } from "@/ABIs/etherPortal";
import { inspect } from "cartesi-client";
import { useState } from "react";

export default function ({ width = "w-6/12", carData }: any) {
	const provider = new ethers.providers.Web3Provider(window.ethereum);

	function formatCurrencyBRL(value: number): string {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(value);
	}

	function formatDate(timestamp: any) {
		const date = new Date(timestamp);

		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear().toString().substr(-2);

		// Return the formatted string
		return `${day}/${month}/${year}`;
	}

	function handleCalcSuggestedPrice() {
		alert("Calculating suggested price...");
	}

	const getSuggestedPrice = async () => {
		const plate = "ABC1234";

		try {
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				"0xFfdbe43d4c855BF7e0f105c400A50857f53AB044",
				abi.abi,
				signer
			);

			const payload = JSON.stringify({
				kind: "ai",
				payload: { plate: carData.plat },
			});
			console.log(payload);

			const hexPayload = ethers.utils.hexlify(
				ethers.utils.toUtf8Bytes(payload)
			);
			console.log(hexPayload);

			const options = { value: ethers.utils.parseEther("0.05") };
			await contract
				.depositEther(
					"0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e",
					"0x7b226b696e64223a22766f7563686572222c20227061796c6f6164223a226f69227d",
					options
				)
				.then(async (tx: any) => {
					const plate = carData.plate;

					const inspectPayload = JSON.stringify({
						kind: "ai",
						payload: {
							plate: plate,
						},
					});
					console.log("inspectPayload", inspectPayload);

					const data = await inspect(inspectPayload, {
						aggregate: false,
						cache: "no-cache",
						cartesiNodeUrl: "http://localhost:8080",
						decodeTo: "utf-8",
						method: "POST",
					});
					console.log(
						"Predicted price: ",
						JSON.parse(data.toString()).message.price
					);

					setPrediction(JSON.parse(data.toString()).message.price);
				})
				.catch((err: any) => {
					console.error(err);
				});
		} catch (err) {
			console.error(err);
			toast.error("Error");
		}
	};

	console.log({ carData });

	const getSuggestedPriceHardcode = async () => {
		try {
			const provider = new ethers.providers.JsonRpcProvider(
				"http://localhost:8545"
			);
			const wallet = new ethers.Wallet(
				"ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
				provider
			);
			const contract = new ethers.Contract(
				"0xFfdbe43d4c855BF7e0f105c400A50857f53AB044",
				abi.abi,
				wallet
			);

			const payload = JSON.stringify({
				kind: "ai",
				payload: { plate: carData.plate },
			});
			console.log(payload);

			const hexPayload = ethers.utils.hexlify(
				ethers.utils.toUtf8Bytes(payload)
			);
			console.log(hexPayload);

			const options = { value: ethers.utils.parseEther("0.05") };
			await contract
				.depositEther(
					"0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e",
					hexPayload,
					options
				)
				.then(async (tx: any) => {
					console.log("tx", tx);

					// const inspectPayload = JSON.stringify({
					// 	kind: "ai",
					// 	payload: { plate: carData.plate },
					// });

					// const data = await inspect(inspectPayload, {
					// 	aggregate: false,
					// 	cache: "no-cache",
					// 	cartesiNodeUrl: "http://localhost:8080",
					// 	decodeTo: "utf-8",
					// 	method: "POST",
					// });
					// console.log(data);
				})
				.catch((err: any) => {
					console.error("Error on depositEther:", err);
				});
		} catch (err) {
			console.error(err);
			toast.error("Error");
		}
	};

	const [prediction, setPrediction] = useState();

	return (
		<div className={`${width} pb-4 h-full flex flex-col justify-between`}>
			{carData ? (
				<>
					<div className="flex flex-col justify-between shadow-lg p-4 rounded-xl bg-[#fff] flex-grow">
						<div className="flex justify-between mb-4">
							<div className="w-1/2 flex flex-col">
								<h1 className="font-bold pt-4 pl-4 text-2xl">
									{carData.kind.short_name}
								</h1>
								<h1 className="font-bold text-base pl-5 text-[#9A9A9A]">
									{carData.kind.name}
								</h1>
							</div>
							<div className="flex flex-col text-right">
								{prediction ? (
									<>
										<h1 className="font-bold text-2xl pr-10 pt-4">
											{formatCurrencyBRL(prediction)}
										</h1>
										<h1 className="font-bold text-base pr-11 text-[#9A9A9A]">
											Suggested Price
										</h1>
									</>
								) : (
									<>
										<div
											className="h-full bg-[#1F91E3] flex items-center justify-center font-bold p-4 rounded-xl mr-8 mt-6 cursor-pointer hover:bg-[#0577C9] shadow-lg text-white"
											onClick={getSuggestedPrice}
										>
											Get suggested price
										</div>
									</>
								)}
							</div>
						</div>
						<div className="flex justify-center h-full">
							<img
								src={
									"https://ipfs.io/ipfs/" +
									carData.images[0].ipfs_url
								}
								alt={carData.kind.name}
								className="rounded-xl w-full h-full object-cover"
							/>
						</div>
					</div>

					<div className="flex flex-col justify-center flex-shrink-0">
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

					<div className="flex w-full pt-4 flex-shrink-0">
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
											carData.incidents &&
												carData.incidents.length > 0
												? carData.incidents[
														carData.incidents
															.length - 1
												  ].updated_at
												: carData.updated_at
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
