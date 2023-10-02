"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aarcModuleABI = void 0;
exports.aarcModuleABI = [
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
        outputs: [{ internalType: "contract IPermit2", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
];
