import { Hex, Address, GetContractReturnType, PublicClient, Client, Transport, Chain, Account, WalletActions, PublicActions } from 'viem';
import { G as GenLayerChain } from './chains-D6DgvIVA.cjs';

declare class CalldataAddress {
    bytes: Uint8Array;
    constructor(addr: Uint8Array);
}
type CalldataEncodable = null | boolean | CalldataAddress | number | bigint | string | Uint8Array | Array<CalldataEncodable> | Map<string, CalldataEncodable> | {
    [key: string]: CalldataEncodable;
};
type MethodDescription = {
    method: string;
    args: Array<CalldataEncodable>;
};
type TransactionDataElement = string | number | bigint | boolean | Uint8Array;

type Hash = `0x${string}` & {
    length: 66;
};
type TransactionHash = Hash;
declare enum TransactionStatus {
    UNINITIALIZED = "UNINITIALIZED",
    PENDING = "PENDING",
    PROPOSING = "PROPOSING",
    COMMITTING = "COMMITTING",
    REVEALING = "REVEALING",
    ACCEPTED = "ACCEPTED",
    UNDETERMINED = "UNDETERMINED",
    FINALIZED = "FINALIZED",
    CANCELED = "CANCELED",
    APPEAL_REVEALING = "APPEAL_REVEALING",
    APPEAL_COMMITTING = "APPEAL_COMMITTING",
    READY_TO_FINALIZE = "READY_TO_FINALIZE",
    VALIDATORS_TIMEOUT = "VALIDATORS_TIMEOUT",
    LEADER_TIMEOUT = "LEADER_TIMEOUT"
}
declare enum TransactionResult {
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE"
}
declare enum TransactionResult {
    IDLE = "IDLE",
    AGREE = "AGREE",
    DISAGREE = "DISAGREE",
    TIMEOUT = "TIMEOUT",
    DETERMINISTIC_VIOLATION = "DETERMINISTIC_VIOLATION",
    NO_MAJORITY = "NO_MAJORITY",
    MAJORITY_AGREE = "MAJORITY_AGREE",
    MAJORITY_DISAGREE = "MAJORITY_DISAGREE"
}
declare const transactionsStatusNumberToName: {
    "0": TransactionStatus;
    "1": TransactionStatus;
    "2": TransactionStatus;
    "3": TransactionStatus;
    "4": TransactionStatus;
    "5": TransactionStatus;
    "6": TransactionStatus;
    "7": TransactionStatus;
    "8": TransactionStatus;
    "9": TransactionStatus;
    "10": TransactionStatus;
    "11": TransactionStatus;
    "12": TransactionStatus;
    "13": TransactionStatus;
};
declare const transactionsStatusNameToNumber: {
    UNINITIALIZED: string;
    PENDING: string;
    PROPOSING: string;
    COMMITTING: string;
    REVEALING: string;
    ACCEPTED: string;
    UNDETERMINED: string;
    FINALIZED: string;
    CANCELED: string;
    APPEAL_REVEALING: string;
    APPEAL_COMMITTING: string;
    READY_TO_FINALIZE: string;
    VALIDATORS_TIMEOUT: string;
    LEADER_TIMEOUT: string;
};
declare const DECIDED_STATES: TransactionStatus[];
declare function isDecidedState(status: string): boolean;
declare const transactionResultNumberToName: {
    "0": TransactionResult;
    "1": TransactionResult;
    "2": TransactionResult;
    "3": TransactionResult;
    "4": TransactionResult;
    "5": TransactionResult;
    "6": TransactionResult;
    "7": TransactionResult;
};
declare const TransactionResultNameToNumber: {
    IDLE: string;
    AGREE: string;
    DISAGREE: string;
    TIMEOUT: string;
    DETERMINISTIC_VIOLATION: string;
    NO_MAJORITY: string;
    MAJORITY_AGREE: string;
    MAJORITY_DISAGREE: string;
};
declare enum ExecutionResult {
    NOT_VOTED = "NOT_VOTED",
    FINISHED_WITH_RETURN = "FINISHED_WITH_RETURN",
    FINISHED_WITH_ERROR = "FINISHED_WITH_ERROR"
}
declare const executionResultNumberToName: {
    "0": ExecutionResult;
    "1": ExecutionResult;
    "2": ExecutionResult;
};
declare enum VoteType {
    NOT_VOTED = "NOT_VOTED",
    AGREE = "AGREE",
    DISAGREE = "DISAGREE",
    TIMEOUT = "TIMEOUT",
    DETERMINISTIC_VIOLATION = "DETERMINISTIC_VIOLATION"
}
declare const voteTypeNumberToName: {
    "0": VoteType;
    "1": VoteType;
    "2": VoteType;
    "3": VoteType;
    "4": VoteType;
};
declare const voteTypeNameToNumber: {
    NOT_VOTED: string;
    AGREE: string;
    DISAGREE: string;
    TIMEOUT: string;
    DETERMINISTIC_VIOLATION: string;
};
type TransactionType = "deploy" | "call";
declare enum TransactionHashVariant {
    LATEST_FINAL = "latest-final",
    LATEST_NONFINAL = "latest-nonfinal"
}
type DecodedDeployData = {
    code?: Hex;
    constructorArgs?: any;
    leaderOnly?: boolean;
    type?: TransactionType;
    contractAddress?: Address;
};
type DecodedCallData = {
    callData?: any;
    leaderOnly?: boolean;
    type: TransactionType;
};
type DebugTraceResult = {
    transaction_id: string;
    result_code: number;
    return_data: string;
    stdout: string;
    stderr: string;
    genvm_log: Record<string, unknown>[];
    storage_proof: string;
    run_time: string;
    eq_outputs: string[];
    stored_at?: string;
};
interface LeaderReceipt {
    calldata: string;
    class_name: string;
    contract_state: string;
    eq_outputs: Record<string, unknown>;
    error: string | null;
    execution_result: string;
    gas_used: number;
    mode: string;
    node_config: Record<string, unknown>;
    pending_transactions: unknown[];
    vote: string;
    result: string;
}
type GenLayerTransaction = {
    currentTimestamp?: string;
    from_address?: Address;
    sender?: Address;
    to_address?: Address;
    recipient?: Address;
    numOfInitialValidators?: string;
    txSlot?: string;
    createdTimestamp?: string;
    lastVoteTimestamp?: string;
    randomSeed?: Hash;
    result?: number;
    resultName?: TransactionResult;
    txExecutionResult?: number;
    txExecutionResultName?: ExecutionResult;
    data?: Record<string, unknown>;
    txData?: Hex;
    txDataDecoded?: DecodedDeployData | DecodedCallData;
    txReceipt?: Hash;
    messages?: unknown[];
    queueType?: number;
    queuePosition?: string;
    activator?: Address;
    lastLeader?: Address;
    status?: TransactionStatus | number;
    statusName?: TransactionStatus;
    hash?: TransactionHash;
    txId?: TransactionHash;
    readStateBlockRange?: {
        activationBlock: string;
        processingBlock: string;
        proposalBlock: string;
    };
    numOfRounds?: string;
    lastRound?: {
        round: string;
        leaderIndex: string;
        votesCommitted: string;
        votesRevealed: string;
        appealBond: string;
        rotationsLeft: string;
        result: number;
        roundValidators: Address[];
        validatorVotesHash: Hash[];
        validatorVotes: number[];
        validatorVotesName: VoteType[];
    };
    consensus_data?: {
        final: boolean;
        leader_receipt?: LeaderReceipt[];
        validators?: Record<string, unknown>[];
        votes?: Record<string, string>;
    };
    nonce?: number;
    value?: number;
    type?: number;
    gaslimit?: bigint;
    created_at?: Date;
    r?: number;
    s?: number;
    v?: number;
};
type GenLayerRawTransaction = {
    currentTimestamp: bigint;
    sender: Address;
    recipient: Address;
    numOfInitialValidators?: bigint;
    initialRotations?: bigint;
    txSlot: bigint;
    createdTimestamp: bigint;
    lastVoteTimestamp: bigint;
    randomSeed: Hash;
    result: number;
    txExecutionResult?: number;
    txData: Hex | undefined | null;
    txReceipt: Hash;
    messages: unknown[];
    queueType: number;
    queuePosition: bigint;
    activator: Address;
    lastLeader: Address;
    status: number;
    txId: Hash;
    readStateBlockRange: {
        activationBlock: bigint;
        processingBlock: bigint;
        proposalBlock: bigint;
    };
    numOfRounds: bigint;
    lastRound: {
        round: bigint;
        leaderIndex: bigint;
        votesCommitted: bigint;
        votesRevealed: bigint;
        appealBond: bigint;
        rotationsLeft: bigint;
        result: number;
        roundValidators: Address[];
        validatorVotesHash: Hash[];
        validatorVotes: number[];
    };
};

type ContractParamsArraySchemaElement = ContractParamsSchema | {
    $rep: ContractParamsSchema;
};
type ContractParamsSchema = "null" | "bool" | "int" | "address" | "string" | "bytes" | "any" | "array" | "dict" | {
    $or: ContractParamsSchema[];
} | {
    $dict: ContractParamsSchema;
} | {
    [key: string]: ContractParamsSchema;
} | ContractParamsArraySchemaElement[];
interface ContractMethodBase {
    params: [string, ContractParamsSchema][];
    kwparams: {
        [key: string]: ContractParamsSchema;
    };
}
interface ContractMethod extends ContractMethodBase {
    ret: ContractParamsSchema;
    readonly: boolean;
    payable?: boolean;
}
type ContractSchema = {
    ctor: ContractMethodBase;
    methods: Record<string, ContractMethod>;
};

type Network = "localnet" | "studionet" | "testnetAsimov" | "testnetBradbury" | "mainnet";

type SnapSource = 'npm' | 'local';

type MetaMaskClientResult = {
    isFlask: boolean;
    installedSnaps: Record<string, any>;
    isGenLayerSnapInstalled: boolean;
};

declare const VALIDATOR_WALLET_ABI: readonly [{
    readonly name: "NotOperator";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InvalidAddress";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "TransferFailed";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "OperatorTransferNotReady";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "NoPendingOperator";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "OwnableUnauthorizedAccount";
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
    }];
}, {
    readonly name: "OwnableInvalidOwner";
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
    }];
}, {
    readonly name: "operator";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
}, {
    readonly name: "owner";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
}, {
    readonly name: "getIdentity";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "moniker";
            readonly type: "string";
        }, {
            readonly name: "logoUri";
            readonly type: "string";
        }, {
            readonly name: "website";
            readonly type: "string";
        }, {
            readonly name: "description";
            readonly type: "string";
        }, {
            readonly name: "email";
            readonly type: "string";
        }, {
            readonly name: "twitter";
            readonly type: "string";
        }, {
            readonly name: "telegram";
            readonly type: "string";
        }, {
            readonly name: "github";
            readonly type: "string";
        }, {
            readonly name: "extraCid";
            readonly type: "bytes";
        }];
    }];
}, {
    readonly name: "setOperator";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_operator";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setIdentity";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "moniker";
        readonly type: "string";
    }, {
        readonly name: "logoUri";
        readonly type: "string";
    }, {
        readonly name: "website";
        readonly type: "string";
    }, {
        readonly name: "description";
        readonly type: "string";
    }, {
        readonly name: "email";
        readonly type: "string";
    }, {
        readonly name: "twitter";
        readonly type: "string";
    }, {
        readonly name: "telegram";
        readonly type: "string";
    }, {
        readonly name: "github";
        readonly type: "string";
    }, {
        readonly name: "extraCid";
        readonly type: "bytes";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "validatorDeposit";
    readonly type: "function";
    readonly stateMutability: "payable";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
}, {
    readonly name: "validatorExit";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_shares";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "validatorClaim";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
}, {
    readonly name: "initiateOperatorTransfer";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_newOperator";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "completeOperatorTransfer";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
}, {
    readonly name: "cancelOperatorTransfer";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
}, {
    readonly name: "getPendingOperator";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "getOperator";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
}];
declare const STAKING_ABI: readonly [{
    readonly name: "BurnTransferFailed";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "DeepthoughtCallFailed";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "DelegatorBelowMinimumStake";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "DelegatorExitExceedsShares";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "DelegatorExitWouldBeBelowMinimum";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "DelegatorMayNotJoinTwoValidatorsSimultaneously";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "DelegatorMayNotJoinWithZeroValue";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "DelegatorMustExitAllWhenBelowMinimum";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "EpochAdvanceNotReady";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "EpochAlreadyFinalized";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "EpochNotFinalized";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "EpochNotFinished";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "FailedTransfer";
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "validator";
        readonly type: "address";
    }];
}, {
    readonly name: "InflationAlreadyInitialized";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InflationAlreadyReceived";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InflationInvalidAmount";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InsufficientInflationFunds";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InvalidAtEpoch";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "InvalidOperatorAddress";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "MaxNumberOfValidatorsReached";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "MaxValidatorsCannotBeZero";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "NFTMinterCallFailed";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "NFTMinterNotConfigured";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "NoBurning";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "NumberOfValidatorsExceedsAvailable";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "OnlyGEN";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "OnlyIdleness";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "OnlyIdlenessOrTribunal";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "OnlyTransactions";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "OnlyTransactionsOrTribunal";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "OnlyTribunal";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "OperatorAlreadyAssigned";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "PendingTribunals";
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "epoch";
        readonly type: "uint256";
    }];
}, {
    readonly name: "PreviousEpochNotFinalizable";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ReductionFactorCannotBeZero";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ValidatorAlreadyJoined";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ValidatorBelowMinimumStake";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ValidatorExitExceedsShares";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ValidatorMayNotBeDelegator";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ValidatorMayNotDepositZeroValue";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ValidatorMayNotJoinWithZeroValue";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ValidatorMustNotBeDelegator";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ValidatorNotActive";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ValidatorNotJoined";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ValidatorWithdrawalExceedsStake";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ValidatorsConsumed";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "ValidatorsUnavailable";
    readonly type: "error";
    readonly inputs: readonly [];
}, {
    readonly name: "AllValidatorBansRemoved";
    readonly type: "event";
    readonly inputs: readonly [];
}, {
    readonly name: "BurnFailed";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "BurnToL1";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "DelegatorClaim";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "delegator";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "DelegatorExit";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "validator";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "delegator";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "DelegatorJoin";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "validator";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "delegator";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "EpochAdvance";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "epoch";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "EpochFinalize";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "epoch";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "EpochHasPendingTribunals";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "epoch";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "EpochZeroEnded";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "timestamp";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "FeesReceived";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "InflationInitiated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "timestamp";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "InflationReceived";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "epoch";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "QuarantinesCleanedUp";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "startIndex";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "processedCount";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "nextIndex";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "SetDeepthought";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "deepthought";
        readonly type: "address";
        readonly indexed: false;
    }];
}, {
    readonly name: "SetDelegatorMinimumStake";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "delegatorMinStake";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "SetEpochMinDuration";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "epochMinDuration";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "SetEpochMinDurationThreshold";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "epochMinDurationThreshold";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "SetEpochZeroMinDuration";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "epochZeroMinDuration";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "SetGen";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "gen";
        readonly type: "address";
        readonly indexed: false;
    }];
}, {
    readonly name: "SetMaxValidators";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "maxValidators";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "SetReductionFactor";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "reductionFactor";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "SetStakingInvariant";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "stakingInvariant";
        readonly type: "address";
        readonly indexed: false;
    }];
}, {
    readonly name: "SetTransactionFeesManager";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "transactionFeesManager";
        readonly type: "address";
        readonly indexed: false;
    }];
}, {
    readonly name: "SetUnbondingPeriods";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "delegatorUnbondingPeriod";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "validatorUnbondingPeriod";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "SetValidatorMinimumStake";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "validatorMinStake";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "SetValidatorWeightParams";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "alpha";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "beta";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "ValidatorBanRemoved";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "validator";
        readonly type: "address";
        readonly indexed: false;
    }];
}, {
    readonly name: "ValidatorBannedDeterministic";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "validator";
        readonly type: "address";
        readonly indexed: false;
    }];
}, {
    readonly name: "ValidatorBannedIdleness";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "validator";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "bannedAt";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "bannedUntil";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "ValidatorClaim";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "validator";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "ValidatorDeposit";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "validator";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "ValidatorExit";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "validator";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "ValidatorJoin";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "operator";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "validator";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "ValidatorPrime";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "validator";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "epoch";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "validatorRewards";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "delegatorRewards";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "feeRewards";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "feePenalties";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "ValidatorQuarantineRemoved";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "validator";
        readonly type: "address";
        readonly indexed: false;
    }];
}, {
    readonly name: "ValidatorQuarantineRepealed";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "validator";
        readonly type: "address";
        readonly indexed: false;
    }];
}, {
    readonly name: "ValidatorQuarantined";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "validator";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "quarantinedAt";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "ValidatorSlash";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "validator";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "validatorSlashing";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "delegatorSlashing";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "epoch";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "ValidatorsRegistered";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "count";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}, {
    readonly name: "activeValidators";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address[]";
    }];
}, {
    readonly name: "activeValidatorsCount";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "activeWeights";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256[]";
    }];
}, {
    readonly name: "adminRegisterValidators";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "validatorAddresses";
        readonly type: "address[]";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "burning";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "canAdvance";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
}, {
    readonly name: "deepthoughtInflation";
    readonly type: "function";
    readonly stateMutability: "pure";
    readonly inputs: readonly [{
        readonly name: "_inflation";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "delegatorClaim";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_delegator";
        readonly type: "address";
    }, {
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "delegatorDeposit";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_delegator";
        readonly type: "address";
    }, {
        readonly name: "_validator";
        readonly type: "address";
    }, {
        readonly name: "_index";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "claim_";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "quantity";
            readonly type: "uint256";
        }, {
            readonly name: "commit";
            readonly type: "uint256";
        }];
    }, {
        readonly name: "commit_";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "input";
            readonly type: "uint256";
        }, {
            readonly name: "output";
            readonly type: "uint256";
        }, {
            readonly name: "epoch";
            readonly type: "uint256";
        }, {
            readonly name: "linkToNextCommit";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly name: "delegatorDepositByEpoch";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_delegator";
        readonly type: "address";
    }, {
        readonly name: "_validator";
        readonly type: "address";
    }, {
        readonly name: "_epoch";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "commit_";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "input";
            readonly type: "uint256";
        }, {
            readonly name: "output";
            readonly type: "uint256";
        }, {
            readonly name: "epoch";
            readonly type: "uint256";
        }, {
            readonly name: "linkToNextCommit";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly name: "delegatorDepositLen";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_delegator";
        readonly type: "address";
    }, {
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "delegatorExit";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }, {
        readonly name: "_amount";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "delegatorJoin";
    readonly type: "function";
    readonly stateMutability: "payable";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "delegatorWithdrawal";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_delegator";
        readonly type: "address";
    }, {
        readonly name: "_validator";
        readonly type: "address";
    }, {
        readonly name: "_index";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "claim_";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "quantity";
            readonly type: "uint256";
        }, {
            readonly name: "commit";
            readonly type: "uint256";
        }];
    }, {
        readonly name: "commit_";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "input";
            readonly type: "uint256";
        }, {
            readonly name: "output";
            readonly type: "uint256";
        }, {
            readonly name: "epoch";
            readonly type: "uint256";
        }, {
            readonly name: "linkToNextCommit";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly name: "delegatorWithdrawalByEpoch";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_delegator";
        readonly type: "address";
    }, {
        readonly name: "_validator";
        readonly type: "address";
    }, {
        readonly name: "_epoch";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "commit_";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "input";
            readonly type: "uint256";
        }, {
            readonly name: "output";
            readonly type: "uint256";
        }, {
            readonly name: "epoch";
            readonly type: "uint256";
        }, {
            readonly name: "linkToNextCommit";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly name: "delegatorWithdrawalLen";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_delegator";
        readonly type: "address";
    }, {
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "developerInflation";
    readonly type: "function";
    readonly stateMutability: "pure";
    readonly inputs: readonly [{
        readonly name: "_inflation";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "epoch";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "epochAdvance";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
}, {
    readonly name: "epochEven";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "start";
        readonly type: "uint256";
    }, {
        readonly name: "end";
        readonly type: "uint256";
    }, {
        readonly name: "inflation";
        readonly type: "uint256";
    }, {
        readonly name: "weight";
        readonly type: "uint256";
    }, {
        readonly name: "weightDeposit";
        readonly type: "uint256";
    }, {
        readonly name: "weightWithdrawal";
        readonly type: "uint256";
    }, {
        readonly name: "vcount";
        readonly type: "uint256";
    }, {
        readonly name: "claimed";
        readonly type: "uint256";
    }, {
        readonly name: "stakeDeposit";
        readonly type: "uint256";
    }, {
        readonly name: "stakeWithdrawal";
        readonly type: "uint256";
    }, {
        readonly name: "slashed";
        readonly type: "uint256";
    }];
}, {
    readonly name: "epochFinalize";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
}, {
    readonly name: "epochFinalizeImmediate";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
}, {
    readonly name: "epochInflation";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_epoch";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "epochMinDuration";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "epochOdd";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "start";
        readonly type: "uint256";
    }, {
        readonly name: "end";
        readonly type: "uint256";
    }, {
        readonly name: "inflation";
        readonly type: "uint256";
    }, {
        readonly name: "weight";
        readonly type: "uint256";
    }, {
        readonly name: "weightDeposit";
        readonly type: "uint256";
    }, {
        readonly name: "weightWithdrawal";
        readonly type: "uint256";
    }, {
        readonly name: "vcount";
        readonly type: "uint256";
    }, {
        readonly name: "claimed";
        readonly type: "uint256";
    }, {
        readonly name: "stakeDeposit";
        readonly type: "uint256";
    }, {
        readonly name: "stakeWithdrawal";
        readonly type: "uint256";
    }, {
        readonly name: "slashed";
        readonly type: "uint256";
    }];
}, {
    readonly name: "epochZeroMinDuration";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "finalized";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "getActivatorForSeed";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_randomSeed";
        readonly type: "bytes32";
    }, {
        readonly name: "_txCreatedTimestamp";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
}, {
    readonly name: "getAllBannedValidators";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_startIndex";
        readonly type: "uint256";
    }, {
        readonly name: "_size";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "validatorList";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "validator";
            readonly type: "address";
        }, {
            readonly name: "untilEpochBanned";
            readonly type: "uint256";
        }, {
            readonly name: "permanentlyBanned";
            readonly type: "bool";
        }];
    }];
}, {
    readonly name: "getAllBannedValidatorsForEpoch";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_epoch";
        readonly type: "uint256";
    }, {
        readonly name: "_startIndex";
        readonly type: "uint256";
    }, {
        readonly name: "_size";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "validatorList";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "validator";
            readonly type: "address";
        }, {
            readonly name: "untilEpochBanned";
            readonly type: "uint256";
        }, {
            readonly name: "permanentlyBanned";
            readonly type: "bool";
        }];
    }];
}, {
    readonly name: "getAllQuarantinedValidators";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_startIndex";
        readonly type: "uint256";
    }, {
        readonly name: "_size";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "validatorList";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "validator";
            readonly type: "address";
        }, {
            readonly name: "untilEpochBanned";
            readonly type: "uint256";
        }, {
            readonly name: "permanentlyBanned";
            readonly type: "bool";
        }];
    }];
}, {
    readonly name: "getAllQuarantinedValidatorsForEpoch";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_epoch";
        readonly type: "uint256";
    }, {
        readonly name: "_startIndex";
        readonly type: "uint256";
    }, {
        readonly name: "_size";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "validatorList";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "validator";
            readonly type: "address";
        }, {
            readonly name: "untilEpochBanned";
            readonly type: "uint256";
        }, {
            readonly name: "permanentlyBanned";
            readonly type: "bool";
        }];
    }];
}, {
    readonly name: "getPendingDelegatorDeposits";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_delegator";
        readonly type: "address";
    }, {
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "total";
        readonly type: "uint256";
    }];
}, {
    readonly name: "getPendingDelegatorWithdrawals";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_delegator";
        readonly type: "address";
    }, {
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "total";
        readonly type: "uint256";
    }];
}, {
    readonly name: "getPendingValidatorDeposits";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "total";
        readonly type: "uint256";
    }];
}, {
    readonly name: "getPendingValidatorWithdrawals";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "total";
        readonly type: "uint256";
    }];
}, {
    readonly name: "getValidatorDelegators";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address[]";
    }];
}, {
    readonly name: "getValidatorDelegatorsPaginated";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }, {
        readonly name: "_startIndex";
        readonly type: "uint256";
    }, {
        readonly name: "_pageSize";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address[]";
    }];
}, {
    readonly name: "getValidatorQuarantineList";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address[]";
    }];
}, {
    readonly name: "getValidatorsJoined";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_startIndex";
        readonly type: "uint256";
    }, {
        readonly name: "_pageSize";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address[]";
    }];
}, {
    readonly name: "idlenessBan";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }, {
        readonly name: "_at";
        readonly type: "uint256";
    }, {
        readonly name: "_until";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "idlenessBanBatch";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_validators";
        readonly type: "address[]";
    }, {
        readonly name: "_quarantinedAt";
        readonly type: "uint256";
    }, {
        readonly name: "_quarantinedUntil";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "inflationEpoch";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "inflationInit";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_inflationOnset";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "inflationReceive";
    readonly type: "function";
    readonly stateMutability: "payable";
    readonly inputs: readonly [{
        readonly name: "_epoch";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "isDelegatorOfValidator";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }, {
        readonly name: "_delegator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
}, {
    readonly name: "isValidator";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
}, {
    readonly name: "isValidatorBanned";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
}, {
    readonly name: "setDeepthought";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_deepthought";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setDelegatorMinimumStake";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_delegatorMinStake";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setEpochMinDuration";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_epochMinDuration";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setEpochMinDurationThreshold";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_epochMinDurationThreshold";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setEpochZeroMinDuration";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_epochZeroMinDuration";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setFinalizationPhase";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_finalizationPhase";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setGen";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_gen";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setIdlenessPhase";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_idlenessPhase";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setMaxValidators";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_maxValidators";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setReductionFactor";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_reductionFactor";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setRevealingPhase";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_revealingPhase";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setStakingInvariant";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_stakingInvariant";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setTransactionFeesManager";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_transactionFeesManager";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setUnbondingPeriods";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_delegatorUnbondingPeriod";
        readonly type: "uint256";
    }, {
        readonly name: "_validatorUnbondingPeriod";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setValidatorMinimumStake";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_validatorMinStake";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "setValidatorWeightParams";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_alpha";
        readonly type: "uint256";
    }, {
        readonly name: "_beta";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "sharesOf";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_delegator";
        readonly type: "address";
    }, {
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "stakeOf";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_delegator";
        readonly type: "address";
    }, {
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "validatorBanDeterministic";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "validatorClaim";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "validatorDelegatorCount";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "validatorDeposit";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }, {
        readonly name: "_index";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "epoch_";
        readonly type: "uint256";
    }, {
        readonly name: "commit_";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "input";
            readonly type: "uint256";
        }, {
            readonly name: "output";
            readonly type: "uint256";
        }, {
            readonly name: "epoch";
            readonly type: "uint256";
        }, {
            readonly name: "linkToNextCommit";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly name: "validatorDeposit";
    readonly type: "function";
    readonly stateMutability: "payable";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
}, {
    readonly name: "validatorDepositByEpoch";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }, {
        readonly name: "_epoch";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "commit_";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "input";
            readonly type: "uint256";
        }, {
            readonly name: "output";
            readonly type: "uint256";
        }, {
            readonly name: "epoch";
            readonly type: "uint256";
        }, {
            readonly name: "linkToNextCommit";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly name: "validatorDepositLen";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "validatorExit";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_amount";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "validatorJoin";
    readonly type: "function";
    readonly stateMutability: "payable";
    readonly inputs: readonly [{
        readonly name: "_operator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
}, {
    readonly name: "validatorJoin";
    readonly type: "function";
    readonly stateMutability: "payable";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
}, {
    readonly name: "validatorPrime";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "validatorQuarantine";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }, {
        readonly name: "_at";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "validatorQuarantineCount";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "validatorQuarantineRepeal";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "validatorSelection";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_seed";
        readonly type: "bytes32";
    }, {
        readonly name: "_slot";
        readonly type: "uint256";
    }, {
        readonly name: "_epoch";
        readonly type: "uint256";
    }, {
        readonly name: "_txCreatedTimestamp";
        readonly type: "uint256";
    }, {
        readonly name: "_number";
        readonly type: "uint256";
    }, {
        readonly name: "_weighted";
        readonly type: "bool";
    }, {
        readonly name: "_consumed";
        readonly type: "address[]";
    }];
    readonly outputs: readonly [{
        readonly name: "leader_";
        readonly type: "uint256";
    }, {
        readonly name: "validators_";
        readonly type: "address[]";
    }, {
        readonly name: "penalized_";
        readonly type: "address[]";
    }];
}, {
    readonly name: "validatorSelection";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_seed";
        readonly type: "bytes32";
    }, {
        readonly name: "_slot";
        readonly type: "uint256";
    }, {
        readonly name: "_txCreatedTimestamp";
        readonly type: "uint256";
    }, {
        readonly name: "_number";
        readonly type: "uint256";
    }, {
        readonly name: "_weighted";
        readonly type: "bool";
    }, {
        readonly name: "_consumed";
        readonly type: "address[]";
    }];
    readonly outputs: readonly [{
        readonly name: "leader_";
        readonly type: "uint256";
    }, {
        readonly name: "validators_";
        readonly type: "address[]";
    }, {
        readonly name: "penalized_";
        readonly type: "address[]";
    }];
}, {
    readonly name: "validatorView";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "left";
            readonly type: "address";
        }, {
            readonly name: "right";
            readonly type: "address";
        }, {
            readonly name: "parent";
            readonly type: "address";
        }, {
            readonly name: "eBanned";
            readonly type: "uint256";
        }, {
            readonly name: "ePrimed";
            readonly type: "uint256";
        }, {
            readonly name: "vStake";
            readonly type: "uint256";
        }, {
            readonly name: "vShares";
            readonly type: "uint256";
        }, {
            readonly name: "dStake";
            readonly type: "uint256";
        }, {
            readonly name: "dShares";
            readonly type: "uint256";
        }, {
            readonly name: "vDeposit";
            readonly type: "uint256";
        }, {
            readonly name: "vWithdrawal";
            readonly type: "uint256";
        }, {
            readonly name: "live";
            readonly type: "bool";
        }];
    }];
}, {
    readonly name: "validatorViewPrePrimed";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "left";
            readonly type: "address";
        }, {
            readonly name: "right";
            readonly type: "address";
        }, {
            readonly name: "parent";
            readonly type: "address";
        }, {
            readonly name: "eBanned";
            readonly type: "uint256";
        }, {
            readonly name: "ePrimed";
            readonly type: "uint256";
        }, {
            readonly name: "vStake";
            readonly type: "uint256";
        }, {
            readonly name: "vShares";
            readonly type: "uint256";
        }, {
            readonly name: "dStake";
            readonly type: "uint256";
        }, {
            readonly name: "dShares";
            readonly type: "uint256";
        }, {
            readonly name: "vDeposit";
            readonly type: "uint256";
        }, {
            readonly name: "vWithdrawal";
            readonly type: "uint256";
        }, {
            readonly name: "live";
            readonly type: "bool";
        }];
    }];
}, {
    readonly name: "validatorViewPrimed";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "left";
            readonly type: "address";
        }, {
            readonly name: "right";
            readonly type: "address";
        }, {
            readonly name: "parent";
            readonly type: "address";
        }, {
            readonly name: "eBanned";
            readonly type: "uint256";
        }, {
            readonly name: "ePrimed";
            readonly type: "uint256";
        }, {
            readonly name: "vStake";
            readonly type: "uint256";
        }, {
            readonly name: "vShares";
            readonly type: "uint256";
        }, {
            readonly name: "dStake";
            readonly type: "uint256";
        }, {
            readonly name: "dShares";
            readonly type: "uint256";
        }, {
            readonly name: "vDeposit";
            readonly type: "uint256";
        }, {
            readonly name: "vWithdrawal";
            readonly type: "uint256";
        }, {
            readonly name: "live";
            readonly type: "bool";
        }];
    }];
}, {
    readonly name: "validatorWithdrawal";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }, {
        readonly name: "_index";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "epoch_";
        readonly type: "uint256";
    }, {
        readonly name: "commit_";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "input";
            readonly type: "uint256";
        }, {
            readonly name: "output";
            readonly type: "uint256";
        }, {
            readonly name: "epoch";
            readonly type: "uint256";
        }, {
            readonly name: "linkToNextCommit";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly name: "validatorWithdrawalByEpoch";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }, {
        readonly name: "_epoch";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "commit_";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "input";
            readonly type: "uint256";
        }, {
            readonly name: "output";
            readonly type: "uint256";
        }, {
            readonly name: "epoch";
            readonly type: "uint256";
        }, {
            readonly name: "linkToNextCommit";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly name: "validatorWithdrawalLen";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "_validator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "validatorMinStake";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "delegatorMinStake";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "validatorsCount";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "validatorsJoinedCount";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "validatorsRoot";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
}];

type WalletClientWithAccount = Client<Transport, Chain, Account>;
type StakingKeyedClient = {
    public: PublicClient;
    wallet: WalletClientWithAccount;
};
type StakingContract = GetContractReturnType<typeof STAKING_ABI, StakingKeyedClient, Address>;
interface ValidatorView {
    left: Address;
    right: Address;
    parent: Address;
    eBanned: bigint;
    ePrimed: bigint;
    vStake: bigint;
    vShares: bigint;
    dStake: bigint;
    dShares: bigint;
    vDeposit: bigint;
    vWithdrawal: bigint;
    live: boolean;
}
interface ValidatorIdentity {
    moniker: string;
    logoUri: string;
    website: string;
    description: string;
    email: string;
    twitter: string;
    telegram: string;
    github: string;
    extraCid: string;
}
interface ValidatorInfo {
    address: Address;
    owner: Address;
    operator: Address;
    vStake: string;
    vStakeRaw: bigint;
    vShares: bigint;
    dStake: string;
    dStakeRaw: bigint;
    dShares: bigint;
    vDeposit: string;
    vDepositRaw: bigint;
    vWithdrawal: string;
    vWithdrawalRaw: bigint;
    ePrimed: bigint;
    live: boolean;
    banned: boolean;
    bannedEpoch?: bigint;
    needsPriming: boolean;
    identity?: ValidatorIdentity;
    pendingDeposits: PendingDeposit[];
    pendingWithdrawals: PendingWithdrawal[];
}
interface WithdrawalCommit {
    input: bigint;
    output: bigint;
    epoch: bigint;
    linkToNextCommit: bigint;
}
interface PendingDeposit {
    epoch: bigint;
    stake: string;
    stakeRaw: bigint;
    shares: bigint;
}
interface PendingWithdrawal {
    epoch: bigint;
    shares: bigint;
    stake: string;
    stakeRaw: bigint;
}
interface BannedValidatorInfo {
    validator: Address;
    untilEpoch: bigint;
    permanentlyBanned: boolean;
}
interface StakeInfo {
    delegator: Address;
    validator: Address;
    shares: bigint;
    stake: string;
    stakeRaw: bigint;
    pendingDeposits: PendingDeposit[];
    pendingWithdrawals: PendingWithdrawal[];
}
interface EpochData {
    start: bigint;
    end: bigint;
    inflation: bigint;
    weight: bigint;
    weightDeposit: bigint;
    weightWithdrawal: bigint;
    vcount: bigint;
    claimed: bigint;
    stakeDeposit: bigint;
    stakeWithdrawal: bigint;
    slashed: bigint;
}
interface EpochInfo {
    currentEpoch: bigint;
    lastFinalizedEpoch: bigint;
    activeValidatorsCount: bigint;
    epochMinDuration: bigint;
    nextEpochEstimate: Date | null;
    validatorMinStake: string;
    validatorMinStakeRaw: bigint;
    delegatorMinStake: string;
    delegatorMinStakeRaw: bigint;
}
interface StakingTransactionResult {
    transactionHash: `0x${string}`;
    blockNumber: bigint;
    gasUsed: bigint;
}
interface ValidatorJoinResult extends StakingTransactionResult {
    validatorWallet: Address;
    operator: Address;
    amount: string;
    amountRaw: bigint;
}
interface DelegatorJoinResult extends StakingTransactionResult {
    validator: Address;
    delegator: Address;
    amount: string;
    amountRaw: bigint;
}
interface ValidatorJoinOptions {
    amount: bigint | string;
    operator?: Address;
}
interface ValidatorDepositOptions {
    amount: bigint | string;
    validator: Address;
}
interface ValidatorExitOptions {
    shares: bigint | string;
    validator: Address;
}
interface ValidatorClaimOptions {
    validator?: Address;
}
interface ValidatorPrimeOptions {
    validator: Address;
}
interface SetOperatorOptions {
    validator: Address;
    operator: Address;
}
interface SetIdentityOptions {
    validator: Address;
    moniker: string;
    logoUri?: string;
    website?: string;
    description?: string;
    email?: string;
    twitter?: string;
    telegram?: string;
    github?: string;
    extraCid?: string;
}
interface DelegatorJoinOptions {
    validator: Address;
    amount: bigint | string;
}
interface DelegatorExitOptions {
    validator: Address;
    shares: bigint | string;
}
interface DelegatorClaimOptions {
    validator: Address;
    delegator?: Address;
}
interface StakingActions {
    validatorJoin: (options: ValidatorJoinOptions) => Promise<ValidatorJoinResult>;
    validatorDeposit: (options: ValidatorDepositOptions) => Promise<StakingTransactionResult>;
    validatorExit: (options: ValidatorExitOptions) => Promise<StakingTransactionResult>;
    validatorClaim: (options?: ValidatorClaimOptions) => Promise<StakingTransactionResult & {
        claimedAmount: bigint;
    }>;
    delegatorJoin: (options: DelegatorJoinOptions) => Promise<DelegatorJoinResult>;
    delegatorExit: (options: DelegatorExitOptions) => Promise<StakingTransactionResult>;
    delegatorClaim: (options: DelegatorClaimOptions) => Promise<StakingTransactionResult>;
    isValidator: (address: Address) => Promise<boolean>;
    getValidatorInfo: (validator: Address) => Promise<ValidatorInfo>;
    getStakeInfo: (delegator: Address, validator: Address) => Promise<StakeInfo>;
    getEpochInfo: () => Promise<EpochInfo>;
    getEpochData: (epochNumber: bigint) => Promise<EpochData>;
    getActiveValidators: () => Promise<Address[]>;
    getActiveValidatorsCount: () => Promise<bigint>;
    getStakingContract: () => StakingContract;
    parseStakingAmount: (amount: string | bigint) => bigint;
    formatStakingAmount: (amount: bigint) => string;
}

type GenLayerMethod = {
    method: "sim_fundAccount";
    params: [address: Address, amount: number];
} | {
    method: "eth_getTransactionByHash";
    params: [hash: TransactionHash];
} | {
    method: "eth_call";
    params: [requestParams: any, blockNumberOrHash: string];
} | {
    method: "eth_sendRawTransaction";
    params: [signedTransaction: string];
} | {
    method: "gen_getContractSchema";
    params: [address: Address] | [{
        address: Address;
    }] | [{
        code: string;
    }];
} | {
    method: "gen_getContractSchemaForCode";
    params: [contractCode: string];
} | {
    method: "gen_getContractCode";
    params: [address: Address] | [{
        address: Address;
    }];
} | {
    method: "sim_getTransactionsForAddress";
    params: [address: Address, filter?: "all" | "from" | "to"];
} | {
    method: "eth_getTransactionCount";
    params: [address: Address, block: string];
} | {
    method: "eth_estimateGas";
    params: [transactionParams: any];
} | {
    method: "gen_call";
    params: [requestParams: any];
} | {
    method: "sim_cancelTransaction";
    params: [hash: TransactionHash, signature?: string, adminKey?: string];
};
type GenLayerClient<TGenLayerChain extends GenLayerChain> = Omit<Client<Transport, TGenLayerChain>, "getTransaction" | "readContract"> & Omit<WalletActions<TGenLayerChain>, "deployContract" | "writeContract"> & Omit<PublicActions<Transport, TGenLayerChain>, "readContract" | "getTransaction" | "waitForTransactionReceipt"> & {
    request: Client<Transport, TGenLayerChain>["request"] & {
        <TMethod extends GenLayerMethod>(args: Extract<GenLayerMethod, {
            method: TMethod["method"];
        }>): Promise<unknown>;
    };
    readContract: <RawReturn extends boolean | undefined>(args: {
        account?: Account;
        address: Address;
        functionName: string;
        args?: CalldataEncodable[];
        kwargs?: Map<string, CalldataEncodable> | {
            [key: string]: CalldataEncodable;
        };
        rawReturn?: RawReturn;
        jsonSafeReturn?: boolean;
        transactionHashVariant?: TransactionHashVariant;
    }) => Promise<RawReturn extends true ? `0x${string}` : CalldataEncodable>;
    writeContract: (args: {
        account?: Account;
        address: Address;
        functionName: string;
        args?: CalldataEncodable[];
        kwargs?: Map<string, CalldataEncodable> | {
            [key: string]: CalldataEncodable;
        };
        value: bigint;
        leaderOnly?: boolean;
        consensusMaxRotations?: number;
    }) => Promise<any>;
    simulateWriteContract: <RawReturn extends boolean | undefined>(args: {
        account?: Account;
        address: Address;
        functionName: string;
        args?: CalldataEncodable[];
        kwargs?: Map<string, CalldataEncodable> | {
            [key: string]: CalldataEncodable;
        };
        rawReturn?: RawReturn;
        leaderOnly?: boolean;
        transactionHashVariant?: TransactionHashVariant;
    }) => Promise<RawReturn extends true ? `0x${string}` : CalldataEncodable>;
    deployContract: (args: {
        account?: Account;
        code: string | Uint8Array;
        args?: CalldataEncodable[];
        kwargs?: Map<string, CalldataEncodable> | {
            [key: string]: CalldataEncodable;
        };
        leaderOnly?: boolean;
        consensusMaxRotations?: number;
    }) => Promise<`0x${string}`>;
    getTransaction: (args: {
        hash: TransactionHash;
    }) => Promise<GenLayerTransaction>;
    getCurrentNonce: (args: {
        address: Address;
    }) => Promise<number>;
    estimateTransactionGas: (transactionParams: {
        from?: Address;
        to: Address;
        data?: `0x${string}`;
        value?: bigint;
    }) => Promise<bigint>;
    waitForTransactionReceipt: (args: {
        hash: TransactionHash;
        status?: TransactionStatus;
        interval?: number;
        retries?: number;
    }) => Promise<GenLayerTransaction>;
    getContractSchema: (address: Address) => Promise<ContractSchema>;
    getContractSchemaForCode: (contractCode: string | Uint8Array) => Promise<ContractSchema>;
    getContractCode: (address: Address) => Promise<string>;
    /** @deprecated This method is deprecated. The consensus contract is now resolved from the static chain definition. */
    initializeConsensusSmartContract: (forceReset?: boolean) => Promise<void>;
    connect: (network?: Network, snapSource?: SnapSource) => Promise<void>;
    metamaskClient: (snapSource?: SnapSource) => Promise<MetaMaskClientResult>;
    getTriggeredTransactionIds: (args: {
        hash: TransactionHash;
    }) => Promise<TransactionHash[]>;
    debugTraceTransaction: (args: {
        hash: TransactionHash;
        round?: number;
    }) => Promise<DebugTraceResult>;
    getTransactionQueuePosition: (args: {
        hash: TransactionHash;
    }) => Promise<number>;
    cancelTransaction: (args: {
        hash: TransactionHash;
    }) => Promise<{
        transaction_hash: string;
        status: string;
    }>;
    getRoundNumber: (args: {
        txId: `0x${string}`;
    }) => Promise<bigint>;
    getRoundData: (args: {
        txId: `0x${string}`;
        round: bigint;
    }) => Promise<any>;
    getLastRoundData: (args: {
        txId: `0x${string}`;
    }) => Promise<any>;
    canAppeal: (args: {
        txId: `0x${string}`;
    }) => Promise<boolean>;
    appealTransaction: (args: {
        account?: Account;
        txId: `0x${string}`;
        value?: bigint;
    }) => Promise<any>;
    finalizeTransaction: (args: {
        account?: Account;
        txId: `0x${string}`;
    }) => Promise<`0x${string}`>;
    finalizeIdlenessTxs: (args: {
        account?: Account;
        txIds: readonly `0x${string}`[];
    }) => Promise<`0x${string}`>;
    getMinAppealBond: (args: {
        txId: `0x${string}`;
    }) => Promise<bigint>;
} & StakingActions;

export { type ValidatorDepositOptions as $, type SnapSource as A, type StakingContract as B, type CalldataEncodable as C, type DecodedDeployData as D, ExecutionResult as E, type ValidatorView as F, type GenLayerClient as G, type Hash as H, type ValidatorIdentity as I, type ValidatorInfo as J, type PendingWithdrawal as K, type LeaderReceipt as L, type MethodDescription as M, type Network as N, type BannedValidatorInfo as O, type PendingDeposit as P, type StakeInfo as Q, type EpochData as R, STAKING_ABI as S, type TransactionDataElement as T, type EpochInfo as U, VALIDATOR_WALLET_ABI as V, type WithdrawalCommit as W, type StakingTransactionResult as X, type ValidatorJoinResult as Y, type DelegatorJoinResult as Z, type ValidatorJoinOptions as _, type DecodedCallData as a, type ValidatorExitOptions as a0, type ValidatorClaimOptions as a1, type ValidatorPrimeOptions as a2, type SetOperatorOptions as a3, type SetIdentityOptions as a4, type DelegatorJoinOptions as a5, type DelegatorExitOptions as a6, type DelegatorClaimOptions as a7, type StakingActions as a8, type GenLayerRawTransaction as b, type GenLayerTransaction as c, type ContractSchema as d, CalldataAddress as e, type GenLayerMethod as f, type ContractParamsArraySchemaElement as g, type ContractParamsSchema as h, type ContractMethodBase as i, type ContractMethod as j, type TransactionHash as k, TransactionStatus as l, TransactionResult as m, transactionsStatusNameToNumber as n, DECIDED_STATES as o, isDecidedState as p, transactionResultNumberToName as q, TransactionResultNameToNumber as r, executionResultNumberToName as s, transactionsStatusNumberToName as t, VoteType as u, voteTypeNumberToName as v, voteTypeNameToNumber as w, type TransactionType as x, TransactionHashVariant as y, type DebugTraceResult as z };
