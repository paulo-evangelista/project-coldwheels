'use client'
import React from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { init } from "@web3-onboard/react";
import configFile from "./config.json";
import injectedModule from "@web3-onboard/injected-wallets";
import { Network } from "./network";

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
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
});

interface IInputPropos {
  dappAddress: string
}

const Login: NextPage<IInputPropos> = (props) => {
  return (
    <div>
      <main>
        <ConnectButton />
          <div>
            <Network></Network>
          </div>
      </main>
    </div>
  );
};

export default Login;
