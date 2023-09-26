import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { RPC_URL, WALLET_PRIVATE_KEY } from "../config";
import { getProvider, getWallet } from "../utils";
import { ethers } from "ethers";

export async function createSafeSdk(safeAddress: string): Promise<Safe> {
  const provider = getProvider(RPC_URL);
  const wallet = getWallet(WALLET_PRIVATE_KEY, provider);

  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: wallet,
  });
  
  return Safe.create({ ethAdapter, safeAddress });
}
