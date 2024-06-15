"use client";
import Sidebar from "../../components/Sidebar/Sidebar";
import RegisterIncidentForm from "../../components/RegisterIncidentForm/RegisterIncidentForm";
import RegisterVehicleForm from "../../components/RegisterVehicleForm/RegisterVehicleForm";
import GrantCompaniesForm from "../../components/GrantCompaniesForm/GrantCompaniesForm";

const FormInterface = () => {
	const dappAddress = "0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e";

	return (
		<div className="flex min-h-screen h-full">
			<Sidebar />

			<div className="w-full grid grid-cols-2 gap-6 p-6">
				<div className="flex flex-col gap-6">
					<GrantCompaniesForm />
				</div>
				<div className="flex flex-col gap-6">
					<RegisterIncidentForm dappAddress={dappAddress} />
				</div>
				<div className="flex flex-col gap-6 col-span-2">
					<RegisterVehicleForm dappAddress={dappAddress} />
				</div>
			</div>
		</div>
	);
};

export default FormInterface;
