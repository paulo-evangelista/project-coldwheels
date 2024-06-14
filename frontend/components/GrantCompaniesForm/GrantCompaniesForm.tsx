
const GrantCompaniesForm = () => {

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Register Incident</h2>
            <div className="mb-4">
                <label htmlFor="companyWallet" className="block text-sm font-medium text-gray-700 mb-1">
                Company Wallet Address:
                </label>
                <input
                type="text"
                id="companyWallet"
                className="block w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
                </label>
                <input
                type="text"
                id="role"
                className="block w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <button
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
                Next
            </button>
        </div>
    )
}

export default GrantCompaniesForm;