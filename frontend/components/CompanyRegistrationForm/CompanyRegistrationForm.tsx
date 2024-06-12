'use client'
import React, { useState } from "react";
import { ethers } from 'ethers';
import { advanceInput } from 'cartesi-client';

const CompanyRegistrationForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [kind, setKind] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [dappAddress, setDappAddress] = useState<string>(
      "0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e"
  );

  const addInput = async () => {
    const inputPayload = {
      kind: "register_company",
      payload: {
        name: name,
        description: description,
        kind: kind,
        address: address
      }
    };
    const inputString = JSON.stringify(inputPayload);
    console.log("adding input", inputString);
    const signer = await provider.getSigner();
    console.log("signer and input is ", signer, inputString);
    advanceInput(signer, dappAddress, inputString);
  };

  return (
    <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
      <div className="w-1/2 p-10">
        <h2 className="text-2xl font-bold mb-6">Register your Company</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <div>
            <label className="block text-gray-700">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <div>
            <label className="block text-gray-700">Kind:</label>
            <input
              type="text"
              id="kind"
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <div>
            <label className="block text-gray-700">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full" />
          </div>
          <button type="submit" onClick={addInput} className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
            Register
          </button>
        </form>
      </div>
      <div className="w-1/2">
        <img src="../../assets/images/lava.jpeg" alt="Image" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

  export default CompanyRegistrationForm;
  