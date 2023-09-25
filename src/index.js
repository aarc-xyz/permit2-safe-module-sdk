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
var protocol_kit_1 = require("@safe-global/protocol-kit");
var ethers_1 = require("ethers");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var provider, privateKey, wallet, tokenAddress, predictionPoolAddress, permit2Address, permit2ABI, predictionPoolABI, aarcModuleABI, ethAdapter, safeAddress, safeSdk, permit2Contract, TOKEN_PERMISSIONS_TYPEHASH, tokenPermissionsHash, PERMIT_TRANSFER_FROM_TYPEHASH, PERMIT2_DOMAIN_SEPARATOR, aarcModuleAddress, timestamp, EIPHEADER, encodedData, encodedDataHash, transactionData, safeDataToBeSigned, predictionPoolContract, ticketsData, aarcModuleContract, safeTransaction, txSingle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.RPC_URL);
                    console.log(process.env.RPC_URL);
                    privateKey = process.env.WALLET_PRIVATE_KEY;
                    console.log(privateKey);
                    wallet = new ethers_1.ethers.Wallet(privateKey, provider);
                    console.log("Here");
                    tokenAddress = process.env.TOKEN_ADDRESS;
                    predictionPoolAddress = process.env.PREDICTION_POOL_ADDRESS;
                    permit2Address = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
                    permit2ABI = [
                        {
                            inputs: [{ internalType: "uint256", name: "deadline", type: "uint256" }],
                            name: "AllowanceExpired",
                            type: "error",
                        },
                        { inputs: [], name: "ExcessiveInvalidation", type: "error" },
                        {
                            inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
                            name: "InsufficientAllowance",
                            type: "error",
                        },
                        {
                            inputs: [{ internalType: "uint256", name: "maxAmount", type: "uint256" }],
                            name: "InvalidAmount",
                            type: "error",
                        },
                        { inputs: [], name: "InvalidContractSignature", type: "error" },
                        { inputs: [], name: "InvalidNonce", type: "error" },
                        { inputs: [], name: "InvalidSignature", type: "error" },
                        { inputs: [], name: "InvalidSignatureLength", type: "error" },
                        { inputs: [], name: "InvalidSigner", type: "error" },
                        { inputs: [], name: "LengthMismatch", type: "error" },
                        {
                            inputs: [
                                { internalType: "uint256", name: "signatureDeadline", type: "uint256" },
                            ],
                            name: "SignatureExpired",
                            type: "error",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "owner",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "token",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "spender",
                                    type: "address",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint160",
                                    name: "amount",
                                    type: "uint160",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint48",
                                    name: "expiration",
                                    type: "uint48",
                                },
                            ],
                            name: "Approval",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "owner",
                                    type: "address",
                                },
                                {
                                    indexed: false,
                                    internalType: "address",
                                    name: "token",
                                    type: "address",
                                },
                                {
                                    indexed: false,
                                    internalType: "address",
                                    name: "spender",
                                    type: "address",
                                },
                            ],
                            name: "Lockdown",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "owner",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "token",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "spender",
                                    type: "address",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint48",
                                    name: "newNonce",
                                    type: "uint48",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint48",
                                    name: "oldNonce",
                                    type: "uint48",
                                },
                            ],
                            name: "NonceInvalidation",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "owner",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "token",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "spender",
                                    type: "address",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint160",
                                    name: "amount",
                                    type: "uint160",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint48",
                                    name: "expiration",
                                    type: "uint48",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint48",
                                    name: "nonce",
                                    type: "uint48",
                                },
                            ],
                            name: "Permit",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "owner",
                                    type: "address",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint256",
                                    name: "word",
                                    type: "uint256",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint256",
                                    name: "mask",
                                    type: "uint256",
                                },
                            ],
                            name: "UnorderedNonceInvalidation",
                            type: "event",
                        },
                        {
                            inputs: [],
                            name: "DOMAIN_SEPARATOR",
                            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "address", name: "", type: "address" },
                                { internalType: "address", name: "", type: "address" },
                                { internalType: "address", name: "", type: "address" },
                            ],
                            name: "allowance",
                            outputs: [
                                { internalType: "uint160", name: "amount", type: "uint160" },
                                { internalType: "uint48", name: "expiration", type: "uint48" },
                                { internalType: "uint48", name: "nonce", type: "uint48" },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "address", name: "token", type: "address" },
                                { internalType: "address", name: "spender", type: "address" },
                                { internalType: "uint160", name: "amount", type: "uint160" },
                                { internalType: "uint48", name: "expiration", type: "uint48" },
                            ],
                            name: "approve",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "address", name: "token", type: "address" },
                                { internalType: "address", name: "spender", type: "address" },
                                { internalType: "uint48", name: "newNonce", type: "uint48" },
                            ],
                            name: "invalidateNonces",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "uint256", name: "wordPos", type: "uint256" },
                                { internalType: "uint256", name: "mask", type: "uint256" },
                            ],
                            name: "invalidateUnorderedNonces",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    components: [
                                        { internalType: "address", name: "token", type: "address" },
                                        { internalType: "address", name: "spender", type: "address" },
                                    ],
                                    internalType: "struct IAllowanceTransfer.TokenSpenderPair[]",
                                    name: "approvals",
                                    type: "tuple[]",
                                },
                            ],
                            name: "lockdown",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "address", name: "", type: "address" },
                                { internalType: "uint256", name: "", type: "uint256" },
                            ],
                            name: "nonceBitmap",
                            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "address", name: "owner", type: "address" },
                                {
                                    components: [
                                        {
                                            components: [
                                                { internalType: "address", name: "token", type: "address" },
                                                { internalType: "uint160", name: "amount", type: "uint160" },
                                                { internalType: "uint48", name: "expiration", type: "uint48" },
                                                { internalType: "uint48", name: "nonce", type: "uint48" },
                                            ],
                                            internalType: "struct IAllowanceTransfer.PermitDetails[]",
                                            name: "details",
                                            type: "tuple[]",
                                        },
                                        { internalType: "address", name: "spender", type: "address" },
                                        { internalType: "uint256", name: "sigDeadline", type: "uint256" },
                                    ],
                                    internalType: "struct IAllowanceTransfer.PermitBatch",
                                    name: "permitBatch",
                                    type: "tuple",
                                },
                                { internalType: "bytes", name: "signature", type: "bytes" },
                            ],
                            name: "permit",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "address", name: "owner", type: "address" },
                                {
                                    components: [
                                        {
                                            components: [
                                                { internalType: "address", name: "token", type: "address" },
                                                { internalType: "uint160", name: "amount", type: "uint160" },
                                                { internalType: "uint48", name: "expiration", type: "uint48" },
                                                { internalType: "uint48", name: "nonce", type: "uint48" },
                                            ],
                                            internalType: "struct IAllowanceTransfer.PermitDetails",
                                            name: "details",
                                            type: "tuple",
                                        },
                                        { internalType: "address", name: "spender", type: "address" },
                                        { internalType: "uint256", name: "sigDeadline", type: "uint256" },
                                    ],
                                    internalType: "struct IAllowanceTransfer.PermitSingle",
                                    name: "permitSingle",
                                    type: "tuple",
                                },
                                { internalType: "bytes", name: "signature", type: "bytes" },
                            ],
                            name: "permit",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    components: [
                                        {
                                            components: [
                                                { internalType: "address", name: "token", type: "address" },
                                                { internalType: "uint256", name: "amount", type: "uint256" },
                                            ],
                                            internalType: "struct ISignatureTransfer.TokenPermissions",
                                            name: "permitted",
                                            type: "tuple",
                                        },
                                        { internalType: "uint256", name: "nonce", type: "uint256" },
                                        { internalType: "uint256", name: "deadline", type: "uint256" },
                                    ],
                                    internalType: "struct ISignatureTransfer.PermitTransferFrom",
                                    name: "permit",
                                    type: "tuple",
                                },
                                {
                                    components: [
                                        { internalType: "address", name: "to", type: "address" },
                                        {
                                            internalType: "uint256",
                                            name: "requestedAmount",
                                            type: "uint256",
                                        },
                                    ],
                                    internalType: "struct ISignatureTransfer.SignatureTransferDetails",
                                    name: "transferDetails",
                                    type: "tuple",
                                },
                                { internalType: "address", name: "owner", type: "address" },
                                { internalType: "bytes", name: "signature", type: "bytes" },
                            ],
                            name: "permitTransferFrom",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    components: [
                                        {
                                            components: [
                                                { internalType: "address", name: "token", type: "address" },
                                                { internalType: "uint256", name: "amount", type: "uint256" },
                                            ],
                                            internalType: "struct ISignatureTransfer.TokenPermissions[]",
                                            name: "permitted",
                                            type: "tuple[]",
                                        },
                                        { internalType: "uint256", name: "nonce", type: "uint256" },
                                        { internalType: "uint256", name: "deadline", type: "uint256" },
                                    ],
                                    internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
                                    name: "permit",
                                    type: "tuple",
                                },
                                {
                                    components: [
                                        { internalType: "address", name: "to", type: "address" },
                                        {
                                            internalType: "uint256",
                                            name: "requestedAmount",
                                            type: "uint256",
                                        },
                                    ],
                                    internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
                                    name: "transferDetails",
                                    type: "tuple[]",
                                },
                                { internalType: "address", name: "owner", type: "address" },
                                { internalType: "bytes", name: "signature", type: "bytes" },
                            ],
                            name: "permitTransferFrom",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    components: [
                                        {
                                            components: [
                                                { internalType: "address", name: "token", type: "address" },
                                                { internalType: "uint256", name: "amount", type: "uint256" },
                                            ],
                                            internalType: "struct ISignatureTransfer.TokenPermissions",
                                            name: "permitted",
                                            type: "tuple",
                                        },
                                        { internalType: "uint256", name: "nonce", type: "uint256" },
                                        { internalType: "uint256", name: "deadline", type: "uint256" },
                                    ],
                                    internalType: "struct ISignatureTransfer.PermitTransferFrom",
                                    name: "permit",
                                    type: "tuple",
                                },
                                {
                                    components: [
                                        { internalType: "address", name: "to", type: "address" },
                                        {
                                            internalType: "uint256",
                                            name: "requestedAmount",
                                            type: "uint256",
                                        },
                                    ],
                                    internalType: "struct ISignatureTransfer.SignatureTransferDetails",
                                    name: "transferDetails",
                                    type: "tuple",
                                },
                                { internalType: "address", name: "owner", type: "address" },
                                { internalType: "bytes32", name: "witness", type: "bytes32" },
                                { internalType: "string", name: "witnessTypeString", type: "string" },
                                { internalType: "bytes", name: "signature", type: "bytes" },
                            ],
                            name: "permitWitnessTransferFrom",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    components: [
                                        {
                                            components: [
                                                { internalType: "address", name: "token", type: "address" },
                                                { internalType: "uint256", name: "amount", type: "uint256" },
                                            ],
                                            internalType: "struct ISignatureTransfer.TokenPermissions[]",
                                            name: "permitted",
                                            type: "tuple[]",
                                        },
                                        { internalType: "uint256", name: "nonce", type: "uint256" },
                                        { internalType: "uint256", name: "deadline", type: "uint256" },
                                    ],
                                    internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
                                    name: "permit",
                                    type: "tuple",
                                },
                                {
                                    components: [
                                        { internalType: "address", name: "to", type: "address" },
                                        {
                                            internalType: "uint256",
                                            name: "requestedAmount",
                                            type: "uint256",
                                        },
                                    ],
                                    internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
                                    name: "transferDetails",
                                    type: "tuple[]",
                                },
                                { internalType: "address", name: "owner", type: "address" },
                                { internalType: "bytes32", name: "witness", type: "bytes32" },
                                { internalType: "string", name: "witnessTypeString", type: "string" },
                                { internalType: "bytes", name: "signature", type: "bytes" },
                            ],
                            name: "permitWitnessTransferFrom",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    components: [
                                        { internalType: "address", name: "from", type: "address" },
                                        { internalType: "address", name: "to", type: "address" },
                                        { internalType: "uint160", name: "amount", type: "uint160" },
                                        { internalType: "address", name: "token", type: "address" },
                                    ],
                                    internalType: "struct IAllowanceTransfer.AllowanceTransferDetails[]",
                                    name: "transferDetails",
                                    type: "tuple[]",
                                },
                            ],
                            name: "transferFrom",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "address", name: "from", type: "address" },
                                { internalType: "address", name: "to", type: "address" },
                                { internalType: "uint160", name: "amount", type: "uint160" },
                                { internalType: "address", name: "token", type: "address" },
                            ],
                            name: "transferFrom",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                    ];
                    predictionPoolABI = [
                        {
                            inputs: [
                                {
                                    internalType: "contract IPriceFeed",
                                    name: "priceFeed",
                                    type: "address",
                                },
                                { internalType: "uint256", name: "feeRate", type: "uint256" },
                                { internalType: "address", name: "admin", type: "address" },
                                { internalType: "string", name: "tokenURI", type: "string" },
                                { internalType: "address", name: "trustedForwarder", type: "address" },
                            ],
                            stateMutability: "nonpayable",
                            type: "constructor",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "uint256",
                                    name: "lotteryId",
                                    type: "uint256",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint256",
                                    name: "amount",
                                    type: "uint256",
                                },
                            ],
                            name: "AddProceeds",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "account",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "operator",
                                    type: "address",
                                },
                                {
                                    indexed: false,
                                    internalType: "bool",
                                    name: "approved",
                                    type: "bool",
                                },
                            ],
                            name: "ApprovalForAll",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "uint256",
                                    name: "lotteryId",
                                    type: "uint256",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "buyer",
                                    type: "address",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint256",
                                    name: "bucketLowerBound",
                                    type: "uint256",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint256",
                                    name: "ticketsBought",
                                    type: "uint256",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint256",
                                    name: "ticketsCost",
                                    type: "uint256",
                                },
                            ],
                            name: "BoughtTickets",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: false,
                                    internalType: "uint256[]",
                                    name: "lotteryIds",
                                    type: "uint256[]",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "claimer",
                                    type: "address",
                                },
                            ],
                            name: "Claimed",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: false,
                                    internalType: "uint256",
                                    name: "newFeeRate",
                                    type: "uint256",
                                },
                            ],
                            name: "FeeRateChanged",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "recipient",
                                    type: "address",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint256",
                                    name: "amount",
                                    type: "uint256",
                                },
                            ],
                            name: "FeeWithdrawn",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "uint256",
                                    name: "lotteryId",
                                    type: "uint256",
                                },
                                {
                                    components: [
                                        { internalType: "string", name: "token", type: "string" },
                                        { internalType: "uint256", name: "bucketSize", type: "uint256" },
                                        { internalType: "uint256", name: "openTimestamp", type: "uint256" },
                                        {
                                            internalType: "uint256",
                                            name: "closeTimestamp",
                                            type: "uint256",
                                        },
                                        {
                                            internalType: "uint256",
                                            name: "maturityTimestamp",
                                            type: "uint256",
                                        },
                                        {
                                            internalType: "contract IERC20",
                                            name: "collateralToken",
                                            type: "address",
                                        },
                                    ],
                                    indexed: false,
                                    internalType: "struct LotteryParams",
                                    name: "params",
                                    type: "tuple",
                                },
                            ],
                            name: "LotteryCreated",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "uint256",
                                    name: "lotteryId",
                                    type: "uint256",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint256",
                                    name: "resolvedPrice",
                                    type: "uint256",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint256",
                                    name: "winningBucketLowerBound",
                                    type: "uint256",
                                },
                            ],
                            name: "LotteryResolved",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: false,
                                    internalType: "address",
                                    name: "account",
                                    type: "address",
                                },
                            ],
                            name: "Paused",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "bytes32",
                                    name: "role",
                                    type: "bytes32",
                                },
                                {
                                    indexed: true,
                                    internalType: "bytes32",
                                    name: "previousAdminRole",
                                    type: "bytes32",
                                },
                                {
                                    indexed: true,
                                    internalType: "bytes32",
                                    name: "newAdminRole",
                                    type: "bytes32",
                                },
                            ],
                            name: "RoleAdminChanged",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "bytes32",
                                    name: "role",
                                    type: "bytes32",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "account",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "sender",
                                    type: "address",
                                },
                            ],
                            name: "RoleGranted",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "bytes32",
                                    name: "role",
                                    type: "bytes32",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "account",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "sender",
                                    type: "address",
                                },
                            ],
                            name: "RoleRevoked",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "uint256",
                                    name: "lotteryId",
                                    type: "uint256",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint256",
                                    name: "firstBucketLowerBound",
                                    type: "uint256",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint256",
                                    name: "minimumTicketPrice",
                                    type: "uint256",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint256[]",
                                    name: "bucketTicketPrices",
                                    type: "uint256[]",
                                },
                            ],
                            name: "SetLotteryPrices",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "operator",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "from",
                                    type: "address",
                                },
                                { indexed: true, internalType: "address", name: "to", type: "address" },
                                {
                                    indexed: false,
                                    internalType: "uint256[]",
                                    name: "ids",
                                    type: "uint256[]",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint256[]",
                                    name: "values",
                                    type: "uint256[]",
                                },
                            ],
                            name: "TransferBatch",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "uint256",
                                    name: "lotteryId",
                                    type: "uint256",
                                },
                                {
                                    indexed: true,
                                    internalType: "uint256",
                                    name: "newLotteryId",
                                    type: "uint256",
                                },
                            ],
                            name: "TransferProceeds",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "operator",
                                    type: "address",
                                },
                                {
                                    indexed: true,
                                    internalType: "address",
                                    name: "from",
                                    type: "address",
                                },
                                { indexed: true, internalType: "address", name: "to", type: "address" },
                                {
                                    indexed: false,
                                    internalType: "uint256",
                                    name: "id",
                                    type: "uint256",
                                },
                                {
                                    indexed: false,
                                    internalType: "uint256",
                                    name: "value",
                                    type: "uint256",
                                },
                            ],
                            name: "TransferSingle",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: false,
                                    internalType: "string",
                                    name: "value",
                                    type: "string",
                                },
                                { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
                            ],
                            name: "URI",
                            type: "event",
                        },
                        {
                            anonymous: false,
                            inputs: [
                                {
                                    indexed: false,
                                    internalType: "address",
                                    name: "account",
                                    type: "address",
                                },
                            ],
                            name: "Unpaused",
                            type: "event",
                        },
                        {
                            inputs: [],
                            name: "DEFAULT_ADMIN_ROLE",
                            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "FEE_PRECISION",
                            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "FEE_RECIPIENT_ROLE",
                            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "LOTTERY_MANAGER_ROLE",
                            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "MAX_FEE_RATE",
                            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "PRICE_FEED",
                            outputs: [
                                { internalType: "contract IPriceFeed", name: "", type: "address" },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "PRICE_SETTER_ROLE",
                            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
                            name: "_FEE_COLLECTED_",
                            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "_FEE_RATE_",
                            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "_LAST_LOTTERY_ID_",
                            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "uint256", name: "lotteryId", type: "uint256" },
                                { internalType: "uint256", name: "amount", type: "uint256" },
                            ],
                            name: "addProceeds",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "address", name: "account", type: "address" },
                                { internalType: "uint256", name: "id", type: "uint256" },
                            ],
                            name: "balanceOf",
                            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "address[]", name: "accounts", type: "address[]" },
                                { internalType: "uint256[]", name: "ids", type: "uint256[]" },
                            ],
                            name: "balanceOfBatch",
                            outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "uint256", name: "lotteryId", type: "uint256" },
                                { internalType: "uint256", name: "bucketLowerBound", type: "uint256" },
                                { internalType: "uint256", name: "buyTicketCount", type: "uint256" },
                            ],
                            name: "buyTickets",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "uint256[]", name: "lotteryIds", type: "uint256[]" },
                            ],
                            name: "claim",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    components: [
                                        { internalType: "string", name: "token", type: "string" },
                                        { internalType: "uint256", name: "bucketSize", type: "uint256" },
                                        { internalType: "uint256", name: "openTimestamp", type: "uint256" },
                                        {
                                            internalType: "uint256",
                                            name: "closeTimestamp",
                                            type: "uint256",
                                        },
                                        {
                                            internalType: "uint256",
                                            name: "maturityTimestamp",
                                            type: "uint256",
                                        },
                                        {
                                            internalType: "contract IERC20",
                                            name: "collateralToken",
                                            type: "address",
                                        },
                                    ],
                                    internalType: "struct LotteryParams",
                                    name: "lotteryParams",
                                    type: "tuple",
                                },
                            ],
                            name: "createLottery",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [{ internalType: "uint256", name: "lotteryId", type: "uint256" }],
                            name: "exists",
                            outputs: [{ internalType: "bool", name: "", type: "bool" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
                            name: "getRoleAdmin",
                            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "bytes32", name: "role", type: "bytes32" },
                                { internalType: "address", name: "account", type: "address" },
                            ],
                            name: "grantRole",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "bytes32", name: "role", type: "bytes32" },
                                { internalType: "address", name: "account", type: "address" },
                            ],
                            name: "hasRole",
                            outputs: [{ internalType: "bool", name: "", type: "bool" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "address", name: "account", type: "address" },
                                { internalType: "address", name: "operator", type: "address" },
                            ],
                            name: "isApprovedForAll",
                            outputs: [{ internalType: "bool", name: "", type: "bool" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [{ internalType: "address", name: "forwarder", type: "address" }],
                            name: "isTrustedForwarder",
                            outputs: [{ internalType: "bool", name: "", type: "bool" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "pauseContract",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "paused",
                            outputs: [{ internalType: "bool", name: "", type: "bool" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "bytes32", name: "role", type: "bytes32" },
                                { internalType: "address", name: "account", type: "address" },
                            ],
                            name: "renounceRole",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [{ internalType: "uint256", name: "lotteryId", type: "uint256" }],
                            name: "resolveLottery",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "bytes32", name: "role", type: "bytes32" },
                                { internalType: "address", name: "account", type: "address" },
                            ],
                            name: "revokeRole",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "address", name: "from", type: "address" },
                                { internalType: "address", name: "to", type: "address" },
                                { internalType: "uint256[]", name: "ids", type: "uint256[]" },
                                { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
                                { internalType: "bytes", name: "data", type: "bytes" },
                            ],
                            name: "safeBatchTransferFrom",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "address", name: "from", type: "address" },
                                { internalType: "address", name: "to", type: "address" },
                                { internalType: "uint256", name: "id", type: "uint256" },
                                { internalType: "uint256", name: "amount", type: "uint256" },
                                { internalType: "bytes", name: "data", type: "bytes" },
                            ],
                            name: "safeTransferFrom",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "address", name: "operator", type: "address" },
                                { internalType: "bool", name: "approved", type: "bool" },
                            ],
                            name: "setApprovalForAll",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [{ internalType: "uint256", name: "feeRate", type: "uint256" }],
                            name: "setFeeRate",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "uint256", name: "lotteryId", type: "uint256" },
                                {
                                    internalType: "uint256",
                                    name: "firstBucketLowerBound",
                                    type: "uint256",
                                },
                                {
                                    internalType: "uint256[]",
                                    name: "bucketTicketPrices",
                                    type: "uint256[]",
                                },
                            ],
                            name: "setLotteryTicketsPrice",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
                            name: "setTicketURI",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
                            name: "supportsInterface",
                            outputs: [{ internalType: "bool", name: "", type: "bool" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "address", name: "account", type: "address" },
                                { internalType: "uint256", name: "lotteryId", type: "uint256" },
                                { internalType: "uint256", name: "bucketLowerBound", type: "uint256" },
                            ],
                            name: "ticketBalanceOf",
                            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "uint256", name: "prevLotteryId", type: "uint256" },
                                { internalType: "uint256", name: "forwardLotteryId", type: "uint256" },
                            ],
                            name: "transferProceeds",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "unpauseContract",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                        {
                            inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                            name: "uri",
                            outputs: [{ internalType: "string", name: "", type: "string" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                { internalType: "address", name: "recipient", type: "address" },
                                { internalType: "contract IERC20", name: "token", type: "address" },
                                { internalType: "uint256", name: "amount", type: "uint256" },
                            ],
                            name: "withdrawFees",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                        },
                    ];
                    aarcModuleABI = [
                        {
                            inputs: [{ internalType: "address", name: "_permit", type: "address" }],
                            stateMutability: "nonpayable",
                            type: "constructor",
                        },
                        {
                            inputs: [],
                            name: "DOMAIN_SEPARATOR",
                            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "NAME",
                            outputs: [{ internalType: "string", name: "", type: "string" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "VERSION",
                            outputs: [{ internalType: "string", name: "", type: "string" }],
                            stateMutability: "view",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    components: [
                                        {
                                            components: [
                                                { internalType: "address", name: "token", type: "address" },
                                                { internalType: "uint256", name: "amount", type: "uint256" },
                                            ],
                                            internalType: "struct IPermit2.TokenPermissions[]",
                                            name: "tokens",
                                            type: "tuple[]",
                                        },
                                        { internalType: "uint256", name: "nonce", type: "uint256" },
                                        { internalType: "uint256", name: "deadline", type: "uint256" },
                                        { internalType: "bytes", name: "signature", type: "bytes" },
                                    ],
                                    internalType: "struct IAarcPermit2Safe.BatchPermit",
                                    name: "_permit",
                                    type: "tuple",
                                },
                                {
                                    components: [
                                        {
                                            internalType: "address",
                                            name: "targetContract",
                                            type: "address",
                                        },
                                        { internalType: "address", name: "token", type: "address" },
                                        { internalType: "uint256", name: "amount", type: "uint256" },
                                    ],
                                    internalType: "struct IAarcPermit2Safe.TargetContractToken[]",
                                    name: "targetDetails",
                                    type: "tuple[]",
                                },
                                {
                                    components: [
                                        {
                                            internalType: "address",
                                            name: "targetContract",
                                            type: "address",
                                        },
                                        { internalType: "bytes", name: "data", type: "bytes" },
                                        { internalType: "uint256", name: "value", type: "uint256" },
                                    ],
                                    internalType: "struct IAarcPermit2Safe.ContractCall[]",
                                    name: "contractCalls",
                                    type: "tuple[]",
                                },
                                {
                                    components: [
                                        { internalType: "address", name: "token", type: "address" },
                                        { internalType: "address", name: "receiver", type: "address" },
                                    ],
                                    internalType: "struct IAarcPermit2Safe.TokenDistribution[]",
                                    name: "tokenDistribution",
                                    type: "tuple[]",
                                },
                            ],
                            name: "executeBatchPermit",
                            outputs: [],
                            stateMutability: "payable",
                            type: "function",
                        },
                        {
                            inputs: [
                                {
                                    components: [
                                        {
                                            components: [
                                                { internalType: "address", name: "token", type: "address" },
                                                { internalType: "uint256", name: "amount", type: "uint256" },
                                            ],
                                            internalType: "struct IPermit2.TokenPermissions",
                                            name: "tokenPermission",
                                            type: "tuple",
                                        },
                                        { internalType: "uint256", name: "nonce", type: "uint256" },
                                        { internalType: "uint256", name: "deadline", type: "uint256" },
                                        { internalType: "bytes", name: "signature", type: "bytes" },
                                    ],
                                    internalType: "struct IAarcPermit2Safe.SinglePermit",
                                    name: "_permit",
                                    type: "tuple",
                                },
                                {
                                    components: [
                                        {
                                            internalType: "address",
                                            name: "targetContract",
                                            type: "address",
                                        },
                                        { internalType: "address", name: "token", type: "address" },
                                        { internalType: "uint256", name: "amount", type: "uint256" },
                                    ],
                                    internalType: "struct IAarcPermit2Safe.TargetContractToken[]",
                                    name: "targetDetails",
                                    type: "tuple[]",
                                },
                                {
                                    components: [
                                        {
                                            internalType: "address",
                                            name: "targetContract",
                                            type: "address",
                                        },
                                        { internalType: "bytes", name: "data", type: "bytes" },
                                        { internalType: "uint256", name: "value", type: "uint256" },
                                    ],
                                    internalType: "struct IAarcPermit2Safe.ContractCall[]",
                                    name: "contractCalls",
                                    type: "tuple[]",
                                },
                                {
                                    components: [
                                        { internalType: "address", name: "token", type: "address" },
                                        { internalType: "address", name: "receiver", type: "address" },
                                    ],
                                    internalType: "struct IAarcPermit2Safe.TokenDistribution[]",
                                    name: "tokenDistribution",
                                    type: "tuple[]",
                                },
                            ],
                            name: "executeSinglePermit",
                            outputs: [],
                            stateMutability: "payable",
                            type: "function",
                        },
                        {
                            inputs: [],
                            name: "permit",
                            outputs: [
                                { internalType: "contract IPermit2", name: "", type: "address" },
                            ],
                            stateMutability: "view",
                            type: "function",
                        },
                    ];
                    ethAdapter = new protocol_kit_1.EthersAdapter({
                        ethers: ethers_1.ethers,
                        signerOrProvider: wallet,
                    });
                    safeAddress = process.env.SAFE_ADDRESS;
                    return [4 /*yield*/, protocol_kit_1.default.create({ ethAdapter: ethAdapter, safeAddress: safeAddress })];
                case 1:
                    safeSdk = _a.sent();
                    permit2Contract = new ethers_1.ethers.Contract(permit2Address, permit2ABI, provider);
                    TOKEN_PERMISSIONS_TYPEHASH = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.toUtf8Bytes("TokenPermissions(address token,uint256 amount)"));
                    tokenPermissionsHash = ethers_1.ethers.utils.solidityPack(["bytes32", "address", "uint256"], [TOKEN_PERMISSIONS_TYPEHASH, tokenAddress, 10]);
                    PERMIT_TRANSFER_FROM_TYPEHASH = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.toUtf8Bytes("PermitTransferFrom(TokenPermissions permitted,address spender,uint256 nonce,uint256 deadline)TokenPermissions(address token,uint256 amount)"));
                    return [4 /*yield*/, permit2Contract.DOMAIN_SEPARATOR()];
                case 2:
                    PERMIT2_DOMAIN_SEPARATOR = _a.sent();
                    aarcModuleAddress = "0x4EccF8A993E3B339bF977a1d55799418855a6F97";
                    return [4 /*yield*/, provider.getBlock(47939585)];
                case 3:
                    timestamp = (_a.sent()).timestamp;
                    EIPHEADER = "/x19/x01";
                    encodedData = ethers_1.ethers.utils.defaultAbiCoder.encode(["bytes32", "bytes32", "address", "uint256", "uint256"], [
                        PERMIT_TRANSFER_FROM_TYPEHASH,
                        tokenPermissionsHash,
                        aarcModuleAddress,
                        0,
                        timestamp,
                    ]);
                    encodedDataHash = ethers_1.ethers.utils.keccak256(encodedData);
                    transactionData = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.concat([EIPHEADER, PERMIT2_DOMAIN_SEPARATOR, encodedDataHash]));
                    safeDataToBeSigned = {
                        to: predictionPoolAddress,
                        data: transactionData,
                        value: "0",
                    };
                    predictionPoolContract = new ethers_1.ethers.Contract(predictionPoolAddress, predictionPoolABI, wallet);
                    ticketsData = predictionPoolContract.interface.encodeFunctionData("buyTickets", [2, 1500000000000, 3]);
                    aarcModuleContract = new ethers_1.ethers.Contract(aarcModuleAddress, aarcModuleABI, wallet);
                    console.log(aarcModuleContract);
                    console.log("Going to execute signlePermit");
                    return [4 /*yield*/, safeSdk.createTransaction({
                            safeTransactionData: safeDataToBeSigned,
                        })];
                case 4:
                    safeTransaction = _a.sent();
                    return [4 /*yield*/, safeSdk.signTypedData(safeTransaction)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, aarcModuleContract.executeSinglePermit([[tokenAddress, 10], 0, timestamp + 1000000, "0x"], [[tokenAddress, predictionPoolAddress, 100]], [[predictionPoolAddress, ticketsData, 0]], [[tokenAddress, "0xc5D15056Df341B47C3142efD5C0268AD3003c12c"]], {
                            gasLimit: 210000,
                        })];
                case 6:
                    txSingle = _a.sent();
                    console.log("Calling txSingle");
                    return [2 /*return*/];
            }
        });
    });
}
main();
