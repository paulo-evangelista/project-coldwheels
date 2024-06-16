"use client";
import Sidebar from "../../components/Sidebar/Sidebar";
import RegisterIncidentForm from "../../components/RegisterIncidentForm/RegisterIncidentForm";
import RegisterVehicleForm from "../../components/RegisterVehicleForm/RegisterVehicleForm";
import GrantCompaniesForm from "../../components/GrantCompaniesForm/GrantCompaniesForm";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FormInterface = () => {
	const { address: wallet, isConnected } = useAccount();
	const router = useRouter();

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
			// redirect if connected and the account doesn't exist
			// or if not connected
			const accountCreated = await getWallet();
			// if (isConnected) {
			//     if (!accountCreated) {
			//         router.push("/login");
			//         toast.error("Account not found");
			//     }
			// } else {
			//     router.push("/login");
			//     toast.error("Connect your wallet to continue");
			// }
			if (!isConnected || !accountCreated) {
				setTimeout(() => {
					router.push("/login");
					toast.error("Connect your wallet to continue");
				}, 1250);
			}
		};
		checkAccountStatus();
	}, [isConnected]);

	const dappAddress = "0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e";

	return (
		<div className="flex min-h-screen h-full">
			<Sidebar />

			<div className="w-full md:w-2/3 flex flex-col items-center gap-6 p-6">
				<div className="w-full flex flex-col gap-6">
					<GrantCompaniesForm dappAddress={dappAddress} />
				</div>
				<div className="w-full flex flex-col gap-6">
					<RegisterIncidentForm dappAddress={dappAddress} />
				</div>
				<div className="w-full flex flex-col gap-6">
					<RegisterVehicleForm dappAddress={dappAddress} />
				</div>
			</div>
		</div>
	);
};

export default FormInterface;
