import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL!);
  const privateKey = process.env.WALLET_PRIVATE_KEY!;
  const wallet = new ethers.Wallet(privateKey, provider);
  const deadline = (await provider.getBlock(47939585)).timestamp;


  /**
   * Initalizing addresses 
   */
  const tokenAddress = process.env.TOKEN_ADDRESS;
  const predictionPoolAddress = process.env.PREDICTION_POOL_ADDRESS!;
  const permit2Address = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
  const aarcModuleAddress = "0x4EccF8A993E3B339bF977a1d55799418855a6F97";
  //   const polygonTokenAddress = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0";


  /**
   * Initializing ABIs
   */
  const permit2ABI = [
    {
      inputs: [{ internalType: "uint256", name: "deadline", type: "uint256" }],
      name: "AllowanceExpired",
      type: "error",
    },
    { inputs: [], name: "ExcessiveInvalidation", type: "error" },
    {
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "InsufficientAllowance",
      type: "error",
    },
    {
      inputs: [{ internalType: "uint256", name: "maxAmount", type: "uint256" }],
      name: "InvalidAmount",
      type: "error",
    },
    { inputs: [], name: "InvalidContractSignature", type: "error" },
    { inputs: [], name: "InvalidNonce", type: "error" },
    { inputs: [], name: "InvalidSignature", type: "error" },
    { inputs: [], name: "InvalidSignatureLength", type: "error" },
    { inputs: [], name: "InvalidSigner", type: "error" },
    { inputs: [], name: "LengthMismatch", type: "error" },
    {
      inputs: [
        { internalType: "uint256", name: "signatureDeadline", type: "uint256" },
      ],
      name: "SignatureExpired",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint160",
          name: "amount",
          type: "uint160",
        },
        {
          indexed: false,
          internalType: "uint48",
          name: "expiration",
          type: "uint48",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "Lockdown",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint48",
          name: "newNonce",
          type: "uint48",
        },
        {
          indexed: false,
          internalType: "uint48",
          name: "oldNonce",
          type: "uint48",
        },
      ],
      name: "NonceInvalidation",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint160",
          name: "amount",
          type: "uint160",
        },
        {
          indexed: false,
          internalType: "uint48",
          name: "expiration",
          type: "uint48",
        },
        {
          indexed: false,
          internalType: "uint48",
          name: "nonce",
          type: "uint48",
        },
      ],
      name: "Permit",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "word",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "mask",
          type: "uint256",
        },
      ],
      name: "UnorderedNonceInvalidation",
      type: "event",
    },
    {
      inputs: [],
      name: "DOMAIN_SEPARATOR",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
      ],
      name: "allowance",
      outputs: [
        { internalType: "uint160", name: "amount", type: "uint160" },
        { internalType: "uint48", name: "expiration", type: "uint48" },
        { internalType: "uint48", name: "nonce", type: "uint48" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "token", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint160", name: "amount", type: "uint160" },
        { internalType: "uint48", name: "expiration", type: "uint48" },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "token", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint48", name: "newNonce", type: "uint48" },
      ],
      name: "invalidateNonces",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "wordPos", type: "uint256" },
        { internalType: "uint256", name: "mask", type: "uint256" },
      ],
      name: "invalidateUnorderedNonces",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "address", name: "token", type: "address" },
            { internalType: "address", name: "spender", type: "address" },
          ],
          internalType: "struct IAllowanceTransfer.TokenSpenderPair[]",
          name: "approvals",
          type: "tuple[]",
        },
      ],
      name: "lockdown",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      name: "nonceBitmap",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        {
          components: [
            {
              components: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint160", name: "amount", type: "uint160" },
                { internalType: "uint48", name: "expiration", type: "uint48" },
                { internalType: "uint48", name: "nonce", type: "uint48" },
              ],
              internalType: "struct IAllowanceTransfer.PermitDetails[]",
              name: "details",
              type: "tuple[]",
            },
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "sigDeadline", type: "uint256" },
          ],
          internalType: "struct IAllowanceTransfer.PermitBatch",
          name: "permitBatch",
          type: "tuple",
        },
        { internalType: "bytes", name: "signature", type: "bytes" },
      ],
      name: "permit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        {
          components: [
            {
              components: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint160", name: "amount", type: "uint160" },
                { internalType: "uint48", name: "expiration", type: "uint48" },
                { internalType: "uint48", name: "nonce", type: "uint48" },
              ],
              internalType: "struct IAllowanceTransfer.PermitDetails",
              name: "details",
              type: "tuple",
            },
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "sigDeadline", type: "uint256" },
          ],
          internalType: "struct IAllowanceTransfer.PermitSingle",
          name: "permitSingle",
          type: "tuple",
        },
        { internalType: "bytes", name: "signature", type: "bytes" },
      ],
      name: "permit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              components: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
              ],
              internalType: "struct ISignatureTransfer.TokenPermissions",
              name: "permitted",
              type: "tuple",
            },
            { internalType: "uint256", name: "nonce", type: "uint256" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
          ],
          internalType: "struct ISignatureTransfer.PermitTransferFrom",
          name: "permit",
          type: "tuple",
        },
        {
          components: [
            { internalType: "address", name: "to", type: "address" },
            {
              internalType: "uint256",
              name: "requestedAmount",
              type: "uint256",
            },
          ],
          internalType: "struct ISignatureTransfer.SignatureTransferDetails",
          name: "transferDetails",
          type: "tuple",
        },
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "bytes", name: "signature", type: "bytes" },
      ],
      name: "permitTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              components: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
              ],
              internalType: "struct ISignatureTransfer.TokenPermissions[]",
              name: "permitted",
              type: "tuple[]",
            },
            { internalType: "uint256", name: "nonce", type: "uint256" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
          ],
          internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
          name: "permit",
          type: "tuple",
        },
        {
          components: [
            { internalType: "address", name: "to", type: "address" },
            {
              internalType: "uint256",
              name: "requestedAmount",
              type: "uint256",
            },
          ],
          internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
          name: "transferDetails",
          type: "tuple[]",
        },
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "bytes", name: "signature", type: "bytes" },
      ],
      name: "permitTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              components: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
              ],
              internalType: "struct ISignatureTransfer.TokenPermissions",
              name: "permitted",
              type: "tuple",
            },
            { internalType: "uint256", name: "nonce", type: "uint256" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
          ],
          internalType: "struct ISignatureTransfer.PermitTransferFrom",
          name: "permit",
          type: "tuple",
        },
        {
          components: [
            { internalType: "address", name: "to", type: "address" },
            {
              internalType: "uint256",
              name: "requestedAmount",
              type: "uint256",
            },
          ],
          internalType: "struct ISignatureTransfer.SignatureTransferDetails",
          name: "transferDetails",
          type: "tuple",
        },
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "bytes32", name: "witness", type: "bytes32" },
        { internalType: "string", name: "witnessTypeString", type: "string" },
        { internalType: "bytes", name: "signature", type: "bytes" },
      ],
      name: "permitWitnessTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              components: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
              ],
              internalType: "struct ISignatureTransfer.TokenPermissions[]",
              name: "permitted",
              type: "tuple[]",
            },
            { internalType: "uint256", name: "nonce", type: "uint256" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
          ],
          internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
          name: "permit",
          type: "tuple",
        },
        {
          components: [
            { internalType: "address", name: "to", type: "address" },
            {
              internalType: "uint256",
              name: "requestedAmount",
              type: "uint256",
            },
          ],
          internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
          name: "transferDetails",
          type: "tuple[]",
        },
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "bytes32", name: "witness", type: "bytes32" },
        { internalType: "string", name: "witnessTypeString", type: "string" },
        { internalType: "bytes", name: "signature", type: "bytes" },
      ],
      name: "permitWitnessTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint160", name: "amount", type: "uint160" },
            { internalType: "address", name: "token", type: "address" },
          ],
          internalType: "struct IAllowanceTransfer.AllowanceTransferDetails[]",
          name: "transferDetails",
          type: "tuple[]",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint160", name: "amount", type: "uint160" },
        { internalType: "address", name: "token", type: "address" },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const predictionPoolABI = [
    {
      inputs: [
        {
          internalType: "contract IPriceFeed",
          name: "priceFeed",
          type: "address",
        },
        { internalType: "uint256", name: "feeRate", type: "uint256" },
        { internalType: "address", name: "admin", type: "address" },
        { internalType: "string", name: "tokenURI", type: "string" },
        { internalType: "address", name: "trustedForwarder", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "lotteryId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "AddProceeds",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "lotteryId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "bucketLowerBound",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "ticketsBought",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "ticketsCost",
          type: "uint256",
        },
      ],
      name: "BoughtTickets",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256[]",
          name: "lotteryIds",
          type: "uint256[]",
        },
        {
          indexed: true,
          internalType: "address",
          name: "claimer",
          type: "address",
        },
      ],
      name: "Claimed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "newFeeRate",
          type: "uint256",
        },
      ],
      name: "FeeRateChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "FeeWithdrawn",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "lotteryId",
          type: "uint256",
        },
        {
          components: [
            { internalType: "string", name: "token", type: "string" },
            { internalType: "uint256", name: "bucketSize", type: "uint256" },
            { internalType: "uint256", name: "openTimestamp", type: "uint256" },
            {
              internalType: "uint256",
              name: "closeTimestamp",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "maturityTimestamp",
              type: "uint256",
            },
            {
              internalType: "contract IERC20",
              name: "collateralToken",
              type: "address",
            },
          ],
          indexed: false,
          internalType: "struct LotteryParams",
          name: "params",
          type: "tuple",
        },
      ],
      name: "LotteryCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "lotteryId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "resolvedPrice",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "winningBucketLowerBound",
          type: "uint256",
        },
      ],
      name: "LotteryResolved",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Paused",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32",
        },
      ],
      name: "RoleAdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleGranted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleRevoked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "lotteryId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "firstBucketLowerBound",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "minimumTicketPrice",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "bucketTicketPrices",
          type: "uint256[]",
        },
      ],
      name: "SetLotteryPrices",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "ids",
          type: "uint256[]",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "values",
          type: "uint256[]",
        },
      ],
      name: "TransferBatch",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "lotteryId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "newLotteryId",
          type: "uint256",
        },
      ],
      name: "TransferProceeds",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "TransferSingle",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "value",
          type: "string",
        },
        { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      ],
      name: "URI",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Unpaused",
      type: "event",
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "FEE_PRECISION",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "FEE_RECIPIENT_ROLE",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "LOTTERY_MANAGER_ROLE",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MAX_FEE_RATE",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "PRICE_FEED",
      outputs: [
        { internalType: "contract IPriceFeed", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "PRICE_SETTER_ROLE",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      name: "_FEE_COLLECTED_",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "_FEE_RATE_",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "_LAST_LOTTERY_ID_",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "lotteryId", type: "uint256" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "addProceeds",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "account", type: "address" },
        { internalType: "uint256", name: "id", type: "uint256" },
      ],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address[]", name: "accounts", type: "address[]" },
        { internalType: "uint256[]", name: "ids", type: "uint256[]" },
      ],
      name: "balanceOfBatch",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "lotteryId", type: "uint256" },
        { internalType: "uint256", name: "bucketLowerBound", type: "uint256" },
        { internalType: "uint256", name: "buyTicketCount", type: "uint256" },
      ],
      name: "buyTickets",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256[]", name: "lotteryIds", type: "uint256[]" },
      ],
      name: "claim",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "string", name: "token", type: "string" },
            { internalType: "uint256", name: "bucketSize", type: "uint256" },
            { internalType: "uint256", name: "openTimestamp", type: "uint256" },
            {
              internalType: "uint256",
              name: "closeTimestamp",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "maturityTimestamp",
              type: "uint256",
            },
            {
              internalType: "contract IERC20",
              name: "collateralToken",
              type: "address",
            },
          ],
          internalType: "struct LotteryParams",
          name: "lotteryParams",
          type: "tuple",
        },
      ],
      name: "createLottery",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "lotteryId", type: "uint256" }],
      name: "exists",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
      name: "getRoleAdmin",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "hasRole",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "account", type: "address" },
        { internalType: "address", name: "operator", type: "address" },
      ],
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "forwarder", type: "address" }],
      name: "isTrustedForwarder",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pauseContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "lotteryId", type: "uint256" }],
      name: "resolveLottery",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256[]", name: "ids", type: "uint256[]" },
        { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        { internalType: "bytes", name: "data", type: "bytes" },
      ],
      name: "safeBatchTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "bytes", name: "data", type: "bytes" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "feeRate", type: "uint256" }],
      name: "setFeeRate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "lotteryId", type: "uint256" },
        {
          internalType: "uint256",
          name: "firstBucketLowerBound",
          type: "uint256",
        },
        {
          internalType: "uint256[]",
          name: "bucketTicketPrices",
          type: "uint256[]",
        },
      ],
      name: "setLotteryTicketsPrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
      name: "setTicketURI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "account", type: "address" },
        { internalType: "uint256", name: "lotteryId", type: "uint256" },
        { internalType: "uint256", name: "bucketLowerBound", type: "uint256" },
      ],
      name: "ticketBalanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "prevLotteryId", type: "uint256" },
        { internalType: "uint256", name: "forwardLotteryId", type: "uint256" },
      ],
      name: "transferProceeds",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "unpauseContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "uri",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "contract IERC20", name: "token", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "withdrawFees",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const aarcModuleABI = [
    {
      inputs: [{ internalType: "address", name: "_permit", type: "address" }],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "DOMAIN_SEPARATOR",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "NAME",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "VERSION",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              components: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
              ],
              internalType: "struct IPermit2.TokenPermissions[]",
              name: "tokens",
              type: "tuple[]",
            },
            { internalType: "uint256", name: "nonce", type: "uint256" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
            { internalType: "bytes", name: "signature", type: "bytes" },
          ],
          internalType: "struct IAarcPermit2Safe.BatchPermit",
          name: "_permit",
          type: "tuple",
        },
        {
          components: [
            {
              internalType: "address",
              name: "targetContract",
              type: "address",
            },
            { internalType: "address", name: "token", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          internalType: "struct IAarcPermit2Safe.TargetContractToken[]",
          name: "targetDetails",
          type: "tuple[]",
        },
        {
          components: [
            {
              internalType: "address",
              name: "targetContract",
              type: "address",
            },
            { internalType: "bytes", name: "data", type: "bytes" },
            { internalType: "uint256", name: "value", type: "uint256" },
          ],
          internalType: "struct IAarcPermit2Safe.ContractCall[]",
          name: "contractCalls",
          type: "tuple[]",
        },
        {
          components: [
            { internalType: "address", name: "token", type: "address" },
            { internalType: "address", name: "receiver", type: "address" },
          ],
          internalType: "struct IAarcPermit2Safe.TokenDistribution[]",
          name: "tokenDistribution",
          type: "tuple[]",
        },
      ],
      name: "executeBatchPermit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              components: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
              ],
              internalType: "struct IPermit2.TokenPermissions",
              name: "tokenPermission",
              type: "tuple",
            },
            { internalType: "uint256", name: "nonce", type: "uint256" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
            { internalType: "bytes", name: "signature", type: "bytes" },
          ],
          internalType: "struct IAarcPermit2Safe.SinglePermit",
          name: "_permit",
          type: "tuple",
        },
        {
          components: [
            {
              internalType: "address",
              name: "targetContract",
              type: "address",
            },
            { internalType: "address", name: "token", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          internalType: "struct IAarcPermit2Safe.TargetContractToken[]",
          name: "targetDetails",
          type: "tuple[]",
        },
        {
          components: [
            {
              internalType: "address",
              name: "targetContract",
              type: "address",
            },
            { internalType: "bytes", name: "data", type: "bytes" },
            { internalType: "uint256", name: "value", type: "uint256" },
          ],
          internalType: "struct IAarcPermit2Safe.ContractCall[]",
          name: "contractCalls",
          type: "tuple[]",
        },
        {
          components: [
            { internalType: "address", name: "token", type: "address" },
            { internalType: "address", name: "receiver", type: "address" },
          ],
          internalType: "struct IAarcPermit2Safe.TokenDistribution[]",
          name: "tokenDistribution",
          type: "tuple[]",
        },
      ],
      name: "executeSinglePermit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "permit",
      outputs: [
        { internalType: "contract IPermit2", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  /**
   * Initializing contracts
   */

  const permit2Contract = new ethers.Contract(
    permit2Address,
    permit2ABI,
    provider
  );
  const predictionPoolContract = new ethers.Contract(
    predictionPoolAddress,
    predictionPoolABI,
    wallet
  );
  const aarcModuleContract = new ethers.Contract(
    aarcModuleAddress,
    aarcModuleABI,
    wallet
  );

  /**
   * Initalizing Safe SDK
   */
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: wallet,
  });
  const safeAddress = process.env.SAFE_ADDRESS!;
  const safeSdk = await Safe.create({ ethAdapter, safeAddress });
 
  const TOKEN_PERMISSIONS_TYPEHASH = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("TokenPermissions(address token,uint256 amount)")
  );
  const tokenPermissionsHash = ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(
      ["bytes32", "address", "uint256"],
      [TOKEN_PERMISSIONS_TYPEHASH, tokenAddress, 10]
    )
  );
  const PERMIT_TRANSFER_FROM_TYPEHASH = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(
      "PermitTransferFrom(TokenPermissions permitted,address spender,uint256 nonce,uint256 deadline)TokenPermissions(address token,uint256 amount)"
    )
  );
  const PERMIT2_DOMAIN_SEPARATOR = await permit2Contract.DOMAIN_SEPARATOR();
  const EIPHEADER = "/x19/x01";
  const encodedData = ethers.utils.defaultAbiCoder.encode(
    ["bytes32", "bytes32", "address", "uint256", "uint256"],
    [
      PERMIT_TRANSFER_FROM_TYPEHASH,
      tokenPermissionsHash,
      aarcModuleAddress,
      0,
      timestamp,
    ]
  );
  const encodedDataHash = ethers.utils.keccak256(encodedData);
  const transactionData = ethers.utils.keccak256(
    ethers.utils.solidityPack(
      ["string", "address", "uint256"],
      [EIPHEADER, PERMIT2_DOMAIN_SEPARATOR, encodedDataHash]
    )
  );
  const safeDataToBeSigned = {
    to: aarcModuleAddress,
    data: transactionData,
    value: "0",
  };


  const ticketsData = predictionPoolContract.interface.encodeFunctionData(
    "buyTickets",
    [2, 1500000000000, 3]
  );
  const safeTransaction = await safeSdk.createTransaction({
    safeTransactionData: safeDataToBeSigned,
  });
  const isValidSafeTx = await safeSdk.isValidTransaction(
    safeTransaction
  );
  const sign = await safeSdk.signTypedData(safeTransaction);
  const feeData = await provider.getFeeData();
  const singlePermitData = aarcModuleContract.interface.encodeFunctionData(
    "executeSinglePermit",
    [
      [[tokenAddress, 10], 0, deadline + 1000000, "0x"],
      [[tokenAddress, predictionPoolAddress, 100]],
      [[predictionPoolAddress, ticketsData, 0]],
      [[tokenAddress, "0xc5D15056Df341B47C3142efD5C0268AD3003c12c"]],
    ]
  );
  const singlePermitSafeTransaction = await safeSdk.createTransaction({
    safeTransactionData: {
      to: aarcModuleAddress,
      data: singlePermitData,
      value: "10",
    },
  });
  const isValidTx = await safeSdk.isValidTransaction(
    singlePermitSafeTransaction
  );
  console.log("Transaction validity >>", isValidTx);
  const txResponse = await safeSdk.executeTransaction(
    singlePermitSafeTransaction,
    { gasPrice: feeData.maxFeePerGas?.toNumber(), gasLimit: 1000000 }
  );
  console.log(txResponse);
  await txResponse.transactionResponse?.wait();
  // const txSingle = await aarcModuleContract.executeSinglePermit(
  //   [[tokenAddress, 10], 0, timestamp + 1000000, "0x"],
  //   [[tokenAddress, predictionPoolAddress, 100]],
  //   [[predictionPoolAddress, ticketsData, 0]],
  //   [[tokenAddress, "0xc5D15056Df341B47C3142efD5C0268AD3003c12c"]],
  //   { gasPrice: feeData.maxFeePerGas, gasLimit: 1000000 }
  // );
}
main();