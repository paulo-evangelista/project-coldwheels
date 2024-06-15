import { Signer, ContractReceipt, ethers } from "ethers";
import { PartialNotice, PartialReport, PartialVoucher } from "..";
interface AdvanceOptions {
    sync?: boolean;
    cartesiNodeUrl?: string;
    initialDelay?: number;
    delayInterval?: number;
}
export interface AdvanceInputOptions extends AdvanceOptions {
    inputBoxAddress?: string;
}
export interface ERC20DepositOptions extends AdvanceOptions {
    erc20PortalAddress?: string;
    decimals?: number;
}
export interface ERC721DepositOptions extends AdvanceOptions {
    erc721PortalAddress?: string;
}
export interface EtherDepositOptions extends AdvanceOptions {
    etherPortalAddress?: string;
}
export interface DappRelayOptions extends AdvanceOptions {
    dappRelayAddress?: string;
}
export interface AdvanceOutput {
    notices: Array<PartialNotice>;
    reports: Array<PartialReport>;
    vouchers: Array<PartialVoucher>;
}
/**
 * Queries a GraphQL server for notices based on an input index
 * @param client signer
 * @param dappAddress Cartesi Rollup DApp contract address
 * @param payload payload to send
 * @returns Object with a list of notices, reports, and vouchers for an input
 */
export declare function advanceInput(client: Signer, dappAddress: string, payload: string | Uint8Array): Promise<AdvanceOutput>;
/**
 * Queries a GraphQL server for notices based on an input index
 * @param client signer
 * @param dappAddress Cartesi Rollup DApp contract address
 * @param payload payload to send
 * @param options options that have default values
 * @returns Object with a list of notices, reports, and vouchers an input, or addInput's receipt
 */
export declare function advanceInput(client: Signer, dappAddress: string, payload: string | Uint8Array, options: AdvanceInputOptions): Promise<AdvanceOutput | ContractReceipt>;
/**
 * Queries a GraphQL server for notices based on an input index
 * @param client signer
 * @param dappAddress Cartesi Rollup DApp contract address
 * @param tokenAddress ERC20 token address
 * @param amount amount of the ERC20 token to deposit
 * @returns Object with a list of notices and reports for an input or addInput's receipt
 */
export declare function advanceERC20Deposit(client: Signer, dappAddress: string, tokenAddress: string, amount: ethers.BigNumberish): Promise<AdvanceOutput>;
/**
 * Queries a GraphQL server for notices based on an input index
 * @param client signer
 * @param dappAddress Cartesi Rollup DApp contract address
 * @param tokenAddress ERC20 token address
 * @param amount amount of the ERC20 token to deposit
 * @param options options that have default values
 * @returns Object with a list of notices and reports for an input or addInput's receipt
 */
export declare function advanceERC20Deposit(client: Signer, dappAddress: string, tokenAddress: string, amount: ethers.BigNumberish, options: ERC20DepositOptions): Promise<AdvanceOutput | ContractReceipt>;
/**
 * Queries a GraphQL server for notices based on an input index
 * @param client signer
 * @param dappAddress Cartesi Rollup DApp contract address
 * @param tokenAddress ERC721 token address
 * @param tokenId id of the ERC721 token to deposit
 * @returns Object with a list of notices and reports for an input or addInput's receipt
 */
export declare function advanceERC721Deposit(client: Signer, dappAddress: string, tokenAddress: string, tokenId: ethers.BigNumberish): Promise<AdvanceOutput>;
/**
 * Queries a GraphQL server for notices based on an input index
 * @param client signer
 * @param dappAddress Cartesi Rollup DApp contract address
 * @param tokenAddress ERC721 token address
 * @param tokenId id of the ERC721 token to deposit
 * @param options options that have default values
 * @returns Object with a list of notices and reports for an input or addInput's receipt
 */
export declare function advanceERC721Deposit(client: Signer, dappAddress: string, tokenAddress: string, tokenId: ethers.BigNumberish, options: ERC721DepositOptions): Promise<AdvanceOutput | ContractReceipt>;
/**
 * Queries a GraphQL server for notices based on an input index
 * @param client signer
 * @param dappAddress Cartesi Rollup DApp contract address
 * @param amount amount of ETHER to deposit (in ETHER)
 * @returns Object with a list of notices and reports for an input or addInput's receipt
 */
export declare function advanceEtherDeposit(client: Signer, dappAddress: string, amount: ethers.BigNumberish): Promise<AdvanceOutput>;
/**
 * Queries a GraphQL server for notices based on an input index
 * @param client signer
 * @param dappAddress Cartesi Rollup DApp contract address
 * @param tokenAddress ERC20 token address
 * @param amount amount of ETHER to deposit (in ETHER)
 * @param options options that have default values
 * @returns Object with a list of notices and reports for an input or addInput's receipt
 */
export declare function advanceEtherDeposit(client: Signer, dappAddress: string, amount: ethers.BigNumberish, options: EtherDepositOptions): Promise<AdvanceOutput | ContractReceipt>;
/**
 * Queries a GraphQL server for notices based on an input index
 * @param client signer
 * @param dappAddress Cartesi Rollup DApp contract address
 * @returns Object with a list of notices and reports for an input or addInput's receipt
 */
export declare function advanceDAppRelay(client: Signer, dappAddress: string): Promise<AdvanceOutput>;
/**
 * Queries a GraphQL server for notices based on an input index
 * @param client signer
 * @param dappAddress Cartesi Rollup DApp contract address
 * @param tokenAddress ERC20 token address
 * @param options options that have default values
 * @returns Object with a list of notices and reports for an input or addInput's receipt
 */
export declare function advanceDAppRelay(client: Signer, dappAddress: string, options: DappRelayOptions): Promise<AdvanceOutput | ContractReceipt>;
export {};
