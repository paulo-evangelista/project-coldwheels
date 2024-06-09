'use client';

import { http, createStorage, cookieStorage } from 'wagmi'
import { sepolia, bscTestnet } from 'wagmi/chains'
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit'

const projectId = 'b934d56b44c8b458bc65034dea081498';

const coldWheels = {
   id: 31337,
   name: 'ColdWheels',
   iconUrl: 'https://logos-world.net/wp-content/uploads/2021/08/Hot-Wheels-Logo.png',
   iconBackground: '#fff',
   nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
   rpcUrls: {
     default: { http: ['http://127.0.0.1:8545'] },
   },
 } as const satisfies Chain;

const supportedChains: Chain[] = [sepolia, bscTestnet, coldWheels];

export const config = getDefaultConfig({
   appName: 'WalletConnection',
   projectId: projectId,
   chains: supportedChains as any,
   ssr: true,
   storage: createStorage({
    storage: cookieStorage,
   }),
  transports: supportedChains.reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {})
 });