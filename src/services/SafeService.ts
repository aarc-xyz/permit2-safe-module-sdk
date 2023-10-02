import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers, Signer } from "ethers";

export async function createSafeSdk(
  signer: Signer,
  safeAddress: string
): Promise<Safe> {

  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  });

  return Safe.create({ ethAdapter, safeAddress });
}
