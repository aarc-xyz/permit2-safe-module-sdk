"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMIT_TRANSFER_FROM_TYPEHASH = void 0;
const ethers_1 = require("ethers");
exports.PERMIT_TRANSFER_FROM_TYPEHASH = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.toUtf8Bytes("PermitTransferFrom(TokenPermissions permitted,address spender,uint256 nonce,uint256 deadline)TokenPermissions(address token,uint256 amount)"));
