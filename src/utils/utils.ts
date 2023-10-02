import { ethers } from "ethers";

export const getProvider = (
  rpcUrl: string
): ethers.providers.JsonRpcProvider => {
  console.log(rpcUrl);
  return new ethers.providers.JsonRpcProvider(rpcUrl);
};

export const getWallet = (
  privateKey: string,
  provider: ethers.providers.JsonRpcProvider
): ethers.Wallet => new ethers.Wallet(privateKey, provider);

export const getBlockTimestamp = async (
  provider: ethers.providers.JsonRpcProvider,
  blockNumber: number
): Promise<number> => {
  const block = await provider.getBlock(blockNumber);
  return block.timestamp;
};

export const getFeeData = async (
  provider: ethers.providers.JsonRpcProvider
): Promise<ethers.providers.FeeData> => {
  const feeData = provider.getFeeData();
  return feeData;
};

export const checkNativeAddress = (tokenAddress: string) =>
  tokenAddress === "0x0000000000000000000000000000000000000000";
