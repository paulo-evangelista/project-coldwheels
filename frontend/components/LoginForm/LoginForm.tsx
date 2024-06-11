'use client'
import React, { useState } from "react";
import { ethers } from 'ethers';
import { advanceDAppRelay, advanceInput } from 'cartesi-client';

interface IInputProps {
  dappAddress: string
}

const Input: React.FC<IInputProps> = (props) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [kind, setKind] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const dappAddress = props.dappAddress;

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
    <div className="text-center">
      <main className="bg-white p-5 rounded-lg shadow-md mt-5">
          <div>
            <div className="mb-2">
              <label htmlFor="name" className="block text-left">Name:</label>
              <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 rounded border border-gray-300 w-full"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="description" className="block text-left">Description:</label>
              <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-2 rounded border border-gray-300 w-full"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="kind" className="block text-left">Kind:</label>
              <input
                  type="text"
                  id="kind"
                  value={kind}
                  onChange={(e) => setKind(e.target.value)}
                  className="p-2 rounded border border-gray-300 w-full"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="address" className="block text-left">Address:</label>
              <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="p-2 rounded border border-gray-300 w-full"
              />
            </div>
            <button
              onClick={addInput}
              className="py-2 px-5 my-2 mx-2 border-none rounded bg-black text-white cursor-pointer hover:bg-gray-500"
            >
              Send Advance
            </button>
          </div>
      </main>
    </div>
  );
};

export default Input;
