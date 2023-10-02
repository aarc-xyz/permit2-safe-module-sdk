"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIGN_LIBRARY_ADDRESS = exports.AARC_MODULE_CONTRACT_ADDRESS = exports.PERMIT_2_ADDRESS = exports.RPC_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.RPC_URL = process.env.RPC_URL;
exports.PERMIT_2_ADDRESS = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
exports.AARC_MODULE_CONTRACT_ADDRESS = "0x4EccF8A993E3B339bF977a1d55799418855a6F97";
exports.SIGN_LIBRARY_ADDRESS = "0xA65387F16B013cf2Af4605Ad8aA5ec25a2cbA3a2";
