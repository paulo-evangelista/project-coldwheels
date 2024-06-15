"use client";
import Sidebar from "../../components/Sidebar/Sidebar";
import RegisterIncidentForm from "../../components/RegisterIncidentForm/RegisterIncidentForm";
import RegisterVehicleForm from "../../components/RegisterVehicleForm/RegisterVehicleForm";
import GrantCompaniesForm from "../../components/GrantCompaniesForm/GrantCompaniesForm";

const FormInterface = () => {
	return (
		<div className="flex min-h-screen">
			<Sidebar />

			<div className="w-full grid grid-cols-1 gap-6 p-6 border-2 border-blue-500">
				<div className="flex flex-col gap-6 col-span-1">
					<GrantCompaniesForm />
				</div>
				<div className="flex flex-col gap-6 col-span-1">
					<RegisterIncidentForm />
				</div>
				<div className="flex flex-col gap-6 col-span-2">
					<RegisterVehicleForm />
				</div>
			</div>
		</div>
	);
};

export default FormInterface;
