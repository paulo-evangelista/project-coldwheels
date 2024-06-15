import { Input } from "../generated/graphql";
import { GraphqlOptions } from "./lib";
import { PartialNotice } from "./notices";
import { PartialReport } from "./reports";
import { PartialVoucher } from "./vouchers";
export interface InputResult extends GraphqlOptions {
    initialDelay: number;
    delayInterval: number;
}
/**
 * Queries a GraphQL server for notices based on an input index
 * @param url URL of the GraphQL server
 * @param input input index
 * @returns Object with a list of notices and reports for an input
 */
export declare const getInputResult: (options: InputResult) => Promise<{
    notices: Array<PartialNotice>;
    reports: Array<PartialReport>;
    vouchers: Array<PartialVoucher>;
}>;
/**
 * Queries a GraphQL server for notices based on an input index
 * @param options options that have default values
 * @returns Object with a list of notices and reports for an input
 */
export declare const queryInputResult: (options?: InputResult) => Promise<{
    notices: Array<PartialNotice>;
    reports: Array<PartialReport>;
    vouchers: Array<PartialVoucher>;
}>;
/**
 * Queries a GraphQL server looking for a specific input
 * @param url URL of the GraphQL server
 * @param inputIndex input index
 * @returns The corresponding input
 */
export declare const getInput: (url: string, inputIndex: number) => Promise<Input>;
/**
 * Queries a GraphQL server looking for a specific input
 * @param options options that have default values
 * @returns The corresponding input
 */
export declare const queryInput: (options?: GraphqlOptions) => Promise<Input>;
