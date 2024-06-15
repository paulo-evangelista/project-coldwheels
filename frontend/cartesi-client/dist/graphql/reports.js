"use strict";
// Copyright 2022 Cartesi Pte. Ltd.
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryReport = exports.queryReports = exports.getReport = exports.getReports = void 0;
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
var graphql_request_1 = require("graphql-request");
var graphql_1 = require("../generated/graphql");
var lib_1 = require("./lib");
// define a type predicate to filter out reports
var isPartialReportEdge = function (n) { return n !== null; };
/**
 * Queries a GraphQL server for reports based on input keys
 * @param url URL of the GraphQL server
 * @param input input identification keys
 * @returns List of reports, returned as PartialReport objects
 */
var getReports = function (url, inputIndex) { return __awaiter(void 0, void 0, void 0, function () {
    var variables, data, data;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                // query the GraphQL server for reports corresponding to the input index
                console.log("querying ".concat(url, " for reports of input index \"").concat(inputIndex, "\"..."));
                if (!(inputIndex !== undefined)) return [3 /*break*/, 2];
                variables = { inputIndex: inputIndex };
                return [4 /*yield*/, (0, graphql_request_1.default)(url, graphql_1.ReportsByInputDocument, variables)];
            case 1:
                data = _c.sent();
                if ((_b = (_a = data === null || data === void 0 ? void 0 : data.input) === null || _a === void 0 ? void 0 : _a.reports) === null || _b === void 0 ? void 0 : _b.edges) {
                    return [2 /*return*/, data.input.reports.edges
                            .filter(isPartialReportEdge)
                            .map(function (e) { return e.node; })];
                }
                else {
                    return [2 /*return*/, []];
                }
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, (0, graphql_request_1.default)(url, graphql_1.ReportsDocument)];
            case 3:
                data = _c.sent();
                if (data === null || data === void 0 ? void 0 : data.reports) {
                    return [2 /*return*/, data.reports.edges
                            .filter(isPartialReportEdge)
                            .map(function (e) { return e.node; })];
                }
                else {
                    return [2 /*return*/, []];
                }
                _c.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getReports = getReports;
/**
 * Queries a GraphQL server looking for a specific report
 * @param url URL of the GraphQL server
 * @param inputIndex input index
 * @param reportIndex report index, default = 0
 * @returns The corresponding report, returned as a full Report object
 */
var getReport = function (url_1, inputIndex_1) {
    var args_1 = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args_1[_i - 2] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([url_1, inputIndex_1], args_1, true), void 0, function (url, inputIndex, reportIndex) {
        var variables, data;
        if (reportIndex === void 0) { reportIndex = 0; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // query the GraphQL server for the report
                    console.log("querying ".concat(url, " for report with index \"").concat(reportIndex, "\" from input \"").concat(inputIndex, "\"..."));
                    variables = { inputIndex: inputIndex, reportIndex: reportIndex };
                    return [4 /*yield*/, (0, graphql_request_1.default)(url, graphql_1.ReportDocument, variables)];
                case 1:
                    data = _a.sent();
                    if (data === null || data === void 0 ? void 0 : data.report) {
                        return [2 /*return*/, data.report];
                    }
                    else {
                        throw new Error("Unable to find report.");
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.getReport = getReport;
/**
 * Queries a GraphQL server for reports based on input keys
 * @param options options that have default values
 * @returns List of reports, returned as PartialReport objects
 */
var queryReports = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        options = (0, lib_1.setDefaultGraphqlOptions)(options);
        return [2 /*return*/, (0, exports.getReports)((0, lib_1.getGraphqlUrl)(options), options.inputIndex)];
    });
}); };
exports.queryReports = queryReports;
/**
 * Queries a GraphQL server looking for a specific report
 * @param options options that have default values
 * @returns The corresponding report, returned as a full Report object
 */
var queryReport = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        options = (0, lib_1.setDefaultGraphqlOptions)(options);
        return [2 /*return*/, (0, exports.getReport)((0, lib_1.getGraphqlUrl)(options), options.inputIndex, options.outputIndex)];
    });
}); };
exports.queryReport = queryReport;
