import { ethers, Signer, utils } from "ethers";
import { aarcModuleABI, permit2ABI, signLibraryABI } from "./contracts/abi/abi";
import { createSafeSdk } from "./services/SafeService";
import {
  AARC_MODULE_CONTRACT_ADDRESS,
  PERMIT_2_ADDRESS,
  RPC_URL,
  SIGN_LIBRARY_ADDRESS,
} from "./config/constants";
import {
  checkNativeAddress,
  getFeeData,
  getProvider,
} from "./utils/utils";
import { getTokenPermissionsHash } from "./services/TokenService";
import { PERMIT_TRANSFER_FROM_TYPEHASH } from "./services/PermitService";

async function grantAllowance(
  signer: Signer,
  safeAddress: string,
  dappAddress: string,
  tokenAllowance: number,
  tokenAddress: string,
  deadline: number,
  functionCallData?: string,
  receiverAddress?: string
): Promise<void> {
  const { Interface } = utils;
  const provider = getProvider(RPC_URL);
  const feeData = await getFeeData(provider);
  const safeSdk = await createSafeSdk(signer, safeAddress);

  const permit2Contract = new ethers.Contract(
    PERMIT_2_ADDRESS,
    permit2ABI,
    provider
  );

  const iAarcModule = new Interface(aarcModuleABI);
  const iSignLibrary = new Interface(signLibraryABI);

  const tokenPermissionsHash = await getTokenPermissionsHash(
    tokenAddress,
    tokenAllowance
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

  const tokenDistributionDetails = receiverAddress
    ? [tokenAddress, receiverAddress]
    : null;

  const singlePermitData = iAarcModule.encodeFunctionData(
    "executeSinglePermit",
    [
      [[tokenAddress, tokenAllowance], 0, deadline, "0x"],
      [[dappAddress, tokenAddress, tokenAllowance]],
      [[dappAddress, functionCallData, 0]],
      [[tokenDistributionDetails]],
    ]
  );

  const singlePermitSafeTransaction = await safeSdk.createTransaction({
    safeTransactionData: {
      to: AARC_MODULE_CONTRACT_ADDRESS,
      data: singlePermitData,
      value: checkNativeAddress(tokenAddress) ? tokenAllowance.toString() : "0",
      gasPrice: feeData.maxFeePerGas?.toString(),
    },
  });

  const txResponse = await safeSdk.executeTransaction(
    singlePermitSafeTransaction,
    { gasPrice: feeData.maxFeePerGas?.toNumber(), gasLimit: 1000000 }
  );

  await txResponse.transactionResponse?.wait();
}

module.exports = {
  grantAllowance,
};
