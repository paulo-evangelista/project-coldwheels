'use client'
import React, { useState } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { ethers } from 'ethers';
import { useWallets } from "@web3-onboard/react";
import { advanceDAppRelay, advanceERC20Deposit, advanceERC721Deposit, advanceEtherDeposit, advanceInput } from 'cartesi-client';
import { init } from "@web3-onboard/react";
import configFile from "./config.json";
import injectedModule from "@web3-onboard/injected-wallets";

const injected = injectedModule();
init({
  wallets: [injected],
  chains: Object.entries(configFile).map(([k, v]: [string, any], i) => ({
    id: k,
    token: v.token,
    label: v.label,
    rpcUrl: v.rpcUrl,
  })),
  appMetadata: {
    name: "DecentraAds",
    icon: "<svg><svg/>",
    description: "Decentralized Marketplace for Adspaces",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
});

interface IInputPropos {
  dappAddress: string
}

const Login: NextPage<IInputPropos> = (props) => {
  const [connectedWallet] = useWallets();
  const [input, setInput] = useState<string>("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [hexInput, setHexInput] = useState<boolean>(false);

  const dappAddress = props.dappAddress;
  console.log("dapp address is:", dappAddress);
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
    <div>
      <main>
        <ConnectButton />
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

export default Login;
