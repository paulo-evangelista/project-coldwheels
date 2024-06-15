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
exports.advanceDAppRelay = exports.advanceEtherDeposit = exports.advanceERC721Deposit = exports.advanceERC20Deposit = exports.advanceInput = void 0;
var inputs_1 = require("../graphql/inputs");
var default_1 = require("../shared/default");
var rollups_1 = require("@cartesi/rollups");
var ethers_1 = require("ethers");
var DEFAULT_SYNC_BEHAVIOR = true;
function setDefaultAdvanceValues(options) {
    if (options === undefined)
        options = {};
    if (options.sync === undefined) {
        options.sync = DEFAULT_SYNC_BEHAVIOR;
    }
    if (options.cartesiNodeUrl === undefined) {
        options.cartesiNodeUrl = default_1.DEFAULT_CARTESI_NODE_URL;
    }
    return options;
}
function advanceInput(client, dappAddress, payload, options) {
    return __awaiter(this, void 0, void 0, function () {
        var inputContract, payloadBytes, input, receipt, inputIndex, inputResultOptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = setDefaultAdvanceValues(options);
                    if (options.inputBoxAddress === undefined) {
                        options.inputBoxAddress = default_1.DEFAULT_INPUT_BOX_ADDRESS;
                    }
                    inputContract = rollups_1.InputBox__factory.connect(options.inputBoxAddress, client);
                    if (typeof payload == "string") {
                        if (ethers_1.utils.isHexString(payload))
                            payloadBytes = ethers_1.utils.arrayify(payload);
                        else
                            payloadBytes = ethers_1.utils.toUtf8Bytes(payload);
                    }
                    else {
                        payloadBytes = payload;
                    }
                    return [4 /*yield*/, inputContract.addInput(dappAddress, payloadBytes)];
                case 1:
                    input = _a.sent();
                    return [4 /*yield*/, input.wait()];
                case 2:
                    receipt = _a.sent();
                    // call is async, return addInput's receipt
                    if (!options.sync)
                        return [2 /*return*/, receipt];
                    inputIndex = Number(receipt.events[0].args[1]._hex);
                    inputResultOptions = options;
                    inputResultOptions.inputIndex = inputIndex;
                    return [4 /*yield*/, (0, inputs_1.getInputResult)(inputResultOptions)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.advanceInput = advanceInput;
function advanceERC20Deposit(client, dappAddress, tokenAddress, amount, options) {
    return __awaiter(this, void 0, void 0, function () {
        var erc20Portal, erc20Contract, signerAddress, correctedAmount, allowance, allowanceApproveAmount, tx, deposit, receipt, inputIndex, inputResultOptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = setDefaultAdvanceValues(options);
                    if (options.erc20PortalAddress === undefined) {
                        options.erc20PortalAddress = default_1.DEFAULT_ERC20PORTAL_ADDRESS;
                    }
                    erc20Portal = rollups_1.ERC20Portal__factory.connect(options.erc20PortalAddress, client);
                    erc20Contract = rollups_1.IERC20__factory.connect(tokenAddress, client);
                    return [4 /*yield*/, client.getAddress()];
                case 1:
                    signerAddress = _a.sent();
                    correctedAmount = ethers_1.BigNumber.from(amount);
                    if (options.decimals != undefined) {
                        correctedAmount = ethers_1.ethers.utils.parseUnits("".concat(amount), options.decimals);
                    }
                    return [4 /*yield*/, erc20Contract.allowance(signerAddress, options.erc20PortalAddress)];
                case 2:
                    allowance = _a.sent();
                    if (!allowance.lt(correctedAmount)) return [3 /*break*/, 5];
                    allowanceApproveAmount = correctedAmount.sub(allowance);
                    return [4 /*yield*/, erc20Contract.approve(options.erc20PortalAddress, allowanceApproveAmount)];
                case 3:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, erc20Portal.depositERC20Tokens(tokenAddress, dappAddress, correctedAmount, "0x")];
                case 6:
                    deposit = _a.sent();
                    return [4 /*yield*/, deposit.wait()];
                case 7:
                    receipt = _a.sent();
                    // call is async, return depositERC20Tokens' receipt
                    if (!options.sync)
                        return [2 /*return*/, receipt];
                    inputIndex = Number(receipt.events[1].topics[2]);
                    inputResultOptions = options;
                    inputResultOptions.inputIndex = inputIndex;
                    return [4 /*yield*/, (0, inputs_1.getInputResult)(inputResultOptions)];
                case 8: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.advanceERC20Deposit = advanceERC20Deposit;
function advanceERC721Deposit(client, dappAddress, tokenAddress, tokenId, options) {
    return __awaiter(this, void 0, void 0, function () {
        var erc721Portal, erc721Contract, approve_receipt, deposit, receipt, inputIndex, inputResultOptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = setDefaultAdvanceValues(options);
                    if (options.erc721PortalAddress === undefined) {
                        options.erc721PortalAddress = default_1.DEFAULT_ERC721PORTAL_ADDRESS;
                    }
                    erc721Portal = rollups_1.ERC721Portal__factory.connect(options.erc721PortalAddress, client);
                    erc721Contract = rollups_1.IERC721__factory.connect(tokenAddress, client);
                    return [4 /*yield*/, erc721Contract.approve(options.erc721PortalAddress, tokenId)];
                case 1:
                    approve_receipt = _a.sent();
                    return [4 /*yield*/, approve_receipt.wait()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, erc721Portal.depositERC721Token(tokenAddress, dappAddress, tokenId, "0x", "0x")];
                case 3:
                    deposit = _a.sent();
                    return [4 /*yield*/, deposit.wait()];
                case 4:
                    receipt = _a.sent();
                    // call is async, return depositERC721Token' receipt
                    if (!options.sync)
                        return [2 /*return*/, receipt];
                    inputIndex = Number(receipt.events[1].topics[2]);
                    inputResultOptions = options;
                    inputResultOptions.inputIndex = inputIndex;
                    return [4 /*yield*/, (0, inputs_1.getInputResult)(inputResultOptions)];
                case 5: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.advanceERC721Deposit = advanceERC721Deposit;
function advanceEtherDeposit(client, dappAddress, amount, options) {
    return __awaiter(this, void 0, void 0, function () {
        var value, etherPortal, deposit, receipt, inputIndex, inputResultOptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = setDefaultAdvanceValues(options);
                    if (options.etherPortalAddress === undefined) {
                        options.etherPortalAddress = default_1.DEFAULT_ETHERPORTAL_ADDRESS;
                    }
                    value = ethers_1.utils.parseEther(amount.toString());
                    etherPortal = rollups_1.EtherPortal__factory.connect(options.etherPortalAddress, client);
                    return [4 /*yield*/, etherPortal.depositEther(dappAddress, "0x", { value: value })];
                case 1:
                    deposit = _a.sent();
                    return [4 /*yield*/, deposit.wait()];
                case 2:
                    receipt = _a.sent();
                    // call is async, return depositEther' receipt
                    if (!options.sync)
                        return [2 /*return*/, receipt];
                    inputIndex = Number(receipt.events[0].topics[2]);
                    inputResultOptions = options;
                    inputResultOptions.inputIndex = inputIndex;
                    return [4 /*yield*/, (0, inputs_1.getInputResult)(inputResultOptions)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.advanceEtherDeposit = advanceEtherDeposit;
function advanceDAppRelay(client, dappAddress, options) {
    return __awaiter(this, void 0, void 0, function () {
        var dappRelay, deposit, receipt, inputIndex, inputResultOptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = setDefaultAdvanceValues(options);
                    if (options.dappRelayAddress === undefined) {
                        options.dappRelayAddress = default_1.DEFAULT_DAPP_RELAY_ADDRESS;
                    }
                    dappRelay = rollups_1.DAppAddressRelay__factory.connect(options.dappRelayAddress, client);
                    return [4 /*yield*/, dappRelay.relayDAppAddress(dappAddress)];
                case 1:
                    deposit = _a.sent();
                    return [4 /*yield*/, deposit.wait()];
                case 2:
                    receipt = _a.sent();
                    // call is async, return depositEther' receipt
                    if (!options.sync)
                        return [2 /*return*/, receipt];
                    inputIndex = Number(receipt.events[0].topics[2]);
                    inputResultOptions = options;
                    inputResultOptions.inputIndex = inputIndex;
                    return [4 /*yield*/, (0, inputs_1.getInputResult)(inputResultOptions)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.advanceDAppRelay = advanceDAppRelay;
