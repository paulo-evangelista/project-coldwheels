"use client";

import { http, createStorage, cookieStorage, createConfig } from "wagmi";
import { sepolia, bscTestnet } from "wagmi/chains";
import {
	Chain,
	connectorsForWallets,
	getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import {
	rainbowWallet,
	walletConnectWallet,
	metaMaskWallet,
	phantomWallet,
	coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";

coinbaseWallet.preference = "smartWalletOnly";

const projectId = "b934d56b44c8b458bc65034dea081498";

const coldWheels = {
	id: 31337,
	name: "ColdWheels",
	iconUrl:
		"https://logos-world.net/wp-content/uploads/2021/08/Hot-Wheels-Logo.png",
	iconBackground: "#fff",
	nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
	rpcUrls: {
		default: { http: ["http://127.0.0.1:8545"] },
	},
} as const satisfies Chain;

const supportedChains: Chain[] = [sepolia, bscTestnet, coldWheels];

const connectors = connectorsForWallets(
	[
		{
			groupName: "Recommended",
			wallets: [
				rainbowWallet,
				walletConnectWallet,
				metaMaskWallet,
				phantomWallet,
				coinbaseWallet,
			],
		},
	],
	{
		appName: "WalletConnection",
		projectId,
		appDescription:
			"ColdWheels is a dapp built on top of Cartesi Infrastructure",
		appIcon:
			"https://logos-world.net/wp-content/uploads/2021/08/Hot-Wheels-Logo.png",
		appUrl: "https://coldwheels.com",
	}
);

export const config = createConfig({
	// appName: "WalletConnection",
	// projectId: projectId,
	chains: supportedChains as any,
	ssr: true,
	storage: createStorage({
		storage: cookieStorage,
	}),
	transports: supportedChains.reduce(
		(obj, chain) => ({ ...obj, [chain.id]: http() }),
		{}
	),
	connectors,
});
