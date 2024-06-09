import Input from "./input";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;

const InputContainer = styled.div`
  margin-top: 20px;
`;

export const Network = () => {
    const { address, isConnected } = useAccount();
    const [dappAddress, setDappAddress] = useState<string>(
        "0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e"
    );
    return (
        <Container>
            <ConnectButton />
            {isConnected && address && (
                <InputContainer>
                    <div>
                        Dapp Address: <input
                            type="text"
                            value={dappAddress}
                            onChange={(e) => setDappAddress(e.target.value)}
                        />
                        <br /><br />
                    </div>
                    <Input dappAddress={dappAddress} />
                </InputContainer>
            )}
        </Container>
    );
};