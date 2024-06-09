'use client';

import { http, createStorage, cookieStorage } from 'wagmi'
import { sepolia, bscTestnet } from 'wagmi/chains'
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit'

const projectId = 'b934d56b44c8b458bc65034dea081498';

const supportedChains: Chain[] = [sepolia, bscTestnet];

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