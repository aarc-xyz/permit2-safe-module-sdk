import { ethers, utils } from "ethers";
import dotenv from "dotenv";
import {
  aarcModuleABI,
  permit2ABI,
  predictionPoolABI,
  signLibraryABI,
} from "./contracts/abi";
import { createSafeSdk } from "./services/SafeService";
import {
  AARC_MODULE_CONTRACT_ADDRESS,
  PERMIT_2_ADDRESS,
  PREDICTION_POOL_ADDRESS,
  RPC_URL,
  SIGN_LIBRARY_ADDRESS,
  TOKEN_ADDRESS,
} from "./config";
import { getBlockTimestamp, getFeeData, getProvider } from "./utils";
import { getTokenPermissionsHash } from "./services/TokenService";

dotenv.config();

async function main(
  safeAddress: string,
  { dappAddress, tokenAllowance, tokenAddress, deadline }: any
): Promise<void> {
  const { Interface } = utils;

  const provider = getProvider(RPC_URL);
  const feeData = await getFeeData(provider);
  const safeSdk = await createSafeSdk(safeAddress);
  const deadlineBlockTimestamp = getBlockTimestamp(provider, deadline);

  const permit2Contract = new ethers.Contract(
    PERMIT_2_ADDRESS,
    permit2ABI,
    provider
  );

  const iAarcModule = new Interface(aarcModuleABI);

  const ipredictionPool = new Interface(predictionPoolABI);

  const iSignLibrary = new Interface(signLibraryABI);

  const tokenPermissionsHash = getTokenPermissionsHash(
    tokenAddress,
    tokenAllowance
  );

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
      deadlineBlockTimestamp,
    ]
  );
  const encodedDataHash = ethers.utils.keccak256(encodedData);
  const transactionData = ethers.utils.keccak256(
    ethers.utils.solidityPack(
      ["string", "bytes32", "bytes32"],
      [EIPHEADER, PERMIT2_DOMAIN_SEPARATOR, encodedDataHash]
    )
  );

  const signMessageData = iSignLibrary.encodeFunctionData("signMessage", [
    transactionData,
  ]);

  const safeDataToBeSigned = {
    to: SIGN_LIBRARY_ADDRESS,
    data: signMessageData,
    value: "0",
    gasPrice: feeData.maxFeePerGas?.toString(),
    operation: 1,
  };

  const signTransaction = await safeSdk.createTransaction({
    safeTransactionData: safeDataToBeSigned,
  });

  const signResponse = await safeSdk.executeTransaction(signTransaction, {
    gasPrice: feeData?.maxFeePerGas?.toNumber(),
    gasLimit: 1000000,
  });

  await signResponse.transactionResponse?.wait();

  const ticketsData = ipredictionPool.encodeFunctionData(
    "buyTickets",
    [2, 1500000000000, 3]
  );

  const singlePermitData = iAarcModule.encodeFunctionData(
    "executeSinglePermit",
    [
      [[tokenAddress, tokenAllowance], 0, deadline, "0x"],
      [[tokenAddress, PREDICTION_POOL_ADDRESS, 100]],
      [[PREDICTION_POOL_ADDRESS, ticketsData, 0]],
      [[tokenAddress, PREDICTION_POOL_ADDRESS]],
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
  await txResponse.transactionResponse?.wait();
}
