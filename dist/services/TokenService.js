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
exports.getTokenPermissionsHash = void 0;
const ethers_1 = require("ethers");
function getTokenPermissionsHash(tokenAddress, tokenAllowance) {
    return __awaiter(this, void 0, void 0, function* () {
        const TOKEN_PERMISSIONS_TYPEHASH = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.toUtf8Bytes("TokenPermissions(address token,uint256 amount)"));
        const tokenPermissionsHash = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.defaultAbiCoder.encode(["bytes32", "address", "uint256"], [TOKEN_PERMISSIONS_TYPEHASH, tokenAddress, tokenAllowance]));
        return tokenPermissionsHash;
    });
}
exports.getTokenPermissionsHash = getTokenPermissionsHash;
