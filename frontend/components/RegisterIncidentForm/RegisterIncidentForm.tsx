import { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { ethers } from "ethers";
import "./formAnimations.css";
import axios from "axios";

interface Props {
	dappAddress: string;
}

const RegisterIncidentForm: React.FC<Props> = (props) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const dappAddress = props.dappAddress;
	const [step, setStep] = useState(0);
	const [incidentType, setIncidentType] = useState("");
	const [description, setDescription] = useState("");
	const [incidentDate, setIncidentDate] = useState("");
	const [vehicleId, setVehicleId] = useState("");

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

	const registerIncident = async () => {
		const input = {
			incidentType,
			description,
			incidentDate,
			vehicleId,
		};

		console.log("adding input", input);
		const signer = await provider.getSigner();
		console.log("signer and input is ", signer, input);
		// advanceInput(signer, dappAddress, input);
	};

	const getAllVehicles = async () => {
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
	}

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
									<input
										type="text"
										id="incidentType"
										value={incidentType}
										onChange={handleInputChange(
											setIncidentType
										)}
										className="block w-full p-2 border border-gray-300 rounded-md"
									/>
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
									<input
										type="text"
										id="vehicleId"
										value={vehicleId}
										onChange={handleInputChange(
											setVehicleId
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
