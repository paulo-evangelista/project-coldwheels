import { Notice, Input } from "../generated/graphql";
import { GraphqlOptions } from "./lib";
export type PartialInput = Pick<Input, "index">;
export type PartialNotice = Pick<Notice, "__typename" | "index" | "payload"> & {
    input: PartialInput;
};
export type PartialNoticeEdge = {
    node: PartialNotice;
};
/**
 * Queries a GraphQL server for notices based on an input index
 * @param url URL of the GraphQL server
 * @param input input index
 * @returns List of notices, returned as PartialNotice objects
 */
export declare const getNotices: (url: string, inputIndex?: number) => Promise<PartialNotice[]>;
/**
 * Queries a GraphQL server looking for a specific notice
 * @param url URL of the GraphQL server
 * @param inputIndex input index
 * @param noticeIndex notice index, default = 0
 * @returns The corresponding notice, returned as a full Notice object
 */
export declare const getNotice: (url: string, inputIndex: number, noticeIndex?: number) => Promise<Notice>;
/**
 * Queries a GraphQL server for notices based on input keys
 * @param options options that have default values
 * @returns List of notices, returned as PartialNotice objects
 */
export declare const queryNotices: (options?: GraphqlOptions) => Promise<PartialNotice[]>;
/**
 * Queries a GraphQL server looking for a specific notice
 * @param options options that have default values
 * @returns The corresponding notice, returned as a full Notice object
 */
export declare const queryNotice: (options?: GraphqlOptions) => Promise<Notice>;
