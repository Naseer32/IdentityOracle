import { Chain, Address } from 'viem';

type GenLayerChain = Chain & {
    isStudio: boolean;
    consensusMainContract: {
        address: Address;
        abi: readonly unknown[];
        bytecode: string;
    } | null;
    consensusDataContract: {
        address: Address;
        abi: readonly unknown[];
        bytecode: string;
    } | null;
    stakingContract: {
        address: Address;
        abi: readonly unknown[];
    } | null;
    feeManagerContract: {
        address: Address;
        abi: readonly unknown[];
    } | null;
    roundsStorageContract: {
        address: Address;
        abi: readonly unknown[];
    } | null;
    appealsContract: {
        address: Address;
        abi: readonly unknown[];
    } | null;
    defaultNumberOfInitialValidators: number;
    defaultConsensusMaxRotations: number;
};

export type { GenLayerChain as G };
