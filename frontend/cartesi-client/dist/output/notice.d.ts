import { Signer, BytesLike } from "ethers";
import { ProofStruct } from "@cartesi/rollups/dist/src/types/contracts/dapp/ICartesiDApp";
export declare function validateNoticeFromParams(signer: Signer, dappAddress: string, payload: BytesLike, proof: ProofStruct): Promise<boolean>;
