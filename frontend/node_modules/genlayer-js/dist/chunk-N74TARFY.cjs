"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk75ZPJI57cjs = require('./chunk-75ZPJI57.cjs');

// src/chains/index.ts
var chains_exports = {};
_chunk75ZPJI57cjs.__export.call(void 0, chains_exports, {
  localnet: () => localnet,
  studionet: () => studionet,
  testnetAsimov: () => testnetAsimov,
  testnetBradbury: () => testnetBradbury
});

// src/chains/localnet.ts
var _viem = require('viem');
var SIMULATOR_JSON_RPC_URL = "http://127.0.0.1:4000/api";
var CONSENSUS_MAIN_CONTRACT = {
  address: "0xb7278A61aa25c888815aFC32Ad3cC52fF24fE575",
  abi: [
    {
      inputs: [],
      name: "AccessControlBadConfirmation",
      type: "error"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          internalType: "bytes32",
          name: "neededRole",
          type: "bytes32"
        }
      ],
      name: "AccessControlUnauthorizedAccount",
      type: "error"
    },
    {
      inputs: [],
      name: "CallerNotMessages",
      type: "error"
    },
    {
      inputs: [],
      name: "CanNotAppeal",
      type: "error"
    },
    {
      inputs: [],
      name: "EmptyTransaction",
      type: "error"
    },
    {
      inputs: [],
      name: "FinalizationNotAllowed",
      type: "error"
    },
    {
      inputs: [],
      name: "InvalidAddress",
      type: "error"
    },
    {
      inputs: [],
      name: "InvalidGhostContract",
      type: "error"
    },
    {
      inputs: [],
      name: "InvalidInitialization",
      type: "error"
    },
    {
      inputs: [],
      name: "InvalidVote",
      type: "error"
    },
    {
      inputs: [],
      name: "MaxNumOfIterationsInPendingQueueReached",
      type: "error"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "numOfMessages",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "maxAllocatedMessages",
          type: "uint256"
        }
      ],
      name: "MaxNumOfMessagesExceeded",
      type: "error"
    },
    {
      inputs: [],
      name: "NonGenVMContract",
      type: "error"
    },
    {
      inputs: [],
      name: "NotInitializing",
      type: "error"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address"
        }
      ],
      name: "OwnableInvalidOwner",
      type: "error"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error"
    },
    {
      inputs: [],
      name: "ReentrancyGuardReentrantCall",
      type: "error"
    },
    {
      inputs: [],
      name: "TransactionNotAtPendingQueueHead",
      type: "error"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "appealer",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "appealBond",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "address[]",
          name: "appealValidators",
          type: "address[]"
        }
      ],
      name: "AppealStarted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "recipient",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "data",
          type: "bytes"
        }
      ],
      name: "ErrorMessage",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "ghostFactory",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "genManager",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "genTransactions",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "genQueue",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "genStaking",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "genMessages",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "idleness",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "tribunalAppeal",
          type: "address"
        }
      ],
      name: "ExternalContractsSet",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint64",
          name: "version",
          type: "uint64"
        }
      ],
      name: "Initialized",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "recipient",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "activator",
          type: "address"
        }
      ],
      name: "InternalMessageProcessed",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "recipient",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "activator",
          type: "address"
        }
      ],
      name: "NewTransaction",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnershipTransferStarted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnershipTransferred",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32"
        }
      ],
      name: "RoleAdminChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address"
        }
      ],
      name: "RoleGranted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address"
        }
      ],
      name: "RoleRevoked",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address"
        }
      ],
      name: "SlashAppealSubmitted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "tx_id",
          type: "bytes32"
        }
      ],
      name: "TransactionAccepted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "leader",
          type: "address"
        }
      ],
      name: "TransactionActivated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "batchId",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "address[]",
          name: "validators",
          type: "address[]"
        }
      ],
      name: "TransactionActivatedValidators",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address"
        }
      ],
      name: "TransactionCancelled",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "tx_id",
          type: "bytes32"
        }
      ],
      name: "TransactionFinalized",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "oldValidator",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newValidator",
          type: "address"
        }
      ],
      name: "TransactionIdleValidatorReplaced",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "validatorIndex",
          type: "uint256"
        }
      ],
      name: "TransactionIdleValidatorReplacementFailed",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newLeader",
          type: "address"
        }
      ],
      name: "TransactionLeaderRotated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "tx_id",
          type: "bytes32"
        }
      ],
      name: "TransactionLeaderTimeout",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bytes32[]",
          name: "tx_ids",
          type: "bytes32[]"
        }
      ],
      name: "TransactionNeedsRecomputation",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "tx_id",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "address[]",
          name: "validators",
          type: "address[]"
        }
      ],
      name: "TransactionReceiptProposed",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "tx_id",
          type: "bytes32"
        }
      ],
      name: "TransactionUndetermined",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "validator",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "isLastVote",
          type: "bool"
        }
      ],
      name: "TribunalAppealVoteCommitted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "validator",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "isLastVote",
          type: "bool"
        }
      ],
      name: "TribunalAppealVoteRevealed",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "validator",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "isLastVote",
          type: "bool"
        }
      ],
      name: "VoteCommitted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "validator",
          type: "address"
        },
        {
          indexed: false,
          internalType: "enum ITransactions.VoteType",
          name: "voteType",
          type: "uint8"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "isLastVote",
          type: "bool"
        },
        {
          indexed: false,
          internalType: "enum ITransactions.ResultType",
          name: "result",
          type: "uint8"
        }
      ],
      name: "VoteRevealed",
      type: "event"
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "EVENTS_BATCH_SIZE",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "acceptOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        },
        {
          internalType: "bytes",
          name: "_vrfProof",
          type: "bytes"
        }
      ],
      name: "activateTransaction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_sender",
          type: "address"
        },
        {
          internalType: "address",
          name: "_recipient",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_numOfInitialValidators",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_maxRotations",
          type: "uint256"
        },
        {
          internalType: "bytes",
          name: "_txData",
          type: "bytes"
        }
      ],
      name: "addTransaction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        }
      ],
      name: "cancelTransaction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "_commitHash",
          type: "bytes32"
        }
      ],
      name: "commitTribunalAppealVote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "_commitHash",
          type: "bytes32"
        },
        {
          internalType: "uint256",
          name: "_validatorIndex",
          type: "uint256"
        }
      ],
      name: "commitVote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "contracts",
      outputs: [
        {
          internalType: "contract IGenManager",
          name: "genManager",
          type: "address"
        },
        {
          internalType: "contract ITransactions",
          name: "genTransactions",
          type: "address"
        },
        {
          internalType: "contract IQueues",
          name: "genQueue",
          type: "address"
        },
        {
          internalType: "contract IGhostFactory",
          name: "ghostFactory",
          type: "address"
        },
        {
          internalType: "contract IGenStaking",
          name: "genStaking",
          type: "address"
        },
        {
          internalType: "contract IMessages",
          name: "genMessages",
          type: "address"
        },
        {
          internalType: "contract IIdleness",
          name: "idleness",
          type: "address"
        },
        {
          internalType: "contract ITribunalAppeal",
          name: "tribunalAppeal",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_recipient",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256"
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes"
        }
      ],
      name: "executeMessage",
      outputs: [
        {
          internalType: "bool",
          name: "success",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        }
      ],
      name: "finalizeTransaction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "getContracts",
      outputs: [
        {
          components: [
            {
              internalType: "contract IGenManager",
              name: "genManager",
              type: "address"
            },
            {
              internalType: "contract ITransactions",
              name: "genTransactions",
              type: "address"
            },
            {
              internalType: "contract IQueues",
              name: "genQueue",
              type: "address"
            },
            {
              internalType: "contract IGhostFactory",
              name: "ghostFactory",
              type: "address"
            },
            {
              internalType: "contract IGenStaking",
              name: "genStaking",
              type: "address"
            },
            {
              internalType: "contract IMessages",
              name: "genMessages",
              type: "address"
            },
            {
              internalType: "contract IIdleness",
              name: "idleness",
              type: "address"
            },
            {
              internalType: "contract ITribunalAppeal",
              name: "tribunalAppeal",
              type: "address"
            }
          ],
          internalType: "struct IConsensusMain.ExternalContracts",
          name: "",
          type: "tuple"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        }
      ],
      name: "getRoleAdmin",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "addr",
          type: "address"
        }
      ],
      name: "ghostContracts",
      outputs: [
        {
          internalType: "bool",
          name: "isGhost",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "hasRole",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "pendingOwner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        }
      ],
      name: "proceedPendingQueueProcessing",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        },
        {
          internalType: "bytes",
          name: "_txReceipt",
          type: "bytes"
        },
        {
          internalType: "uint256",
          name: "_processingBlock",
          type: "uint256"
        },
        {
          components: [
            {
              internalType: "enum IMessages.MessageType",
              name: "messageType",
              type: "uint8"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256"
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes"
            },
            {
              internalType: "bool",
              name: "onAcceptance",
              type: "bool"
            }
          ],
          internalType: "struct IMessages.SubmittedMessage[]",
          name: "_messages",
          type: "tuple[]"
        },
        {
          internalType: "bytes",
          name: "_vrfProof",
          type: "bytes"
        }
      ],
      name: "proposeReceipt",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "callerConfirmation",
          type: "address"
        }
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "_voteHash",
          type: "bytes32"
        },
        {
          internalType: "enum ITribunalAppeal.TribunalVoteType",
          name: "_voteType",
          type: "uint8"
        },
        {
          internalType: "uint256",
          name: "_nonce",
          type: "uint256"
        }
      ],
      name: "revealTribunalAppealVote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "_voteHash",
          type: "bytes32"
        },
        {
          internalType: "enum ITransactions.VoteType",
          name: "_voteType",
          type: "uint8"
        },
        {
          internalType: "uint256",
          name: "_nonce",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_validatorIndex",
          type: "uint256"
        }
      ],
      name: "revealVote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_ghostFactory",
          type: "address"
        },
        {
          internalType: "address",
          name: "_genManager",
          type: "address"
        },
        {
          internalType: "address",
          name: "_genTransactions",
          type: "address"
        },
        {
          internalType: "address",
          name: "_genQueue",
          type: "address"
        },
        {
          internalType: "address",
          name: "_genStaking",
          type: "address"
        },
        {
          internalType: "address",
          name: "_genMessages",
          type: "address"
        },
        {
          internalType: "address",
          name: "_idleness",
          type: "address"
        },
        {
          internalType: "address",
          name: "_tribunalAppeal",
          type: "address"
        }
      ],
      name: "setExternalContracts",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        }
      ],
      name: "submitAppeal",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        }
      ],
      name: "submitSlashAppeal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4"
        }
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  bytecode: ""
};
var CONSENSUS_DATA_CONTRACT = {
  address: "0x88B0F18613Db92Bf970FfE264E02496e20a74D16",
  abi: [
    {
      inputs: [],
      name: "AccessControlBadConfirmation",
      type: "error"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          internalType: "bytes32",
          name: "neededRole",
          type: "bytes32"
        }
      ],
      name: "AccessControlUnauthorizedAccount",
      type: "error"
    },
    {
      inputs: [],
      name: "InvalidInitialization",
      type: "error"
    },
    {
      inputs: [],
      name: "NotInitializing",
      type: "error"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address"
        }
      ],
      name: "OwnableInvalidOwner",
      type: "error"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error"
    },
    {
      inputs: [],
      name: "ReentrancyGuardReentrantCall",
      type: "error"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint64",
          name: "version",
          type: "uint64"
        }
      ],
      name: "Initialized",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnershipTransferStarted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnershipTransferred",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32"
        }
      ],
      name: "RoleAdminChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address"
        }
      ],
      name: "RoleGranted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address"
        }
      ],
      name: "RoleRevoked",
      type: "event"
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "acceptOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        },
        {
          internalType: "uint256",
          name: "_currentTimestamp",
          type: "uint256"
        }
      ],
      name: "canFinalize",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "consensusMain",
      outputs: [
        {
          internalType: "contract IConsensusMain",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        }
      ],
      name: "getLastAppealResult",
      outputs: [
        {
          internalType: "enum ITransactions.ResultType",
          name: "",
          type: "uint8"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        }
      ],
      name: "getLatestAcceptedTransaction",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "currentTimestamp",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "sender",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "numOfInitialValidators",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "txSlot",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "createdTimestamp",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "lastVoteTimestamp",
              type: "uint256"
            },
            {
              internalType: "bytes32",
              name: "randomSeed",
              type: "bytes32"
            },
            {
              internalType: "enum ITransactions.ResultType",
              name: "result",
              type: "uint8"
            },
            {
              internalType: "bytes",
              name: "txData",
              type: "bytes"
            },
            {
              internalType: "bytes",
              name: "txReceipt",
              type: "bytes"
            },
            {
              components: [
                {
                  internalType: "enum IMessages.MessageType",
                  name: "messageType",
                  type: "uint8"
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address"
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256"
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes"
                },
                {
                  internalType: "bool",
                  name: "onAcceptance",
                  type: "bool"
                }
              ],
              internalType: "struct IMessages.SubmittedMessage[]",
              name: "messages",
              type: "tuple[]"
            },
            {
              internalType: "enum IQueues.QueueType",
              name: "queueType",
              type: "uint8"
            },
            {
              internalType: "uint256",
              name: "queuePosition",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "activator",
              type: "address"
            },
            {
              internalType: "address",
              name: "lastLeader",
              type: "address"
            },
            {
              internalType: "enum ITransactions.TransactionStatus",
              name: "status",
              type: "uint8"
            },
            {
              internalType: "bytes32",
              name: "txId",
              type: "bytes32"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "activationBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "processingBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "proposalBlock",
                  type: "uint256"
                }
              ],
              internalType: "struct ITransactions.ReadStateBlockRange",
              name: "readStateBlockRange",
              type: "tuple"
            },
            {
              internalType: "uint256",
              name: "numOfRounds",
              type: "uint256"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "round",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "leaderIndex",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesCommitted",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesRevealed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "appealBond",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "rotationsLeft",
                  type: "uint256"
                },
                {
                  internalType: "enum ITransactions.ResultType",
                  name: "result",
                  type: "uint8"
                },
                {
                  internalType: "address[]",
                  name: "roundValidators",
                  type: "address[]"
                },
                {
                  internalType: "bytes32[]",
                  name: "validatorVotesHash",
                  type: "bytes32[]"
                },
                {
                  internalType: "enum ITransactions.VoteType[]",
                  name: "validatorVotes",
                  type: "uint8[]"
                }
              ],
              internalType: "struct ITransactions.RoundData",
              name: "lastRound",
              type: "tuple"
            }
          ],
          internalType: "struct ConsensusData.TransactionData",
          name: "txData",
          type: "tuple"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "startIndex",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "pageSize",
          type: "uint256"
        }
      ],
      name: "getLatestAcceptedTransactions",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "currentTimestamp",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "sender",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "numOfInitialValidators",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "txSlot",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "createdTimestamp",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "lastVoteTimestamp",
              type: "uint256"
            },
            {
              internalType: "bytes32",
              name: "randomSeed",
              type: "bytes32"
            },
            {
              internalType: "enum ITransactions.ResultType",
              name: "result",
              type: "uint8"
            },
            {
              internalType: "bytes",
              name: "txData",
              type: "bytes"
            },
            {
              internalType: "bytes",
              name: "txReceipt",
              type: "bytes"
            },
            {
              components: [
                {
                  internalType: "enum IMessages.MessageType",
                  name: "messageType",
                  type: "uint8"
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address"
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256"
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes"
                },
                {
                  internalType: "bool",
                  name: "onAcceptance",
                  type: "bool"
                }
              ],
              internalType: "struct IMessages.SubmittedMessage[]",
              name: "messages",
              type: "tuple[]"
            },
            {
              internalType: "enum IQueues.QueueType",
              name: "queueType",
              type: "uint8"
            },
            {
              internalType: "uint256",
              name: "queuePosition",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "activator",
              type: "address"
            },
            {
              internalType: "address",
              name: "lastLeader",
              type: "address"
            },
            {
              internalType: "enum ITransactions.TransactionStatus",
              name: "status",
              type: "uint8"
            },
            {
              internalType: "bytes32",
              name: "txId",
              type: "bytes32"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "activationBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "processingBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "proposalBlock",
                  type: "uint256"
                }
              ],
              internalType: "struct ITransactions.ReadStateBlockRange",
              name: "readStateBlockRange",
              type: "tuple"
            },
            {
              internalType: "uint256",
              name: "numOfRounds",
              type: "uint256"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "round",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "leaderIndex",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesCommitted",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesRevealed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "appealBond",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "rotationsLeft",
                  type: "uint256"
                },
                {
                  internalType: "enum ITransactions.ResultType",
                  name: "result",
                  type: "uint8"
                },
                {
                  internalType: "address[]",
                  name: "roundValidators",
                  type: "address[]"
                },
                {
                  internalType: "bytes32[]",
                  name: "validatorVotesHash",
                  type: "bytes32[]"
                },
                {
                  internalType: "enum ITransactions.VoteType[]",
                  name: "validatorVotes",
                  type: "uint8[]"
                }
              ],
              internalType: "struct ITransactions.RoundData",
              name: "lastRound",
              type: "tuple"
            }
          ],
          internalType: "struct ConsensusData.TransactionData[]",
          name: "",
          type: "tuple[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        }
      ],
      name: "getLatestAcceptedTxCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        }
      ],
      name: "getLatestFinalizedTransaction",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "currentTimestamp",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "sender",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "numOfInitialValidators",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "txSlot",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "createdTimestamp",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "lastVoteTimestamp",
              type: "uint256"
            },
            {
              internalType: "bytes32",
              name: "randomSeed",
              type: "bytes32"
            },
            {
              internalType: "enum ITransactions.ResultType",
              name: "result",
              type: "uint8"
            },
            {
              internalType: "bytes",
              name: "txData",
              type: "bytes"
            },
            {
              internalType: "bytes",
              name: "txReceipt",
              type: "bytes"
            },
            {
              components: [
                {
                  internalType: "enum IMessages.MessageType",
                  name: "messageType",
                  type: "uint8"
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address"
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256"
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes"
                },
                {
                  internalType: "bool",
                  name: "onAcceptance",
                  type: "bool"
                }
              ],
              internalType: "struct IMessages.SubmittedMessage[]",
              name: "messages",
              type: "tuple[]"
            },
            {
              internalType: "enum IQueues.QueueType",
              name: "queueType",
              type: "uint8"
            },
            {
              internalType: "uint256",
              name: "queuePosition",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "activator",
              type: "address"
            },
            {
              internalType: "address",
              name: "lastLeader",
              type: "address"
            },
            {
              internalType: "enum ITransactions.TransactionStatus",
              name: "status",
              type: "uint8"
            },
            {
              internalType: "bytes32",
              name: "txId",
              type: "bytes32"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "activationBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "processingBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "proposalBlock",
                  type: "uint256"
                }
              ],
              internalType: "struct ITransactions.ReadStateBlockRange",
              name: "readStateBlockRange",
              type: "tuple"
            },
            {
              internalType: "uint256",
              name: "numOfRounds",
              type: "uint256"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "round",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "leaderIndex",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesCommitted",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesRevealed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "appealBond",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "rotationsLeft",
                  type: "uint256"
                },
                {
                  internalType: "enum ITransactions.ResultType",
                  name: "result",
                  type: "uint8"
                },
                {
                  internalType: "address[]",
                  name: "roundValidators",
                  type: "address[]"
                },
                {
                  internalType: "bytes32[]",
                  name: "validatorVotesHash",
                  type: "bytes32[]"
                },
                {
                  internalType: "enum ITransactions.VoteType[]",
                  name: "validatorVotes",
                  type: "uint8[]"
                }
              ],
              internalType: "struct ITransactions.RoundData",
              name: "lastRound",
              type: "tuple"
            }
          ],
          internalType: "struct ConsensusData.TransactionData",
          name: "txData",
          type: "tuple"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "startIndex",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "pageSize",
          type: "uint256"
        }
      ],
      name: "getLatestFinalizedTransactions",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "currentTimestamp",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "sender",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "numOfInitialValidators",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "txSlot",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "createdTimestamp",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "lastVoteTimestamp",
              type: "uint256"
            },
            {
              internalType: "bytes32",
              name: "randomSeed",
              type: "bytes32"
            },
            {
              internalType: "enum ITransactions.ResultType",
              name: "result",
              type: "uint8"
            },
            {
              internalType: "bytes",
              name: "txData",
              type: "bytes"
            },
            {
              internalType: "bytes",
              name: "txReceipt",
              type: "bytes"
            },
            {
              components: [
                {
                  internalType: "enum IMessages.MessageType",
                  name: "messageType",
                  type: "uint8"
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address"
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256"
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes"
                },
                {
                  internalType: "bool",
                  name: "onAcceptance",
                  type: "bool"
                }
              ],
              internalType: "struct IMessages.SubmittedMessage[]",
              name: "messages",
              type: "tuple[]"
            },
            {
              internalType: "enum IQueues.QueueType",
              name: "queueType",
              type: "uint8"
            },
            {
              internalType: "uint256",
              name: "queuePosition",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "activator",
              type: "address"
            },
            {
              internalType: "address",
              name: "lastLeader",
              type: "address"
            },
            {
              internalType: "enum ITransactions.TransactionStatus",
              name: "status",
              type: "uint8"
            },
            {
              internalType: "bytes32",
              name: "txId",
              type: "bytes32"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "activationBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "processingBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "proposalBlock",
                  type: "uint256"
                }
              ],
              internalType: "struct ITransactions.ReadStateBlockRange",
              name: "readStateBlockRange",
              type: "tuple"
            },
            {
              internalType: "uint256",
              name: "numOfRounds",
              type: "uint256"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "round",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "leaderIndex",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesCommitted",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesRevealed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "appealBond",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "rotationsLeft",
                  type: "uint256"
                },
                {
                  internalType: "enum ITransactions.ResultType",
                  name: "result",
                  type: "uint8"
                },
                {
                  internalType: "address[]",
                  name: "roundValidators",
                  type: "address[]"
                },
                {
                  internalType: "bytes32[]",
                  name: "validatorVotesHash",
                  type: "bytes32[]"
                },
                {
                  internalType: "enum ITransactions.VoteType[]",
                  name: "validatorVotes",
                  type: "uint8[]"
                }
              ],
              internalType: "struct ITransactions.RoundData",
              name: "lastRound",
              type: "tuple"
            }
          ],
          internalType: "struct ConsensusData.TransactionData[]",
          name: "",
          type: "tuple[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        }
      ],
      name: "getLatestFinalizedTxCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        }
      ],
      name: "getLatestPendingTxCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "slot",
          type: "uint256"
        }
      ],
      name: "getLatestPendingTxId",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        }
      ],
      name: "getLatestUndeterminedTransaction",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "currentTimestamp",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "sender",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "numOfInitialValidators",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "txSlot",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "createdTimestamp",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "lastVoteTimestamp",
              type: "uint256"
            },
            {
              internalType: "bytes32",
              name: "randomSeed",
              type: "bytes32"
            },
            {
              internalType: "enum ITransactions.ResultType",
              name: "result",
              type: "uint8"
            },
            {
              internalType: "bytes",
              name: "txData",
              type: "bytes"
            },
            {
              internalType: "bytes",
              name: "txReceipt",
              type: "bytes"
            },
            {
              components: [
                {
                  internalType: "enum IMessages.MessageType",
                  name: "messageType",
                  type: "uint8"
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address"
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256"
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes"
                },
                {
                  internalType: "bool",
                  name: "onAcceptance",
                  type: "bool"
                }
              ],
              internalType: "struct IMessages.SubmittedMessage[]",
              name: "messages",
              type: "tuple[]"
            },
            {
              internalType: "enum IQueues.QueueType",
              name: "queueType",
              type: "uint8"
            },
            {
              internalType: "uint256",
              name: "queuePosition",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "activator",
              type: "address"
            },
            {
              internalType: "address",
              name: "lastLeader",
              type: "address"
            },
            {
              internalType: "enum ITransactions.TransactionStatus",
              name: "status",
              type: "uint8"
            },
            {
              internalType: "bytes32",
              name: "txId",
              type: "bytes32"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "activationBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "processingBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "proposalBlock",
                  type: "uint256"
                }
              ],
              internalType: "struct ITransactions.ReadStateBlockRange",
              name: "readStateBlockRange",
              type: "tuple"
            },
            {
              internalType: "uint256",
              name: "numOfRounds",
              type: "uint256"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "round",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "leaderIndex",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesCommitted",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesRevealed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "appealBond",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "rotationsLeft",
                  type: "uint256"
                },
                {
                  internalType: "enum ITransactions.ResultType",
                  name: "result",
                  type: "uint8"
                },
                {
                  internalType: "address[]",
                  name: "roundValidators",
                  type: "address[]"
                },
                {
                  internalType: "bytes32[]",
                  name: "validatorVotesHash",
                  type: "bytes32[]"
                },
                {
                  internalType: "enum ITransactions.VoteType[]",
                  name: "validatorVotes",
                  type: "uint8[]"
                }
              ],
              internalType: "struct ITransactions.RoundData",
              name: "lastRound",
              type: "tuple"
            }
          ],
          internalType: "struct ConsensusData.TransactionData",
          name: "txData",
          type: "tuple"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        }
      ],
      name: "getLatestUndeterminedTxCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        }
      ],
      name: "getMessagesForTransaction",
      outputs: [
        {
          components: [
            {
              internalType: "enum IMessages.MessageType",
              name: "messageType",
              type: "uint8"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256"
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes"
            },
            {
              internalType: "bool",
              name: "onAcceptance",
              type: "bool"
            }
          ],
          internalType: "struct IMessages.SubmittedMessage[]",
          name: "",
          type: "tuple[]"
        },
        {
          internalType: "address",
          name: "ghostAddress",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        }
      ],
      name: "getReadStateBlockRangeForTransaction",
      outputs: [
        {
          internalType: "uint256",
          name: "activationBlock",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "processingBlock",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "proposalBlock",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "startIndex",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "endIndex",
          type: "uint256"
        }
      ],
      name: "getRecipientQueues",
      outputs: [
        {
          components: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "head",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "tail",
                  type: "uint256"
                },
                {
                  internalType: "bytes32[]",
                  name: "txIds",
                  type: "bytes32[]"
                }
              ],
              internalType: "struct IQueues.QueueInfoView",
              name: "pending",
              type: "tuple"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "head",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "tail",
                  type: "uint256"
                },
                {
                  internalType: "bytes32[]",
                  name: "txIds",
                  type: "bytes32[]"
                }
              ],
              internalType: "struct IQueues.QueueInfoView",
              name: "accepted",
              type: "tuple"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "head",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "tail",
                  type: "uint256"
                },
                {
                  internalType: "bytes32[]",
                  name: "txIds",
                  type: "bytes32[]"
                }
              ],
              internalType: "struct IQueues.QueueInfoView",
              name: "undetermined",
              type: "tuple"
            },
            {
              internalType: "uint256",
              name: "finalizedCount",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "issuedTxCount",
              type: "uint256"
            }
          ],
          internalType: "struct IQueues.RecipientQueuesView",
          name: "",
          type: "tuple"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        }
      ],
      name: "getRoleAdmin",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "getTotalNumOfTransactions",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        }
      ],
      name: "getTransactionAllData",
      outputs: [
        {
          components: [
            {
              internalType: "bytes32",
              name: "id",
              type: "bytes32"
            },
            {
              internalType: "address",
              name: "sender",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "numOfInitialValidators",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "txSlot",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "activator",
              type: "address"
            },
            {
              internalType: "enum ITransactions.TransactionStatus",
              name: "status",
              type: "uint8"
            },
            {
              internalType: "enum ITransactions.TransactionStatus",
              name: "previousStatus",
              type: "uint8"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "created",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "pending",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "activated",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "proposed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "committed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "lastVote",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "appealSubmitted",
                  type: "uint256"
                }
              ],
              internalType: "struct ITransactions.Timestamps",
              name: "timestamps",
              type: "tuple"
            },
            {
              internalType: "bytes32",
              name: "randomSeed",
              type: "bytes32"
            },
            {
              internalType: "bool",
              name: "onAcceptanceMessages",
              type: "bool"
            },
            {
              internalType: "enum ITransactions.ResultType",
              name: "result",
              type: "uint8"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "activationBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "processingBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "proposalBlock",
                  type: "uint256"
                }
              ],
              internalType: "struct ITransactions.ReadStateBlockRange",
              name: "readStateBlockRange",
              type: "tuple"
            },
            {
              internalType: "bytes",
              name: "txData",
              type: "bytes"
            },
            {
              internalType: "bytes",
              name: "txReceipt",
              type: "bytes"
            },
            {
              components: [
                {
                  internalType: "enum IMessages.MessageType",
                  name: "messageType",
                  type: "uint8"
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address"
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256"
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes"
                },
                {
                  internalType: "bool",
                  name: "onAcceptance",
                  type: "bool"
                }
              ],
              internalType: "struct IMessages.SubmittedMessage[]",
              name: "messages",
              type: "tuple[]"
            },
            {
              internalType: "address[]",
              name: "consumedValidators",
              type: "address[]"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "round",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "leaderIndex",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesCommitted",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesRevealed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "appealBond",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "rotationsLeft",
                  type: "uint256"
                },
                {
                  internalType: "enum ITransactions.ResultType",
                  name: "result",
                  type: "uint8"
                },
                {
                  internalType: "address[]",
                  name: "roundValidators",
                  type: "address[]"
                },
                {
                  internalType: "bytes32[]",
                  name: "validatorVotesHash",
                  type: "bytes32[]"
                },
                {
                  internalType: "enum ITransactions.VoteType[]",
                  name: "validatorVotes",
                  type: "uint8[]"
                }
              ],
              internalType: "struct ITransactions.RoundData[]",
              name: "roundData",
              type: "tuple[]"
            }
          ],
          internalType: "struct ITransactions.Transaction",
          name: "transaction",
          type: "tuple"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        },
        {
          internalType: "uint256",
          name: "_timestamp",
          type: "uint256"
        }
      ],
      name: "getTransactionData",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "currentTimestamp",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "sender",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "numOfInitialValidators",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "txSlot",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "createdTimestamp",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "lastVoteTimestamp",
              type: "uint256"
            },
            {
              internalType: "bytes32",
              name: "randomSeed",
              type: "bytes32"
            },
            {
              internalType: "enum ITransactions.ResultType",
              name: "result",
              type: "uint8"
            },
            {
              internalType: "bytes",
              name: "txData",
              type: "bytes"
            },
            {
              internalType: "bytes",
              name: "txReceipt",
              type: "bytes"
            },
            {
              components: [
                {
                  internalType: "enum IMessages.MessageType",
                  name: "messageType",
                  type: "uint8"
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address"
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256"
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes"
                },
                {
                  internalType: "bool",
                  name: "onAcceptance",
                  type: "bool"
                }
              ],
              internalType: "struct IMessages.SubmittedMessage[]",
              name: "messages",
              type: "tuple[]"
            },
            {
              internalType: "enum IQueues.QueueType",
              name: "queueType",
              type: "uint8"
            },
            {
              internalType: "uint256",
              name: "queuePosition",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "activator",
              type: "address"
            },
            {
              internalType: "address",
              name: "lastLeader",
              type: "address"
            },
            {
              internalType: "enum ITransactions.TransactionStatus",
              name: "status",
              type: "uint8"
            },
            {
              internalType: "bytes32",
              name: "txId",
              type: "bytes32"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "activationBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "processingBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "proposalBlock",
                  type: "uint256"
                }
              ],
              internalType: "struct ITransactions.ReadStateBlockRange",
              name: "readStateBlockRange",
              type: "tuple"
            },
            {
              internalType: "uint256",
              name: "numOfRounds",
              type: "uint256"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "round",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "leaderIndex",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesCommitted",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesRevealed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "appealBond",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "rotationsLeft",
                  type: "uint256"
                },
                {
                  internalType: "enum ITransactions.ResultType",
                  name: "result",
                  type: "uint8"
                },
                {
                  internalType: "address[]",
                  name: "roundValidators",
                  type: "address[]"
                },
                {
                  internalType: "bytes32[]",
                  name: "validatorVotesHash",
                  type: "bytes32[]"
                },
                {
                  internalType: "enum ITransactions.VoteType[]",
                  name: "validatorVotes",
                  type: "uint8[]"
                }
              ],
              internalType: "struct ITransactions.RoundData",
              name: "lastRound",
              type: "tuple"
            }
          ],
          internalType: "struct ConsensusData.TransactionData",
          name: "",
          type: "tuple"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "startIndex",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "endIndex",
          type: "uint256"
        }
      ],
      name: "getTransactionIndexToTxId",
      outputs: [
        {
          internalType: "bytes32[]",
          name: "",
          type: "bytes32[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        },
        {
          internalType: "uint256",
          name: "_timestamp",
          type: "uint256"
        }
      ],
      name: "getTransactionStatus",
      outputs: [
        {
          internalType: "enum ITransactions.TransactionStatus",
          name: "",
          type: "uint8"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        }
      ],
      name: "getValidatorsForLastAppeal",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        }
      ],
      name: "getValidatorsForLastRound",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "hasRole",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        }
      ],
      name: "hasTransactionOnAcceptanceMessages",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        }
      ],
      name: "hasTransactionOnFinalizationMessages",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_consensusMain",
          type: "address"
        },
        {
          internalType: "address",
          name: "_transactions",
          type: "address"
        },
        {
          internalType: "address",
          name: "_queues",
          type: "address"
        }
      ],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "pendingOwner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "queues",
      outputs: [
        {
          internalType: "contract IQueues",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "callerConfirmation",
          type: "address"
        }
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_consensusMain",
          type: "address"
        }
      ],
      name: "setConsensusMain",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_queues",
          type: "address"
        }
      ],
      name: "setQueues",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_transactions",
          type: "address"
        }
      ],
      name: "setTransactions",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4"
        }
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "transactions",
      outputs: [
        {
          internalType: "contract ITransactions",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  bytecode: ""
};
var localnet = _viem.defineChain.call(void 0, {
  id: 61127,
  isStudio: true,
  name: "Genlayer Localnet",
  rpcUrls: {
    default: {
      http: [SIMULATOR_JSON_RPC_URL]
    }
  },
  nativeCurrency: {
    name: "GEN Token",
    symbol: "GEN",
    decimals: 18
  },
  blockExplorers: {
    default: {
      name: "GenLayer Explorer",
      url: SIMULATOR_JSON_RPC_URL
    }
  },
  testnet: true,
  consensusMainContract: CONSENSUS_MAIN_CONTRACT,
  consensusDataContract: CONSENSUS_DATA_CONTRACT,
  stakingContract: null,
  feeManagerContract: null,
  roundsStorageContract: null,
  appealsContract: null,
  defaultNumberOfInitialValidators: 5,
  defaultConsensusMaxRotations: 3
});

// src/chains/studionet.ts

var SIMULATOR_JSON_RPC_URL2 = "https://studio.genlayer.com/api";
var EXPLORER_URL = "https://genlayer-explorer.vercel.app";
var CONSENSUS_MAIN_CONTRACT2 = {
  address: "0xb7278A61aa25c888815aFC32Ad3cC52fF24fE575",
  abi: [
    {
      inputs: [],
      name: "AccessControlBadConfirmation",
      type: "error"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          internalType: "bytes32",
          name: "neededRole",
          type: "bytes32"
        }
      ],
      name: "AccessControlUnauthorizedAccount",
      type: "error"
    },
    {
      inputs: [],
      name: "CallerNotMessages",
      type: "error"
    },
    {
      inputs: [],
      name: "CanNotAppeal",
      type: "error"
    },
    {
      inputs: [],
      name: "EmptyTransaction",
      type: "error"
    },
    {
      inputs: [],
      name: "FinalizationNotAllowed",
      type: "error"
    },
    {
      inputs: [],
      name: "InvalidAddress",
      type: "error"
    },
    {
      inputs: [],
      name: "InvalidGhostContract",
      type: "error"
    },
    {
      inputs: [],
      name: "InvalidInitialization",
      type: "error"
    },
    {
      inputs: [],
      name: "InvalidVote",
      type: "error"
    },
    {
      inputs: [],
      name: "MaxNumOfIterationsInPendingQueueReached",
      type: "error"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "numOfMessages",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "maxAllocatedMessages",
          type: "uint256"
        }
      ],
      name: "MaxNumOfMessagesExceeded",
      type: "error"
    },
    {
      inputs: [],
      name: "NonGenVMContract",
      type: "error"
    },
    {
      inputs: [],
      name: "NotInitializing",
      type: "error"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address"
        }
      ],
      name: "OwnableInvalidOwner",
      type: "error"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error"
    },
    {
      inputs: [],
      name: "ReentrancyGuardReentrantCall",
      type: "error"
    },
    {
      inputs: [],
      name: "TransactionNotAtPendingQueueHead",
      type: "error"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "appealer",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "appealBond",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "address[]",
          name: "appealValidators",
          type: "address[]"
        }
      ],
      name: "AppealStarted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "recipient",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "data",
          type: "bytes"
        }
      ],
      name: "ErrorMessage",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "ghostFactory",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "genManager",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "genTransactions",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "genQueue",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "genStaking",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "genMessages",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "idleness",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "tribunalAppeal",
          type: "address"
        }
      ],
      name: "ExternalContractsSet",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint64",
          name: "version",
          type: "uint64"
        }
      ],
      name: "Initialized",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "recipient",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "activator",
          type: "address"
        }
      ],
      name: "InternalMessageProcessed",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "recipient",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "activator",
          type: "address"
        }
      ],
      name: "NewTransaction",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnershipTransferStarted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnershipTransferred",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32"
        }
      ],
      name: "RoleAdminChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address"
        }
      ],
      name: "RoleGranted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address"
        }
      ],
      name: "RoleRevoked",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address"
        }
      ],
      name: "SlashAppealSubmitted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "tx_id",
          type: "bytes32"
        }
      ],
      name: "TransactionAccepted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "leader",
          type: "address"
        }
      ],
      name: "TransactionActivated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "batchId",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "address[]",
          name: "validators",
          type: "address[]"
        }
      ],
      name: "TransactionActivatedValidators",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address"
        }
      ],
      name: "TransactionCancelled",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "tx_id",
          type: "bytes32"
        }
      ],
      name: "TransactionFinalized",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "oldValidator",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newValidator",
          type: "address"
        }
      ],
      name: "TransactionIdleValidatorReplaced",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "validatorIndex",
          type: "uint256"
        }
      ],
      name: "TransactionIdleValidatorReplacementFailed",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newLeader",
          type: "address"
        }
      ],
      name: "TransactionLeaderRotated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "tx_id",
          type: "bytes32"
        }
      ],
      name: "TransactionLeaderTimeout",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bytes32[]",
          name: "tx_ids",
          type: "bytes32[]"
        }
      ],
      name: "TransactionNeedsRecomputation",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "tx_id",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "address[]",
          name: "validators",
          type: "address[]"
        }
      ],
      name: "TransactionReceiptProposed",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "tx_id",
          type: "bytes32"
        }
      ],
      name: "TransactionUndetermined",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "validator",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "isLastVote",
          type: "bool"
        }
      ],
      name: "TribunalAppealVoteCommitted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "validator",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "isLastVote",
          type: "bool"
        }
      ],
      name: "TribunalAppealVoteRevealed",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "validator",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "isLastVote",
          type: "bool"
        }
      ],
      name: "VoteCommitted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "txId",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "validator",
          type: "address"
        },
        {
          indexed: false,
          internalType: "enum ITransactions.VoteType",
          name: "voteType",
          type: "uint8"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "isLastVote",
          type: "bool"
        },
        {
          indexed: false,
          internalType: "enum ITransactions.ResultType",
          name: "result",
          type: "uint8"
        }
      ],
      name: "VoteRevealed",
      type: "event"
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "EVENTS_BATCH_SIZE",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "acceptOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        },
        {
          internalType: "bytes",
          name: "_vrfProof",
          type: "bytes"
        }
      ],
      name: "activateTransaction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_sender",
          type: "address"
        },
        {
          internalType: "address",
          name: "_recipient",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_numOfInitialValidators",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_maxRotations",
          type: "uint256"
        },
        {
          internalType: "bytes",
          name: "_txData",
          type: "bytes"
        }
      ],
      name: "addTransaction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        }
      ],
      name: "cancelTransaction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "_commitHash",
          type: "bytes32"
        }
      ],
      name: "commitTribunalAppealVote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "_commitHash",
          type: "bytes32"
        },
        {
          internalType: "uint256",
          name: "_validatorIndex",
          type: "uint256"
        }
      ],
      name: "commitVote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "contracts",
      outputs: [
        {
          internalType: "contract IGenManager",
          name: "genManager",
          type: "address"
        },
        {
          internalType: "contract ITransactions",
          name: "genTransactions",
          type: "address"
        },
        {
          internalType: "contract IQueues",
          name: "genQueue",
          type: "address"
        },
        {
          internalType: "contract IGhostFactory",
          name: "ghostFactory",
          type: "address"
        },
        {
          internalType: "contract IGenStaking",
          name: "genStaking",
          type: "address"
        },
        {
          internalType: "contract IMessages",
          name: "genMessages",
          type: "address"
        },
        {
          internalType: "contract IIdleness",
          name: "idleness",
          type: "address"
        },
        {
          internalType: "contract ITribunalAppeal",
          name: "tribunalAppeal",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_recipient",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256"
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes"
        }
      ],
      name: "executeMessage",
      outputs: [
        {
          internalType: "bool",
          name: "success",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        }
      ],
      name: "finalizeTransaction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "getContracts",
      outputs: [
        {
          components: [
            {
              internalType: "contract IGenManager",
              name: "genManager",
              type: "address"
            },
            {
              internalType: "contract ITransactions",
              name: "genTransactions",
              type: "address"
            },
            {
              internalType: "contract IQueues",
              name: "genQueue",
              type: "address"
            },
            {
              internalType: "contract IGhostFactory",
              name: "ghostFactory",
              type: "address"
            },
            {
              internalType: "contract IGenStaking",
              name: "genStaking",
              type: "address"
            },
            {
              internalType: "contract IMessages",
              name: "genMessages",
              type: "address"
            },
            {
              internalType: "contract IIdleness",
              name: "idleness",
              type: "address"
            },
            {
              internalType: "contract ITribunalAppeal",
              name: "tribunalAppeal",
              type: "address"
            }
          ],
          internalType: "struct IConsensusMain.ExternalContracts",
          name: "",
          type: "tuple"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        }
      ],
      name: "getRoleAdmin",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "addr",
          type: "address"
        }
      ],
      name: "ghostContracts",
      outputs: [
        {
          internalType: "bool",
          name: "isGhost",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "hasRole",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "pendingOwner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        }
      ],
      name: "proceedPendingQueueProcessing",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        },
        {
          internalType: "bytes",
          name: "_txReceipt",
          type: "bytes"
        },
        {
          internalType: "uint256",
          name: "_processingBlock",
          type: "uint256"
        },
        {
          components: [
            {
              internalType: "enum IMessages.MessageType",
              name: "messageType",
              type: "uint8"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256"
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes"
            },
            {
              internalType: "bool",
              name: "onAcceptance",
              type: "bool"
            }
          ],
          internalType: "struct IMessages.SubmittedMessage[]",
          name: "_messages",
          type: "tuple[]"
        },
        {
          internalType: "bytes",
          name: "_vrfProof",
          type: "bytes"
        }
      ],
      name: "proposeReceipt",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "callerConfirmation",
          type: "address"
        }
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "_voteHash",
          type: "bytes32"
        },
        {
          internalType: "enum ITribunalAppeal.TribunalVoteType",
          name: "_voteType",
          type: "uint8"
        },
        {
          internalType: "uint256",
          name: "_nonce",
          type: "uint256"
        }
      ],
      name: "revealTribunalAppealVote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "_voteHash",
          type: "bytes32"
        },
        {
          internalType: "enum ITransactions.VoteType",
          name: "_voteType",
          type: "uint8"
        },
        {
          internalType: "uint256",
          name: "_nonce",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_validatorIndex",
          type: "uint256"
        }
      ],
      name: "revealVote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_ghostFactory",
          type: "address"
        },
        {
          internalType: "address",
          name: "_genManager",
          type: "address"
        },
        {
          internalType: "address",
          name: "_genTransactions",
          type: "address"
        },
        {
          internalType: "address",
          name: "_genQueue",
          type: "address"
        },
        {
          internalType: "address",
          name: "_genStaking",
          type: "address"
        },
        {
          internalType: "address",
          name: "_genMessages",
          type: "address"
        },
        {
          internalType: "address",
          name: "_idleness",
          type: "address"
        },
        {
          internalType: "address",
          name: "_tribunalAppeal",
          type: "address"
        }
      ],
      name: "setExternalContracts",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        }
      ],
      name: "submitAppeal",
      outputs: [],
      stateMutability: "payable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        }
      ],
      name: "submitSlashAppeal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4"
        }
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  bytecode: ""
};
var CONSENSUS_DATA_CONTRACT2 = {
  address: "0x88B0F18613Db92Bf970FfE264E02496e20a74D16",
  abi: [
    {
      inputs: [],
      name: "AccessControlBadConfirmation",
      type: "error"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          internalType: "bytes32",
          name: "neededRole",
          type: "bytes32"
        }
      ],
      name: "AccessControlUnauthorizedAccount",
      type: "error"
    },
    {
      inputs: [],
      name: "InvalidInitialization",
      type: "error"
    },
    {
      inputs: [],
      name: "NotInitializing",
      type: "error"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address"
        }
      ],
      name: "OwnableInvalidOwner",
      type: "error"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error"
    },
    {
      inputs: [],
      name: "ReentrancyGuardReentrantCall",
      type: "error"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint64",
          name: "version",
          type: "uint64"
        }
      ],
      name: "Initialized",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnershipTransferStarted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnershipTransferred",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32"
        }
      ],
      name: "RoleAdminChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address"
        }
      ],
      name: "RoleGranted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address"
        }
      ],
      name: "RoleRevoked",
      type: "event"
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "acceptOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_txId",
          type: "bytes32"
        },
        {
          internalType: "uint256",
          name: "_currentTimestamp",
          type: "uint256"
        }
      ],
      name: "canFinalize",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "consensusMain",
      outputs: [
        {
          internalType: "contract IConsensusMain",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        }
      ],
      name: "getLastAppealResult",
      outputs: [
        {
          internalType: "enum ITransactions.ResultType",
          name: "",
          type: "uint8"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        }
      ],
      name: "getLatestAcceptedTransaction",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "currentTimestamp",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "sender",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "numOfInitialValidators",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "txSlot",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "createdTimestamp",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "lastVoteTimestamp",
              type: "uint256"
            },
            {
              internalType: "bytes32",
              name: "randomSeed",
              type: "bytes32"
            },
            {
              internalType: "enum ITransactions.ResultType",
              name: "result",
              type: "uint8"
            },
            {
              internalType: "bytes",
              name: "txData",
              type: "bytes"
            },
            {
              internalType: "bytes",
              name: "txReceipt",
              type: "bytes"
            },
            {
              components: [
                {
                  internalType: "enum IMessages.MessageType",
                  name: "messageType",
                  type: "uint8"
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address"
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256"
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes"
                },
                {
                  internalType: "bool",
                  name: "onAcceptance",
                  type: "bool"
                }
              ],
              internalType: "struct IMessages.SubmittedMessage[]",
              name: "messages",
              type: "tuple[]"
            },
            {
              internalType: "enum IQueues.QueueType",
              name: "queueType",
              type: "uint8"
            },
            {
              internalType: "uint256",
              name: "queuePosition",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "activator",
              type: "address"
            },
            {
              internalType: "address",
              name: "lastLeader",
              type: "address"
            },
            {
              internalType: "enum ITransactions.TransactionStatus",
              name: "status",
              type: "uint8"
            },
            {
              internalType: "bytes32",
              name: "txId",
              type: "bytes32"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "activationBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "processingBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "proposalBlock",
                  type: "uint256"
                }
              ],
              internalType: "struct ITransactions.ReadStateBlockRange",
              name: "readStateBlockRange",
              type: "tuple"
            },
            {
              internalType: "uint256",
              name: "numOfRounds",
              type: "uint256"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "round",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "leaderIndex",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesCommitted",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesRevealed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "appealBond",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "rotationsLeft",
                  type: "uint256"
                },
                {
                  internalType: "enum ITransactions.ResultType",
                  name: "result",
                  type: "uint8"
                },
                {
                  internalType: "address[]",
                  name: "roundValidators",
                  type: "address[]"
                },
                {
                  internalType: "bytes32[]",
                  name: "validatorVotesHash",
                  type: "bytes32[]"
                },
                {
                  internalType: "enum ITransactions.VoteType[]",
                  name: "validatorVotes",
                  type: "uint8[]"
                }
              ],
              internalType: "struct ITransactions.RoundData",
              name: "lastRound",
              type: "tuple"
            }
          ],
          internalType: "struct ConsensusData.TransactionData",
          name: "txData",
          type: "tuple"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "startIndex",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "pageSize",
          type: "uint256"
        }
      ],
      name: "getLatestAcceptedTransactions",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "currentTimestamp",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "sender",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "numOfInitialValidators",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "txSlot",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "createdTimestamp",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "lastVoteTimestamp",
              type: "uint256"
            },
            {
              internalType: "bytes32",
              name: "randomSeed",
              type: "bytes32"
            },
            {
              internalType: "enum ITransactions.ResultType",
              name: "result",
              type: "uint8"
            },
            {
              internalType: "bytes",
              name: "txData",
              type: "bytes"
            },
            {
              internalType: "bytes",
              name: "txReceipt",
              type: "bytes"
            },
            {
              components: [
                {
                  internalType: "enum IMessages.MessageType",
                  name: "messageType",
                  type: "uint8"
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address"
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256"
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes"
                },
                {
                  internalType: "bool",
                  name: "onAcceptance",
                  type: "bool"
                }
              ],
              internalType: "struct IMessages.SubmittedMessage[]",
              name: "messages",
              type: "tuple[]"
            },
            {
              internalType: "enum IQueues.QueueType",
              name: "queueType",
              type: "uint8"
            },
            {
              internalType: "uint256",
              name: "queuePosition",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "activator",
              type: "address"
            },
            {
              internalType: "address",
              name: "lastLeader",
              type: "address"
            },
            {
              internalType: "enum ITransactions.TransactionStatus",
              name: "status",
              type: "uint8"
            },
            {
              internalType: "bytes32",
              name: "txId",
              type: "bytes32"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "activationBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "processingBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "proposalBlock",
                  type: "uint256"
                }
              ],
              internalType: "struct ITransactions.ReadStateBlockRange",
              name: "readStateBlockRange",
              type: "tuple"
            },
            {
              internalType: "uint256",
              name: "numOfRounds",
              type: "uint256"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "round",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "leaderIndex",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesCommitted",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesRevealed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "appealBond",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "rotationsLeft",
                  type: "uint256"
                },
                {
                  internalType: "enum ITransactions.ResultType",
                  name: "result",
                  type: "uint8"
                },
                {
                  internalType: "address[]",
                  name: "roundValidators",
                  type: "address[]"
                },
                {
                  internalType: "bytes32[]",
                  name: "validatorVotesHash",
                  type: "bytes32[]"
                },
                {
                  internalType: "enum ITransactions.VoteType[]",
                  name: "validatorVotes",
                  type: "uint8[]"
                }
              ],
              internalType: "struct ITransactions.RoundData",
              name: "lastRound",
              type: "tuple"
            }
          ],
          internalType: "struct ConsensusData.TransactionData[]",
          name: "",
          type: "tuple[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        }
      ],
      name: "getLatestAcceptedTxCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        }
      ],
      name: "getLatestFinalizedTransaction",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "currentTimestamp",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "sender",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "numOfInitialValidators",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "txSlot",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "createdTimestamp",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "lastVoteTimestamp",
              type: "uint256"
            },
            {
              internalType: "bytes32",
              name: "randomSeed",
              type: "bytes32"
            },
            {
              internalType: "enum ITransactions.ResultType",
              name: "result",
              type: "uint8"
            },
            {
              internalType: "bytes",
              name: "txData",
              type: "bytes"
            },
            {
              internalType: "bytes",
              name: "txReceipt",
              type: "bytes"
            },
            {
              components: [
                {
                  internalType: "enum IMessages.MessageType",
                  name: "messageType",
                  type: "uint8"
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address"
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256"
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes"
                },
                {
                  internalType: "bool",
                  name: "onAcceptance",
                  type: "bool"
                }
              ],
              internalType: "struct IMessages.SubmittedMessage[]",
              name: "messages",
              type: "tuple[]"
            },
            {
              internalType: "enum IQueues.QueueType",
              name: "queueType",
              type: "uint8"
            },
            {
              internalType: "uint256",
              name: "queuePosition",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "activator",
              type: "address"
            },
            {
              internalType: "address",
              name: "lastLeader",
              type: "address"
            },
            {
              internalType: "enum ITransactions.TransactionStatus",
              name: "status",
              type: "uint8"
            },
            {
              internalType: "bytes32",
              name: "txId",
              type: "bytes32"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "activationBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "processingBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "proposalBlock",
                  type: "uint256"
                }
              ],
              internalType: "struct ITransactions.ReadStateBlockRange",
              name: "readStateBlockRange",
              type: "tuple"
            },
            {
              internalType: "uint256",
              name: "numOfRounds",
              type: "uint256"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "round",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "leaderIndex",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesCommitted",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesRevealed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "appealBond",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "rotationsLeft",
                  type: "uint256"
                },
                {
                  internalType: "enum ITransactions.ResultType",
                  name: "result",
                  type: "uint8"
                },
                {
                  internalType: "address[]",
                  name: "roundValidators",
                  type: "address[]"
                },
                {
                  internalType: "bytes32[]",
                  name: "validatorVotesHash",
                  type: "bytes32[]"
                },
                {
                  internalType: "enum ITransactions.VoteType[]",
                  name: "validatorVotes",
                  type: "uint8[]"
                }
              ],
              internalType: "struct ITransactions.RoundData",
              name: "lastRound",
              type: "tuple"
            }
          ],
          internalType: "struct ConsensusData.TransactionData",
          name: "txData",
          type: "tuple"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "startIndex",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "pageSize",
          type: "uint256"
        }
      ],
      name: "getLatestFinalizedTransactions",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "currentTimestamp",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "sender",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "numOfInitialValidators",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "txSlot",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "createdTimestamp",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "lastVoteTimestamp",
              type: "uint256"
            },
            {
              internalType: "bytes32",
              name: "randomSeed",
              type: "bytes32"
            },
            {
              internalType: "enum ITransactions.ResultType",
              name: "result",
              type: "uint8"
            },
            {
              internalType: "bytes",
              name: "txData",
              type: "bytes"
            },
            {
              internalType: "bytes",
              name: "txReceipt",
              type: "bytes"
            },
            {
              components: [
                {
                  internalType: "enum IMessages.MessageType",
                  name: "messageType",
                  type: "uint8"
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address"
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256"
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes"
                },
                {
                  internalType: "bool",
                  name: "onAcceptance",
                  type: "bool"
                }
              ],
              internalType: "struct IMessages.SubmittedMessage[]",
              name: "messages",
              type: "tuple[]"
            },
            {
              internalType: "enum IQueues.QueueType",
              name: "queueType",
              type: "uint8"
            },
            {
              internalType: "uint256",
              name: "queuePosition",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "activator",
              type: "address"
            },
            {
              internalType: "address",
              name: "lastLeader",
              type: "address"
            },
            {
              internalType: "enum ITransactions.TransactionStatus",
              name: "status",
              type: "uint8"
            },
            {
              internalType: "bytes32",
              name: "txId",
              type: "bytes32"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "activationBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "processingBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "proposalBlock",
                  type: "uint256"
                }
              ],
              internalType: "struct ITransactions.ReadStateBlockRange",
              name: "readStateBlockRange",
              type: "tuple"
            },
            {
              internalType: "uint256",
              name: "numOfRounds",
              type: "uint256"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "round",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "leaderIndex",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesCommitted",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesRevealed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "appealBond",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "rotationsLeft",
                  type: "uint256"
                },
                {
                  internalType: "enum ITransactions.ResultType",
                  name: "result",
                  type: "uint8"
                },
                {
                  internalType: "address[]",
                  name: "roundValidators",
                  type: "address[]"
                },
                {
                  internalType: "bytes32[]",
                  name: "validatorVotesHash",
                  type: "bytes32[]"
                },
                {
                  internalType: "enum ITransactions.VoteType[]",
                  name: "validatorVotes",
                  type: "uint8[]"
                }
              ],
              internalType: "struct ITransactions.RoundData",
              name: "lastRound",
              type: "tuple"
            }
          ],
          internalType: "struct ConsensusData.TransactionData[]",
          name: "",
          type: "tuple[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        }
      ],
      name: "getLatestFinalizedTxCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        }
      ],
      name: "getLatestPendingTxCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "slot",
          type: "uint256"
        }
      ],
      name: "getLatestPendingTxId",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        }
      ],
      name: "getLatestUndeterminedTransaction",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "currentTimestamp",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "sender",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "numOfInitialValidators",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "txSlot",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "createdTimestamp",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "lastVoteTimestamp",
              type: "uint256"
            },
            {
              internalType: "bytes32",
              name: "randomSeed",
              type: "bytes32"
            },
            {
              internalType: "enum ITransactions.ResultType",
              name: "result",
              type: "uint8"
            },
            {
              internalType: "bytes",
              name: "txData",
              type: "bytes"
            },
            {
              internalType: "bytes",
              name: "txReceipt",
              type: "bytes"
            },
            {
              components: [
                {
                  internalType: "enum IMessages.MessageType",
                  name: "messageType",
                  type: "uint8"
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address"
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256"
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes"
                },
                {
                  internalType: "bool",
                  name: "onAcceptance",
                  type: "bool"
                }
              ],
              internalType: "struct IMessages.SubmittedMessage[]",
              name: "messages",
              type: "tuple[]"
            },
            {
              internalType: "enum IQueues.QueueType",
              name: "queueType",
              type: "uint8"
            },
            {
              internalType: "uint256",
              name: "queuePosition",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "activator",
              type: "address"
            },
            {
              internalType: "address",
              name: "lastLeader",
              type: "address"
            },
            {
              internalType: "enum ITransactions.TransactionStatus",
              name: "status",
              type: "uint8"
            },
            {
              internalType: "bytes32",
              name: "txId",
              type: "bytes32"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "activationBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "processingBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "proposalBlock",
                  type: "uint256"
                }
              ],
              internalType: "struct ITransactions.ReadStateBlockRange",
              name: "readStateBlockRange",
              type: "tuple"
            },
            {
              internalType: "uint256",
              name: "numOfRounds",
              type: "uint256"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "round",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "leaderIndex",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesCommitted",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesRevealed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "appealBond",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "rotationsLeft",
                  type: "uint256"
                },
                {
                  internalType: "enum ITransactions.ResultType",
                  name: "result",
                  type: "uint8"
                },
                {
                  internalType: "address[]",
                  name: "roundValidators",
                  type: "address[]"
                },
                {
                  internalType: "bytes32[]",
                  name: "validatorVotesHash",
                  type: "bytes32[]"
                },
                {
                  internalType: "enum ITransactions.VoteType[]",
                  name: "validatorVotes",
                  type: "uint8[]"
                }
              ],
              internalType: "struct ITransactions.RoundData",
              name: "lastRound",
              type: "tuple"
            }
          ],
          internalType: "struct ConsensusData.TransactionData",
          name: "txData",
          type: "tuple"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        }
      ],
      name: "getLatestUndeterminedTxCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        }
      ],
      name: "getMessagesForTransaction",
      outputs: [
        {
          components: [
            {
              internalType: "enum IMessages.MessageType",
              name: "messageType",
              type: "uint8"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256"
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes"
            },
            {
              internalType: "bool",
              name: "onAcceptance",
              type: "bool"
            }
          ],
          internalType: "struct IMessages.SubmittedMessage[]",
          name: "",
          type: "tuple[]"
        },
        {
          internalType: "address",
          name: "ghostAddress",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        }
      ],
      name: "getReadStateBlockRangeForTransaction",
      outputs: [
        {
          internalType: "uint256",
          name: "activationBlock",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "processingBlock",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "proposalBlock",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "startIndex",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "endIndex",
          type: "uint256"
        }
      ],
      name: "getRecipientQueues",
      outputs: [
        {
          components: [
            {
              components: [
                {
                  internalType: "uint256",
                  name: "head",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "tail",
                  type: "uint256"
                },
                {
                  internalType: "bytes32[]",
                  name: "txIds",
                  type: "bytes32[]"
                }
              ],
              internalType: "struct IQueues.QueueInfoView",
              name: "pending",
              type: "tuple"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "head",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "tail",
                  type: "uint256"
                },
                {
                  internalType: "bytes32[]",
                  name: "txIds",
                  type: "bytes32[]"
                }
              ],
              internalType: "struct IQueues.QueueInfoView",
              name: "accepted",
              type: "tuple"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "head",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "tail",
                  type: "uint256"
                },
                {
                  internalType: "bytes32[]",
                  name: "txIds",
                  type: "bytes32[]"
                }
              ],
              internalType: "struct IQueues.QueueInfoView",
              name: "undetermined",
              type: "tuple"
            },
            {
              internalType: "uint256",
              name: "finalizedCount",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "issuedTxCount",
              type: "uint256"
            }
          ],
          internalType: "struct IQueues.RecipientQueuesView",
          name: "",
          type: "tuple"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        }
      ],
      name: "getRoleAdmin",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "getTotalNumOfTransactions",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        }
      ],
      name: "getTransactionAllData",
      outputs: [
        {
          components: [
            {
              internalType: "bytes32",
              name: "id",
              type: "bytes32"
            },
            {
              internalType: "address",
              name: "sender",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "numOfInitialValidators",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "txSlot",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "activator",
              type: "address"
            },
            {
              internalType: "enum ITransactions.TransactionStatus",
              name: "status",
              type: "uint8"
            },
            {
              internalType: "enum ITransactions.TransactionStatus",
              name: "previousStatus",
              type: "uint8"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "created",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "pending",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "activated",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "proposed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "committed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "lastVote",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "appealSubmitted",
                  type: "uint256"
                }
              ],
              internalType: "struct ITransactions.Timestamps",
              name: "timestamps",
              type: "tuple"
            },
            {
              internalType: "bytes32",
              name: "randomSeed",
              type: "bytes32"
            },
            {
              internalType: "bool",
              name: "onAcceptanceMessages",
              type: "bool"
            },
            {
              internalType: "enum ITransactions.ResultType",
              name: "result",
              type: "uint8"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "activationBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "processingBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "proposalBlock",
                  type: "uint256"
                }
              ],
              internalType: "struct ITransactions.ReadStateBlockRange",
              name: "readStateBlockRange",
              type: "tuple"
            },
            {
              internalType: "bytes",
              name: "txData",
              type: "bytes"
            },
            {
              internalType: "bytes",
              name: "txReceipt",
              type: "bytes"
            },
            {
              components: [
                {
                  internalType: "enum IMessages.MessageType",
                  name: "messageType",
                  type: "uint8"
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address"
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256"
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes"
                },
                {
                  internalType: "bool",
                  name: "onAcceptance",
                  type: "bool"
                }
              ],
              internalType: "struct IMessages.SubmittedMessage[]",
              name: "messages",
              type: "tuple[]"
            },
            {
              internalType: "address[]",
              name: "consumedValidators",
              type: "address[]"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "round",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "leaderIndex",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesCommitted",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesRevealed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "appealBond",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "rotationsLeft",
                  type: "uint256"
                },
                {
                  internalType: "enum ITransactions.ResultType",
                  name: "result",
                  type: "uint8"
                },
                {
                  internalType: "address[]",
                  name: "roundValidators",
                  type: "address[]"
                },
                {
                  internalType: "bytes32[]",
                  name: "validatorVotesHash",
                  type: "bytes32[]"
                },
                {
                  internalType: "enum ITransactions.VoteType[]",
                  name: "validatorVotes",
                  type: "uint8[]"
                }
              ],
              internalType: "struct ITransactions.RoundData[]",
              name: "roundData",
              type: "tuple[]"
            }
          ],
          internalType: "struct ITransactions.Transaction",
          name: "transaction",
          type: "tuple"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        },
        {
          internalType: "uint256",
          name: "_timestamp",
          type: "uint256"
        }
      ],
      name: "getTransactionData",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "currentTimestamp",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "sender",
              type: "address"
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "numOfInitialValidators",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "txSlot",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "createdTimestamp",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "lastVoteTimestamp",
              type: "uint256"
            },
            {
              internalType: "bytes32",
              name: "randomSeed",
              type: "bytes32"
            },
            {
              internalType: "enum ITransactions.ResultType",
              name: "result",
              type: "uint8"
            },
            {
              internalType: "bytes",
              name: "txData",
              type: "bytes"
            },
            {
              internalType: "bytes",
              name: "txReceipt",
              type: "bytes"
            },
            {
              components: [
                {
                  internalType: "enum IMessages.MessageType",
                  name: "messageType",
                  type: "uint8"
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address"
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256"
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes"
                },
                {
                  internalType: "bool",
                  name: "onAcceptance",
                  type: "bool"
                }
              ],
              internalType: "struct IMessages.SubmittedMessage[]",
              name: "messages",
              type: "tuple[]"
            },
            {
              internalType: "enum IQueues.QueueType",
              name: "queueType",
              type: "uint8"
            },
            {
              internalType: "uint256",
              name: "queuePosition",
              type: "uint256"
            },
            {
              internalType: "address",
              name: "activator",
              type: "address"
            },
            {
              internalType: "address",
              name: "lastLeader",
              type: "address"
            },
            {
              internalType: "enum ITransactions.TransactionStatus",
              name: "status",
              type: "uint8"
            },
            {
              internalType: "bytes32",
              name: "txId",
              type: "bytes32"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "activationBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "processingBlock",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "proposalBlock",
                  type: "uint256"
                }
              ],
              internalType: "struct ITransactions.ReadStateBlockRange",
              name: "readStateBlockRange",
              type: "tuple"
            },
            {
              internalType: "uint256",
              name: "numOfRounds",
              type: "uint256"
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "round",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "leaderIndex",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesCommitted",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "votesRevealed",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "appealBond",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "rotationsLeft",
                  type: "uint256"
                },
                {
                  internalType: "enum ITransactions.ResultType",
                  name: "result",
                  type: "uint8"
                },
                {
                  internalType: "address[]",
                  name: "roundValidators",
                  type: "address[]"
                },
                {
                  internalType: "bytes32[]",
                  name: "validatorVotesHash",
                  type: "bytes32[]"
                },
                {
                  internalType: "enum ITransactions.VoteType[]",
                  name: "validatorVotes",
                  type: "uint8[]"
                }
              ],
              internalType: "struct ITransactions.RoundData",
              name: "lastRound",
              type: "tuple"
            }
          ],
          internalType: "struct ConsensusData.TransactionData",
          name: "",
          type: "tuple"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "startIndex",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "endIndex",
          type: "uint256"
        }
      ],
      name: "getTransactionIndexToTxId",
      outputs: [
        {
          internalType: "bytes32[]",
          name: "",
          type: "bytes32[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        },
        {
          internalType: "uint256",
          name: "_timestamp",
          type: "uint256"
        }
      ],
      name: "getTransactionStatus",
      outputs: [
        {
          internalType: "enum ITransactions.TransactionStatus",
          name: "",
          type: "uint8"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        }
      ],
      name: "getValidatorsForLastAppeal",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        }
      ],
      name: "getValidatorsForLastRound",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "hasRole",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        }
      ],
      name: "hasTransactionOnAcceptanceMessages",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_tx_id",
          type: "bytes32"
        }
      ],
      name: "hasTransactionOnFinalizationMessages",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_consensusMain",
          type: "address"
        },
        {
          internalType: "address",
          name: "_transactions",
          type: "address"
        },
        {
          internalType: "address",
          name: "_queues",
          type: "address"
        }
      ],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "pendingOwner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "queues",
      outputs: [
        {
          internalType: "contract IQueues",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "callerConfirmation",
          type: "address"
        }
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "account",
          type: "address"
        }
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_consensusMain",
          type: "address"
        }
      ],
      name: "setConsensusMain",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_queues",
          type: "address"
        }
      ],
      name: "setQueues",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_transactions",
          type: "address"
        }
      ],
      name: "setTransactions",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4"
        }
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "transactions",
      outputs: [
        {
          internalType: "contract ITransactions",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  bytecode: ""
};
var studionet = _viem.defineChain.call(void 0, {
  id: 61999,
  isStudio: true,
  name: "Genlayer Studio Network",
  rpcUrls: {
    default: {
      http: [SIMULATOR_JSON_RPC_URL2]
    }
  },
  nativeCurrency: {
    name: "GEN Token",
    symbol: "GEN",
    decimals: 18
  },
  blockExplorers: {
    default: {
      name: "GenLayer Explorer",
      url: EXPLORER_URL
    }
  },
  testnet: true,
  consensusMainContract: CONSENSUS_MAIN_CONTRACT2,
  consensusDataContract: CONSENSUS_DATA_CONTRACT2,
  stakingContract: null,
  feeManagerContract: null,
  roundsStorageContract: null,
  appealsContract: null,
  defaultNumberOfInitialValidators: 5,
  defaultConsensusMaxRotations: 3
});

// src/chains/testnetAsimov.ts


// src/abi/staking.ts
var VALIDATOR_WALLET_ABI = [
  // Custom errors
  { name: "NotOperator", type: "error", inputs: [] },
  { name: "InvalidAddress", type: "error", inputs: [] },
  { name: "TransferFailed", type: "error", inputs: [] },
  { name: "OperatorTransferNotReady", type: "error", inputs: [] },
  { name: "NoPendingOperator", type: "error", inputs: [] },
  // OpenZeppelin Ownable errors
  { name: "OwnableUnauthorizedAccount", type: "error", inputs: [{ name: "account", type: "address" }] },
  { name: "OwnableInvalidOwner", type: "error", inputs: [{ name: "owner", type: "address" }] },
  // Functions
  {
    name: "operator",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }]
  },
  {
    name: "owner",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }]
  },
  {
    name: "getIdentity",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "moniker", type: "string" },
          { name: "logoUri", type: "string" },
          { name: "website", type: "string" },
          { name: "description", type: "string" },
          { name: "email", type: "string" },
          { name: "twitter", type: "string" },
          { name: "telegram", type: "string" },
          { name: "github", type: "string" },
          { name: "extraCid", type: "bytes" }
        ]
      }
    ]
  },
  {
    name: "setOperator",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_operator", type: "address" }],
    outputs: []
  },
  {
    name: "setIdentity",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "moniker", type: "string" },
      { name: "logoUri", type: "string" },
      { name: "website", type: "string" },
      { name: "description", type: "string" },
      { name: "email", type: "string" },
      { name: "twitter", type: "string" },
      { name: "telegram", type: "string" },
      { name: "github", type: "string" },
      { name: "extraCid", type: "bytes" }
    ],
    outputs: []
  },
  // Staking functions (forwarded to staking contract)
  {
    name: "validatorDeposit",
    type: "function",
    stateMutability: "payable",
    inputs: [],
    outputs: []
  },
  {
    name: "validatorExit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_shares", type: "uint256" }],
    outputs: []
  },
  {
    name: "validatorClaim",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: []
  },
  // Two-step operator transfer
  {
    name: "initiateOperatorTransfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_newOperator", type: "address" }],
    outputs: []
  },
  {
    name: "completeOperatorTransfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: []
  },
  {
    name: "cancelOperatorTransfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: []
  },
  {
    name: "getPendingOperator",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "", type: "address" },
      { name: "", type: "uint256" }
    ]
  },
  {
    name: "getOperator",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }]
  }
];
var STAKING_ABI = [
  // Custom errors from IGenLayerStaking
  { name: "BurnTransferFailed", type: "error", inputs: [] },
  { name: "DeepthoughtCallFailed", type: "error", inputs: [] },
  { name: "DelegatorBelowMinimumStake", type: "error", inputs: [] },
  { name: "DelegatorExitExceedsShares", type: "error", inputs: [] },
  { name: "DelegatorExitWouldBeBelowMinimum", type: "error", inputs: [] },
  { name: "DelegatorMayNotJoinTwoValidatorsSimultaneously", type: "error", inputs: [] },
  { name: "DelegatorMayNotJoinWithZeroValue", type: "error", inputs: [] },
  { name: "DelegatorMustExitAllWhenBelowMinimum", type: "error", inputs: [] },
  { name: "EpochAdvanceNotReady", type: "error", inputs: [] },
  { name: "EpochAlreadyFinalized", type: "error", inputs: [] },
  { name: "EpochNotFinalized", type: "error", inputs: [] },
  { name: "EpochNotFinished", type: "error", inputs: [] },
  { name: "FailedTransfer", type: "error", inputs: [{ name: "validator", type: "address" }] },
  { name: "InflationAlreadyInitialized", type: "error", inputs: [] },
  { name: "InflationAlreadyReceived", type: "error", inputs: [] },
  { name: "InflationInvalidAmount", type: "error", inputs: [] },
  { name: "InsufficientInflationFunds", type: "error", inputs: [] },
  { name: "InvalidAtEpoch", type: "error", inputs: [] },
  { name: "InvalidOperatorAddress", type: "error", inputs: [] },
  { name: "MaxNumberOfValidatorsReached", type: "error", inputs: [] },
  { name: "MaxValidatorsCannotBeZero", type: "error", inputs: [] },
  { name: "NFTMinterCallFailed", type: "error", inputs: [] },
  { name: "NFTMinterNotConfigured", type: "error", inputs: [] },
  { name: "NoBurning", type: "error", inputs: [] },
  { name: "NumberOfValidatorsExceedsAvailable", type: "error", inputs: [] },
  { name: "OnlyGEN", type: "error", inputs: [] },
  { name: "OnlyIdleness", type: "error", inputs: [] },
  { name: "OnlyIdlenessOrTribunal", type: "error", inputs: [] },
  { name: "OnlyTransactions", type: "error", inputs: [] },
  { name: "OnlyTransactionsOrTribunal", type: "error", inputs: [] },
  { name: "OnlyTribunal", type: "error", inputs: [] },
  { name: "OperatorAlreadyAssigned", type: "error", inputs: [] },
  { name: "PendingTribunals", type: "error", inputs: [{ name: "epoch", type: "uint256" }] },
  { name: "PreviousEpochNotFinalizable", type: "error", inputs: [] },
  { name: "ReductionFactorCannotBeZero", type: "error", inputs: [] },
  { name: "ValidatorAlreadyJoined", type: "error", inputs: [] },
  { name: "ValidatorBelowMinimumStake", type: "error", inputs: [] },
  { name: "ValidatorExitExceedsShares", type: "error", inputs: [] },
  { name: "ValidatorMayNotBeDelegator", type: "error", inputs: [] },
  { name: "ValidatorMayNotDepositZeroValue", type: "error", inputs: [] },
  { name: "ValidatorMayNotJoinWithZeroValue", type: "error", inputs: [] },
  { name: "ValidatorMustNotBeDelegator", type: "error", inputs: [] },
  { name: "ValidatorNotActive", type: "error", inputs: [] },
  { name: "ValidatorNotJoined", type: "error", inputs: [] },
  { name: "ValidatorWithdrawalExceedsStake", type: "error", inputs: [] },
  { name: "ValidatorsConsumed", type: "error", inputs: [] },
  { name: "ValidatorsUnavailable", type: "error", inputs: [] },
  // Events
  {
    name: "AllValidatorBansRemoved",
    type: "event",
    inputs: []
  },
  {
    name: "BurnFailed",
    type: "event",
    inputs: [
      { name: "amount", type: "uint256", indexed: false }
    ]
  },
  {
    name: "BurnToL1",
    type: "event",
    inputs: [
      { name: "amount", type: "uint256", indexed: false }
    ]
  },
  {
    name: "DelegatorClaim",
    type: "event",
    inputs: [
      { name: "delegator", type: "address", indexed: false },
      { name: "amount", type: "uint256", indexed: false }
    ]
  },
  {
    name: "DelegatorExit",
    type: "event",
    inputs: [
      { name: "validator", type: "address", indexed: false },
      { name: "delegator", type: "address", indexed: false },
      { name: "amount", type: "uint256", indexed: false }
    ]
  },
  {
    name: "DelegatorJoin",
    type: "event",
    inputs: [
      { name: "validator", type: "address", indexed: false },
      { name: "delegator", type: "address", indexed: false },
      { name: "amount", type: "uint256", indexed: false }
    ]
  },
  {
    name: "EpochAdvance",
    type: "event",
    inputs: [
      { name: "epoch", type: "uint256", indexed: false }
    ]
  },
  {
    name: "EpochFinalize",
    type: "event",
    inputs: [
      { name: "epoch", type: "uint256", indexed: false }
    ]
  },
  {
    name: "EpochHasPendingTribunals",
    type: "event",
    inputs: [
      { name: "epoch", type: "uint256", indexed: false }
    ]
  },
  {
    name: "EpochZeroEnded",
    type: "event",
    inputs: [
      { name: "timestamp", type: "uint256", indexed: false }
    ]
  },
  {
    name: "FeesReceived",
    type: "event",
    inputs: [
      { name: "sender", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false }
    ]
  },
  {
    name: "InflationInitiated",
    type: "event",
    inputs: [
      { name: "timestamp", type: "uint256", indexed: false }
    ]
  },
  {
    name: "InflationReceived",
    type: "event",
    inputs: [
      { name: "amount", type: "uint256", indexed: false },
      { name: "epoch", type: "uint256", indexed: false }
    ]
  },
  {
    name: "QuarantinesCleanedUp",
    type: "event",
    inputs: [
      { name: "startIndex", type: "uint256", indexed: false },
      { name: "processedCount", type: "uint256", indexed: false },
      { name: "nextIndex", type: "uint256", indexed: false }
    ]
  },
  {
    name: "SetDeepthought",
    type: "event",
    inputs: [
      { name: "deepthought", type: "address", indexed: false }
    ]
  },
  {
    name: "SetDelegatorMinimumStake",
    type: "event",
    inputs: [
      { name: "delegatorMinStake", type: "uint256", indexed: false }
    ]
  },
  {
    name: "SetEpochMinDuration",
    type: "event",
    inputs: [
      { name: "epochMinDuration", type: "uint256", indexed: false }
    ]
  },
  {
    name: "SetEpochMinDurationThreshold",
    type: "event",
    inputs: [
      { name: "epochMinDurationThreshold", type: "uint256", indexed: false }
    ]
  },
  {
    name: "SetEpochZeroMinDuration",
    type: "event",
    inputs: [
      { name: "epochZeroMinDuration", type: "uint256", indexed: false }
    ]
  },
  {
    name: "SetGen",
    type: "event",
    inputs: [
      { name: "gen", type: "address", indexed: false }
    ]
  },
  {
    name: "SetMaxValidators",
    type: "event",
    inputs: [
      { name: "maxValidators", type: "uint256", indexed: false }
    ]
  },
  {
    name: "SetReductionFactor",
    type: "event",
    inputs: [
      { name: "reductionFactor", type: "uint256", indexed: false }
    ]
  },
  {
    name: "SetStakingInvariant",
    type: "event",
    inputs: [
      { name: "stakingInvariant", type: "address", indexed: false }
    ]
  },
  {
    name: "SetTransactionFeesManager",
    type: "event",
    inputs: [
      { name: "transactionFeesManager", type: "address", indexed: false }
    ]
  },
  {
    name: "SetUnbondingPeriods",
    type: "event",
    inputs: [
      { name: "delegatorUnbondingPeriod", type: "uint256", indexed: false },
      { name: "validatorUnbondingPeriod", type: "uint256", indexed: false }
    ]
  },
  {
    name: "SetValidatorMinimumStake",
    type: "event",
    inputs: [
      { name: "validatorMinStake", type: "uint256", indexed: false }
    ]
  },
  {
    name: "SetValidatorWeightParams",
    type: "event",
    inputs: [
      { name: "alpha", type: "uint256", indexed: false },
      { name: "beta", type: "uint256", indexed: false }
    ]
  },
  {
    name: "ValidatorBanRemoved",
    type: "event",
    inputs: [
      { name: "validator", type: "address", indexed: false }
    ]
  },
  {
    name: "ValidatorBannedDeterministic",
    type: "event",
    inputs: [
      { name: "validator", type: "address", indexed: false }
    ]
  },
  {
    name: "ValidatorBannedIdleness",
    type: "event",
    inputs: [
      { name: "validator", type: "address", indexed: false },
      { name: "bannedAt", type: "uint256", indexed: false },
      { name: "bannedUntil", type: "uint256", indexed: false }
    ]
  },
  {
    name: "ValidatorClaim",
    type: "event",
    inputs: [
      { name: "validator", type: "address", indexed: false },
      { name: "amount", type: "uint256", indexed: false }
    ]
  },
  {
    name: "ValidatorDeposit",
    type: "event",
    inputs: [
      { name: "validator", type: "address", indexed: false },
      { name: "amount", type: "uint256", indexed: false }
    ]
  },
  {
    name: "ValidatorExit",
    type: "event",
    inputs: [
      { name: "validator", type: "address", indexed: false },
      { name: "amount", type: "uint256", indexed: false }
    ]
  },
  {
    name: "ValidatorJoin",
    type: "event",
    inputs: [
      { name: "operator", type: "address", indexed: false },
      { name: "validator", type: "address", indexed: false },
      { name: "amount", type: "uint256", indexed: false }
    ]
  },
  {
    name: "ValidatorPrime",
    type: "event",
    inputs: [
      { name: "validator", type: "address", indexed: false },
      { name: "epoch", type: "uint256", indexed: false },
      { name: "validatorRewards", type: "uint256", indexed: false },
      { name: "delegatorRewards", type: "uint256", indexed: false },
      { name: "feeRewards", type: "uint256", indexed: false },
      { name: "feePenalties", type: "uint256", indexed: false }
    ]
  },
  {
    name: "ValidatorQuarantineRemoved",
    type: "event",
    inputs: [
      { name: "validator", type: "address", indexed: false }
    ]
  },
  {
    name: "ValidatorQuarantineRepealed",
    type: "event",
    inputs: [
      { name: "validator", type: "address", indexed: false }
    ]
  },
  {
    name: "ValidatorQuarantined",
    type: "event",
    inputs: [
      { name: "validator", type: "address", indexed: false },
      { name: "quarantinedAt", type: "uint256", indexed: false }
    ]
  },
  {
    name: "ValidatorSlash",
    type: "event",
    inputs: [
      { name: "validator", type: "address", indexed: false },
      { name: "validatorSlashing", type: "uint256", indexed: false },
      { name: "delegatorSlashing", type: "uint256", indexed: false },
      { name: "epoch", type: "uint256", indexed: false }
    ]
  },
  {
    name: "ValidatorsRegistered",
    type: "event",
    inputs: [
      { name: "count", type: "uint256", indexed: false }
    ]
  },
  // Functions
  {
    name: "activeValidators",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address[]" }]
  },
  {
    name: "activeValidatorsCount",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "activeWeights",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256[]" }]
  },
  {
    name: "adminRegisterValidators",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "validatorAddresses", type: "address[]" }],
    outputs: []
  },
  {
    name: "burning",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "canAdvance",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bool" }]
  },
  {
    name: "deepthoughtInflation",
    type: "function",
    stateMutability: "pure",
    inputs: [{ name: "_inflation", type: "uint256" }],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "delegatorClaim",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_delegator", type: "address" },
      { name: "_validator", type: "address" }
    ],
    outputs: []
  },
  {
    name: "delegatorDeposit",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_delegator", type: "address" },
      { name: "_validator", type: "address" },
      { name: "_index", type: "uint256" }
    ],
    outputs: [
      {
        name: "claim_",
        type: "tuple",
        components: [
          { name: "quantity", type: "uint256" },
          { name: "commit", type: "uint256" }
        ]
      },
      {
        name: "commit_",
        type: "tuple",
        components: [
          { name: "input", type: "uint256" },
          { name: "output", type: "uint256" },
          { name: "epoch", type: "uint256" },
          { name: "linkToNextCommit", type: "uint256" }
        ]
      }
    ]
  },
  {
    name: "delegatorDepositByEpoch",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_delegator", type: "address" },
      { name: "_validator", type: "address" },
      { name: "_epoch", type: "uint256" }
    ],
    outputs: [
      {
        name: "commit_",
        type: "tuple",
        components: [
          { name: "input", type: "uint256" },
          { name: "output", type: "uint256" },
          { name: "epoch", type: "uint256" },
          { name: "linkToNextCommit", type: "uint256" }
        ]
      }
    ]
  },
  {
    name: "delegatorDepositLen",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_delegator", type: "address" },
      { name: "_validator", type: "address" }
    ],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "delegatorExit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_validator", type: "address" },
      { name: "_amount", type: "uint256" }
    ],
    outputs: []
  },
  {
    name: "delegatorJoin",
    type: "function",
    stateMutability: "payable",
    inputs: [{ name: "_validator", type: "address" }],
    outputs: []
  },
  {
    name: "delegatorWithdrawal",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_delegator", type: "address" },
      { name: "_validator", type: "address" },
      { name: "_index", type: "uint256" }
    ],
    outputs: [
      {
        name: "claim_",
        type: "tuple",
        components: [
          { name: "quantity", type: "uint256" },
          { name: "commit", type: "uint256" }
        ]
      },
      {
        name: "commit_",
        type: "tuple",
        components: [
          { name: "input", type: "uint256" },
          { name: "output", type: "uint256" },
          { name: "epoch", type: "uint256" },
          { name: "linkToNextCommit", type: "uint256" }
        ]
      }
    ]
  },
  {
    name: "delegatorWithdrawalByEpoch",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_delegator", type: "address" },
      { name: "_validator", type: "address" },
      { name: "_epoch", type: "uint256" }
    ],
    outputs: [
      {
        name: "commit_",
        type: "tuple",
        components: [
          { name: "input", type: "uint256" },
          { name: "output", type: "uint256" },
          { name: "epoch", type: "uint256" },
          { name: "linkToNextCommit", type: "uint256" }
        ]
      }
    ]
  },
  {
    name: "delegatorWithdrawalLen",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_delegator", type: "address" },
      { name: "_validator", type: "address" }
    ],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "developerInflation",
    type: "function",
    stateMutability: "pure",
    inputs: [{ name: "_inflation", type: "uint256" }],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "epoch",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "epochAdvance",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: []
  },
  {
    name: "epochEven",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "start", type: "uint256" },
      { name: "end", type: "uint256" },
      { name: "inflation", type: "uint256" },
      { name: "weight", type: "uint256" },
      { name: "weightDeposit", type: "uint256" },
      { name: "weightWithdrawal", type: "uint256" },
      { name: "vcount", type: "uint256" },
      { name: "claimed", type: "uint256" },
      { name: "stakeDeposit", type: "uint256" },
      { name: "stakeWithdrawal", type: "uint256" },
      { name: "slashed", type: "uint256" }
    ]
  },
  {
    name: "epochFinalize",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: []
  },
  {
    name: "epochFinalizeImmediate",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: []
  },
  {
    name: "epochInflation",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_epoch", type: "uint256" }],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "epochMinDuration",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "epochOdd",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "start", type: "uint256" },
      { name: "end", type: "uint256" },
      { name: "inflation", type: "uint256" },
      { name: "weight", type: "uint256" },
      { name: "weightDeposit", type: "uint256" },
      { name: "weightWithdrawal", type: "uint256" },
      { name: "vcount", type: "uint256" },
      { name: "claimed", type: "uint256" },
      { name: "stakeDeposit", type: "uint256" },
      { name: "stakeWithdrawal", type: "uint256" },
      { name: "slashed", type: "uint256" }
    ]
  },
  {
    name: "epochZeroMinDuration",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "finalized",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "getActivatorForSeed",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_randomSeed", type: "bytes32" },
      { name: "_txCreatedTimestamp", type: "uint256" }
    ],
    outputs: [{ name: "", type: "address" }]
  },
  {
    name: "getAllBannedValidators",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_startIndex", type: "uint256" },
      { name: "_size", type: "uint256" }
    ],
    outputs: [
      {
        name: "validatorList",
        type: "tuple[]",
        components: [
          { name: "validator", type: "address" },
          { name: "untilEpochBanned", type: "uint256" },
          { name: "permanentlyBanned", type: "bool" }
        ]
      }
    ]
  },
  {
    name: "getAllBannedValidatorsForEpoch",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_epoch", type: "uint256" },
      { name: "_startIndex", type: "uint256" },
      { name: "_size", type: "uint256" }
    ],
    outputs: [
      {
        name: "validatorList",
        type: "tuple[]",
        components: [
          { name: "validator", type: "address" },
          { name: "untilEpochBanned", type: "uint256" },
          { name: "permanentlyBanned", type: "bool" }
        ]
      }
    ]
  },
  {
    name: "getAllQuarantinedValidators",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_startIndex", type: "uint256" },
      { name: "_size", type: "uint256" }
    ],
    outputs: [
      {
        name: "validatorList",
        type: "tuple[]",
        components: [
          { name: "validator", type: "address" },
          { name: "untilEpochBanned", type: "uint256" },
          { name: "permanentlyBanned", type: "bool" }
        ]
      }
    ]
  },
  {
    name: "getAllQuarantinedValidatorsForEpoch",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_epoch", type: "uint256" },
      { name: "_startIndex", type: "uint256" },
      { name: "_size", type: "uint256" }
    ],
    outputs: [
      {
        name: "validatorList",
        type: "tuple[]",
        components: [
          { name: "validator", type: "address" },
          { name: "untilEpochBanned", type: "uint256" },
          { name: "permanentlyBanned", type: "bool" }
        ]
      }
    ]
  },
  {
    name: "getPendingDelegatorDeposits",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_delegator", type: "address" },
      { name: "_validator", type: "address" }
    ],
    outputs: [{ name: "total", type: "uint256" }]
  },
  {
    name: "getPendingDelegatorWithdrawals",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_delegator", type: "address" },
      { name: "_validator", type: "address" }
    ],
    outputs: [{ name: "total", type: "uint256" }]
  },
  {
    name: "getPendingValidatorDeposits",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_validator", type: "address" }],
    outputs: [{ name: "total", type: "uint256" }]
  },
  {
    name: "getPendingValidatorWithdrawals",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_validator", type: "address" }],
    outputs: [{ name: "total", type: "uint256" }]
  },
  {
    name: "getValidatorDelegators",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_validator", type: "address" }],
    outputs: [{ name: "", type: "address[]" }]
  },
  {
    name: "getValidatorDelegatorsPaginated",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_validator", type: "address" },
      { name: "_startIndex", type: "uint256" },
      { name: "_pageSize", type: "uint256" }
    ],
    outputs: [{ name: "", type: "address[]" }]
  },
  {
    name: "getValidatorQuarantineList",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address[]" }]
  },
  {
    name: "getValidatorsJoined",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_startIndex", type: "uint256" },
      { name: "_pageSize", type: "uint256" }
    ],
    outputs: [{ name: "", type: "address[]" }]
  },
  {
    name: "idlenessBan",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_validator", type: "address" },
      { name: "_at", type: "uint256" },
      { name: "_until", type: "uint256" }
    ],
    outputs: []
  },
  {
    name: "idlenessBanBatch",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_validators", type: "address[]" },
      { name: "_quarantinedAt", type: "uint256" },
      { name: "_quarantinedUntil", type: "uint256" }
    ],
    outputs: []
  },
  {
    name: "inflationEpoch",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "inflationInit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_inflationOnset", type: "uint256" }],
    outputs: []
  },
  {
    name: "inflationReceive",
    type: "function",
    stateMutability: "payable",
    inputs: [{ name: "_epoch", type: "uint256" }],
    outputs: []
  },
  {
    name: "isDelegatorOfValidator",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_validator", type: "address" },
      { name: "_delegator", type: "address" }
    ],
    outputs: [{ name: "", type: "bool" }]
  },
  {
    name: "isValidator",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_validator", type: "address" }],
    outputs: [{ name: "", type: "bool" }]
  },
  {
    name: "isValidatorBanned",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_validator", type: "address" }],
    outputs: [{ name: "", type: "bool" }]
  },
  {
    name: "setDeepthought",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_deepthought", type: "address" }],
    outputs: []
  },
  {
    name: "setDelegatorMinimumStake",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_delegatorMinStake", type: "uint256" }],
    outputs: []
  },
  {
    name: "setEpochMinDuration",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_epochMinDuration", type: "uint256" }],
    outputs: []
  },
  {
    name: "setEpochMinDurationThreshold",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_epochMinDurationThreshold", type: "uint256" }],
    outputs: []
  },
  {
    name: "setEpochZeroMinDuration",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_epochZeroMinDuration", type: "uint256" }],
    outputs: []
  },
  {
    name: "setFinalizationPhase",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_finalizationPhase", type: "address" }],
    outputs: []
  },
  {
    name: "setGen",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_gen", type: "address" }],
    outputs: []
  },
  {
    name: "setIdlenessPhase",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_idlenessPhase", type: "address" }],
    outputs: []
  },
  {
    name: "setMaxValidators",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_maxValidators", type: "uint256" }],
    outputs: []
  },
  {
    name: "setReductionFactor",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_reductionFactor", type: "uint256" }],
    outputs: []
  },
  {
    name: "setRevealingPhase",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_revealingPhase", type: "address" }],
    outputs: []
  },
  {
    name: "setStakingInvariant",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_stakingInvariant", type: "address" }],
    outputs: []
  },
  {
    name: "setTransactionFeesManager",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_transactionFeesManager", type: "address" }],
    outputs: []
  },
  {
    name: "setUnbondingPeriods",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_delegatorUnbondingPeriod", type: "uint256" },
      { name: "_validatorUnbondingPeriod", type: "uint256" }
    ],
    outputs: []
  },
  {
    name: "setValidatorMinimumStake",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_validatorMinStake", type: "uint256" }],
    outputs: []
  },
  {
    name: "setValidatorWeightParams",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_alpha", type: "uint256" },
      { name: "_beta", type: "uint256" }
    ],
    outputs: []
  },
  {
    name: "sharesOf",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_delegator", type: "address" },
      { name: "_validator", type: "address" }
    ],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "stakeOf",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_delegator", type: "address" },
      { name: "_validator", type: "address" }
    ],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "validatorBanDeterministic",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_validator", type: "address" }],
    outputs: []
  },
  {
    name: "validatorClaim",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_validator", type: "address" }],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "validatorDelegatorCount",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_validator", type: "address" }],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "validatorDeposit",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_validator", type: "address" },
      { name: "_index", type: "uint256" }
    ],
    outputs: [
      { name: "epoch_", type: "uint256" },
      {
        name: "commit_",
        type: "tuple",
        components: [
          { name: "input", type: "uint256" },
          { name: "output", type: "uint256" },
          { name: "epoch", type: "uint256" },
          { name: "linkToNextCommit", type: "uint256" }
        ]
      }
    ]
  },
  {
    name: "validatorDeposit",
    type: "function",
    stateMutability: "payable",
    inputs: [],
    outputs: []
  },
  {
    name: "validatorDepositByEpoch",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_validator", type: "address" },
      { name: "_epoch", type: "uint256" }
    ],
    outputs: [
      {
        name: "commit_",
        type: "tuple",
        components: [
          { name: "input", type: "uint256" },
          { name: "output", type: "uint256" },
          { name: "epoch", type: "uint256" },
          { name: "linkToNextCommit", type: "uint256" }
        ]
      }
    ]
  },
  {
    name: "validatorDepositLen",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_validator", type: "address" }],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "validatorExit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_amount", type: "uint256" }],
    outputs: []
  },
  {
    name: "validatorJoin",
    type: "function",
    stateMutability: "payable",
    inputs: [{ name: "_operator", type: "address" }],
    outputs: [{ name: "", type: "address" }]
  },
  {
    name: "validatorJoin",
    type: "function",
    stateMutability: "payable",
    inputs: [],
    outputs: [{ name: "", type: "address" }]
  },
  {
    name: "validatorPrime",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_validator", type: "address" }],
    outputs: []
  },
  {
    name: "validatorQuarantine",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_validator", type: "address" },
      { name: "_at", type: "uint256" }
    ],
    outputs: []
  },
  {
    name: "validatorQuarantineCount",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "validatorQuarantineRepeal",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_validator", type: "address" }],
    outputs: []
  },
  {
    name: "validatorSelection",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_seed", type: "bytes32" },
      { name: "_slot", type: "uint256" },
      { name: "_epoch", type: "uint256" },
      { name: "_txCreatedTimestamp", type: "uint256" },
      { name: "_number", type: "uint256" },
      { name: "_weighted", type: "bool" },
      { name: "_consumed", type: "address[]" }
    ],
    outputs: [
      { name: "leader_", type: "uint256" },
      { name: "validators_", type: "address[]" },
      { name: "penalized_", type: "address[]" }
    ]
  },
  {
    name: "validatorSelection",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_seed", type: "bytes32" },
      { name: "_slot", type: "uint256" },
      { name: "_txCreatedTimestamp", type: "uint256" },
      { name: "_number", type: "uint256" },
      { name: "_weighted", type: "bool" },
      { name: "_consumed", type: "address[]" }
    ],
    outputs: [
      { name: "leader_", type: "uint256" },
      { name: "validators_", type: "address[]" },
      { name: "penalized_", type: "address[]" }
    ]
  },
  {
    name: "validatorView",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_validator", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "left", type: "address" },
          { name: "right", type: "address" },
          { name: "parent", type: "address" },
          { name: "eBanned", type: "uint256" },
          { name: "ePrimed", type: "uint256" },
          { name: "vStake", type: "uint256" },
          { name: "vShares", type: "uint256" },
          { name: "dStake", type: "uint256" },
          { name: "dShares", type: "uint256" },
          { name: "vDeposit", type: "uint256" },
          { name: "vWithdrawal", type: "uint256" },
          { name: "live", type: "bool" }
        ]
      }
    ]
  },
  {
    name: "validatorViewPrePrimed",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_validator", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "left", type: "address" },
          { name: "right", type: "address" },
          { name: "parent", type: "address" },
          { name: "eBanned", type: "uint256" },
          { name: "ePrimed", type: "uint256" },
          { name: "vStake", type: "uint256" },
          { name: "vShares", type: "uint256" },
          { name: "dStake", type: "uint256" },
          { name: "dShares", type: "uint256" },
          { name: "vDeposit", type: "uint256" },
          { name: "vWithdrawal", type: "uint256" },
          { name: "live", type: "bool" }
        ]
      }
    ]
  },
  {
    name: "validatorViewPrimed",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_validator", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "left", type: "address" },
          { name: "right", type: "address" },
          { name: "parent", type: "address" },
          { name: "eBanned", type: "uint256" },
          { name: "ePrimed", type: "uint256" },
          { name: "vStake", type: "uint256" },
          { name: "vShares", type: "uint256" },
          { name: "dStake", type: "uint256" },
          { name: "dShares", type: "uint256" },
          { name: "vDeposit", type: "uint256" },
          { name: "vWithdrawal", type: "uint256" },
          { name: "live", type: "bool" }
        ]
      }
    ]
  },
  {
    name: "validatorWithdrawal",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_validator", type: "address" },
      { name: "_index", type: "uint256" }
    ],
    outputs: [
      { name: "epoch_", type: "uint256" },
      {
        name: "commit_",
        type: "tuple",
        components: [
          { name: "input", type: "uint256" },
          { name: "output", type: "uint256" },
          { name: "epoch", type: "uint256" },
          { name: "linkToNextCommit", type: "uint256" }
        ]
      }
    ]
  },
  {
    name: "validatorWithdrawalByEpoch",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "_validator", type: "address" },
      { name: "_epoch", type: "uint256" }
    ],
    outputs: [
      {
        name: "commit_",
        type: "tuple",
        components: [
          { name: "input", type: "uint256" },
          { name: "output", type: "uint256" },
          { name: "epoch", type: "uint256" },
          { name: "linkToNextCommit", type: "uint256" }
        ]
      }
    ]
  },
  {
    name: "validatorWithdrawalLen",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "_validator", type: "address" }],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "validatorMinStake",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "delegatorMinStake",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "validatorsCount",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "validatorsJoinedCount",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "validatorsRoot",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }]
  }
];

// src/chains/testnetAsimov.ts
var TESTNET_JSON_RPC_URL = "https://rpc-asimov.genlayer.com";
var STAKING_CONTRACT = {
  address: "0x63Fa5E0bb10fb6fA98F44726C5518223F767687A",
  abi: STAKING_ABI
};
var FEE_MANAGER_CONTRACT = {
  address: "0x21737AA4bea8FF12E202BF1BAB23751A95617533",
  abi: [
    {
      type: "function",
      name: "calculateMinAppealBond",
      stateMutability: "view",
      inputs: [
        { name: "_txId", type: "bytes32" },
        { name: "_round", type: "uint256" },
        { name: "_status", type: "uint8" }
      ],
      outputs: [
        { name: "totalFeesToPay", type: "uint256" }
      ]
    }
  ]
};
var ROUNDS_STORAGE_CONTRACT = {
  address: "0x1F595c0D549DE0812F127508ea1039636CFA62Cc",
  abi: [
    {
      type: "function",
      name: "getLastRoundData",
      stateMutability: "view",
      inputs: [
        { name: "txId", type: "bytes32" }
      ],
      outputs: [
        { name: "round", type: "uint256" },
        {
          name: "roundData",
          type: "tuple",
          components: [
            { name: "round", type: "uint256" },
            { name: "leaderIndex", type: "uint256" },
            { name: "votesCommitted", type: "uint256" },
            { name: "votesRevealed", type: "uint256" },
            { name: "appealBond", type: "uint256" },
            { name: "rotationsLeft", type: "uint256" },
            { name: "result", type: "uint8" },
            { name: "roundValidators", type: "address[]" },
            { name: "validatorVotes", type: "uint8[]" },
            { name: "validatorVotesHash", type: "bytes32[]" },
            { name: "validatorResultHash", type: "bytes32[]" }
          ]
        }
      ]
    },
    {
      type: "function",
      name: "getRoundData",
      stateMutability: "view",
      inputs: [
        { name: "txId", type: "bytes32" },
        { name: "round", type: "uint256" }
      ],
      outputs: [
        {
          name: "",
          type: "tuple",
          components: [
            { name: "round", type: "uint256" },
            { name: "leaderIndex", type: "uint256" },
            { name: "votesCommitted", type: "uint256" },
            { name: "votesRevealed", type: "uint256" },
            { name: "appealBond", type: "uint256" },
            { name: "rotationsLeft", type: "uint256" },
            { name: "result", type: "uint8" },
            { name: "roundValidators", type: "address[]" },
            { name: "validatorVotes", type: "uint8[]" },
            { name: "validatorVotesHash", type: "bytes32[]" },
            { name: "validatorResultHash", type: "bytes32[]" }
          ]
        }
      ]
    },
    {
      type: "function",
      name: "getRoundNumber",
      stateMutability: "view",
      inputs: [
        { name: "txId", type: "bytes32" }
      ],
      outputs: [
        { name: "", type: "uint256" }
      ]
    }
  ]
};
var APPEALS_CONTRACT = {
  address: "0x0F739Dd8f5322b9547c7d19a9621BC2ac8DF4089",
  abi: [
    {
      type: "function",
      name: "canAppeal",
      stateMutability: "view",
      inputs: [
        { name: "_txId", type: "bytes32" }
      ],
      outputs: [
        { name: "", type: "bool" }
      ]
    }
  ]
};
var EXPLORER_URL2 = "https://explorer-asimov.genlayer.com/";
var CONSENSUS_MAIN_CONTRACT3 = {
  address: "0x6CAFF6769d70824745AD895663409DC70aB5B28E",
  abi: [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "CallerNotMessages",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidDeploymentWithSalt",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidInitialization",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidRevealLeaderData",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidVote",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotInitializing",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "TransactionNotFinalized",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Unauthorized",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldActivator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newActivator",
          "type": "address"
        }
      ],
      "name": "ActivatorReplaced",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "addressManager",
          "type": "address"
        }
      ],
      "name": "AddressManagerSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "enum ITransactions.TransactionStatus",
          "name": "newStatus",
          "type": "uint8"
        }
      ],
      "name": "AllVotesCommitted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "appellant",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "bond",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "validators",
          "type": "address[]"
        }
      ],
      "name": "AppealStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "attempted",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "succeeded",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "failed",
          "type": "uint256"
        }
      ],
      "name": "BatchFinalizationCompleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "txSlot",
          "type": "uint256"
        }
      ],
      "name": "CreatedTransaction",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "version",
          "type": "uint64"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "activator",
          "type": "address"
        }
      ],
      "name": "InternalMessageProcessed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldLeader",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newLeader",
          "type": "address"
        }
      ],
      "name": "LeaderIdlenessProcessed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "activator",
          "type": "address"
        }
      ],
      "name": "NewTransaction",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "ProcessIdlenessAccepted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "TransactionAccepted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "leader",
          "type": "address"
        }
      ],
      "name": "TransactionActivated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "cancelledBy",
          "type": "address"
        }
      ],
      "name": "TransactionCancelled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "TransactionFinalizationFailed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "TransactionFinalized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "TransactionLeaderRevealed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newLeader",
          "type": "address"
        }
      ],
      "name": "TransactionLeaderRotated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "TransactionLeaderTimeout",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "txIds",
          "type": "bytes32[]"
        }
      ],
      "name": "TransactionNeedsRecomputation",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "validators",
          "type": "address[]"
        }
      ],
      "name": "TransactionReceiptProposed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "TransactionUndetermined",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalUnissuedValue",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "unissuedCount",
          "type": "uint256"
        }
      ],
      "name": "UnissuedMessagesAtFinalization",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldValidator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newValidator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "validatorIndex",
          "type": "uint256"
        }
      ],
      "name": "ValidatorReplaced",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "ValueWithdrawalFailed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "validator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isLastVote",
          "type": "bool"
        }
      ],
      "name": "VoteCommitted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "validator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum ITransactions.VoteType",
          "name": "voteType",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isLastVote",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "enum ITransactions.ResultType",
          "name": "result",
          "type": "uint8"
        }
      ],
      "name": "VoteRevealed",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "EVENTS_BATCH_SIZE",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "VERSION",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "acceptOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "_vrfProof",
          "type": "bytes"
        }
      ],
      "name": "activateTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_numOfInitialValidators",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maxRotations",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_calldata",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "_validUntil",
          "type": "uint256"
        }
      ],
      "name": "addTransaction",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "addressManager",
      "outputs": [
        {
          "internalType": "contract IAddressManager",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        }
      ],
      "name": "cancelTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_commitHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_validatorIndex",
          "type": "uint256"
        }
      ],
      "name": "commitVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_numOfInitialValidators",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maxRotations",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_calldata",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "_saltNonce",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_validUntil",
          "type": "uint256"
        }
      ],
      "name": "deploySalted",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "executeMessage",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32[]",
          "name": "_txIds",
          "type": "bytes32[]"
        }
      ],
      "name": "finalizeIdlenessTxs",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        }
      ],
      "name": "finalizeTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        }
      ],
      "name": "flushExternalMessages",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAddressManager",
      "outputs": [
        {
          "internalType": "contract IAddressManager",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "getPendingTransactionValue",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addressManager",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "isGhostContract",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        }
      ],
      "name": "leaderIdleness",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "txId",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "saltAsAValidator",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "txExecutionHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "messagesAndOtherFieldsHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "otherExecutionFieldsHash",
              "type": "bytes32"
            },
            {
              "internalType": "enum ITransactions.VoteType",
              "name": "resultValue",
              "type": "uint8"
            },
            {
              "components": [
                {
                  "internalType": "enum IMessages.MessageType",
                  "name": "messageType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "bool",
                  "name": "onAcceptance",
                  "type": "bool"
                },
                {
                  "internalType": "uint256",
                  "name": "saltNonce",
                  "type": "uint256"
                }
              ],
              "internalType": "struct IMessages.SubmittedMessage[]",
              "name": "messages",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct IConsensusMain.LeaderRevealVoteParams",
          "name": "leaderRevealVoteParams",
          "type": "tuple"
        }
      ],
      "name": "leaderRevealVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pendingOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        }
      ],
      "name": "processIdleness",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "affectedRecipients",
          "type": "address[]"
        }
      ],
      "name": "promoteNextPendingTransactions",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_txExecutionHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_processingBlock",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "_eqBlocksOutputs",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "_vrfProof",
          "type": "bytes"
        }
      ],
      "name": "proposeReceipt",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32[]",
          "name": "_txIds",
          "type": "bytes32[]"
        }
      ],
      "name": "redButtonFinalize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "ghost",
          "type": "address"
        }
      ],
      "name": "registerGhostContract",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_voteHash",
          "type": "bytes32"
        },
        {
          "internalType": "enum ITransactions.VoteType",
          "name": "_voteType",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "_otherExecutionFieldsHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_nonce",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_validatorIndex",
          "type": "uint256"
        }
      ],
      "name": "revealVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addressManager",
          "type": "address"
        }
      ],
      "name": "setAddressManager",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        }
      ],
      "name": "submitAppeal",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ],
  bytecode: ""
};
var CONSENSUS_DATA_CONTRACT3 = {
  address: "0x0D9d1d74d72Fa5eB94bcf746C8FCcb312a722c9B",
  abi: [
    {
      "inputs": [],
      "name": "AccessControlBadConfirmation",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "neededRole",
          "type": "bytes32"
        }
      ],
      "name": "AccessControlUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidInitialization",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotInitializing",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "version",
          "type": "uint64"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "previousAdminRole",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "newAdminRole",
          "type": "bytes32"
        }
      ],
      "name": "RoleAdminChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleRevoked",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DEFAULT_ADMIN_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "acceptOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "addressManager",
      "outputs": [
        {
          "internalType": "contract IAddressManager",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_currentTimestamp",
          "type": "uint256"
        }
      ],
      "name": "canFinalize",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        }
      ],
      "name": "getLatestAcceptedTransaction",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "currentTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "initialRotations",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "txSlot",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "createdTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastVoteTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "randomSeed",
              "type": "bytes32"
            },
            {
              "internalType": "enum ITransactions.ResultType",
              "name": "result",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txExecutionHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "txCalldata",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "eqBlocksOutputs",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "enum IMessages.MessageType",
                  "name": "messageType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "bool",
                  "name": "onAcceptance",
                  "type": "bool"
                },
                {
                  "internalType": "uint256",
                  "name": "saltNonce",
                  "type": "uint256"
                }
              ],
              "internalType": "struct IMessages.SubmittedMessage[]",
              "name": "messages",
              "type": "tuple[]"
            },
            {
              "internalType": "enum IQueues.QueueType",
              "name": "queueType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "queuePosition",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "activator",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "lastLeader",
              "type": "address"
            },
            {
              "internalType": "enum ITransactions.TransactionStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "activationBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "processingBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "proposalBlock",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ITransactions.ReadStateBlockRange",
              "name": "readStateBlockRange",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "numOfRounds",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "round",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "leaderIndex",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesCommitted",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesRevealed",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "appealBond",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "rotationsLeft",
                  "type": "uint256"
                },
                {
                  "internalType": "enum ITransactions.ResultType",
                  "name": "result",
                  "type": "uint8"
                },
                {
                  "internalType": "address[]",
                  "name": "roundValidators",
                  "type": "address[]"
                },
                {
                  "internalType": "enum ITransactions.VoteType[]",
                  "name": "validatorVotes",
                  "type": "uint8[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorVotesHash",
                  "type": "bytes32[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorResultHash",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct ITransactions.RoundData",
              "name": "lastRound",
              "type": "tuple"
            },
            {
              "internalType": "address[]",
              "name": "consumedValidators",
              "type": "address[]"
            }
          ],
          "internalType": "struct ConsensusData.TransactionData",
          "name": "inputData",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "startIndex",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "pageSize",
          "type": "uint256"
        }
      ],
      "name": "getLatestAcceptedTransactions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "currentTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "initialRotations",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "txSlot",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "createdTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastVoteTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "randomSeed",
              "type": "bytes32"
            },
            {
              "internalType": "enum ITransactions.ResultType",
              "name": "result",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txExecutionHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "txCalldata",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "eqBlocksOutputs",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "enum IMessages.MessageType",
                  "name": "messageType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "bool",
                  "name": "onAcceptance",
                  "type": "bool"
                },
                {
                  "internalType": "uint256",
                  "name": "saltNonce",
                  "type": "uint256"
                }
              ],
              "internalType": "struct IMessages.SubmittedMessage[]",
              "name": "messages",
              "type": "tuple[]"
            },
            {
              "internalType": "enum IQueues.QueueType",
              "name": "queueType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "queuePosition",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "activator",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "lastLeader",
              "type": "address"
            },
            {
              "internalType": "enum ITransactions.TransactionStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "activationBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "processingBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "proposalBlock",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ITransactions.ReadStateBlockRange",
              "name": "readStateBlockRange",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "numOfRounds",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "round",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "leaderIndex",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesCommitted",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesRevealed",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "appealBond",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "rotationsLeft",
                  "type": "uint256"
                },
                {
                  "internalType": "enum ITransactions.ResultType",
                  "name": "result",
                  "type": "uint8"
                },
                {
                  "internalType": "address[]",
                  "name": "roundValidators",
                  "type": "address[]"
                },
                {
                  "internalType": "enum ITransactions.VoteType[]",
                  "name": "validatorVotes",
                  "type": "uint8[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorVotesHash",
                  "type": "bytes32[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorResultHash",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct ITransactions.RoundData",
              "name": "lastRound",
              "type": "tuple"
            },
            {
              "internalType": "address[]",
              "name": "consumedValidators",
              "type": "address[]"
            }
          ],
          "internalType": "struct ConsensusData.TransactionData[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        }
      ],
      "name": "getLatestAcceptedTxCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        }
      ],
      "name": "getLatestFinalizedTransaction",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "currentTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "initialRotations",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "txSlot",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "createdTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastVoteTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "randomSeed",
              "type": "bytes32"
            },
            {
              "internalType": "enum ITransactions.ResultType",
              "name": "result",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txExecutionHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "txCalldata",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "eqBlocksOutputs",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "enum IMessages.MessageType",
                  "name": "messageType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "bool",
                  "name": "onAcceptance",
                  "type": "bool"
                },
                {
                  "internalType": "uint256",
                  "name": "saltNonce",
                  "type": "uint256"
                }
              ],
              "internalType": "struct IMessages.SubmittedMessage[]",
              "name": "messages",
              "type": "tuple[]"
            },
            {
              "internalType": "enum IQueues.QueueType",
              "name": "queueType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "queuePosition",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "activator",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "lastLeader",
              "type": "address"
            },
            {
              "internalType": "enum ITransactions.TransactionStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "activationBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "processingBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "proposalBlock",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ITransactions.ReadStateBlockRange",
              "name": "readStateBlockRange",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "numOfRounds",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "round",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "leaderIndex",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesCommitted",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesRevealed",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "appealBond",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "rotationsLeft",
                  "type": "uint256"
                },
                {
                  "internalType": "enum ITransactions.ResultType",
                  "name": "result",
                  "type": "uint8"
                },
                {
                  "internalType": "address[]",
                  "name": "roundValidators",
                  "type": "address[]"
                },
                {
                  "internalType": "enum ITransactions.VoteType[]",
                  "name": "validatorVotes",
                  "type": "uint8[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorVotesHash",
                  "type": "bytes32[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorResultHash",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct ITransactions.RoundData",
              "name": "lastRound",
              "type": "tuple"
            },
            {
              "internalType": "address[]",
              "name": "consumedValidators",
              "type": "address[]"
            }
          ],
          "internalType": "struct ConsensusData.TransactionData",
          "name": "inputData",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "startIndex",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "pageSize",
          "type": "uint256"
        }
      ],
      "name": "getLatestFinalizedTransactions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "currentTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "initialRotations",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "txSlot",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "createdTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastVoteTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "randomSeed",
              "type": "bytes32"
            },
            {
              "internalType": "enum ITransactions.ResultType",
              "name": "result",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txExecutionHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "txCalldata",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "eqBlocksOutputs",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "enum IMessages.MessageType",
                  "name": "messageType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "bool",
                  "name": "onAcceptance",
                  "type": "bool"
                },
                {
                  "internalType": "uint256",
                  "name": "saltNonce",
                  "type": "uint256"
                }
              ],
              "internalType": "struct IMessages.SubmittedMessage[]",
              "name": "messages",
              "type": "tuple[]"
            },
            {
              "internalType": "enum IQueues.QueueType",
              "name": "queueType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "queuePosition",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "activator",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "lastLeader",
              "type": "address"
            },
            {
              "internalType": "enum ITransactions.TransactionStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "activationBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "processingBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "proposalBlock",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ITransactions.ReadStateBlockRange",
              "name": "readStateBlockRange",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "numOfRounds",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "round",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "leaderIndex",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesCommitted",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesRevealed",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "appealBond",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "rotationsLeft",
                  "type": "uint256"
                },
                {
                  "internalType": "enum ITransactions.ResultType",
                  "name": "result",
                  "type": "uint8"
                },
                {
                  "internalType": "address[]",
                  "name": "roundValidators",
                  "type": "address[]"
                },
                {
                  "internalType": "enum ITransactions.VoteType[]",
                  "name": "validatorVotes",
                  "type": "uint8[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorVotesHash",
                  "type": "bytes32[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorResultHash",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct ITransactions.RoundData",
              "name": "lastRound",
              "type": "tuple"
            },
            {
              "internalType": "address[]",
              "name": "consumedValidators",
              "type": "address[]"
            }
          ],
          "internalType": "struct ConsensusData.TransactionData[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        }
      ],
      "name": "getLatestFinalizedTxCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleAdmin",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        }
      ],
      "name": "getTransactionAllData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "enum ITransactions.ResultType",
              "name": "result",
              "type": "uint8"
            },
            {
              "internalType": "enum ITransactions.VoteType",
              "name": "txExecutionResult",
              "type": "uint8"
            },
            {
              "internalType": "enum ITransactions.TransactionStatus",
              "name": "previousStatus",
              "type": "uint8"
            },
            {
              "internalType": "enum ITransactions.TransactionStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "txOrigin",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "activator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "txSlot",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "initialRotations",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "numOfInitialValidators",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "epoch",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "id",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "randomSeed",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "txExecutionHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "resultHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "txCalldata",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "eqBlocksOutputs",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "activationBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "processingBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "proposalBlock",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ITransactions.ReadStateBlockRange[]",
              "name": "readStateBlockRanges",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "validUntil",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lockedStorageUnitPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "storageFeeUsed",
              "type": "uint256"
            }
          ],
          "internalType": "struct ITransactions.Transaction",
          "name": "transaction",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "round",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "leaderIndex",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "votesCommitted",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "votesRevealed",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "appealBond",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rotationsLeft",
              "type": "uint256"
            },
            {
              "internalType": "enum ITransactions.ResultType",
              "name": "result",
              "type": "uint8"
            },
            {
              "internalType": "address[]",
              "name": "roundValidators",
              "type": "address[]"
            },
            {
              "internalType": "enum ITransactions.VoteType[]",
              "name": "validatorVotes",
              "type": "uint8[]"
            },
            {
              "internalType": "bytes32[]",
              "name": "validatorVotesHash",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32[]",
              "name": "validatorResultHash",
              "type": "bytes32[]"
            }
          ],
          "internalType": "struct ITransactions.RoundData[]",
          "name": "roundsData",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_timestamp",
          "type": "uint256"
        }
      ],
      "name": "getTransactionData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "currentTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "initialRotations",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "txSlot",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "createdTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastVoteTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "randomSeed",
              "type": "bytes32"
            },
            {
              "internalType": "enum ITransactions.ResultType",
              "name": "result",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txExecutionHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "txCalldata",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "eqBlocksOutputs",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "enum IMessages.MessageType",
                  "name": "messageType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "bool",
                  "name": "onAcceptance",
                  "type": "bool"
                },
                {
                  "internalType": "uint256",
                  "name": "saltNonce",
                  "type": "uint256"
                }
              ],
              "internalType": "struct IMessages.SubmittedMessage[]",
              "name": "messages",
              "type": "tuple[]"
            },
            {
              "internalType": "enum IQueues.QueueType",
              "name": "queueType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "queuePosition",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "activator",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "lastLeader",
              "type": "address"
            },
            {
              "internalType": "enum ITransactions.TransactionStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "activationBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "processingBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "proposalBlock",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ITransactions.ReadStateBlockRange",
              "name": "readStateBlockRange",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "numOfRounds",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "round",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "leaderIndex",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesCommitted",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesRevealed",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "appealBond",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "rotationsLeft",
                  "type": "uint256"
                },
                {
                  "internalType": "enum ITransactions.ResultType",
                  "name": "result",
                  "type": "uint8"
                },
                {
                  "internalType": "address[]",
                  "name": "roundValidators",
                  "type": "address[]"
                },
                {
                  "internalType": "enum ITransactions.VoteType[]",
                  "name": "validatorVotes",
                  "type": "uint8[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorVotesHash",
                  "type": "bytes32[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorResultHash",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct ITransactions.RoundData",
              "name": "lastRound",
              "type": "tuple"
            },
            {
              "internalType": "address[]",
              "name": "consumedValidators",
              "type": "address[]"
            }
          ],
          "internalType": "struct ConsensusData.TransactionData",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_timestamp",
          "type": "uint256"
        }
      ],
      "name": "getTransactionStatus",
      "outputs": [
        {
          "internalType": "enum ITransactions.TransactionStatus",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        }
      ],
      "name": "getValidatorsForLastRound",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "validators",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "grantRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "hasRole",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addressManager",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pendingOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "callerConfirmation",
          "type": "address"
        }
      ],
      "name": "renounceRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "revokeRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addressManager",
          "type": "address"
        }
      ],
      "name": "setAddressManager",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  bytecode: ""
};
var testnetAsimov = _viem.defineChain.call(void 0, {
  id: 4221,
  isStudio: false,
  name: "Genlayer Asimov Testnet",
  rpcUrls: {
    default: {
      http: [TESTNET_JSON_RPC_URL]
    }
  },
  nativeCurrency: {
    name: "GEN Token",
    symbol: "GEN",
    decimals: 18
  },
  blockExplorers: {
    default: {
      name: "GenLayer Asimov Explorer",
      url: EXPLORER_URL2
    }
  },
  testnet: true,
  consensusMainContract: CONSENSUS_MAIN_CONTRACT3,
  consensusDataContract: CONSENSUS_DATA_CONTRACT3,
  stakingContract: STAKING_CONTRACT,
  feeManagerContract: FEE_MANAGER_CONTRACT,
  roundsStorageContract: ROUNDS_STORAGE_CONTRACT,
  appealsContract: APPEALS_CONTRACT,
  defaultNumberOfInitialValidators: 5,
  defaultConsensusMaxRotations: 3
});

// src/chains/testnetBradbury.ts

var TESTNET_JSON_RPC_URL2 = "https://rpc-bradbury.genlayer.com";
var STAKING_CONTRACT2 = {
  address: "0x4A4449E617F8D10FDeD0b461CadEf83939E821A5",
  abi: STAKING_ABI
};
var FEE_MANAGER_CONTRACT2 = {
  address: "0xF205868bf5db79d2162843742D18D0900A9E462a",
  abi: [
    {
      type: "function",
      name: "calculateMinAppealBond",
      stateMutability: "view",
      inputs: [
        { name: "_txId", type: "bytes32" },
        { name: "_round", type: "uint256" },
        { name: "_status", type: "uint8" }
      ],
      outputs: [
        { name: "totalFeesToPay", type: "uint256" }
      ]
    }
  ]
};
var ROUNDS_STORAGE_CONTRACT2 = {
  address: "0x7134D05af13A14c0b66Fe129fb930b1d0C420e33",
  abi: [
    {
      type: "function",
      name: "getLastRoundData",
      stateMutability: "view",
      inputs: [
        { name: "txId", type: "bytes32" }
      ],
      outputs: [
        { name: "round", type: "uint256" },
        {
          name: "roundData",
          type: "tuple",
          components: [
            { name: "round", type: "uint256" },
            { name: "leaderIndex", type: "uint256" },
            { name: "votesCommitted", type: "uint256" },
            { name: "votesRevealed", type: "uint256" },
            { name: "appealBond", type: "uint256" },
            { name: "rotationsLeft", type: "uint256" },
            { name: "result", type: "uint8" },
            { name: "roundValidators", type: "address[]" },
            { name: "validatorVotes", type: "uint8[]" },
            { name: "validatorVotesHash", type: "bytes32[]" },
            { name: "validatorResultHash", type: "bytes32[]" }
          ]
        }
      ]
    },
    {
      type: "function",
      name: "getRoundData",
      stateMutability: "view",
      inputs: [
        { name: "txId", type: "bytes32" },
        { name: "round", type: "uint256" }
      ],
      outputs: [
        {
          name: "",
          type: "tuple",
          components: [
            { name: "round", type: "uint256" },
            { name: "leaderIndex", type: "uint256" },
            { name: "votesCommitted", type: "uint256" },
            { name: "votesRevealed", type: "uint256" },
            { name: "appealBond", type: "uint256" },
            { name: "rotationsLeft", type: "uint256" },
            { name: "result", type: "uint8" },
            { name: "roundValidators", type: "address[]" },
            { name: "validatorVotes", type: "uint8[]" },
            { name: "validatorVotesHash", type: "bytes32[]" },
            { name: "validatorResultHash", type: "bytes32[]" }
          ]
        }
      ]
    },
    {
      type: "function",
      name: "getRoundNumber",
      stateMutability: "view",
      inputs: [
        { name: "txId", type: "bytes32" }
      ],
      outputs: [
        { name: "", type: "uint256" }
      ]
    }
  ]
};
var APPEALS_CONTRACT2 = {
  address: "0xbb8C35AA878D09b9830aFF9e5aAC6492BFbd5471",
  abi: [
    {
      type: "function",
      name: "canAppeal",
      stateMutability: "view",
      inputs: [
        { name: "_txId", type: "bytes32" }
      ],
      outputs: [
        { name: "", type: "bool" }
      ]
    }
  ]
};
var EXPLORER_URL3 = "https://explorer-bradbury.genlayer.com/";
var CONSENSUS_MAIN_CONTRACT4 = {
  address: "0x0112Bf6e83497965A5fdD6Dad1E447a6E004271D",
  abi: [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "CallerNotMessages",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidDeploymentWithSalt",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidInitialization",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidRevealLeaderData",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidVote",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotInitializing",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "TransactionNotFinalized",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Unauthorized",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldActivator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newActivator",
          "type": "address"
        }
      ],
      "name": "ActivatorReplaced",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "addressManager",
          "type": "address"
        }
      ],
      "name": "AddressManagerSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "enum ITransactions.TransactionStatus",
          "name": "newStatus",
          "type": "uint8"
        }
      ],
      "name": "AllVotesCommitted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "appellant",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "bond",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "validators",
          "type": "address[]"
        }
      ],
      "name": "AppealStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "attempted",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "succeeded",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "failed",
          "type": "uint256"
        }
      ],
      "name": "BatchFinalizationCompleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "txSlot",
          "type": "uint256"
        }
      ],
      "name": "CreatedTransaction",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "version",
          "type": "uint64"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "activator",
          "type": "address"
        }
      ],
      "name": "InternalMessageProcessed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldLeader",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newLeader",
          "type": "address"
        }
      ],
      "name": "LeaderIdlenessProcessed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "activator",
          "type": "address"
        }
      ],
      "name": "NewTransaction",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "ProcessIdlenessAccepted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "TransactionAccepted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "leader",
          "type": "address"
        }
      ],
      "name": "TransactionActivated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "cancelledBy",
          "type": "address"
        }
      ],
      "name": "TransactionCancelled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "TransactionFinalizationFailed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "TransactionFinalized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "TransactionLeaderRevealed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newLeader",
          "type": "address"
        }
      ],
      "name": "TransactionLeaderRotated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "TransactionLeaderTimeout",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "txIds",
          "type": "bytes32[]"
        }
      ],
      "name": "TransactionNeedsRecomputation",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "validators",
          "type": "address[]"
        }
      ],
      "name": "TransactionReceiptProposed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "TransactionUndetermined",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalUnissuedValue",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "unissuedCount",
          "type": "uint256"
        }
      ],
      "name": "UnissuedMessagesAtFinalization",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldValidator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newValidator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "validatorIndex",
          "type": "uint256"
        }
      ],
      "name": "ValidatorReplaced",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "ValueWithdrawalFailed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "validator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isLastVote",
          "type": "bool"
        }
      ],
      "name": "VoteCommitted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "validator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum ITransactions.VoteType",
          "name": "voteType",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isLastVote",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "enum ITransactions.ResultType",
          "name": "result",
          "type": "uint8"
        }
      ],
      "name": "VoteRevealed",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "EVENTS_BATCH_SIZE",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "VERSION",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "acceptOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "_vrfProof",
          "type": "bytes"
        }
      ],
      "name": "activateTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_numOfInitialValidators",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maxRotations",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_calldata",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "_validUntil",
          "type": "uint256"
        }
      ],
      "name": "addTransaction",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "addressManager",
      "outputs": [
        {
          "internalType": "contract IAddressManager",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        }
      ],
      "name": "cancelTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_commitHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_validatorIndex",
          "type": "uint256"
        }
      ],
      "name": "commitVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_numOfInitialValidators",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maxRotations",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_calldata",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "_saltNonce",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_validUntil",
          "type": "uint256"
        }
      ],
      "name": "deploySalted",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "executeMessage",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32[]",
          "name": "_txIds",
          "type": "bytes32[]"
        }
      ],
      "name": "finalizeIdlenessTxs",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        }
      ],
      "name": "finalizeTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        }
      ],
      "name": "flushExternalMessages",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAddressManager",
      "outputs": [
        {
          "internalType": "contract IAddressManager",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "getPendingTransactionValue",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addressManager",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "isGhostContract",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        }
      ],
      "name": "leaderIdleness",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "txId",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "saltAsAValidator",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "txExecutionHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "messagesAndOtherFieldsHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "otherExecutionFieldsHash",
              "type": "bytes32"
            },
            {
              "internalType": "enum ITransactions.VoteType",
              "name": "resultValue",
              "type": "uint8"
            },
            {
              "components": [
                {
                  "internalType": "enum IMessages.MessageType",
                  "name": "messageType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "bool",
                  "name": "onAcceptance",
                  "type": "bool"
                },
                {
                  "internalType": "uint256",
                  "name": "saltNonce",
                  "type": "uint256"
                }
              ],
              "internalType": "struct IMessages.SubmittedMessage[]",
              "name": "messages",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct IConsensusMain.LeaderRevealVoteParams",
          "name": "leaderRevealVoteParams",
          "type": "tuple"
        }
      ],
      "name": "leaderRevealVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pendingOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        }
      ],
      "name": "processIdleness",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "affectedRecipients",
          "type": "address[]"
        }
      ],
      "name": "promoteNextPendingTransactions",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_txExecutionHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_processingBlock",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "_eqBlocksOutputs",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "_vrfProof",
          "type": "bytes"
        }
      ],
      "name": "proposeReceipt",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32[]",
          "name": "_txIds",
          "type": "bytes32[]"
        }
      ],
      "name": "redButtonFinalize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "ghost",
          "type": "address"
        }
      ],
      "name": "registerGhostContract",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_voteHash",
          "type": "bytes32"
        },
        {
          "internalType": "enum ITransactions.VoteType",
          "name": "_voteType",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "_otherExecutionFieldsHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_nonce",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_validatorIndex",
          "type": "uint256"
        }
      ],
      "name": "revealVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addressManager",
          "type": "address"
        }
      ],
      "name": "setAddressManager",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        }
      ],
      "name": "submitAppeal",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ],
  bytecode: ""
};
var CONSENSUS_DATA_CONTRACT4 = {
  address: "0x85D7bf947A512Fc640C75327A780c90847267697",
  abi: [
    {
      "inputs": [],
      "name": "AccessControlBadConfirmation",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "neededRole",
          "type": "bytes32"
        }
      ],
      "name": "AccessControlUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidInitialization",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotInitializing",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "version",
          "type": "uint64"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "previousAdminRole",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "newAdminRole",
          "type": "bytes32"
        }
      ],
      "name": "RoleAdminChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleRevoked",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DEFAULT_ADMIN_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "acceptOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "addressManager",
      "outputs": [
        {
          "internalType": "contract IAddressManager",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_currentTimestamp",
          "type": "uint256"
        }
      ],
      "name": "canFinalize",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        }
      ],
      "name": "getLatestAcceptedTransaction",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "currentTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "initialRotations",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "txSlot",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "createdTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastVoteTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "randomSeed",
              "type": "bytes32"
            },
            {
              "internalType": "enum ITransactions.ResultType",
              "name": "result",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txExecutionHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "txCalldata",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "eqBlocksOutputs",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "enum IMessages.MessageType",
                  "name": "messageType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "bool",
                  "name": "onAcceptance",
                  "type": "bool"
                },
                {
                  "internalType": "uint256",
                  "name": "saltNonce",
                  "type": "uint256"
                }
              ],
              "internalType": "struct IMessages.SubmittedMessage[]",
              "name": "messages",
              "type": "tuple[]"
            },
            {
              "internalType": "enum IQueues.QueueType",
              "name": "queueType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "queuePosition",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "activator",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "lastLeader",
              "type": "address"
            },
            {
              "internalType": "enum ITransactions.TransactionStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "activationBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "processingBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "proposalBlock",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ITransactions.ReadStateBlockRange",
              "name": "readStateBlockRange",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "numOfRounds",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "round",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "leaderIndex",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesCommitted",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesRevealed",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "appealBond",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "rotationsLeft",
                  "type": "uint256"
                },
                {
                  "internalType": "enum ITransactions.ResultType",
                  "name": "result",
                  "type": "uint8"
                },
                {
                  "internalType": "address[]",
                  "name": "roundValidators",
                  "type": "address[]"
                },
                {
                  "internalType": "enum ITransactions.VoteType[]",
                  "name": "validatorVotes",
                  "type": "uint8[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorVotesHash",
                  "type": "bytes32[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorResultHash",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct ITransactions.RoundData",
              "name": "lastRound",
              "type": "tuple"
            },
            {
              "internalType": "address[]",
              "name": "consumedValidators",
              "type": "address[]"
            }
          ],
          "internalType": "struct ConsensusData.TransactionData",
          "name": "inputData",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "startIndex",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "pageSize",
          "type": "uint256"
        }
      ],
      "name": "getLatestAcceptedTransactions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "currentTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "initialRotations",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "txSlot",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "createdTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastVoteTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "randomSeed",
              "type": "bytes32"
            },
            {
              "internalType": "enum ITransactions.ResultType",
              "name": "result",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txExecutionHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "txCalldata",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "eqBlocksOutputs",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "enum IMessages.MessageType",
                  "name": "messageType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "bool",
                  "name": "onAcceptance",
                  "type": "bool"
                },
                {
                  "internalType": "uint256",
                  "name": "saltNonce",
                  "type": "uint256"
                }
              ],
              "internalType": "struct IMessages.SubmittedMessage[]",
              "name": "messages",
              "type": "tuple[]"
            },
            {
              "internalType": "enum IQueues.QueueType",
              "name": "queueType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "queuePosition",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "activator",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "lastLeader",
              "type": "address"
            },
            {
              "internalType": "enum ITransactions.TransactionStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "activationBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "processingBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "proposalBlock",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ITransactions.ReadStateBlockRange",
              "name": "readStateBlockRange",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "numOfRounds",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "round",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "leaderIndex",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesCommitted",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesRevealed",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "appealBond",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "rotationsLeft",
                  "type": "uint256"
                },
                {
                  "internalType": "enum ITransactions.ResultType",
                  "name": "result",
                  "type": "uint8"
                },
                {
                  "internalType": "address[]",
                  "name": "roundValidators",
                  "type": "address[]"
                },
                {
                  "internalType": "enum ITransactions.VoteType[]",
                  "name": "validatorVotes",
                  "type": "uint8[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorVotesHash",
                  "type": "bytes32[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorResultHash",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct ITransactions.RoundData",
              "name": "lastRound",
              "type": "tuple"
            },
            {
              "internalType": "address[]",
              "name": "consumedValidators",
              "type": "address[]"
            }
          ],
          "internalType": "struct ConsensusData.TransactionData[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        }
      ],
      "name": "getLatestAcceptedTxCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        }
      ],
      "name": "getLatestFinalizedTransaction",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "currentTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "initialRotations",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "txSlot",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "createdTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastVoteTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "randomSeed",
              "type": "bytes32"
            },
            {
              "internalType": "enum ITransactions.ResultType",
              "name": "result",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txExecutionHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "txCalldata",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "eqBlocksOutputs",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "enum IMessages.MessageType",
                  "name": "messageType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "bool",
                  "name": "onAcceptance",
                  "type": "bool"
                },
                {
                  "internalType": "uint256",
                  "name": "saltNonce",
                  "type": "uint256"
                }
              ],
              "internalType": "struct IMessages.SubmittedMessage[]",
              "name": "messages",
              "type": "tuple[]"
            },
            {
              "internalType": "enum IQueues.QueueType",
              "name": "queueType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "queuePosition",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "activator",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "lastLeader",
              "type": "address"
            },
            {
              "internalType": "enum ITransactions.TransactionStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "activationBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "processingBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "proposalBlock",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ITransactions.ReadStateBlockRange",
              "name": "readStateBlockRange",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "numOfRounds",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "round",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "leaderIndex",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesCommitted",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesRevealed",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "appealBond",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "rotationsLeft",
                  "type": "uint256"
                },
                {
                  "internalType": "enum ITransactions.ResultType",
                  "name": "result",
                  "type": "uint8"
                },
                {
                  "internalType": "address[]",
                  "name": "roundValidators",
                  "type": "address[]"
                },
                {
                  "internalType": "enum ITransactions.VoteType[]",
                  "name": "validatorVotes",
                  "type": "uint8[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorVotesHash",
                  "type": "bytes32[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorResultHash",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct ITransactions.RoundData",
              "name": "lastRound",
              "type": "tuple"
            },
            {
              "internalType": "address[]",
              "name": "consumedValidators",
              "type": "address[]"
            }
          ],
          "internalType": "struct ConsensusData.TransactionData",
          "name": "inputData",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "startIndex",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "pageSize",
          "type": "uint256"
        }
      ],
      "name": "getLatestFinalizedTransactions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "currentTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "initialRotations",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "txSlot",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "createdTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastVoteTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "randomSeed",
              "type": "bytes32"
            },
            {
              "internalType": "enum ITransactions.ResultType",
              "name": "result",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txExecutionHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "txCalldata",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "eqBlocksOutputs",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "enum IMessages.MessageType",
                  "name": "messageType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "bool",
                  "name": "onAcceptance",
                  "type": "bool"
                },
                {
                  "internalType": "uint256",
                  "name": "saltNonce",
                  "type": "uint256"
                }
              ],
              "internalType": "struct IMessages.SubmittedMessage[]",
              "name": "messages",
              "type": "tuple[]"
            },
            {
              "internalType": "enum IQueues.QueueType",
              "name": "queueType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "queuePosition",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "activator",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "lastLeader",
              "type": "address"
            },
            {
              "internalType": "enum ITransactions.TransactionStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "activationBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "processingBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "proposalBlock",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ITransactions.ReadStateBlockRange",
              "name": "readStateBlockRange",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "numOfRounds",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "round",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "leaderIndex",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesCommitted",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesRevealed",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "appealBond",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "rotationsLeft",
                  "type": "uint256"
                },
                {
                  "internalType": "enum ITransactions.ResultType",
                  "name": "result",
                  "type": "uint8"
                },
                {
                  "internalType": "address[]",
                  "name": "roundValidators",
                  "type": "address[]"
                },
                {
                  "internalType": "enum ITransactions.VoteType[]",
                  "name": "validatorVotes",
                  "type": "uint8[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorVotesHash",
                  "type": "bytes32[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorResultHash",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct ITransactions.RoundData",
              "name": "lastRound",
              "type": "tuple"
            },
            {
              "internalType": "address[]",
              "name": "consumedValidators",
              "type": "address[]"
            }
          ],
          "internalType": "struct ConsensusData.TransactionData[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        }
      ],
      "name": "getLatestFinalizedTxCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleAdmin",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        }
      ],
      "name": "getTransactionAllData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "enum ITransactions.ResultType",
              "name": "result",
              "type": "uint8"
            },
            {
              "internalType": "enum ITransactions.VoteType",
              "name": "txExecutionResult",
              "type": "uint8"
            },
            {
              "internalType": "enum ITransactions.TransactionStatus",
              "name": "previousStatus",
              "type": "uint8"
            },
            {
              "internalType": "enum ITransactions.TransactionStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "txOrigin",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "activator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "txSlot",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "initialRotations",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "numOfInitialValidators",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "epoch",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "id",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "randomSeed",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "txExecutionHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "resultHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "txCalldata",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "eqBlocksOutputs",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "activationBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "processingBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "proposalBlock",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ITransactions.ReadStateBlockRange[]",
              "name": "readStateBlockRanges",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "validUntil",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lockedStorageUnitPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "storageFeeUsed",
              "type": "uint256"
            }
          ],
          "internalType": "struct ITransactions.Transaction",
          "name": "transaction",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "round",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "leaderIndex",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "votesCommitted",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "votesRevealed",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "appealBond",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rotationsLeft",
              "type": "uint256"
            },
            {
              "internalType": "enum ITransactions.ResultType",
              "name": "result",
              "type": "uint8"
            },
            {
              "internalType": "address[]",
              "name": "roundValidators",
              "type": "address[]"
            },
            {
              "internalType": "enum ITransactions.VoteType[]",
              "name": "validatorVotes",
              "type": "uint8[]"
            },
            {
              "internalType": "bytes32[]",
              "name": "validatorVotesHash",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32[]",
              "name": "validatorResultHash",
              "type": "bytes32[]"
            }
          ],
          "internalType": "struct ITransactions.RoundData[]",
          "name": "roundsData",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_timestamp",
          "type": "uint256"
        }
      ],
      "name": "getTransactionData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "currentTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "initialRotations",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "txSlot",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "createdTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastVoteTimestamp",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "randomSeed",
              "type": "bytes32"
            },
            {
              "internalType": "enum ITransactions.ResultType",
              "name": "result",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txExecutionHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "txCalldata",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "eqBlocksOutputs",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "enum IMessages.MessageType",
                  "name": "messageType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "bool",
                  "name": "onAcceptance",
                  "type": "bool"
                },
                {
                  "internalType": "uint256",
                  "name": "saltNonce",
                  "type": "uint256"
                }
              ],
              "internalType": "struct IMessages.SubmittedMessage[]",
              "name": "messages",
              "type": "tuple[]"
            },
            {
              "internalType": "enum IQueues.QueueType",
              "name": "queueType",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "queuePosition",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "activator",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "lastLeader",
              "type": "address"
            },
            {
              "internalType": "enum ITransactions.TransactionStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "bytes32",
              "name": "txId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "activationBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "processingBlock",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "proposalBlock",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ITransactions.ReadStateBlockRange",
              "name": "readStateBlockRange",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "numOfRounds",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "round",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "leaderIndex",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesCommitted",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesRevealed",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "appealBond",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "rotationsLeft",
                  "type": "uint256"
                },
                {
                  "internalType": "enum ITransactions.ResultType",
                  "name": "result",
                  "type": "uint8"
                },
                {
                  "internalType": "address[]",
                  "name": "roundValidators",
                  "type": "address[]"
                },
                {
                  "internalType": "enum ITransactions.VoteType[]",
                  "name": "validatorVotes",
                  "type": "uint8[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorVotesHash",
                  "type": "bytes32[]"
                },
                {
                  "internalType": "bytes32[]",
                  "name": "validatorResultHash",
                  "type": "bytes32[]"
                }
              ],
              "internalType": "struct ITransactions.RoundData",
              "name": "lastRound",
              "type": "tuple"
            },
            {
              "internalType": "address[]",
              "name": "consumedValidators",
              "type": "address[]"
            }
          ],
          "internalType": "struct ConsensusData.TransactionData",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_timestamp",
          "type": "uint256"
        }
      ],
      "name": "getTransactionStatus",
      "outputs": [
        {
          "internalType": "enum ITransactions.TransactionStatus",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txId",
          "type": "bytes32"
        }
      ],
      "name": "getValidatorsForLastRound",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "validators",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "grantRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "hasRole",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addressManager",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pendingOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "callerConfirmation",
          "type": "address"
        }
      ],
      "name": "renounceRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "revokeRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addressManager",
          "type": "address"
        }
      ],
      "name": "setAddressManager",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  bytecode: ""
};
var testnetBradbury = _viem.defineChain.call(void 0, {
  id: 4221,
  isStudio: false,
  name: "Genlayer Bradbury Testnet",
  rpcUrls: {
    default: {
      http: [TESTNET_JSON_RPC_URL2]
    }
  },
  nativeCurrency: {
    name: "GEN Token",
    symbol: "GEN",
    decimals: 18
  },
  blockExplorers: {
    default: {
      name: "GenLayer Bradbury Explorer",
      url: EXPLORER_URL3
    }
  },
  testnet: true,
  consensusMainContract: CONSENSUS_MAIN_CONTRACT4,
  consensusDataContract: CONSENSUS_DATA_CONTRACT4,
  stakingContract: STAKING_CONTRACT2,
  feeManagerContract: FEE_MANAGER_CONTRACT2,
  roundsStorageContract: ROUNDS_STORAGE_CONTRACT2,
  appealsContract: APPEALS_CONTRACT2,
  defaultNumberOfInitialValidators: 5,
  defaultConsensusMaxRotations: 3
});









exports.localnet = localnet; exports.studionet = studionet; exports.VALIDATOR_WALLET_ABI = VALIDATOR_WALLET_ABI; exports.STAKING_ABI = STAKING_ABI; exports.testnetAsimov = testnetAsimov; exports.testnetBradbury = testnetBradbury; exports.chains_exports = chains_exports;
