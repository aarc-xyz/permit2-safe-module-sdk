import { ethers } from "ethers";

export async function getTokenPermissionsHash(
  tokenAddress: any,
  tokenAllowance: any
): Promise<string> {
  const TOKEN_PERMISSIONS_TYPEHASH = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("TokenPermissions(address token,uint256 amount)")
  );

  const tokenPermissionsHash = ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(
      ["bytes32", "address", "uint256"],
      [TOKEN_PERMISSIONS_TYPEHASH, tokenAddress, tokenAllowance]
    )
  );

  return tokenPermissionsHash;
}
