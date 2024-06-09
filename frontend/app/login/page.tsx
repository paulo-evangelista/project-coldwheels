'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <div>
      <main>
        <ConnectButton />
      </main>
    </div>
  );
};

export default Login;
