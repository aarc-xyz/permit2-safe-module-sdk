import { ethers } from "ethers";

export const getProvider = (rpcUrl: string): ethers.providers.JsonRpcProvider =>
  new ethers.providers.JsonRpcProvider(rpcUrl);

export const getWallet = (privateKey: string, provider: ethers.providers.JsonRpcProvider): ethers.Wallet =>
  new ethers.Wallet(privateKey, provider);

export const getBlockTimestamp = async (provider: ethers.providers.JsonRpcProvider, blockNumber: number): Promise<number> => {
  const block = await provider.getBlock(blockNumber);
  return block.timestamp;
};