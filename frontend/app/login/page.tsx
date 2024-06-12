'use client'
import Sidebar from '../../components/Sidebar/Sidebar';
import CompanyRegistrationForm from '../../components/CompanyRegistrationForm/CompanyRegistrationForm';

export default function Home() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center bg-gray-0">
        <CompanyRegistrationForm />
      </div>
    </div>
  );
}


