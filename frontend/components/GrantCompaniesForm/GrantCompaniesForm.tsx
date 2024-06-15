import { useState } from "react";

const GrantCompaniesForm = () => {
	const roles = [
		{ role: "Untrusted", value: 1 },
		{ role: "Trusted", value: 2 },
		{ role: "Affiliate", value: 3 },
		{ role: "Admin", value: 4 },
	];

	const [companyWallet, setCompanyWallet] = useState("");
	const [role, setRole] = useState(roles[0].value);

	const handleSubmit = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		console.log({ companyWallet, role });
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full p-6 border border-gray-300 rounded-lg shadow-sm"
		>
			<h2 className="text-xl font-semibold mb-4">Register Incident</h2>
			<div className="mb-4">
				<label
					htmlFor="companyWallet"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Company Wallet Address:
				</label>
				<input
					type="text"
					id="companyWallet"
					className="block w-full p-2 border border-gray-300 rounded-md"
					value={companyWallet}
					onChange={(e) => setCompanyWallet(e.target.value)}
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="role"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Role
				</label>
				<select
					id="role"
					className="block w-full p-2 border border-gray-300 rounded-md"
					value={role}
					onChange={(e) => setRole(Number(e.target.value))}
				>
					{roles.map((role) => (
						<option value={role.value}>{role.role}</option>
					))}
				</select>
			</div>
			<button
				type="submit"
				className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
			>
				Next
			</button>
		</form>
	);
};

export default GrantCompaniesForm;
