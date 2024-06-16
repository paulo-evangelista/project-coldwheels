"use client";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import axios from "axios";
import { abi } from "@/ABIs/etherPortal";
import { a2hex } from "@/lib/utils";

const TesteVoucher = () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const { address: wallet, isConnected } = useAccount();

	const testVoucher = async () => {
		try {
			const signer = provider.getSigner();
			console.log("signer", signer);

			const contract = new ethers.Contract(
				"0xFfdbe43d4c855BF7e0f105c400A50857f53AB044",
				abi.abi,
				signer
			);

			const options = { value: ethers.utils.parseEther("0.05") };
			const plate = "ABC1234";

			const payload = JSON.stringify({
				kind: "voucher",
				payload: { plate: plate },
			});
			console.log(payload);

			const hexPayload = a2hex(payload);
			console.log(hexPayload);

			await contract
				.depositEther(
					"0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e",
					"0x7b226b696e64223a22766f7563686572222c20227061796c6f6164223a226f69227d",
					options
				)
				.then((tx: any) => {
					console.log(tx);
				})
				.catch((err: any) => {
					console.error(err);
				});
		} catch (err) {
			console.error(err);
			toast.error("Error");
		}
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
				const accountCreated = await getWallet();
				if (!accountCreated) {
					toast.error("Account not found");
				}
			} else {
				toast.error("Connect your wallet to continue");
			}
		};
		checkAccountStatus();
	}, [isConnected]);

	return (
		<div>
			<h1>Teste Voucher</h1>
			<button onClick={testVoucher}>Test Voucher</button>
		</div>
	);
};

export default TesteVoucher;
