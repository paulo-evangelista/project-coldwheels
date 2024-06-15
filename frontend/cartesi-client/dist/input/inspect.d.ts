declare const DECODE_OPTIONS: readonly ["no-decode", "utf-8", "uint8Array"];
type DECODE = typeof DECODE_OPTIONS;
type DECODE_OPTIONS_TYPE = DECODE[number];
declare const METHOD_OPTIONS: readonly ["GET", "POST"];
type METHOD = typeof METHOD_OPTIONS;
type METHOD_OPTIONS_TYPE = METHOD[number];
declare const CACHE_OPTIONS: readonly ["default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached"];
type CACHE = typeof CACHE_OPTIONS;
export type CACHE_OPTIONS_TYPE = CACHE[number];
export interface InspectOptions {
    cartesiNodeUrl?: string;
    aggregate?: boolean;
    decodeTo?: DECODE_OPTIONS_TYPE;
    method?: METHOD_OPTIONS_TYPE;
    cache?: CACHE_OPTIONS_TYPE;
}
/**
 * Sends an inspect to a Cartesi Node with input payload
 * @param cartesiNodeUrl DApp's Cartesi Node URL
 * @param payload payload to send
 * @returns string
 */
export declare function inspect(payload: string): Promise<string>;
/**
 * Sends an inspect to a Cartesi Node with input payload
 * @param cartesiNodeUrl DApp's Cartesi Node URL
 * @param payload payload to send
 * @param options options that have default values
 * @returns string
 */
export declare function inspect(payload: string, options: InspectOptions): Promise<string | Uint8Array>;
export {};
