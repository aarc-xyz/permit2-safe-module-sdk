import dotenv from "dotenv";

dotenv.config();

export const RPC_URL = process.env.RPC_URL!;
export const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY!;
export const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS!;
export const MULTI_LOT_ADDRESS = process.env.MULTI_LOT_ADDRESS!;
export const PERMIT_2_ADDRESS = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
export const AARC_MODULE_CONTRACT_ADDRESS= "0x4EccF8A993E3B339bF977a1d55799418855a6F97"
export const SIGN_LIBRARY_ADDRESS="0xA65387F16B013cf2Af4605Ad8aA5ec25a2cbA3a2"
