import { useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { ethers } from "ethers";
import "./formAnimations.css";
import axios from "axios";
import { advanceInput, inspect } from "cartesi-client";
import { toast } from "react-toastify";

interface Props {
	dappAddress: string;
}

const RegisterIncidentForm: React.FC<Props> = (props) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const dappAddress = props.dappAddress;
	const [step, setStep] = useState(0);
	const [incidentType, setIncidentType] = useState("");
	const [description, setDescription] = useState("teste");
	const [incidentDate, setIncidentDate] = useState("2024-06-15");
	const [vehicleId, setVehicleId] = useState("");
	const [vehicles, setVehicles] = useState<any[]>([]);

	const [incidentTypes, setIncidentTypes] = useState<
		{
			id: number;
			created_at: string;
			updated_at: string;
			deleted_at: null;
			name: string;
		}[]
	>([]);

	const handleNext = () => {
		setStep((prevStep) => prevStep + 1);
	};

	const handleBack = () => {
		setStep((prevStep) => prevStep - 1);
	};

	const handleInputChange =
		(setter: React.Dispatch<React.SetStateAction<string>>) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setter(event.target.value);
		};

	const handleSelectChange =
		(setter: React.Dispatch<React.SetStateAction<string>>) =>
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			setter(event.target.value);
		};

	const registerIncident = async () => {
		const input = {
			incidentType,
			description,
			incidentDate,
			vehicleId,
		};

		const advanceInputJSON = {
			kind: "create_incident",
			payload: input,
		};

		const signer = await provider.getSigner();
		let parsedInput = JSON.stringify(advanceInputJSON);
		advanceInput(signer, dappAddress, parsedInput).then((res) => {
			toast.success("Incident registered successfully");
			setStep(0);
		});
	};

	const getAllVehicles = async () => {
		try {
			const payload = JSON.stringify({
				kind: "get_vehicles",
				payload: {},
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
				setVehicles(parsedData.message);
				console.log(parsedData.message);
			}
		} catch (error) {
			console.error("error is ", error);
		}
	};

	const getIncidentTypes = async () => {
		try {
			const payload = JSON.stringify({
				kind: "get_incident_types",
				payload: {},
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
				setIncidentTypes(parsedData.message);
			}
		} catch (error) {
			console.error("error is ", error);
		}
	};

	useEffect(() => {
		getAllVehicles();
		getIncidentTypes();
	}, []);

	return (
		<div className="flex flex-col w-full p-6 rounded-lg shadow-lg h-full">
			<SwitchTransition>
				<CSSTransition key={step} timeout={300} classNames="fade">
					<div>
						{step === 0 && (
							<>
								<h2 className="text-xl font-semibold mb-4">
									Register Incident
								</h2>
								<div className="mb-4">
									<label
										htmlFor="incidentType"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										incidentType:
									</label>
									<select
										id="incidentType"
										value={incidentType}
										onChange={handleSelectChange(
											setIncidentType
										)}
										className="block w-full p-2 border border-gray-300 rounded-md"
									>
										<option value="" disabled>
											Select Incident Type
										</option>
										{incidentTypes.map((incidentType) => (
											<option
												key={incidentType.id}
												value={incidentType.id}
											>
												{incidentType.name}
											</option>
										))}
									</select>
								</div>
								<div className="flex justify-end">
									<button
										onClick={handleNext}
										className="p-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
									>
										Next
									</button>
								</div>
							</>
						)}
						{step === 1 && (
							<>
								<h2 className="text-xl font-semibold mb-4">
									Register Incident
								</h2>
								<div className="mb-4">
									<label
										htmlFor="description"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Description:
									</label>
									<input
										type="text"
										id="description"
										value={description}
										onChange={handleInputChange(
											setDescription
										)}
										className="block w-full p-2 border border-gray-300 rounded-md"
									/>
								</div>
								<div className="flex justify-between">
									<button
										onClick={handleBack}
										className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
									>
										Back
									</button>
									<button
										onClick={handleNext}
										className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
									>
										Next
									</button>
								</div>
							</>
						)}
						{step === 2 && (
							<>
								<h2 className="text-xl font-semibold mb-4">
									Register Incident
								</h2>
								<div className="mb-4">
									<label
										htmlFor="incidentDate"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Incident Date:
									</label>
									<input
										type="text"
										id="incidentDate"
										value={incidentDate}
										onChange={handleInputChange(
											setIncidentDate
										)}
										className="block w-full p-2 border border-gray-300 rounded-md"
									/>
								</div>
								<div className="flex justify-between">
									<button
										onClick={handleBack}
										className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
									>
										Back
									</button>
									<button
										onClick={handleNext}
										className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
									>
										Next
									</button>
								</div>
							</>
						)}
						{step === 3 && (
							<>
								<h2 className="text-xl font-semibold mb-4">
									Register Incident
								</h2>
								<div className="mb-4">
									<label
										htmlFor="vehicleId"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Vehicle ID:
									</label>
									<select
										id="vehicleId"
										value={vehicleId}
										onChange={handleSelectChange(
											setVehicleId
										)}
										className="block w-full p-2 border border-gray-300 rounded-md"
									>
										<option value="" disabled>
											Select Vehicle
										</option>
										{vehicles.map((vehicle) => (
											<option
												key={vehicle.id}
												value={vehicle.id}
											>
												{vehicle.kind.name}
											</option>
										))}
									</select>
								</div>
								<div className="flex justify-between">
									<button
										onClick={handleBack}
										className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
									>
										Back
									</button>
									<button
										onClick={registerIncident}
										className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 px-2"
									>
										Register
									</button>
								</div>
							</>
						)}
					</div>
				</CSSTransition>
			</SwitchTransition>

			<p className="text-center text-sm text-gray-500 mt-auto">
				Step {step + 1} of 4
			</p>
		</div>
	);
};

export default RegisterIncidentForm;
