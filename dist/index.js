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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const abi_1 = require("./contracts/abi/abi");
const SafeService_1 = require("./services/SafeService");
const constants_1 = require("./config/constants");
const utils_1 = require("./utils/utils");
const TokenService_1 = require("./services/TokenService");
const PermitService_1 = require("./services/PermitService");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function grantAllowance(signer, safeAddress, dappAddress, tokenAllowance, tokenAddress, deadline, functionCallData, receiverAddress) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
        const { Interface } = ethers_1.utils;
        const provider = (0, utils_1.getProvider)("https://polygon-mainnet.infura.io/v3/05b57693b8064e309ae6d5a2242067a5");
        const feeData = yield (0, utils_1.getFeeData)(provider);
        const safeSdk = yield (0, SafeService_1.createSafeSdk)(signer, safeAddress);
        const permit2Contract = new ethers_1.ethers.Contract(constants_1.PERMIT_2_ADDRESS, abi_1.permit2ABI, provider);
        const iAarcModule = new Interface(abi_1.aarcModuleABI);
        const iSignLibrary = new Interface(abi_1.signLibraryABI);
        const tokenPermissionsHash = yield (0, TokenService_1.getTokenPermissionsHash)(tokenAddress, tokenAllowance);
        const nonce = 2;
        const PERMIT2_DOMAIN_SEPARATOR = yield permit2Contract.DOMAIN_SEPARATOR();
        const EIPHEADER = "\x19\x01";
        const encodedData = ethers_1.ethers.utils.defaultAbiCoder.encode(["bytes32", "bytes32", "address", "uint256", "uint256"], [
            PermitService_1.PERMIT_TRANSFER_FROM_TYPEHASH,
            tokenPermissionsHash,
            constants_1.AARC_MODULE_CONTRACT_ADDRESS,
            nonce,
            deadline,
        ]);
        const encodedDataHash = ethers_1.ethers.utils.keccak256(encodedData);
        const transactionData = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.solidityPack(["string", "bytes32", "bytes32"], [EIPHEADER, PERMIT2_DOMAIN_SEPARATOR, encodedDataHash]));
        const signMessageData = iSignLibrary.encodeFunctionData("signMessage", [
            transactionData,
        ]);
        const safeDataToBeSigned = {
            to: constants_1.SIGN_LIBRARY_ADDRESS,
            data: signMessageData,
            value: "0",
            gasPrice: (_a = feeData.maxFeePerGas) === null || _a === void 0 ? void 0 : _a.toString(),
            operation: 1,
        };
        const signTransaction = yield safeSdk.createTransaction({
            safeTransactionData: safeDataToBeSigned,
        });
        const signResponse = yield safeSdk.executeTransaction(signTransaction, {
            gasPrice: (_b = feeData.maxFeePerGas) === null || _b === void 0 ? void 0 : _b.toNumber(),
            gasLimit: 1000000,
        });
        yield ((_c = signResponse.transactionResponse) === null || _c === void 0 ? void 0 : _c.wait());
        const tokenDistributionDetails = receiverAddress
            ? [tokenAddress, receiverAddress]
            : [ethers_1.ethers.constants.AddressZero, ethers_1.ethers.constants.AddressZero];
        const singlePermitData = iAarcModule.encodeFunctionData("executeSinglePermit", [
            [[tokenAddress, tokenAllowance], nonce, deadline, "0x"],
            [[dappAddress, tokenAddress, tokenAllowance]],
            [[dappAddress, functionCallData, 0]],
            [tokenDistributionDetails],
        ]);
        const singlePermitSafeTransaction = yield safeSdk.createTransaction({
            safeTransactionData: {
                to: constants_1.AARC_MODULE_CONTRACT_ADDRESS,
                data: singlePermitData,
                value: (0, utils_1.checkNativeAddress)(tokenAddress) ? tokenAllowance.toString() : "0",
                gasPrice: (_d = feeData.maxFeePerGas) === null || _d === void 0 ? void 0 : _d.toString(),
            },
        });
        const txResponse = yield safeSdk.executeTransaction(singlePermitSafeTransaction, { gasPrice: (_e = feeData.maxFeePerGas) === null || _e === void 0 ? void 0 : _e.toNumber(), gasLimit: 1000000 });
        yield ((_f = txResponse.transactionResponse) === null || _f === void 0 ? void 0 : _f.wait());
        return txResponse;
    });
}
module.exports = {
    grantAllowance,
};
