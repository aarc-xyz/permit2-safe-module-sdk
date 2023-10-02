"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signLibraryABI = void 0;
exports.signLibraryABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "msgHash",
                type: "bytes32",
            },
        ],
        name: "SignMsg",
        type: "event",
    },
    {
        inputs: [{ internalType: "bytes", name: "message", type: "bytes" }],
        name: "getMessageHash",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes", name: "_data", type: "bytes" }],
        name: "signMessage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
