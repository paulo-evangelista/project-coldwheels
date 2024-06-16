import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { useForm, Controller } from "react-hook-form";
import { hex2a } from "@/lib/utils";
import { advanceInput, inspect } from "cartesi-client";
import { ethers } from "ethers";

enum Role {
	Untrusted = 1,
	Trusted = 2,
	Affiliate = 3,
	Admin = 4,
}

interface Props {
	dappAddress: string;
}

const GrantCompaniesForm: React.FC<Props> = (props) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const dappAddress = props.dappAddress;
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

	const [inspectData, setInspectData] = useState<string>("");
	const [reports, setReports] = useState<string[]>([]);
	const [metadata, setMetadata] = useState<any>({});

	const getWallet = async (): Promise<[boolean, any]> => {
		let accountCreatedStatus = false;
		let response;
		try {
			const payload = JSON.stringify({
				kind: "company",
				payload: { wallet },
			});

			const data = await inspect(payload, {
				aggregate: false,
				cache: "no-cache",
				cartesiNodeUrl: "http://localhost:8080",
				decodeTo: "utf-8",
				method: "POST",
			});

			if (typeof data === "string") {
				const parsedData = JSON.parse(data);
				setMetadata(parsedData.message);
				response = parsedData;
				accountCreatedStatus = parsedData.status === "Accepted";

				console.log("GRANTING", response.message);
				setUserRole(response.message.role);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
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

	const [userRole, setUserRole] = useState<Role>(Role.Untrusted);
	const [eligibleRoles, setEligibleRoles] = useState<
		{ role: string; value: Role }[]
	>([]);

	useEffect(() => {
		setEligibleRoles(roles.filter((r) => r.value < userRole));
	}, [userRole]);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit = async (data: any) => {
        setIsLoading(true);
        
		try {
			const input = {
				wallet: data.companyWallet,
				role: Number(data.role),
			};

			const advanceInputJSON = {
				kind: "promote_company",
				payload: input,
			};

			console.log("adding input", input);
			const signer = provider.getSigner();

			console.log("signer and input is ", signer, input);
			let parsedInput = JSON.stringify(advanceInputJSON);
			console.log("parsed input is ", parsedInput);

			await advanceInput(signer, dappAddress, parsedInput).then((res) => {
				toast.success("Vehicle registered successfully");
			});
		} catch (err) {
			console.error(err);
			toast.error("Error registering vehicle");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col w-full p-6 rounded-lg shadow-lg h-full"
		>
			<h2 className="text-xl font-semibold">Grant Company</h2>

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
							<p className="text-sm text-gray-500">
								*Your role of {Role[userRole]} allows you to
								grant the following roles:
							</p>
						</label>
						<select
							{...field}
							id="role"
							className="block w-full p-2 border border-gray-300 rounded-md"
						>
							{eligibleRoles.map(({ role, value }) => (
								<option key={value} value={value}>
									{role}
								</option>
							))}
						</select>
					</div>
				)}
			/>
			<div className="flex justify-end">
				<button
					type="submit"
					disabled={isLoading}
					className="p-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
				>
					{isLoading ? "Loading..." : "Submit"}
				</button>
			</div>
		</form>
	);
};

export default GrantCompaniesForm;
