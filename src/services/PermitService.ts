import { ethers } from "ethers";

export const PERMIT_TRANSFER_FROM_TYPEHASH = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes(
    "PermitTransferFrom(TokenPermissions permitted,address spender,uint256 nonce,uint256 deadline)TokenPermissions(address token,uint256 amount)"
  )
);

