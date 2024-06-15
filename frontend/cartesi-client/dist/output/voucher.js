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
exports.wasVoucherExecutedFromParams = exports.executeVoucherFromParams = exports.executeVoucher = exports.getVouchersReady = exports.getUnexecutedVouchers = void 0;
var vouchers_1 = require("../graphql/vouchers");
var rollups_1 = require("@cartesi/rollups");
var default_1 = require("../shared/default");
function getUnexecutedVouchers(signerOrProvider, dappAddress, cartesiNodeUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var voucher_list, result, dappContract, i, voucher, wasIt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (cartesiNodeUrl === undefined) {
                        cartesiNodeUrl = default_1.DEFAULT_CARTESI_NODE_URL;
                    }
                    return [4 /*yield*/, (0, vouchers_1.getVouchers)("".concat(cartesiNodeUrl, "/graphql"))];
                case 1:
                    voucher_list = _a.sent();
                    result = [];
                    dappContract = rollups_1.CartesiDApp__factory.connect(dappAddress, signerOrProvider);
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < voucher_list.length)) return [3 /*break*/, 5];
                    voucher = voucher_list[i];
                    return [4 /*yield*/, dappContract.wasVoucherExecuted(voucher.input.index, voucher.index)];
                case 3:
                    wasIt = _a.sent();
                    if (!wasIt)
                        result.push(voucher);
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, result];
            }
        });
    });
}
exports.getUnexecutedVouchers = getUnexecutedVouchers;
function getVouchersReady(signerOrProvider, dappAddress, cartesiNodeUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var unexecuted_vouchers, ready_vouchers, i, voucher;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (cartesiNodeUrl === undefined) {
                        cartesiNodeUrl = default_1.DEFAULT_CARTESI_NODE_URL;
                    }
                    return [4 /*yield*/, getUnexecutedVouchers(signerOrProvider, dappAddress, cartesiNodeUrl)];
                case 1:
                    unexecuted_vouchers = _a.sent();
                    ready_vouchers = [];
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < unexecuted_vouchers.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, vouchers_1.getVoucher)("".concat(cartesiNodeUrl, "/graphql"), unexecuted_vouchers[i].index, unexecuted_vouchers[i].input.index)];
                case 3:
                    voucher = _a.sent();
                    if (!voucher.proof)
                        return [3 /*break*/, 4];
                    ready_vouchers.push(voucher);
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, ready_vouchers];
            }
        });
    });
}
exports.getVouchersReady = getVouchersReady;
function executeVoucher(signer, dappAddress, inputIndex, voucherIndex, cartesiNodeUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var voucher;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (cartesiNodeUrl === undefined) {
                        cartesiNodeUrl = default_1.DEFAULT_CARTESI_NODE_URL;
                    }
                    return [4 /*yield*/, (0, vouchers_1.getVoucher)("".concat(cartesiNodeUrl, "/graphql"), voucherIndex, inputIndex)];
                case 1:
                    voucher = _a.sent();
                    if (!voucher.proof) {
                        throw new Error("voucher \"".concat(voucher.index, "\" from input \"").concat(voucher.input, "\" has no associated proof yet"));
                    }
                    return [2 /*return*/, executeVoucherFromParams(signer, dappAddress, voucher.destination, voucher.payload, voucher.proof)];
            }
        });
    });
}
exports.executeVoucher = executeVoucher;
function executeVoucherFromParams(signer, dappAddress, destination, payload, proof) {
    return __awaiter(this, void 0, void 0, function () {
        var dappContract, voucher_execution, receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dappContract = rollups_1.CartesiDApp__factory.connect(dappAddress, signer);
                    return [4 /*yield*/, dappContract.executeVoucher(destination, payload, proof)];
                case 1:
                    voucher_execution = _a.sent();
                    receipt = voucher_execution.wait();
                    return [2 /*return*/, receipt];
            }
        });
    });
}
exports.executeVoucherFromParams = executeVoucherFromParams;
function wasVoucherExecutedFromParams(signer, dappAddress, inputIndex, outputIndex) {
    return __awaiter(this, void 0, void 0, function () {
        var dappContract;
        return __generator(this, function (_a) {
            dappContract = rollups_1.CartesiDApp__factory.connect(dappAddress, signer);
            return [2 /*return*/, dappContract.wasVoucherExecuted(inputIndex, outputIndex)];
        });
    });
}
exports.wasVoucherExecutedFromParams = wasVoucherExecutedFromParams;
