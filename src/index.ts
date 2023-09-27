import { ethers, utils } from "ethers";
import dotenv from "dotenv";
import {
  aarcModuleABI,
  permit2ABI,
  multiLotABI,
  signLibraryABI,
} from "./contracts/abi";
import { createSafeSdk } from "./services/SafeService";
import {
  AARC_MODULE_CONTRACT_ADDRESS,
  PERMIT_2_ADDRESS,
  MULTI_LOT_ADDRESS,
  RPC_URL,
  SIGN_LIBRARY_ADDRESS,
  TOKEN_ADDRESS,
} from "./config";
import { getBlockTimestamp, getFeeData, getProvider } from "./utils";
import { getTokenPermissionsHash } from "./services/TokenService";

dotenv.config();

async function main(
  safeAddress: string,
  dappAddress: string, tokenAllowance: number, tokenAddress: string, deadline: number
): Promise<void> {
  const { Interface } = utils;

  const provider = getProvider(RPC_URL);
  const feeData = await getFeeData(provider);
  const safeSdk = await createSafeSdk(safeAddress);
  // const deadlineBlockTimestamp = getBlockTimestamp(provider, deadline);

  const permit2Contract = new ethers.Contract(
    PERMIT_2_ADDRESS,
    permit2ABI,
    provider
  );

  const iAarcModule = new Interface(aarcModuleABI);

  const iMultiLot = new Interface(multiLotABI);

  const iSignLibrary = new Interface(signLibraryABI);

  const tokenPermissionsHash = await getTokenPermissionsHash(
    tokenAddress,
    tokenAllowance
  );

  console.log("token permission hash", tokenPermissionsHash);

  const PERMIT_TRANSFER_FROM_TYPEHASH = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(
      "PermitTransferFrom(TokenPermissions permitted,address spender,uint256 nonce,uint256 deadline)TokenPermissions(address token,uint256 amount)"
    )
  );
  const PERMIT2_DOMAIN_SEPARATOR = await permit2Contract.DOMAIN_SEPARATOR();
  const EIPHEADER = "\x19\x01";
  const encodedData = ethers.utils.defaultAbiCoder.encode(
    ["bytes32", "bytes32", "address", "uint256", "uint256"],
    [
      PERMIT_TRANSFER_FROM_TYPEHASH,
      tokenPermissionsHash,
      AARC_MODULE_CONTRACT_ADDRESS,
      0,
      deadline,
    ]
  );
  const encodedDataHash = ethers.utils.keccak256(encodedData);
  const transactionData = ethers.utils.keccak256(
    ethers.utils.solidityPack(
      ["string", "bytes32", "bytes32"],
      [EIPHEADER, PERMIT2_DOMAIN_SEPARATOR, encodedDataHash]
    )
  );

  console.log("transaction data", transactionData);

  const signMessageData = iSignLibrary.encodeFunctionData("signMessage", [
    transactionData
  ]);

  const safeDataToBeSigned = {
    to: SIGN_LIBRARY_ADDRESS,
    data: signMessageData,
    value: "0",
    gasPrice: feeData.maxFeePerGas?.toString(),
    operation: 1,
  };
  
  const functionCallData = iMultiLot.encodeFunctionData(
    "joinLot",
    [5995, "snpcrudeoil", 20000000]
  );

  console.log("function call data", functionCallData);

  const signTransaction = await safeSdk.createTransaction({
    safeTransactionData: safeDataToBeSigned,
  });

  const signResponse = await safeSdk.executeTransaction(signTransaction, {
    gasPrice: feeData?.maxFeePerGas?.toNumber(),
    gasLimit: 1000000,
  });

  console.log(signResponse);

  await signResponse.transactionResponse?.wait();


  const singlePermitData = iAarcModule.encodeFunctionData(
    "executeSinglePermit",
    [
      [[tokenAddress, tokenAllowance], 0, deadline, "0x"],
      [[tokenAddress, MULTI_LOT_ADDRESS, tokenAllowance]],
      [[MULTI_LOT_ADDRESS, functionCallData, 0]],
      [[tokenAddress, MULTI_LOT_ADDRESS]],
    ]
  );
  const singlePermitSafeTransaction = await safeSdk.createTransaction({
    safeTransactionData: {
      to: AARC_MODULE_CONTRACT_ADDRESS,
      data: singlePermitData,
      value: "0",
      gasPrice: feeData.maxFeePerGas?.toString(),
    },
  });
  const txResponse = await safeSdk.executeTransaction(
    singlePermitSafeTransaction,
    { gasPrice: feeData.maxFeePerGas?.toNumber(), gasLimit: 1000000 }
  );
  console.log(txResponse);
  await txResponse.transactionResponse?.wait();
}

main(
  "0x93c0388CD82B9327BbCa9Cebe98CAa719ba047C1",
  "",
  200000000,
  "0xebAFe0Dc33d03976AC497a33079dC374018C9dE2",
  1727697547
)
