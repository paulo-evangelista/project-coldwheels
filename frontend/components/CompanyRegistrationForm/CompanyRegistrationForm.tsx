"use client";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { advanceInput } from "cartesi-client";
import { useAccount } from "wagmi";
import axios from "axios";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import lava from "@/assets/images/lava.jpeg";
import Image from "next/image";
import { toast } from "react-toastify";

const CompanyRegistrationForm = () => {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [kind, setKind] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const [dappAddress, setDappAddress] = useState<string>(
		"0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e"
	);
	const [isChecking, setIsChecking] = useState<boolean>(true);
	const { address: wallet, isConnected } = useAccount();
	const router = useRouter();

	const addInput = async () => {
		const inputPayload = {
			kind: "register_company",
			payload: {
				name: name,
				description: description,
				kind: kind,
				address: address,
			},
		};
		const inputString = JSON.stringify(inputPayload);
		console.log("adding input", inputString);
		const signer = await provider.getSigner();
		console.log("signer and input is ", signer, inputString);
		advanceInput(signer, dappAddress, inputString);
	};

	const getWallet = async () => {
		var accountCreatedStatus = false;
		const response = await axios
			.post("http://localhost:8080/inspect", {
				kind: "company",
				payload: { wallet },
			})
			.then((response) => {
				return response;
			})
			.catch((error) => {
				console.error("error is ", error);
				return error;
			});

		if (response.data.status === "Accepted") {
			accountCreatedStatus = true;
		} else {
			accountCreatedStatus = false;
		}

		return accountCreatedStatus;
	};

	useEffect(() => {
		const checkAccountStatus = async () => {
			if (isConnected) {
				const accountExists = await getWallet();
				setIsChecking(accountExists);
				if (accountExists) {
					toast.info("Redirecting to dashboard...");
					setTimeout(() => {
						router.push("/dashboard");
					}, 1500);
				}
			}
		};
		checkAccountStatus();
	}, [isConnected]);

	return (
		<div className="flex bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
			<div className="w-1/2 p-8 flex flex-col justify-center items-center">
				{!isConnected && (
					<h2 className="text-xl font-semibold mb-6 text-center">
						Connect to your Car Tracker account
					</h2>
				)}
				<ConnectButton />
				{isConnected && !isChecking && (
					<div className="w-full flex flex-col">
						{/* Divider */}
						<div className="w-full border-b border-gray-300 my-8"></div>
						<h2 className="text-2xl font-bold mb-2">
							Register your Company
						</h2>
						<p className="text-gray-500 mb-8">
							It seems you are new here. Please register your
							company to continue!
						</p>

						<form className="space-y-4" onSubmit={addInput}>
							<div>
								<label className="block text-gray-700">
									Name:
								</label>
								<input
									type="text"
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="mt-1 p-2 border border-gray-300 rounded w-full"
								/>
							</div>
							<div>
								<label className="block text-gray-700">
									Description:
								</label>
								<input
									type="text"
									id="description"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
									className="mt-1 p-2 border border-gray-300 rounded w-full"
								/>
							</div>
							<div>
								<label className="block text-gray-700">
									Kind:
								</label>
								<input
									type="text"
									id="kind"
									value={kind}
									onChange={(e) => setKind(e.target.value)}
									className="mt-1 p-2 border border-gray-300 rounded w-full"
								/>
							</div>
							<div>
								<label className="block text-gray-700">
									Address:
								</label>
								<input
									type="text"
									id="address"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									className="mt-1 p-2 border border-gray-300 rounded w-full"
								/>
							</div>
							<button
								type="submit"
								className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
							>
								Register
							</button>
						</form>
					</div>
				)}
			</div>
			<div className="w-1/2">
				<Image
					src={lava}
					alt="Image"
					className="w-full h-full object-cover"
				/>
			</div>
		</div>
	);
};

export default CompanyRegistrationForm;
