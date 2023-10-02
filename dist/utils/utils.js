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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNativeAddress = exports.getFeeData = exports.getBlockTimestamp = exports.getWallet = exports.getProvider = void 0;
const ethers_1 = require("ethers");
const getProvider = (rpcUrl) => {
    console.log(rpcUrl);
    return new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
};
exports.getProvider = getProvider;
const getWallet = (privateKey, provider) => new ethers_1.ethers.Wallet(privateKey, provider);
exports.getWallet = getWallet;
const getBlockTimestamp = (provider, blockNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const block = yield provider.getBlock(blockNumber);
    return block.timestamp;
});
exports.getBlockTimestamp = getBlockTimestamp;
const getFeeData = (provider) => __awaiter(void 0, void 0, void 0, function* () {
    const feeData = provider.getFeeData();
    return feeData;
});
exports.getFeeData = getFeeData;
const checkNativeAddress = (tokenAddress) => tokenAddress === "0x0000000000000000000000000000000000000000";
exports.checkNativeAddress = checkNativeAddress;
