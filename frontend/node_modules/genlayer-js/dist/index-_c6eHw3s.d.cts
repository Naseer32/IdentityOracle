import { G as GenLayerChain } from './chains-D6DgvIVA.cjs';

declare const localnet: GenLayerChain;

declare const studionet: GenLayerChain;

declare const testnetAsimov: GenLayerChain;

declare const testnetBradbury: GenLayerChain;

declare const index_localnet: typeof localnet;
declare const index_studionet: typeof studionet;
declare const index_testnetAsimov: typeof testnetAsimov;
declare const index_testnetBradbury: typeof testnetBradbury;
declare namespace index {
  export { index_localnet as localnet, index_studionet as studionet, index_testnetAsimov as testnetAsimov, index_testnetBradbury as testnetBradbury };
}

export { testnetBradbury as a, index as i, localnet as l, studionet as s, testnetAsimov as t };
