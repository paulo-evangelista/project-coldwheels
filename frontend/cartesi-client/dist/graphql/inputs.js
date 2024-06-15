"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryInput = exports.getInput = exports.queryInputResult = exports.getInputResult = void 0;
var graphql_request_1 = require("graphql-request");
var graphql_1 = require("../generated/graphql");
var lib_1 = require("./lib");
var DEFAULT_INITIAL_DELAY = 3000; // 3 seconds
var DEFAULT_DELAY_INTERVAL = 1000;
var setDefaultInputResultOptions = function (options) {
    options = (0, lib_1.setDefaultGraphqlOptions)(options);
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
var getInputResult = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var result, variables, client, data, error_1, i, i, i, errorMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (options.inputIndex == undefined)
                    throw new Error("Missing input index");
                options = setDefaultInputResultOptions(options);
                result = { notices: [], reports: [], vouchers: [] };
                variables = { inputIndex: options.inputIndex };
                client = new graphql_request_1.GraphQLClient((0, lib_1.getGraphqlUrl)(options));
                _a.label = 1;
            case 1:
                if (!(result.notices.length == 0 && result.reports.length == 0 && result.vouchers.length == 0)) return [3 /*break*/, 8];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 6]);
                return [4 /*yield*/, client.request(graphql_1.GetInputResultDocument, variables)];
            case 3:
                data = _a.sent();
                return [3 /*break*/, 6];
            case 4:
                error_1 = _a.sent();
                if (!(0, lib_1.isInputNotFound)(error_1)) {
                    console.log(error_1.message);
                    return [2 /*return*/];
                }
                // sleep then continue
                return [4 /*yield*/, sleep(options.delayInterval)];
            case 5:
                // sleep then continue
                _a.sent();
                return [3 /*break*/, 1];
            case 6:
                // query the GraphQL server for the reports and notices
                console.log("querying ".concat((0, lib_1.getGraphqlUrl)(options), " for notices, reports, and vouchers for input with index \"").concat(options.inputIndex, "\"..."));
                if (data === null || data === void 0 ? void 0 : data.input) {
                    if (data.input.status != graphql_1.CompletionStatus.Unprocessed) {
                        result = { notices: [], reports: [], vouchers: [] };
                        // add notices to the result
                        for (i = 0; i < data.input.notices.edges.length; i++) {
                            result.notices.push(data.input.notices.edges[i].node);
                        }
                        // add reports to the result
                        for (i = 0; i < data.input.reports.edges.length; i++) {
                            result.reports.push(data.input.reports.edges[i].node);
                        }
                        // add vouchers to the result
                        for (i = 0; i < data.input.vouchers.edges.length; i++) {
                            result.vouchers.push(data.input.vouchers.edges[i].node);
                        }
                        if (data.input.status != graphql_1.CompletionStatus.Accepted) {
                            errorMessage = result.reports.length > 0 ? result.reports[result.reports.length - 1].payload : "Advance error: ".concat(data.input.status);
                            throw new Error(errorMessage);
                        }
                    }
                }
                else {
                    throw new Error("Unable to get Reports, Notices, and Vouchers for input ".concat(options.inputIndex, "!"));
                }
                return [4 /*yield*/, sleep(options.delayInterval)];
            case 7:
                _a.sent();
                return [3 /*break*/, 1];
            case 8: return [2 /*return*/, result];
        }
    });
}); };
exports.getInputResult = getInputResult;
var sleep = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
/**
 * Queries a GraphQL server for notices based on an input index
 * @param options options that have default values
 * @returns Object with a list of notices and reports for an input
 */
var queryInputResult = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (options.outputIndex === undefined) {
            throw new Error("input index not defined");
        }
        options = (0, lib_1.setDefaultGraphqlOptions)(options);
        return [2 /*return*/, (0, exports.getInputResult)(options)];
    });
}); };
exports.queryInputResult = queryInputResult;
/**
 * Queries a GraphQL server looking for a specific input
 * @param url URL of the GraphQL server
 * @param inputIndex input index
 * @returns The corresponding input
 */
var getInput = function (url, inputIndex) { return __awaiter(void 0, void 0, void 0, function () {
    var variables, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // query the GraphQL server for the input
                console.log("querying ".concat(url, " for input with index \"").concat(inputIndex, "\"..."));
                variables = { inputIndex: inputIndex };
                return [4 /*yield*/, (0, graphql_request_1.request)(url, graphql_1.GetInputDocument, variables)];
            case 1:
                data = _a.sent();
                if (data === null || data === void 0 ? void 0 : data.input) {
                    return [2 /*return*/, data.input];
                }
                else {
                    throw new Error("Unable to get Input with index ".concat(inputIndex, "!"));
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getInput = getInput;
/**
 * Queries a GraphQL server looking for a specific input
 * @param options options that have default values
 * @returns The corresponding input
 */
var queryInput = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        options = (0, lib_1.setDefaultGraphqlOptions)(options);
        return [2 /*return*/, (0, exports.getInput)((0, lib_1.getGraphqlUrl)(options), options.inputIndex)];
    });
}); };
exports.queryInput = queryInput;
