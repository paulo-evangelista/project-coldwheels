import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { useForm, Controller } from "react-hook-form";

const GrantCompaniesForm = () => {
	const [isChecking, setIsChecking] = useState<boolean>(true);

	const roles = [
		{ role: "Untrusted", value: 1 },
		{ role: "Trusted", value: 2 },
		{ role: "Affiliate", value: 3 },
		{ role: "Admin", value: 4 },
	];

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			companyWallet: "",
			role: roles[0].value,
		},
	});

	const router = useRouter();
	const { address: wallet, isConnected } = useAccount();

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

		return [accountCreatedStatus, response];
	};

	const [getWalletResposne, setGetWalletResponse] = useState<any>(null);

	useEffect(() => {
		const checkAccountStatus = async () => {
			if (isConnected) {
				const [accountExists, response] = await getWallet();
				setIsChecking(accountExists);
				setGetWalletResponse(response);
				console.log(response);
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

	const onSubmit = async (data: any) => {
		console.log(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col w-full p-6 rounded-lg shadow-lg h-full"
		>
			<h2 className="text-xl font-semibold mb-4">Grant Company</h2>
			<Controller
				name="companyWallet"
				control={control}
				render={({ field }) => (
					<div className="mb-4">
						<label
							htmlFor="companyWallet"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Company Wallet Address:
						</label>
						<input
							{...field}
							id="companyWallet"
							type="text"
							className="block w-full p-2 border border-gray-300 rounded-md"
						/>
					</div>
				)}
			/>
			<Controller
				name="role"
				control={control}
				render={({ field }) => (
					<div className="mb-4">
						<label
							htmlFor="role"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Role
						</label>
						<select
							{...field}
							id="role"
							className="block w-full p-2 border border-gray-300 rounded-md"
						>
							{roles.map((role) => (
								<option key={role.value} value={role.value}>
									{role.role}
								</option>
							))}
						</select>
					</div>
				)}
			/>
			<div className="flex justify-end">
				<button
					type="submit"
					className="p-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
				>
					Grant
				</button>
			</div>
		</form>
	);
};

export default GrantCompaniesForm;
