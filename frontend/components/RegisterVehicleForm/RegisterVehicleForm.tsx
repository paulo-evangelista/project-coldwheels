import { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./formAnimations.css";

const RegisterVehicleForm = () => {
	const [step, setStep] = useState(0);

	const handleNext = () => {
		setStep((prevStep) => prevStep + 1);
	};

	const handleBack = () => {
		setStep((prevStep) => prevStep - 1);
	};

	return (
		<div className="w-full p-6 border border-gray-300 rounded-lg shadow-sm">
			<SwitchTransition>
				<CSSTransition key={step} timeout={300} classNames="fade">
					<div>
						{step === 0 && (
							<>
								<h2 className="text-xl font-semibold mb-4">
									Register Vehicle
								</h2>
								<div className="mb-4">
									<label
										htmlFor="fipeId"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Fipe ID:
									</label>
									<input
										type="text"
										id="fipeId"
										className="block w-full p-2 border border-gray-300 rounded-md"
									/>
								</div>
								<button
									onClick={handleNext}
									className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
								>
									Next
								</button>
							</>
						)}
						{step === 1 && (
							<>
								<h2 className="text-xl font-semibold mb-4">
									Register Vehicle
								</h2>
								<div className="mb-4">
									<label
										htmlFor="fipePrice"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Fipe Price:
									</label>
									<input
										type="text"
										id="fipePrice"
										className="block w-full p-2 border border-gray-300 rounded-md"
									/>
								</div>
								<button
									onClick={handleNext}
									className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
								>
									Next
								</button>
							</>
						)}
						{step === 2 && (
							<>
								<h2 className="text-xl font-semibold mb-4">
									Register Vehicle
								</h2>
								<div className="mb-4">
									<label
										htmlFor="brand"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Brand:
									</label>
									<input
										type="text"
										id="brand"
										className="block w-full p-2 border border-gray-300 rounded-md"
									/>
								</div>
								<button
									onClick={handleNext}
									className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
								>
									Next
								</button>
							</>
						)}
						{step === 3 && (
							<>
								<h2 className="text-xl font-semibold mb-4">
									Register Vehicle
								</h2>
								<div className="mb-4">
									<label
										htmlFor="shortName"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Short Name:
									</label>
									<input
										type="text"
										id="shortName"
										className="block w-full p-2 border border-gray-300 rounded-md"
									/>
								</div>
								<button
									onClick={handleNext}
									className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
								>
									Next
								</button>
							</>
						)}
						{step === 4 && (
							<>
								<h2 className="text-xl font-semibold mb-4">
									Register Vehicle
								</h2>
								<div className="mb-4">
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Name:
									</label>
									<input
										type="text"
										id="name"
										className="block w-full p-2 border border-gray-300 rounded-md"
									/>
								</div>
								<button
									onClick={handleNext}
									className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
								>
									Next
								</button>
							</>
						)}
						{step === 5 && (
							<>
								<h2 className="text-xl font-semibold mb-4">
									Register Vehicle
								</h2>
								<div className="mb-4">
									<label
										htmlFor="year"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Year:
									</label>
									<input
										type="text"
										id="year"
										className="block w-full p-2 border border-gray-300 rounded-md"
									/>
								</div>
								<button
									onClick={handleNext}
									className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
								>
									Submit
								</button>
							</>
						)}
					</div>
				</CSSTransition>
			</SwitchTransition>
		</div>
	);
};

export default RegisterVehicleForm;
