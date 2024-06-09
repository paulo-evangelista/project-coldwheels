'use client'
import React, { useState } from "react";
import { ethers } from 'ethers';
import { advanceDAppRelay, advanceInput } from 'cartesi-client';
interface IInputProps {
  dappAddress: string
}

const Input: React.FC<IInputProps> = (props) => {
  const [input, setInput] = useState<string>("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [hexInput, setHexInput] = useState<boolean>(false);
  const dappAddress = props.dappAddress;

  const addInput = async () => {
      console.log("adding input", input);
      const signer = await provider.getSigner();
      console.log("signer and input is ", signer, input);
      advanceInput(signer, dappAddress, input);
  };

  const sendAddress = async () => {
      console.log("sending dapp address");
      const signer = await provider.getSigner();
      advanceDAppRelay(signer, dappAddress);
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <main>
          <div>
            Send Address (send relay dapp address) <br />
            <button onClick={() => sendAddress()} >
                Send
            </button>
            <br />
            <br />
          </div>
          <div>
            Send Input <br />
            Input:{" "}
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <input
                type="checkbox"
                checked={hexInput}
                onChange={(e) => setHexInput(!hexInput)}
            />
            <span>Raw Hex </span>
            <button onClick={() => addInput()}>Send</button>
            <br />
            <br />
          </div>
      </main>
    </div>
  );
};

export default Input;
