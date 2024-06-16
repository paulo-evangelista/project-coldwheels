import { GraphQLClient, request } from "graphql-request";
import {
	Notice,
	GetInputResultDocument,
	Report,
	Voucher,
	GetInputResultQuery,
	GetInputResultQueryVariables,
	CompletionStatus,
	Input,
	GetInputDocument,
	GetInputQuery,
	GetInputQueryVariables,
} from "../generated/graphql";

import {
	GraphqlOptions,
	setDefaultGraphqlOptions,
	getGraphqlUrl,
	isInputNotFound,
} from "./lib";
import { PartialNotice } from "./notices";
import { PartialReport } from "./reports";
import { PartialVoucher } from "./vouchers";

const DEFAULT_INITIAL_DELAY = 3000; // 3 seconds
const DEFAULT_DELAY_INTERVAL = 1000;

export interface InputResult extends GraphqlOptions {
	initialDelay: number;
	delayInterval: number;
}

const setDefaultInputResultOptions = (options: InputResult): InputResult => {
	options = setDefaultGraphqlOptions(options) as InputResult;
	if (options.initialDelay === undefined) {
		options.initialDelay = DEFAULT_INITIAL_DELAY;
	}
	if (options.delayInterval === undefined) {
		options.delayInterval = DEFAULT_DELAY_INTERVAL;
	}
	return options;
};

/**
 * Queries a GraphQL server for notices based on an input index
 * @param url URL of the GraphQL server
 * @param input input index
 * @returns Object with a list of notices and reports for an input
 */
export const getInputResult = async (
	options: InputResult
): Promise<{
	notices: Array<PartialNotice>;
	reports: Array<PartialReport>;
	vouchers: Array<PartialVoucher>;
}> => {
	if (options.inputIndex == undefined) throw new Error("Missing input index");
	options = setDefaultInputResultOptions(options);
	let result = {
		notices: [] as Array<PartialNotice>,
		reports: [] as Array<PartialReport>,
		vouchers: [] as Array<PartialVoucher>,
	};

	const variables: any = { inputIndex: options.inputIndex };
	const client = new GraphQLClient(getGraphqlUrl(options));
	let data: GetInputResultQuery;
	while (
		result.notices.length == 0 &&
		result.reports.length == 0 &&
		result.vouchers.length == 0
	) {
		try {
			data = await client.request(GetInputResultDocument, variables);
		} catch (error) {
			if (!isInputNotFound(error as Error)) {
				console.log((error as Error).message);
				return {
					notices: [],
					reports: [],
					vouchers: [],
				};
			}

			// sleep then continue
			await sleep(options.delayInterval);
			continue;
		}

		// query the GraphQL server for the reports and notices
		console.log(
			`querying ${getGraphqlUrl(
				options
			)} for notices, reports, and vouchers for input with index "${
				options.inputIndex
			}"...`
		);

		if (data?.input) {
			if (data.input.status != CompletionStatus.Unprocessed) {
				result = {
					notices: [] as Array<PartialNotice>,
					reports: [] as Array<PartialReport>,
					vouchers: [] as Array<PartialVoucher>,
				};

				// add notices to the result
				for (let i = 0; i < data.input.notices.edges.length; i++) {
					const node = data.input.notices.edges[i].node;
					const notice: PartialNotice = {
						__typename: node.__typename || "Notice", // assign a default value
						index: node.index,
						payload: node.payload,
						input: node.input, // add this line
					};
					result.notices.push(notice);
				}

				// add reports to the result
				for (let i = 0; i < data.input.reports.edges.length; i++) {
                    const node = data.input.reports.edges[i].node;
                    node.__typename = node.__typename || "Report"; // ensure __typename is always defined
                
                    result.reports.push(node as PartialReport);
                }

				// add vouchers to the result
				for (let i = 0; i < data.input.vouchers.edges.length; i++) {
					const node = data.input.vouchers.edges[i].node;
					node.__typename = node.__typename || "Voucher"; // ensure __typename is always defined

					result.vouchers.push(node);
				}
			}
		} else {
			throw new Error(
				`Unable to get Reports, Notices, and Vouchers for input ${options.inputIndex}!`
			);
		}
		await sleep(options.delayInterval);
	}

	return result;
};

const sleep = (ms: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Queries a GraphQL server for notices based on an input index
 * @param options options that have default values
 * @returns Object with a list of notices and reports for an input
 */
export const queryInputResult = async (
	options?: InputResult
): Promise<{
	notices: Array<PartialNotice>;
	reports: Array<PartialReport>;
	vouchers: Array<PartialVoucher>;
}> => {
	if (options.outputIndex === undefined) {
		throw new Error("input index not defined");
	}
	options = setDefaultGraphqlOptions(options) as InputResult;
	return getInputResult(options);
};

/**
 * Queries a GraphQL server looking for a specific input
 * @param url URL of the GraphQL server
 * @param inputIndex input index
 * @returns The corresponding input
 */
export const getInput = async (
	url: string,
	inputIndex: number
): Promise<Input> => {
	// query the GraphQL server for the input
	console.log(`querying ${url} for input with index "${inputIndex}"...`);

	const variables: GetInputQueryVariables = { inputIndex: inputIndex };
	const data: GetInputQuery = await request(url, GetInputDocument, variables);

	if (data?.input) {
		return data.input as Input;
	} else {
		throw new Error(`Unable to get Input with index ${inputIndex}!`);
	}
};

/**
 * Queries a GraphQL server looking for a specific input
 * @param options options that have default values
 * @returns The corresponding input
 */
export const queryInput = async (options?: GraphqlOptions): Promise<Input> => {
	options = setDefaultGraphqlOptions(options);
	return getInput(getGraphqlUrl(options), options.inputIndex);
};
