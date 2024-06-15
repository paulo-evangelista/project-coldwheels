import { useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { ethers } from "ethers";
// import { advanceInput } from "cartesi-client";
import "./formAnimations.css";
import { toast } from "react-toastify";
import lava from "@/assets/images/lava.jpeg";
import { advanceInput } from "cartesi-client";
import { useAccount } from "wagmi";

interface Props {
	dappAddress: string;
}

const RegisterVehicleForm: React.FC<Props> = (props) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const dappAddress = props.dappAddress;
	const [step, setStep] = useState(3);
	const [plate, setPlate] = useState("teste");
	const [kindId, setKindId] = useState("1");
	const [odometer, setOdometer] = useState("12000");
	const [images, setImages] = useState<File[]>([]);
	const { address: wallet, isConnected } = useAccount();

	const [isLoading, setIsLoading] = useState(false);

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

	const handleFileChange =
		(index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
			const newFiles = [...images];
			const file = event.target.files?.[0];
			if (file) {
				newFiles[index] = file;
			} else {
				newFiles[index] = new File([], "");
			}
			setImages(newFiles);
		};

	const addImageInput = () => {
		setImages([...images, new File([], "")]);
	};

	const removeImage = (index: number) => {
		const newImages = images.filter((_, i) => i !== index);
		setImages(newImages.length > 0 ? newImages : [new File([], "")]);
	};

	const uploadFileToIpfs = async (file: File) => {
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);

		try {
			const res = await fetch(
				"https://api.pinata.cloud/pinning/pinFileToIPFS",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
					},
					body: formData,
				}
			);

			if (!res.ok) {
				throw new Error("Error uploading file to IPFS");
			}

			const data = await res.json();
			const uri = data.IpfsHash;
			return uri;
		} catch (error) {
			console.error("Error uploading file: ", error);
			return error;
		}
	};

	const registerVehicle = async () => {
		try {
			let imagesUri = [];
			for (let i = 0; i < images.length; i++) {
				const uri = await uploadFileToIpfs(images[i]);
				imagesUri.push(uri);
			}

			const input = {
				plate,
				kind_id: Number(kindId),
				odometer: Number(odometer),
				images: imagesUri,
			};

			const advanceInputJSON = {
				kind: "create_vehicle",
				payload: input,
			};

			console.log("adding input", input);
			const signer = await provider.getSigner();

			console.log("signer and input is ", signer, input);
			let parsedInput = JSON.stringify(advanceInputJSON);
			console.log("parsed input is ", parsedInput);

			advanceInput(signer, dappAddress, parsedInput).then((res) => {
				toast.success("Vehicle registered successfully");
				setStep(0);
			});
		} catch (err) {
			console.error(err);
			toast.error("Error registering vehicle");
		} finally {
			setIsLoading(false);
		}
	};

	const isFormValid = () => {
		return (
			plate !== "" &&
			kindId !== "" &&
			odometer !== "" &&
			images.length > 0
		);
	};

	return (
		<div className="flex flex-col w-full p-6 rounded-lg shadow-lg h-full">
			<SwitchTransition>
				<CSSTransition
					key={step}
					timeout={300}
					classNames="form-animation"
				>
					<div>
						{step === 0 && (
							<>
								<h2 className="text-xl font-semibold mb-4">
									Register Vehicle
								</h2>
								<div className="mb-4">
									<label
										htmlFor="plate"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Plate:
									</label>
									<input
										type="text"
										id="plate"
										value={plate}
										onChange={handleInputChange(setPlate)}
										className="block w-full p-2 border border-gray-300 rounded-md"
									/>
								</div>
								{/* <button
									onClick={handleNext}
									className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
								>
									Next
								</button> */}
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
									Register Vehicle
								</h2>
								<div className="mb-4">
									<label
										htmlFor="kindId"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Vehicle Kind:
									</label>
									<input
										type="text"
										id="kindId"
										value={kindId}
										onChange={handleInputChange(setKindId)}
										className="block w-full p-2 border border-gray-300 rounded-md"
									/>
								</div>
								{/* <button
									onClick={handleNext}
									className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
								>
									Next
								</button> */}
								<div className="flex justify-between">
									<button
										onClick={handleBack}
										className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
									>
										Back
									</button>
									<button
										onClick={handleNext}
										className="p-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
									>
										Next
									</button>
								</div>
							</>
						)}
						{step === 2 && (
							<>
								<h2 className="text-xl font-semibold mb-4">
									Register Vehicle
								</h2>
								<div className="mb-4">
									<label
										htmlFor="odometer"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Odometer:
									</label>
									<input
										type="text"
										id="odometer"
										value={odometer}
										onChange={handleInputChange(
											setOdometer
										)}
										className="block w-full p-2 border border-gray-300 rounded-md"
									/>
								</div>
								{/* <button
									onClick={handleNext}
									className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
								>
									Next
								</button> */}
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
									Register Vehicle
								</h2>
								<div className="mb-4">
									<label
										htmlFor="image"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Vehicle Image:
									</label>

									{images.length > 0 ? (
										images.map((image, index) => (
											<div
												key={index}
												className={`flex gap-4 ${
													index > 0 ? "mt-4" : ""
												}`}
											>
												<input
													type="file"
													onChange={handleFileChange(
														index
													)}
													className="block w-full p-2 border border-gray-300 rounded-md"
												/>
												{images.length > 1 && (
													<button
														onClick={() =>
															removeImage(index)
														}
														className="p-2 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
													>
														Remove
													</button>
												)}
											</div>
										))
									) : (
										<p className="text-gray-500">
											No images added
										</p>
									)}
									<button
										onClick={addImageInput}
										className="mt-2 text-end rounded-md text-blue-400 hover:text-blue-600 hover:underline"
									>
										+ Add Image
									</button>
								</div>
								<div className="flex justify-between w-full">
									<button
										onClick={handleBack}
										className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
									>
										Back
									</button>

									<button
										onClick={registerVehicle}
										className="p-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
										disabled={!isFormValid() || isLoading}
									>
										{isLoading ? "Loading..." : "Register"}
									</button>
								</div>
							</>
						)}
					</div>
				</CSSTransition>
			</SwitchTransition>

			<p className="text-sm text-gray-500 text-center mt-auto">
				Step {step + 1} of 4
			</p>
		</div>
	);
};

export default RegisterVehicleForm;
