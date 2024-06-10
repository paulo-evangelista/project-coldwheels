'use client'
import React, { useState } from "react";
import { ethers } from 'ethers';
import { advanceDAppRelay, advanceInput } from 'cartesi-client';
import { Main, Button, InputField } from './style';
interface IInputProps {
  dappAddress: string
}

const Input: React.FC<IInputProps> = (props) => {
  const [input, setInput] = useState<string>("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
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
      <Main>
          <div>
            Send Address (send relay dapp address) <br />
            <Button onClick={() => sendAddress()} >
                Send
            </Button>
          </div>
          <div>
            Send Input <br />
            Input:{" "}
            <InputField
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={() => addInput()}>Send</Button>
          </div>
      </Main>
    </div>
  );
};

export default Input;
