'use client'
import Sidebar from "../../components/Sidebar/Sidebar";
import RegisterIncidentForm from "../../components/RegisterIncidentForm/RegisterIncidentForm";
import RegisterVehicleForm from "../../components/RegisterVehicleForm/RegisterVehicleForm";
import GrantCompaniesForm from "../../components/GrantCompaniesForm/GrantCompaniesForm";

const FormInterface = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      <Sidebar />
      <div className="flex flex-col gap-6">
        <GrantCompaniesForm />
      </div>
      <div className="flex flex-col gap-6">
        <RegisterIncidentForm />
      </div>
      <div className="flex flex-col gap-6">
        <RegisterVehicleForm />
      </div>
    </div>
  );
};

export default FormInterface;
