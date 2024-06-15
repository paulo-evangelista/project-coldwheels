export declare const DEFAULT_OUTPUT_INDEX: number;
export interface GraphqlOptions {
    cartesiNodeUrl?: string;
    inputIndex?: number;
    outputIndex?: number;
}
export declare function setDefaultGraphqlOptions(options: GraphqlOptions): GraphqlOptions;
export declare function getGraphqlUrl(options: GraphqlOptions): string;
export declare function isInputNotFound(error: Error): boolean;
