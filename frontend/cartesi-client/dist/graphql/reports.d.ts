import { Report, Input } from "../generated/graphql";
import { GraphqlOptions } from "./lib";
export type PartialInput = Pick<Input, "index">;
export type PartialReport = Pick<Report, "__typename" | "index" | "payload"> & {
    input: PartialInput;
};
export type PartialReportEdge = {
    node: PartialReport;
};
/**
 * Queries a GraphQL server for reports based on input keys
 * @param url URL of the GraphQL server
 * @param input input identification keys
 * @returns List of reports, returned as PartialReport objects
 */
export declare const getReports: (url: string, inputIndex?: number) => Promise<PartialReport[]>;
/**
 * Queries a GraphQL server looking for a specific report
 * @param url URL of the GraphQL server
 * @param inputIndex input index
 * @param reportIndex report index, default = 0
 * @returns The corresponding report, returned as a full Report object
 */
export declare const getReport: (url: string, inputIndex: number, reportIndex?: number) => Promise<Report>;
/**
 * Queries a GraphQL server for reports based on input keys
 * @param options options that have default values
 * @returns List of reports, returned as PartialReport objects
 */
export declare const queryReports: (options?: GraphqlOptions) => Promise<PartialReport[]>;
/**
 * Queries a GraphQL server looking for a specific report
 * @param options options that have default values
 * @returns The corresponding report, returned as a full Report object
 */
export declare const queryReport: (options?: GraphqlOptions) => Promise<Report>;
