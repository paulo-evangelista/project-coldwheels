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
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryVoucher = exports.queryVouchers = exports.getVoucher = exports.getVouchers = void 0;
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
var graphql_1 = require("../generated/graphql");
var lib_1 = require("./lib");
var graphql_request_1 = require("graphql-request");
// define a type predicate to filter out vouchers
var isPartialVoucherEdge = function (n) { return n !== null; };
/**
 * Queries a GraphQL server for vouchers based on an input index
 * @param url URL of the GraphQL server
 * @param input input index
 * @returns List of vouchers, returned as PartialVoucher objects
 */
var getVouchers = function (url, inputIndex) { return __awaiter(void 0, void 0, void 0, function () {
    var variables, data, data;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                console.log("querying ".concat(url, " for vouchers of input index \"").concat(inputIndex, "\"..."));
                if (!(inputIndex !== undefined)) return [3 /*break*/, 2];
                variables = { inputIndex: inputIndex };
                return [4 /*yield*/, (0, graphql_request_1.default)(url, graphql_1.VouchersByInputDocument, variables)];
            case 1:
                data = _d.sent();
                if ((_b = (_a = data === null || data === void 0 ? void 0 : data.input) === null || _a === void 0 ? void 0 : _a.vouchers) === null || _b === void 0 ? void 0 : _b.edges) {
                    return [2 /*return*/, data.input.vouchers.edges
                            .filter(isPartialVoucherEdge)
                            .map(function (e) { return e.node; })];
                }
                else {
                    return [2 /*return*/, []];
                }
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, (0, graphql_request_1.default)(url, graphql_1.VouchersDocument)];
            case 3:
                data = _d.sent();
                if ((_c = data === null || data === void 0 ? void 0 : data.vouchers) === null || _c === void 0 ? void 0 : _c.edges) {
                    return [2 /*return*/, data.vouchers.edges
                            .filter(isPartialVoucherEdge)
                            .map(function (e) { return e.node; })];
                }
                else {
                    return [2 /*return*/, []];
                }
                _d.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getVouchers = getVouchers;
/**
 * Queries a GraphQL server looking for a specific voucher
 * @param url URL of the GraphQL server
 * @param noticeIndex notice index
 * @param inputIndex input index
 * @returns The corresponding voucher, returned as a full Voucher object
 */
var getVoucher = function (url, voucherIndex, inputIndex) { return __awaiter(void 0, void 0, void 0, function () {
    var variables, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // create GraphQL client to reader server
                // query the GraphQL server for the voucher
                console.log("querying ".concat(url, " for voucher with index \"").concat(voucherIndex, "\" from input \"").concat(inputIndex, "\"..."));
                variables = { inputIndex: inputIndex, voucherIndex: voucherIndex };
                return [4 /*yield*/, (0, graphql_request_1.default)(url, graphql_1.VoucherDocument, variables)];
            case 1:
                data = _a.sent();
                if (data === null || data === void 0 ? void 0 : data.voucher) {
                    return [2 /*return*/, data.voucher];
                }
                else {
                    throw new Error("Voucher not found.");
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getVoucher = getVoucher;
/**
 * Queries a GraphQL server for vouchers based on input keys
 * @param options options that have default values
 * @returns List of vouchers, returned as PartialVoucher objects
 */
var queryVouchers = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        options = (0, lib_1.setDefaultGraphqlOptions)(options);
        return [2 /*return*/, (0, exports.getVouchers)((0, lib_1.getGraphqlUrl)(options), options.inputIndex)];
    });
}); };
exports.queryVouchers = queryVouchers;
/**
 * Queries a GraphQL server looking for a specific voucher
 * @param options options that have default values
 * @returns The corresponding voucher, returned as a full Voucher object
 */
var queryVoucher = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        options = (0, lib_1.setDefaultGraphqlOptions)(options);
        return [2 /*return*/, (0, exports.getVoucher)((0, lib_1.getGraphqlUrl)(options), options.inputIndex, options.outputIndex)];
    });
}); };
exports.queryVoucher = queryVoucher;
