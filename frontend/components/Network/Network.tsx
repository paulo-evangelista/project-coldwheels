import Input from "../Input/Input";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export const Network = () => {
    const { address, isConnected } = useAccount();
    const [dappAddress, setDappAddress] = useState<string>(
        "0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e"
    );
    return (
        <div className="text-center">
            <ConnectButton />
            {isConnected && address && (
                <div className="mt-5">
                    <div>
                        Dapp Address:
                        <input
                            type="text"
                            value={dappAddress}
                            onChange={(e) => setDappAddress(e.target.value)}
                            className="ml-2 p-2 border border-gray-300 rounded"
                        />
                        <br /><br />
                    </div>
                    <Input dappAddress={dappAddress} />
                </div>
            )}
        </div>
    );
};