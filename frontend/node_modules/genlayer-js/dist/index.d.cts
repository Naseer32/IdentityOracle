import * as viem from 'viem';
import { Account, Address, Hex } from 'viem';
import { G as GenLayerChain } from './chains-D6DgvIVA.cjs';
import { G as GenLayerClient, D as DecodedDeployData, a as DecodedCallData, b as GenLayerRawTransaction, c as GenLayerTransaction, C as CalldataEncodable, T as TransactionDataElement, S as STAKING_ABI, V as VALIDATOR_WALLET_ABI, d as ContractSchema } from './index-Cf770kyK.cjs';
import * as abitype from 'abitype';
import * as viem__types_types_authorization from 'viem/_types/types/authorization';
import * as viem_accounts from 'viem/accounts';
export { i as chains } from './index-_c6eHw3s.cjs';

interface ClientConfig {
    chain?: {
        id: number;
        name: string;
        rpcUrls: {
            default: {
                http: readonly string[];
            };
        };
        nativeCurrency: {
            name: string;
            symbol: string;
            decimals: number;
        };
        blockExplorers?: {
            default: {
                name: string;
                url: string;
            };
        };
    };
    endpoint?: string;
    account?: Account | Address;
    provider?: EthereumProvider;
}
/**
 * Creates a GenLayer client instance for interacting with the network.
 *
 * @param config - Client configuration options
 * @param config.chain - Chain to connect to (localnet, testnetBradbury, etc.)
 * @param config.endpoint - Custom RPC endpoint URL
 * @param config.account - Account or address for signing transactions
 * @param config.provider - EthereumProvider for wallet integration
 * @returns Configured client with contract, transaction, and staking methods
 */
declare const createClient: (config?: ClientConfig) => GenLayerClient<GenLayerChain>;

declare const generatePrivateKey: () => `0x${string}`;
declare const createAccount: (accountPrivateKey?: `0x${string}`) => {
    address: viem_accounts.Address;
    nonceManager?: viem_accounts.NonceManager | undefined;
    sign: (parameters: {
        hash: viem.Hash;
    }) => Promise<viem.Hex>;
    signAuthorization: (parameters: viem__types_types_authorization.AuthorizationRequest) => Promise<viem_accounts.SignAuthorizationReturnType>;
    signMessage: ({ message }: {
        message: viem.SignableMessage;
    }) => Promise<viem.Hex>;
    signTransaction: <serializer extends viem.SerializeTransactionFn<viem.TransactionSerializable> = viem.SerializeTransactionFn<viem.TransactionSerializable>, transaction extends Parameters<serializer>[0] = Parameters<serializer>[0]>(transaction: transaction, options?: {
        serializer?: serializer | undefined;
    } | undefined) => Promise<viem.IsNarrowable<viem.TransactionSerialized<viem.GetTransactionType<transaction>>, viem.Hex> extends true ? viem.TransactionSerialized<viem.GetTransactionType<transaction>> : viem.Hex>;
    signTypedData: <const typedData extends abitype.TypedData | Record<string, unknown>, primaryType extends keyof typedData | "EIP712Domain" = keyof typedData>(parameters: viem.TypedDataDefinition<typedData, primaryType>) => Promise<viem.Hex>;
    publicKey: viem.Hex;
    source: "privateKey";
    type: "local";
};

declare const decodeInputData: (rlpEncodedAppData: Hex | undefined | null, recipient: Address) => DecodedDeployData | DecodedCallData | null;
declare const decodeTransaction: (tx: GenLayerRawTransaction) => GenLayerTransaction;
declare const simplifyTransactionReceipt: (tx: GenLayerTransaction) => GenLayerTransaction;
declare const decodeLocalnetTransaction: (tx: GenLayerTransaction) => GenLayerTransaction;

declare function encode(data: CalldataEncodable): Uint8Array;
declare function makeCalldataObject(method: string | undefined, args: CalldataEncodable[] | undefined, kwargs: {
    [key: string]: CalldataEncodable;
} | Map<string, CalldataEncodable> | undefined): CalldataEncodable;

declare function decode(data: Uint8Array): CalldataEncodable;

declare function toString(data: CalldataEncodable): string;

declare const cd_decode: typeof decode;
declare const cd_encode: typeof encode;
declare const cd_makeCalldataObject: typeof makeCalldataObject;
declare const cd_toString: typeof toString;
declare namespace cd {
  export { cd_decode as decode, cd_encode as encode, cd_makeCalldataObject as makeCalldataObject, cd_toString as toString };
}

declare function serializeOne(data: TransactionDataElement): `0x${string}`;
declare function serialize(data: TransactionDataElement[]): `0x${string}`;

declare const tx_serialize: typeof serialize;
declare const tx_serializeOne: typeof serializeOne;
declare namespace tx {
  export { tx_serialize as serialize, tx_serializeOne as serializeOne };
}

declare const calldata: typeof cd;
declare const transactions: typeof tx;

declare const index_STAKING_ABI: typeof STAKING_ABI;
declare const index_VALIDATOR_WALLET_ABI: typeof VALIDATOR_WALLET_ABI;
declare const index_calldata: typeof calldata;
declare const index_transactions: typeof transactions;
declare namespace index {
  export { index_STAKING_ABI as STAKING_ABI, index_VALIDATOR_WALLET_ABI as VALIDATOR_WALLET_ABI, index_calldata as calldata, index_transactions as transactions };
}

/**
 * Parse staking amount. Use "gen" suffix for GEN tokens (e.g. "42gen"),
 * otherwise value is treated as wei (e.g. "42000000000000000000" = 42 GEN).
 */
declare function parseStakingAmount(amount: string | bigint): bigint;
/**
 * Format bigint amount to human-readable GEN string.
 */
declare function formatStakingAmount(amount: bigint): string;

declare function buildGenVmPositionalArgs(options: {
    schema: ContractSchema;
    functionName: string;
    valuesByParamName: Record<string, unknown>;
    strictTypes?: boolean;
}): unknown[];

export { index as abi, buildGenVmPositionalArgs, createAccount, createClient, decodeInputData, decodeLocalnetTransaction, decodeTransaction, formatStakingAmount, generatePrivateKey, parseStakingAmount, simplifyTransactionReceipt };
