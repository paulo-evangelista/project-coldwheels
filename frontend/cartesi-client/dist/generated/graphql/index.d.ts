import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {
    [key: string]: unknown;
}, K extends keyof T> = {
    [_ in K]?: never;
};
export type Incremental<T> = T | {
    [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: {
        input: string;
        output: string;
    };
    String: {
        input: string;
        output: string;
    };
    Boolean: {
        input: boolean;
        output: boolean;
    };
    Int: {
        input: number;
        output: number;
    };
    Float: {
        input: number;
        output: number;
    };
    BigInt: {
        input: any;
        output: any;
    };
};
export declare enum CompletionStatus {
    Accepted = "ACCEPTED",
    CycleLimitExceeded = "CYCLE_LIMIT_EXCEEDED",
    Exception = "EXCEPTION",
    MachineHalted = "MACHINE_HALTED",
    PayloadLengthLimitExceeded = "PAYLOAD_LENGTH_LIMIT_EXCEEDED",
    Rejected = "REJECTED",
    TimeLimitExceeded = "TIME_LIMIT_EXCEEDED",
    Unprocessed = "UNPROCESSED"
}
/** Request submitted to the application to advance its state */
export type Input = {
    __typename?: 'Input';
    /** Number of the base layer block in which the input was recorded */
    blockNumber: Scalars['BigInt']['output'];
    /** Input index starting from genesis */
    index: Scalars['Int']['output'];
    /** Address responsible for submitting the input */
    msgSender: Scalars['String']['output'];
    /** Get notice from this particular input given the notice's index */
    notice: Notice;
    /** Get notices from this particular input with support for pagination */
    notices: NoticeConnection;
    /** Input payload in Ethereum hex binary format, starting with '0x' */
    payload: Scalars['String']['output'];
    /** Get report from this particular input given the report's index */
    report: Report;
    /** Get reports from this particular input with support for pagination */
    reports: ReportConnection;
    /** Status of the input */
    status: CompletionStatus;
    /** Timestamp associated with the input submission, as defined by the base layer's block in which it was recorded */
    timestamp: Scalars['BigInt']['output'];
    /** Get voucher from this particular input given the voucher's index */
    voucher: Voucher;
    /** Get vouchers from this particular input with support for pagination */
    vouchers: VoucherConnection;
};
/** Request submitted to the application to advance its state */
export type InputNoticeArgs = {
    index: Scalars['Int']['input'];
};
/** Request submitted to the application to advance its state */
export type InputNoticesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};
/** Request submitted to the application to advance its state */
export type InputReportArgs = {
    index: Scalars['Int']['input'];
};
/** Request submitted to the application to advance its state */
export type InputReportsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};
/** Request submitted to the application to advance its state */
export type InputVoucherArgs = {
    index: Scalars['Int']['input'];
};
/** Request submitted to the application to advance its state */
export type InputVouchersArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};
/** Pagination result */
export type InputConnection = {
    __typename?: 'InputConnection';
    /** Pagination entries returned for the current page */
    edges: Array<InputEdge>;
    /** Pagination metadata */
    pageInfo: PageInfo;
    /** Total number of entries that match the query */
    totalCount: Scalars['Int']['output'];
};
/** Pagination entry */
export type InputEdge = {
    __typename?: 'InputEdge';
    /** Pagination cursor */
    cursor: Scalars['String']['output'];
    /** Node instance */
    node: Input;
};
/** Filter object to restrict results depending on input properties */
export type InputFilter = {
    /** Filter only inputs with index greater than a given value */
    indexGreaterThan?: InputMaybe<Scalars['Int']['input']>;
    /** Filter only inputs with index lower than a given value */
    indexLowerThan?: InputMaybe<Scalars['Int']['input']>;
};
/** Informational statement that can be validated in the base layer blockchain */
export type Notice = {
    __typename?: 'Notice';
    /** Notice index within the context of the input that produced it */
    index: Scalars['Int']['output'];
    /** Input whose processing produced the notice */
    input: Input;
    /** Notice data as a payload in Ethereum hex binary format, starting with '0x' */
    payload: Scalars['String']['output'];
    /** Proof object that allows this notice to be validated by the base layer blockchain */
    proof?: Maybe<Proof>;
};
/** Pagination result */
export type NoticeConnection = {
    __typename?: 'NoticeConnection';
    /** Pagination entries returned for the current page */
    edges: Array<NoticeEdge>;
    /** Pagination metadata */
    pageInfo: PageInfo;
    /** Total number of entries that match the query */
    totalCount: Scalars['Int']['output'];
};
/** Pagination entry */
export type NoticeEdge = {
    __typename?: 'NoticeEdge';
    /** Pagination cursor */
    cursor: Scalars['String']['output'];
    /** Node instance */
    node: Notice;
};
/** Validity proof for an output */
export type OutputValidityProof = {
    __typename?: 'OutputValidityProof';
    /** Local input index within the context of the related epoch */
    inputIndexWithinEpoch: Scalars['Int']['output'];
    /** Hash of the machine state claimed for the related epoch, given in Ethereum hex binary format (32 bytes), starting with '0x' */
    machineStateHash: Scalars['String']['output'];
    /** Merkle root of all notice hashes of the related epoch, given in Ethereum hex binary format (32 bytes), starting with '0x' */
    noticesEpochRootHash: Scalars['String']['output'];
    /** Proof that this output hash is in the output-hashes merkle tree. This array of siblings is bottom-up ordered (from the leaf to the root). Each hash is given in Ethereum hex binary format (32 bytes), starting with '0x'. */
    outputHashInOutputHashesSiblings: Array<Scalars['String']['output']>;
    /** Proof that this output-hashes root hash is in epoch's output merkle tree. This array of siblings is bottom-up ordered (from the leaf to the root). Each hash is given in Ethereum hex binary format (32 bytes), starting with '0x'. */
    outputHashesInEpochSiblings: Array<Scalars['String']['output']>;
    /** Merkle root of all output hashes of the related input, given in Ethereum hex binary format (32 bytes), starting with '0x' */
    outputHashesRootHash: Scalars['String']['output'];
    /** Output index within the context of the input that produced it */
    outputIndexWithinInput: Scalars['Int']['output'];
    /** Merkle root of all voucher hashes of the related epoch, given in Ethereum hex binary format (32 bytes), starting with '0x' */
    vouchersEpochRootHash: Scalars['String']['output'];
};
/** Page metadata for the cursor-based Connection pagination pattern */
export type PageInfo = {
    __typename?: 'PageInfo';
    /** Cursor pointing to the last entry of the page */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** Indicates if there are additional entries after the end curs */
    hasNextPage: Scalars['Boolean']['output'];
    /** Indicates if there are additional entries before the start curs */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** Cursor pointing to the first entry of the page */
    startCursor?: Maybe<Scalars['String']['output']>;
};
/** Data that can be used as proof to validate notices and execute vouchers on the base layer blockchain */
export type Proof = {
    __typename?: 'Proof';
    /** Data that allows the validity proof to be contextualized within submitted claims, given as a payload in Ethereum hex binary format, starting with '0x' */
    context: Scalars['String']['output'];
    /** Validity proof for an output */
    validity: OutputValidityProof;
};
/** Top level queries */
export type Query = {
    __typename?: 'Query';
    /** Get input based on its identifier */
    input: Input;
    /** Get inputs with support for pagination */
    inputs: InputConnection;
    /** Get notice based on its index */
    notice: Notice;
    /** Get notices with support for pagination */
    notices: NoticeConnection;
    /** Get report based on its index */
    report: Report;
    /** Get reports with support for pagination */
    reports: ReportConnection;
    /** Get voucher based on its index */
    voucher: Voucher;
    /** Get vouchers with support for pagination */
    vouchers: VoucherConnection;
};
/** Top level queries */
export type QueryInputArgs = {
    index: Scalars['Int']['input'];
};
/** Top level queries */
export type QueryInputsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    where?: InputMaybe<InputFilter>;
};
/** Top level queries */
export type QueryNoticeArgs = {
    inputIndex: Scalars['Int']['input'];
    noticeIndex: Scalars['Int']['input'];
};
/** Top level queries */
export type QueryNoticesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};
/** Top level queries */
export type QueryReportArgs = {
    inputIndex: Scalars['Int']['input'];
    reportIndex: Scalars['Int']['input'];
};
/** Top level queries */
export type QueryReportsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};
/** Top level queries */
export type QueryVoucherArgs = {
    inputIndex: Scalars['Int']['input'];
    voucherIndex: Scalars['Int']['input'];
};
/** Top level queries */
export type QueryVouchersArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};
/** Application log or diagnostic information */
export type Report = {
    __typename?: 'Report';
    /** Report index within the context of the input that produced it */
    index: Scalars['Int']['output'];
    /** Input whose processing produced the report */
    input: Input;
    /** Report data as a payload in Ethereum hex binary format, starting with '0x' */
    payload: Scalars['String']['output'];
};
/** Pagination result */
export type ReportConnection = {
    __typename?: 'ReportConnection';
    /** Pagination entries returned for the current page */
    edges: Array<ReportEdge>;
    /** Pagination metadata */
    pageInfo: PageInfo;
    /** Total number of entries that match the query */
    totalCount: Scalars['Int']['output'];
};
/** Pagination entry */
export type ReportEdge = {
    __typename?: 'ReportEdge';
    /** Pagination cursor */
    cursor: Scalars['String']['output'];
    /** Node instance */
    node: Report;
};
/** Representation of a transaction that can be carried out on the base layer blockchain, such as a transfer of assets */
export type Voucher = {
    __typename?: 'Voucher';
    /** Transaction destination address in Ethereum hex binary format (20 bytes), starting with '0x' */
    destination: Scalars['String']['output'];
    /** Voucher index within the context of the input that produced it */
    index: Scalars['Int']['output'];
    /** Input whose processing produced the voucher */
    input: Input;
    /** Transaction payload in Ethereum hex binary format, starting with '0x' */
    payload: Scalars['String']['output'];
    /** Proof object that allows this voucher to be validated and executed on the base layer blockchain */
    proof?: Maybe<Proof>;
};
/** Pagination result */
export type VoucherConnection = {
    __typename?: 'VoucherConnection';
    /** Pagination entries returned for the current page */
    edges: Array<VoucherEdge>;
    /** Pagination metadata */
    pageInfo: PageInfo;
    /** Total number of entries that match the query */
    totalCount: Scalars['Int']['output'];
};
/** Pagination entry */
export type VoucherEdge = {
    __typename?: 'VoucherEdge';
    /** Pagination cursor */
    cursor: Scalars['String']['output'];
    /** Node instance */
    node: Voucher;
};
export type NoticeQueryVariables = Exact<{
    noticeIndex: Scalars['Int']['input'];
    inputIndex: Scalars['Int']['input'];
}>;
export type NoticeQuery = {
    __typename?: 'Query';
    notice: {
        __typename?: 'Notice';
        index: number;
        payload: string;
        input: {
            __typename?: 'Input';
            index: number;
            timestamp: any;
            msgSender: string;
            blockNumber: any;
        };
        proof?: {
            __typename?: 'Proof';
            context: string;
            validity: {
                __typename?: 'OutputValidityProof';
                inputIndexWithinEpoch: number;
                outputIndexWithinInput: number;
                outputHashesRootHash: string;
                vouchersEpochRootHash: string;
                noticesEpochRootHash: string;
                machineStateHash: string;
                outputHashInOutputHashesSiblings: Array<string>;
                outputHashesInEpochSiblings: Array<string>;
            };
        } | null;
    };
};
export type NoticesQueryVariables = Exact<{
    [key: string]: never;
}>;
export type NoticesQuery = {
    __typename?: 'Query';
    notices: {
        __typename?: 'NoticeConnection';
        edges: Array<{
            __typename?: 'NoticeEdge';
            node: {
                __typename?: 'Notice';
                index: number;
                payload: string;
                input: {
                    __typename?: 'Input';
                    index: number;
                    timestamp: any;
                    msgSender: string;
                    blockNumber: any;
                };
            };
        }>;
    };
};
export type NoticesByInputQueryVariables = Exact<{
    inputIndex: Scalars['Int']['input'];
}>;
export type NoticesByInputQuery = {
    __typename?: 'Query';
    input: {
        __typename?: 'Input';
        notices: {
            __typename?: 'NoticeConnection';
            edges: Array<{
                __typename?: 'NoticeEdge';
                node: {
                    __typename?: 'Notice';
                    index: number;
                    payload: string;
                    input: {
                        __typename?: 'Input';
                        index: number;
                        timestamp: any;
                        msgSender: string;
                        blockNumber: any;
                    };
                };
            }>;
        };
    };
};
export type VoucherQueryVariables = Exact<{
    voucherIndex: Scalars['Int']['input'];
    inputIndex: Scalars['Int']['input'];
}>;
export type VoucherQuery = {
    __typename?: 'Query';
    voucher: {
        __typename?: 'Voucher';
        index: number;
        destination: string;
        payload: string;
        input: {
            __typename?: 'Input';
            index: number;
            timestamp: any;
            msgSender: string;
            blockNumber: any;
        };
        proof?: {
            __typename?: 'Proof';
            context: string;
            validity: {
                __typename?: 'OutputValidityProof';
                inputIndexWithinEpoch: number;
                outputIndexWithinInput: number;
                outputHashesRootHash: string;
                vouchersEpochRootHash: string;
                noticesEpochRootHash: string;
                machineStateHash: string;
                outputHashInOutputHashesSiblings: Array<string>;
                outputHashesInEpochSiblings: Array<string>;
            };
        } | null;
    };
};
export type VouchersQueryVariables = Exact<{
    [key: string]: never;
}>;
export type VouchersQuery = {
    __typename?: 'Query';
    vouchers: {
        __typename?: 'VoucherConnection';
        edges: Array<{
            __typename?: 'VoucherEdge';
            node: {
                __typename?: 'Voucher';
                index: number;
                destination: string;
                payload: string;
                input: {
                    __typename?: 'Input';
                    index: number;
                    timestamp: any;
                    msgSender: string;
                    blockNumber: any;
                };
            };
        }>;
    };
};
export type VouchersByInputQueryVariables = Exact<{
    inputIndex: Scalars['Int']['input'];
}>;
export type VouchersByInputQuery = {
    __typename?: 'Query';
    input: {
        __typename?: 'Input';
        vouchers: {
            __typename?: 'VoucherConnection';
            edges: Array<{
                __typename?: 'VoucherEdge';
                node: {
                    __typename?: 'Voucher';
                    index: number;
                    destination: string;
                    payload: string;
                    input: {
                        __typename?: 'Input';
                        index: number;
                        timestamp: any;
                        msgSender: string;
                        blockNumber: any;
                    };
                };
            }>;
        };
    };
};
export type ReportQueryVariables = Exact<{
    reportIndex: Scalars['Int']['input'];
    inputIndex: Scalars['Int']['input'];
}>;
export type ReportQuery = {
    __typename?: 'Query';
    report: {
        __typename?: 'Report';
        index: number;
        payload: string;
        input: {
            __typename?: 'Input';
            index: number;
            status: CompletionStatus;
            timestamp: any;
            msgSender: string;
            blockNumber: any;
        };
    };
};
export type ReportsQueryVariables = Exact<{
    [key: string]: never;
}>;
export type ReportsQuery = {
    __typename?: 'Query';
    reports: {
        __typename?: 'ReportConnection';
        edges: Array<{
            __typename?: 'ReportEdge';
            node: {
                __typename?: 'Report';
                index: number;
                payload: string;
                input: {
                    __typename?: 'Input';
                    index: number;
                    status: CompletionStatus;
                    timestamp: any;
                    msgSender: string;
                    blockNumber: any;
                };
            };
        }>;
    };
};
export type ReportsByInputQueryVariables = Exact<{
    inputIndex: Scalars['Int']['input'];
}>;
export type ReportsByInputQuery = {
    __typename?: 'Query';
    input: {
        __typename?: 'Input';
        reports: {
            __typename?: 'ReportConnection';
            edges: Array<{
                __typename?: 'ReportEdge';
                node: {
                    __typename?: 'Report';
                    index: number;
                    payload: string;
                    input: {
                        __typename?: 'Input';
                        index: number;
                        status: CompletionStatus;
                        timestamp: any;
                        msgSender: string;
                        blockNumber: any;
                    };
                };
            }>;
        };
    };
};
export type GetInputResultQueryVariables = Exact<{
    inputIndex: Scalars['Int']['input'];
}>;
export type GetInputResultQuery = {
    __typename?: 'Query';
    input: {
        __typename?: 'Input';
        status: CompletionStatus;
        timestamp: any;
        msgSender: string;
        blockNumber: any;
        reports: {
            __typename?: 'ReportConnection';
            edges: Array<{
                __typename?: 'ReportEdge';
                node: {
                    __typename?: 'Report';
                    index: number;
                    payload: string;
                    input: {
                        __typename?: 'Input';
                        index: number;
                    };
                };
            }>;
        };
        notices: {
            __typename?: 'NoticeConnection';
            edges: Array<{
                __typename?: 'NoticeEdge';
                node: {
                    __typename?: 'Notice';
                    index: number;
                    payload: string;
                    input: {
                        __typename?: 'Input';
                        index: number;
                    };
                };
            }>;
        };
        vouchers: {
            __typename?: 'VoucherConnection';
            edges: Array<{
                __typename?: 'VoucherEdge';
                node: {
                    __typename?: 'Voucher';
                    index: number;
                    destination: string;
                    payload: string;
                    input: {
                        __typename?: 'Input';
                        index: number;
                    };
                };
            }>;
        };
    };
};
export type GetInputQueryVariables = Exact<{
    inputIndex: Scalars['Int']['input'];
}>;
export type GetInputQuery = {
    __typename?: 'Query';
    input: {
        __typename?: 'Input';
        index: number;
        status: CompletionStatus;
        timestamp: any;
        msgSender: string;
        blockNumber: any;
        payload: string;
    };
};
export declare const NoticeDocument: DocumentNode<NoticeQuery, Exact<{
    noticeIndex: Scalars['Int']['input'];
    inputIndex: Scalars['Int']['input'];
}>>;
export declare const NoticesDocument: DocumentNode<NoticesQuery, Exact<{
    [key: string]: never;
}>>;
export declare const NoticesByInputDocument: DocumentNode<NoticesByInputQuery, Exact<{
    inputIndex: Scalars['Int']['input'];
}>>;
export declare const VoucherDocument: DocumentNode<VoucherQuery, Exact<{
    voucherIndex: Scalars['Int']['input'];
    inputIndex: Scalars['Int']['input'];
}>>;
export declare const VouchersDocument: DocumentNode<VouchersQuery, Exact<{
    [key: string]: never;
}>>;
export declare const VouchersByInputDocument: DocumentNode<VouchersByInputQuery, Exact<{
    inputIndex: Scalars['Int']['input'];
}>>;
export declare const ReportDocument: DocumentNode<ReportQuery, Exact<{
    reportIndex: Scalars['Int']['input'];
    inputIndex: Scalars['Int']['input'];
}>>;
export declare const ReportsDocument: DocumentNode<ReportsQuery, Exact<{
    [key: string]: never;
}>>;
export declare const ReportsByInputDocument: DocumentNode<ReportsByInputQuery, Exact<{
    inputIndex: Scalars['Int']['input'];
}>>;
export declare const GetInputResultDocument: DocumentNode<GetInputResultQuery, Exact<{
    inputIndex: Scalars['Int']['input'];
}>>;
export declare const GetInputDocument: DocumentNode<GetInputQuery, Exact<{
    inputIndex: Scalars['Int']['input'];
}>>;
