'use client'
import { advanceEtherDeposit, advanceInput } from "cartesi-client";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import axios from "axios";

const TesteVoucher = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const dappAddress = "0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e";
    const { address: wallet, isConnected } = useAccount();
    
	const testVoucher = async () => {
		try {
			const input = {
                "celin da o brioco": "celin da o brioco",
			};

			const advanceInputJSON = {
				kind: "voucher",
				payload: input,
			};

			const signer = await provider.getSigner();

			let parsedInput = JSON.stringify(advanceInputJSON);
			console.log("parsed input is ", parsedInput);

			advanceEtherDeposit(signer, dappAddress, 0.1).then((res) => {
				toast.success("Success");
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
    )
}

export default TesteVoucher;