'use client'
import React, { useState } from "react";
import { ethers } from 'ethers';
import { advanceDAppRelay, advanceInput } from 'cartesi-client';
import styled from "styled-components";
interface IInputProps {
  dappAddress: string
}

const Main = styled.main`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 7px 20px;
  margin: 10px 10px;
  border: none;
  border-radius: 4px;
  background-color: black;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

const InputField = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
`;

const Checkbox = styled.input`
  margin-left: 10px;
`;

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
            <Checkbox
                type="checkbox"
                checked={hexInput}
                onChange={(e) => setHexInput(!hexInput)}
            />
            <span>Raw Hex </span>
            <Button onClick={() => addInput()}>Send</Button>

          </div>
      </Main>
    </div>
  );
};

export default Input;
