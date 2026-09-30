import {
  STAKING_ABI,
  VALIDATOR_WALLET_ABI,
  chains_exports,
  localnet,
  studionet,
  testnetAsimov,
  testnetBradbury
} from "./chunk-XCQTIUTU.js";
import {
  CalldataAddress,
  executionResultNumberToName,
  isDecidedState,
  transactionResultNumberToName,
  transactionsStatusNameToNumber,
  transactionsStatusNumberToName,
  voteTypeNumberToName
} from "./chunk-EY35NPSE.js";
import {
  __export
} from "./chunk-MLKGABMK.js";

// src/client/client.ts
import {
  createClient as createViemClient,
  createPublicClient as createPublicViemClient,
  publicActions,
  custom,
  walletActions as walletActions2
} from "viem";

// src/accounts/actions.ts
function accountActions(client) {
  return {
    fundAccount: async ({ address, amount }) => {
      if (client.chain?.id !== localnet.id) {
        throw new Error("Client is not connected to the localnet");
      }
      return client.request({
        method: "sim_fundAccount",
        params: [address, amount]
      });
    },
    /**
     * Returns the transaction count (next nonce) for an address.
     *
     * Defaults to `"pending"` so that rapid sequential submissions from the
     * same account receive distinct nonces. Two submissions issued before the
     * first confirms would otherwise both see the same `"latest"` count and
     * collide with an "already known" or "replacement underpriced" error.
     *
     * Pass `block: "latest"` explicitly for confirmed-only state
     * (e.g. reconciliation tooling comparing against on-chain finality).
     */
    getCurrentNonce: async ({
      address,
      block = "pending"
    }) => {
      const addressToUse = address || client.account?.address;
      if (!addressToUse) {
        throw new Error("No address provided and no account is connected");
      }
      return client.request({
        method: "eth_getTransactionCount",
        params: [addressToUse, block]
      });
    }
  };
}

// src/abi/calldata/index.ts
var calldata_exports = {};
__export(calldata_exports, {
  decode: () => decode,
  encode: () => encode,
  makeCalldataObject: () => makeCalldataObject,
  toString: () => toString
});

// src/abi/calldata/consts.ts
var BITS_IN_TYPE = 3;
var TYPE_SPECIAL = 0;
var TYPE_PINT = 1;
var TYPE_NINT = 2;
var TYPE_BYTES = 3;
var TYPE_STR = 4;
var TYPE_ARR = 5;
var TYPE_MAP = 6;
var SPECIAL_NULL = 0 << BITS_IN_TYPE | TYPE_SPECIAL;
var SPECIAL_FALSE = 1 << BITS_IN_TYPE | TYPE_SPECIAL;
var SPECIAL_TRUE = 2 << BITS_IN_TYPE | TYPE_SPECIAL;
var SPECIAL_ADDR = 3 << BITS_IN_TYPE | TYPE_SPECIAL;

// src/abi/calldata/encoder.ts
function reportError(msg, data) {
  throw new Error(`invalid calldata input '${data}'`);
}
function writeNum(to, data) {
  if (data === 0n) {
    to.push(0);
    return;
  }
  while (data > 0) {
    let cur = Number(data & 0x7fn);
    data >>= 7n;
    if (data > 0) {
      cur |= 128;
    }
    to.push(cur);
  }
}
function encodeNumWithType(to, data, type) {
  const res = data << BigInt(BITS_IN_TYPE) | BigInt(type);
  writeNum(to, res);
}
function encodeNum(to, data) {
  if (data >= 0n) {
    encodeNumWithType(to, data, TYPE_PINT);
  } else {
    encodeNumWithType(to, -data - 1n, TYPE_NINT);
  }
}
function compareString(l, r) {
  for (let index = 0; index < l.length && index < r.length; index++) {
    const cur = l[index] - r[index];
    if (cur !== 0) {
      return cur;
    }
  }
  return l.length - r.length;
}
function encodeMap(to, arr) {
  const newEntries = Array.from(
    arr,
    ([k, v]) => [
      Array.from(k, (x) => x.codePointAt(0)),
      new TextEncoder().encode(k),
      v
    ]
  );
  newEntries.sort((v1, v2) => compareString(v1[0], v2[0]));
  for (let i = 1; i < newEntries.length; i++) {
    if (compareString(newEntries[i - 1][0], newEntries[i][0]) === 0) {
      throw new Error(`duplicate key '${new TextDecoder().decode(newEntries[i][1])}'`);
    }
  }
  encodeNumWithType(to, BigInt(newEntries.length), TYPE_MAP);
  for (const [, k, v] of newEntries) {
    writeNum(to, BigInt(k.length));
    for (const c of k) {
      to.push(c);
    }
    encodeImpl(to, v);
  }
}
function encodeImpl(to, data) {
  if (data === null || data === void 0) {
    to.push(SPECIAL_NULL);
    return;
  }
  if (data === true) {
    to.push(SPECIAL_TRUE);
    return;
  }
  if (data === false) {
    to.push(SPECIAL_FALSE);
    return;
  }
  switch (typeof data) {
    case "number": {
      if (!Number.isInteger(data)) {
        reportError("floats are not supported", data);
      }
      encodeNum(to, BigInt(data));
      return;
    }
    case "bigint": {
      encodeNum(to, data);
      return;
    }
    case "string": {
      const str = new TextEncoder().encode(data);
      encodeNumWithType(to, BigInt(str.length), TYPE_STR);
      for (const c of str) {
        to.push(c);
      }
      return;
    }
    case "object": {
      if (data instanceof Uint8Array) {
        encodeNumWithType(to, BigInt(data.length), TYPE_BYTES);
        for (const c of data) {
          to.push(c);
        }
      } else if (data instanceof Array) {
        encodeNumWithType(to, BigInt(data.length), TYPE_ARR);
        for (const c of data) {
          encodeImpl(to, c);
        }
      } else if (data instanceof Map) {
        encodeMap(to, data);
      } else if (data instanceof CalldataAddress) {
        to.push(SPECIAL_ADDR);
        for (const c of data.bytes) {
          to.push(c);
        }
      } else if (Object.getPrototypeOf(data) === Object.prototype) {
        encodeMap(to, Object.entries(data));
      } else {
        reportError("unknown object type", data);
      }
      return;
    }
    default:
      reportError("unknown base type", data);
  }
}
function encode(data) {
  const arr = [];
  encodeImpl(arr, data);
  return new Uint8Array(arr);
}
function makeCalldataObject(method, args, kwargs) {
  let ret = {};
  if (method) {
    ret["method"] = method;
  }
  if (args && args.length > 0) {
    ret["args"] = args;
  }
  if (kwargs) {
    if (kwargs instanceof Map) {
      if (kwargs.size > 0) {
        ret["kwargs"] = kwargs;
      }
    } else {
      let hasVal = false;
      for (const _k in kwargs) {
        hasVal = true;
        break;
      }
      if (hasVal) {
        ret["kwargs"] = kwargs;
      }
    }
  }
  return ret;
}

// src/abi/calldata/decoder.ts
function readULeb128(data, index) {
  let res = 0n;
  let accum = 0n;
  let shouldContinue = true;
  while (shouldContinue) {
    const byte = data[index.i];
    index.i++;
    const rest = byte & 127;
    res += BigInt(rest) * (1n << accum);
    accum += 7n;
    shouldContinue = byte >= 128;
  }
  return res;
}
function decodeImpl(data, index) {
  const cur = readULeb128(data, index);
  switch (cur) {
    case BigInt(SPECIAL_NULL):
      return null;
    case BigInt(SPECIAL_TRUE):
      return true;
    case BigInt(SPECIAL_FALSE):
      return false;
    case BigInt(SPECIAL_ADDR): {
      const res = data.slice(index.i, index.i + 20);
      index.i += 20;
      return new CalldataAddress(res);
    }
  }
  const type = Number(cur & 0xffn) & (1 << BITS_IN_TYPE) - 1;
  const rest = cur >> BigInt(BITS_IN_TYPE);
  switch (type) {
    case TYPE_BYTES: {
      const ret = data.slice(index.i, index.i + Number(rest));
      index.i += Number(rest);
      return ret;
    }
    case TYPE_PINT:
      return rest;
    case TYPE_NINT:
      return -1n - rest;
    case TYPE_STR: {
      const ret = data.slice(index.i, index.i + Number(rest));
      index.i += Number(rest);
      return new TextDecoder("utf-8").decode(ret);
    }
    case TYPE_ARR: {
      const ret = [];
      let elems = rest;
      while (elems > 0) {
        elems--;
        ret.push(decodeImpl(data, index));
      }
      return ret;
    }
    case TYPE_MAP: {
      const ret = /* @__PURE__ */ new Map();
      let elems = rest;
      while (elems > 0) {
        elems--;
        const strLen = Number(readULeb128(data, index));
        const key = data.slice(index.i, index.i + strLen);
        index.i += strLen;
        const keyStr = new TextDecoder("utf-8").decode(key);
        ret.set(keyStr, decodeImpl(data, index));
      }
      return ret;
    }
    default:
      throw new Error(`can't decode type from ${type} rest is ${rest} at pos ${index.i}`);
  }
}
function decode(data) {
  const index = { i: 0 };
  const res = decodeImpl(data, index);
  if (index.i !== data.length) {
    throw new Error("some data left");
  }
  return res;
}

// src/abi/calldata/string.ts
function reportError2(msg, data) {
  throw new Error(`invalid calldata input '${data}'`);
}
function toStringImplMap(data, to) {
  to.push("{");
  for (const [k, v] of data) {
    to.push(JSON.stringify(k));
    to.push(":");
    toStringImpl(v, to);
  }
  to.push("}");
}
function toStringImpl(data, to) {
  if (data === null || data === void 0) {
    to.push("null");
    return;
  }
  if (data === true) {
    to.push("true");
    return;
  }
  if (data === false) {
    to.push("false");
    return;
  }
  switch (typeof data) {
    case "number": {
      if (!Number.isInteger(data)) {
        reportError2("floats are not supported", data);
      }
      to.push(data.toString());
      return;
    }
    case "bigint": {
      to.push(data.toString());
      return;
    }
    case "string": {
      to.push(JSON.stringify(data));
      return;
    }
    case "object": {
      if (data instanceof Uint8Array) {
        to.push("b#");
        for (const b of data) {
          to.push(b.toString(16));
        }
      } else if (data instanceof Array) {
        to.push("[");
        for (const c of data) {
          toStringImpl(c, to);
          to.push(",");
        }
        to.push("]");
      } else if (data instanceof Map) {
        toStringImplMap(data.entries(), to);
      } else if (data instanceof CalldataAddress) {
        to.push("addr#");
        for (const c of data.bytes) {
          to.push(c.toString(16));
        }
      } else if (Object.getPrototypeOf(data) === Object.prototype) {
        toStringImplMap(Object.entries(data), to);
      } else {
        reportError2("unknown object type", data);
      }
      return;
    }
    default:
      reportError2("unknown base type", data);
  }
}
function toString(data) {
  const to = [];
  toStringImpl(data, to);
  return to.join("");
}

// src/abi/transactions.ts
var transactions_exports = {};
__export(transactions_exports, {
  serialize: () => serialize,
  serializeOne: () => serializeOne
});
import { toHex, toRlp } from "viem";
function serializeOne(data) {
  return toHex(data);
}
function serialize(data) {
  return toRlp(data.map(serializeOne));
}

// src/contracts/actions.ts
import { fromHex, toHex as toHex3, zeroAddress, encodeFunctionData, parseEventLogs } from "viem";

// src/abi/index.ts
var abi_exports = {};
__export(abi_exports, {
  STAKING_ABI: () => STAKING_ABI,
  VALIDATOR_WALLET_ABI: () => VALIDATOR_WALLET_ABI,
  calldata: () => calldata,
  transactions: () => transactions
});
var calldata = calldata_exports;
var transactions = transactions_exports;

// src/utils/jsonifier.ts
import { toHex as toHex2 } from "viem";
function b64ToArray(b64) {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}
function arrayToB64(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
function calldataToUserFriendlyJson(cd) {
  return {
    raw: Array.from(cd),
    readable: calldata.toString(calldata.decode(cd))
  };
}
var RESULT_CODES = /* @__PURE__ */ new Map([
  [0, "return"],
  [1, "rollback"],
  [2, "contract_error"],
  [3, "error"],
  [4, "none"],
  [5, "no_leaders"]
]);
function resultToUserFriendlyJson(cd64) {
  const raw = b64ToArray(cd64);
  const code = RESULT_CODES.get(raw[0]);
  let status;
  let payload = null;
  if (code === void 0) {
    status = "<unknown>";
  } else {
    status = code;
    if ([1, 2].includes(raw[0])) {
      payload = new TextDecoder("utf-8").decode(raw.slice(1));
    } else if (raw[0] == 0) {
      payload = calldataToUserFriendlyJson(raw.slice(1));
    }
  }
  return {
    raw: cd64,
    status,
    payload
  };
}
function toJsonSafeDeep(value) {
  return _toJsonSafeDeep(value, /* @__PURE__ */ new WeakSet());
}
function _toJsonSafeDeep(value, seen) {
  if (value === null || value === void 0) {
    return null;
  }
  const primitiveType = typeof value;
  if (primitiveType === "string" || primitiveType === "boolean" || primitiveType === "number") {
    return value;
  }
  if (primitiveType === "bigint") {
    const big = value;
    const abs = big < 0n ? -big : big;
    const maxSafe = 9007199254740991n;
    return abs <= maxSafe ? Number(big) : big.toString();
  }
  if (typeof value === "object") {
    if (seen.has(value)) {
      return null;
    }
    seen.add(value);
    if (value instanceof Uint8Array) {
      return toHex2(value);
    }
    if (value instanceof Array) {
      return value.map((v) => _toJsonSafeDeep(v, seen));
    }
    if (value instanceof Map) {
      const obj = {};
      for (const [k, v] of value.entries()) {
        obj[k] = _toJsonSafeDeep(v, seen);
      }
      return obj;
    }
    if (value instanceof CalldataAddress) {
      return toHex2(value.bytes);
    }
    if (Object.getPrototypeOf(value) === Object.prototype) {
      const obj = {};
      for (const [k, v] of Object.entries(value)) {
        obj[k] = _toJsonSafeDeep(v, seen);
      }
      return obj;
    }
  }
  return value;
}

// src/contracts/actions.ts
function extractGenCallResult(result) {
  if (typeof result === "string") {
    return `0x${result}`;
  }
  if (result && typeof result === "object" && "data" in result) {
    const obj = result;
    if (obj.status && obj.status.code !== 0) {
      throw new Error(`gen_call failed: ${obj.status.message}`);
    }
    return `0x${obj.data}`;
  }
  throw new Error(`Unexpected gen_call response: ${JSON.stringify(result)}`);
}
var contractActions = (client, publicClient) => {
  return {
    /** Retrieves the source code of a deployed contract. */
    getContractCode: async (address) => {
      const params = client.chain.isStudio ? [address] : [{ address }];
      const result = await client.request({
        method: "gen_getContractCode",
        params
      });
      const codeBytes = b64ToArray(result);
      return new TextDecoder().decode(codeBytes);
    },
    /** Gets the schema (methods and constructor) of a deployed contract. */
    getContractSchema: async (address) => {
      if (client.chain.isStudio) {
        const schema2 = await client.request({
          method: "gen_getContractSchema",
          params: [address]
        });
        return schema2;
      }
      const codeB64 = await client.request({
        method: "gen_getContractCode",
        params: [{ address }]
      });
      const schema = await client.request({
        method: "gen_getContractSchema",
        params: [{ code: codeB64 }]
      });
      return schema;
    },
    /** Generates a schema for contract code without deploying it. */
    getContractSchemaForCode: async (contractCode) => {
      if (client.chain.isStudio) {
        const schema2 = await client.request({
          method: "gen_getContractSchemaForCode",
          params: [toHex3(contractCode)]
        });
        return schema2;
      }
      const bytes = typeof contractCode === "string" ? new TextEncoder().encode(contractCode) : contractCode;
      const codeB64 = arrayToB64(bytes);
      const schema = await client.request({
        method: "gen_getContractSchema",
        params: [{ code: codeB64 }]
      });
      return schema;
    },
    /** Executes a read-only contract call without modifying state. */
    readContract: async (args) => {
      const {
        account,
        address,
        functionName,
        args: callArgs,
        kwargs,
        jsonSafeReturn = true,
        leaderOnly = false,
        transactionHashVariant = "latest-nonfinal" /* LATEST_NONFINAL */
      } = args;
      const encodedData = [encode(makeCalldataObject(functionName, callArgs, kwargs)), leaderOnly];
      const serializedData = serialize(encodedData);
      const senderAddress = account?.address ?? client.account?.address ?? zeroAddress;
      const requestParams = {
        type: "read",
        to: address,
        from: senderAddress,
        data: serializedData,
        transaction_hash_variant: transactionHashVariant
      };
      const result = await client.request({
        method: "gen_call",
        params: [requestParams]
      });
      const prefixedResult = extractGenCallResult(result);
      if (args.rawReturn) {
        return prefixedResult;
      }
      const resultBinary = fromHex(prefixedResult, "bytes");
      const decoded = decode(resultBinary);
      if (!jsonSafeReturn) {
        return decoded;
      }
      return toJsonSafeDeep(decoded);
    },
    /** Simulates a state-modifying contract call without executing on-chain. */
    simulateWriteContract: async (args) => {
      const {
        account,
        address,
        functionName,
        args: callArgs,
        kwargs,
        leaderOnly = false,
        transactionHashVariant = "latest-nonfinal" /* LATEST_NONFINAL */
      } = args;
      const encodedData = [encode(makeCalldataObject(functionName, callArgs, kwargs)), leaderOnly];
      const serializedData = serialize(encodedData);
      const senderAddress = account?.address ?? client.account?.address ?? zeroAddress;
      const requestParams = {
        type: "write",
        to: address,
        from: senderAddress,
        data: serializedData,
        transaction_hash_variant: transactionHashVariant
      };
      const result = await client.request({
        method: "gen_call",
        params: [requestParams]
      });
      const prefixedResult = extractGenCallResult(result);
      if (args.rawReturn) {
        return prefixedResult;
      }
      const resultBinary = fromHex(prefixedResult, "bytes");
      return decode(resultBinary);
    },
    /** Executes a state-modifying function on a contract through consensus. Returns the transaction hash. */
    writeContract: async (args) => {
      const {
        account,
        address,
        functionName,
        args: callArgs,
        kwargs,
        value = 0n,
        leaderOnly = false,
        consensusMaxRotations = client.chain.defaultConsensusMaxRotations
      } = args;
      const data = [encode(makeCalldataObject(functionName, callArgs, kwargs)), leaderOnly];
      const serializedData = serialize(data);
      const senderAccount = account || client.account;
      const { primaryEncodedData, fallbackEncodedData } = _encodeAddTransactionData({
        client,
        senderAccount,
        recipient: address,
        data: serializedData,
        consensusMaxRotations
      });
      return _sendTransaction({
        client,
        publicClient,
        encodedData: primaryEncodedData,
        fallbackEncodedData,
        senderAccount,
        value
      });
    },
    /** Deploys a new intelligent contract to GenLayer. Returns the transaction hash. */
    deployContract: async (args) => {
      const {
        account,
        code,
        args: constructorArgs,
        kwargs,
        leaderOnly = false,
        consensusMaxRotations = client.chain.defaultConsensusMaxRotations
      } = args;
      const data = [
        code,
        encode(makeCalldataObject(void 0, constructorArgs, kwargs)),
        leaderOnly
      ];
      const serializedData = serialize(data);
      const senderAccount = account || client.account;
      const { primaryEncodedData, fallbackEncodedData } = _encodeAddTransactionData({
        client,
        senderAccount,
        recipient: zeroAddress,
        data: serializedData,
        consensusMaxRotations
      });
      return _sendTransaction({
        client,
        publicClient,
        encodedData: primaryEncodedData,
        fallbackEncodedData,
        senderAccount
      });
    },
    /** Calculates the minimum bond required to appeal a transaction. */
    getMinAppealBond: async (args) => {
      const { txId } = args;
      if (!client.chain.feeManagerContract?.address || !client.chain.roundsStorageContract?.address) {
        throw new Error("Appeal bond calculation not supported on this chain (missing feeManagerContract/roundsStorageContract)");
      }
      const roundNumber = await publicClient.readContract({
        address: client.chain.roundsStorageContract.address,
        abi: client.chain.roundsStorageContract.abi,
        functionName: "getRoundNumber",
        args: [txId]
      });
      const transaction = await client.getTransaction({ hash: txId });
      const txStatus = Number(transaction.status);
      const minBond = await publicClient.readContract({
        address: client.chain.feeManagerContract.address,
        abi: client.chain.feeManagerContract.abi,
        functionName: "calculateMinAppealBond",
        args: [txId, roundNumber, txStatus]
      });
      return minBond;
    },
    /** Returns the current consensus round number for a transaction. */
    getRoundNumber: async (args) => {
      if (!client.chain.roundsStorageContract?.address) {
        throw new Error("getRoundNumber not supported on this chain (missing roundsStorageContract)");
      }
      return publicClient.readContract({
        address: client.chain.roundsStorageContract.address,
        abi: client.chain.roundsStorageContract.abi,
        functionName: "getRoundNumber",
        args: [args.txId]
      });
    },
    /** Returns detailed data for a specific consensus round. */
    getRoundData: async (args) => {
      if (!client.chain.roundsStorageContract?.address) {
        throw new Error("getRoundData not supported on this chain (missing roundsStorageContract)");
      }
      return publicClient.readContract({
        address: client.chain.roundsStorageContract.address,
        abi: client.chain.roundsStorageContract.abi,
        functionName: "getRoundData",
        args: [args.txId, args.round]
      });
    },
    /** Returns the current round number and its data for a transaction. */
    getLastRoundData: async (args) => {
      if (!client.chain.roundsStorageContract?.address) {
        throw new Error("getLastRoundData not supported on this chain (missing roundsStorageContract)");
      }
      return publicClient.readContract({
        address: client.chain.roundsStorageContract.address,
        abi: client.chain.roundsStorageContract.abi,
        functionName: "getLastRoundData",
        args: [args.txId]
      });
    },
    /** Checks if a transaction can be appealed. */
    canAppeal: async (args) => {
      if (!client.chain.appealsContract?.address) {
        throw new Error("canAppeal not supported on this chain (missing appealsContract)");
      }
      return publicClient.readContract({
        address: client.chain.appealsContract.address,
        abi: client.chain.appealsContract.abi,
        functionName: "canAppeal",
        args: [args.txId]
      });
    },
    /** Appeals a consensus transaction to trigger a new round of validation. */
    appealTransaction: async (args) => {
      const { account, txId } = args;
      let { value } = args;
      if (value === void 0) {
        if (client.chain.feeManagerContract?.address && client.chain.roundsStorageContract?.address) {
          const roundNumber = await publicClient.readContract({
            address: client.chain.roundsStorageContract.address,
            abi: client.chain.roundsStorageContract.abi,
            functionName: "getRoundNumber",
            args: [txId]
          });
          const transaction = await client.getTransaction({ hash: txId });
          const txStatus = Number(transaction.status);
          value = await publicClient.readContract({
            address: client.chain.feeManagerContract.address,
            abi: client.chain.feeManagerContract.abi,
            functionName: "calculateMinAppealBond",
            args: [txId, roundNumber, txStatus]
          });
        } else {
          value = 0n;
        }
      }
      const senderAccount = account || client.account;
      const encodedData = _encodeSubmitAppealData({ client, txId });
      await _sendConsensusCall({
        client,
        publicClient,
        encodedData,
        senderAccount,
        value,
        operationName: "Appeal"
      });
      return txId;
    },
    /** Finalizes a single GenLayer transaction that is ready to be finalized. Returns the EVM transaction hash. */
    finalizeTransaction: async (args) => {
      const { account, txId } = args;
      const senderAccount = account || client.account;
      const encodedData = encodeFunctionData({
        abi: client.chain.consensusMainContract?.abi,
        functionName: "finalizeTransaction",
        args: [txId]
      });
      return _sendConsensusCall({
        client,
        publicClient,
        encodedData,
        senderAccount,
        operationName: "Finalize"
      });
    },
    /** Batch-finalizes idle GenLayer transactions (those stuck without progressing). Returns the EVM transaction hash. */
    finalizeIdlenessTxs: async (args) => {
      const { account, txIds } = args;
      if (txIds.length === 0) {
        throw new Error("finalizeIdlenessTxs requires at least one txId.");
      }
      const senderAccount = account || client.account;
      const encodedData = encodeFunctionData({
        abi: client.chain.consensusMainContract?.abi,
        functionName: "finalizeIdlenessTxs",
        args: [txIds]
      });
      return _sendConsensusCall({
        client,
        publicClient,
        encodedData,
        senderAccount,
        operationName: "Finalize idleness"
      });
    }
  };
};
var validateAccount = (Account4) => {
  if (!Account4) {
    throw new Error(
      "No account set. Configure the client with an account or pass an account to this function."
    );
  }
  return Account4;
};
var CREATED_TRANSACTION_EVENT_ABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "txId", type: "bytes32" },
      { indexed: false, internalType: "uint256", name: "txSlot", type: "uint256" }
    ],
    name: "CreatedTransaction",
    type: "event"
  }
];
var ADD_TRANSACTION_ABI_V5 = [
  {
    type: "function",
    name: "addTransaction",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_sender", type: "address" },
      { name: "_recipient", type: "address" },
      { name: "_numOfInitialValidators", type: "uint256" },
      { name: "_maxRotations", type: "uint256" },
      { name: "_txData", type: "bytes" }
    ],
    outputs: []
  }
];
var ADD_TRANSACTION_ABI_V6 = [
  {
    type: "function",
    name: "addTransaction",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_sender", type: "address" },
      { name: "_recipient", type: "address" },
      { name: "_numOfInitialValidators", type: "uint256" },
      { name: "_maxRotations", type: "uint256" },
      { name: "_txData", type: "bytes" },
      { name: "_validUntil", type: "uint256" }
    ],
    outputs: []
  }
];
var getAddTransactionInputCount = (abi) => {
  if (!abi || !Array.isArray(abi)) {
    return 0;
  }
  const addTransactionFunction = abi.find((item) => {
    if (!item || typeof item !== "object") {
      return false;
    }
    const candidate = item;
    return candidate.type === "function" && candidate.name === "addTransaction";
  });
  return Array.isArray(addTransactionFunction?.inputs) ? addTransactionFunction.inputs.length : 0;
};
var _encodeAddTransactionData = ({
  client,
  senderAccount,
  recipient,
  data,
  consensusMaxRotations = client.chain.defaultConsensusMaxRotations
}) => {
  const validatedSenderAccount = validateAccount(senderAccount);
  const addTransactionArgs = [
    validatedSenderAccount.address,
    recipient,
    client.chain.defaultNumberOfInitialValidators,
    consensusMaxRotations,
    data
  ];
  const encodedDataV5 = encodeFunctionData({
    abi: ADD_TRANSACTION_ABI_V5,
    functionName: "addTransaction",
    args: addTransactionArgs
  });
  const validUntil = BigInt(Math.floor(Date.now() / 1e3) + 3600);
  const encodedDataV6 = encodeFunctionData({
    abi: ADD_TRANSACTION_ABI_V6,
    functionName: "addTransaction",
    args: [...addTransactionArgs, validUntil]
  });
  if (getAddTransactionInputCount(client.chain.consensusMainContract?.abi) >= 6) {
    return {
      primaryEncodedData: encodedDataV6,
      fallbackEncodedData: encodedDataV5
    };
  }
  return {
    primaryEncodedData: encodedDataV5,
    fallbackEncodedData: encodedDataV6
  };
};
var _encodeSubmitAppealData = ({
  client,
  txId
}) => {
  return encodeFunctionData({
    abi: client.chain.consensusMainContract?.abi,
    functionName: "submitAppeal",
    args: [txId]
  });
};
var _sendConsensusCall = async ({
  client,
  publicClient,
  encodedData,
  senderAccount,
  value = 0n,
  operationName = "Consensus call"
}) => {
  if (!client.chain.consensusMainContract?.address) {
    throw new Error("Consensus main contract not initialized.");
  }
  const validatedAccount = validateAccount(senderAccount);
  const nonce = await client.getCurrentNonce({ address: validatedAccount.address });
  let estimatedGas;
  try {
    estimatedGas = await client.estimateTransactionGas({
      to: client.chain.consensusMainContract.address,
      data: encodedData,
      value
    });
  } catch (err) {
    console.error("Gas estimation failed, using default 200_000:", err);
    estimatedGas = 200000n;
  }
  const gasPriceHex = await client.request({ method: "eth_gasPrice" });
  if (validatedAccount.type === "local") {
    if (!validatedAccount.signTransaction) {
      throw new Error("Local account does not support signTransaction.");
    }
    const txRequest = {
      account: validatedAccount,
      to: client.chain.consensusMainContract.address,
      data: encodedData,
      value,
      gas: estimatedGas,
      gasPrice: BigInt(gasPriceHex),
      nonce,
      chainId: client.chain.id
    };
    const serializedTransaction = await validatedAccount.signTransaction(txRequest);
    const evmHash2 = await client.sendRawTransaction({ serializedTransaction });
    const receipt2 = await publicClient.waitForTransactionReceipt({ hash: evmHash2 });
    if (receipt2.status === "reverted") {
      throw new Error(`${operationName} reverted: EVM tx ${evmHash2}`);
    }
    return evmHash2;
  }
  const evmHash = await client.request({
    method: "eth_sendTransaction",
    params: [{
      from: validatedAccount.address,
      to: client.chain.consensusMainContract.address,
      data: encodedData,
      value: value ? `0x${value.toString(16)}` : void 0,
      gas: `0x${estimatedGas.toString(16)}`
    }]
  });
  const receipt = await publicClient.waitForTransactionReceipt({ hash: evmHash });
  if (receipt.status === "reverted") {
    throw new Error(`${operationName} reverted: EVM tx ${evmHash}`);
  }
  return evmHash;
};
var isAddTransactionAbiMismatchError = (error) => {
  const seen = /* @__PURE__ */ new WeakSet();
  const serializedError = typeof error === "object" && error !== null ? JSON.stringify(error, (_key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular]";
      }
      seen.add(value);
    }
    return value;
  }) : "";
  const errorObject = error;
  const errorMessage = [
    errorObject?.shortMessage,
    errorObject?.details,
    errorObject?.message,
    serializedError,
    String(error ?? "")
  ].filter(Boolean).join(" ").toLowerCase();
  return errorMessage.includes("invalid pointer in tuple") || errorMessage.includes("invalid pointer") || errorMessage.includes("could not decode") || errorMessage.includes("invalid arrayify value") || errorMessage.includes("types/value length mismatch");
};
var extractTxIdFromLogs = (client, logs) => {
  const newTxEvents = parseEventLogs({
    abi: client.chain.consensusMainContract?.abi,
    eventName: "NewTransaction",
    logs
  });
  if (newTxEvents.length > 0) {
    return newTxEvents[0].args["txId"];
  }
  const createdTxEvents = parseEventLogs({
    abi: CREATED_TRANSACTION_EVENT_ABI,
    eventName: "CreatedTransaction",
    logs
  });
  if (createdTxEvents.length > 0) {
    return createdTxEvents[0].args["txId"];
  }
  return null;
};
var _sendTransaction = async ({
  client,
  publicClient,
  encodedData,
  fallbackEncodedData,
  senderAccount,
  value = 0n
}) => {
  if (!client.chain.consensusMainContract?.address) {
    throw new Error(`Consensus main contract address not found in chain config for "${client.chain.name}".`);
  }
  const validatedSenderAccount = validateAccount(senderAccount);
  const nonce = await client.getCurrentNonce({ address: validatedSenderAccount.address });
  const sendWithEncodedData = async (encodedDataForSend) => {
    let estimatedGas;
    try {
      estimatedGas = await client.estimateTransactionGas({
        from: validatedSenderAccount.address,
        to: client.chain.consensusMainContract?.address,
        data: encodedDataForSend,
        value
      });
    } catch (err) {
      console.error("Gas estimation failed, using default 200_000:", err);
      estimatedGas = 200000n;
    }
    if (validatedSenderAccount?.type === "local") {
      if (!validatedSenderAccount?.signTransaction) {
        throw new Error("Local account does not support signTransaction. Use a private key account created via privateKeyToAccount().");
      }
      const gasPriceHex2 = await client.request({
        method: "eth_gasPrice"
      });
      const transactionRequest = {
        account: validatedSenderAccount,
        to: client.chain.consensusMainContract?.address,
        data: encodedDataForSend,
        type: "legacy",
        nonce: Number(nonce),
        value,
        gas: estimatedGas,
        gasPrice: BigInt(gasPriceHex2),
        chainId: client.chain.id
      };
      const serializedTransaction = await validatedSenderAccount.signTransaction(transactionRequest);
      const txHash = await client.sendRawTransaction({ serializedTransaction });
      const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
      if (receipt.status === "reverted") {
        throw new Error(`Transaction reverted: EVM tx ${txHash} to consensus contract ${client.chain.consensusMainContract?.address} was reverted.`);
      }
      const txId = extractTxIdFromLogs(client, receipt.logs);
      if (!txId) {
        throw new Error(
          `Transaction not processed by consensus: EVM tx ${txHash} succeeded but no NewTransaction or CreatedTransaction event was found in the receipt logs.`
        );
      }
      return txId;
    }
    let gasPriceHex;
    try {
      const gasPriceResult = await client.request({
        method: "eth_gasPrice"
      });
      if (typeof gasPriceResult === "string") {
        gasPriceHex = gasPriceResult;
      }
    } catch (error) {
      console.warn("Failed to fetch gas price, delegating gas price selection to wallet:", error);
    }
    const nonceBigInt = typeof nonce === "bigint" ? nonce : typeof nonce === "string" ? BigInt(nonce) : BigInt(Number(nonce));
    const formattedRequest = {
      from: validatedSenderAccount.address,
      to: client.chain.consensusMainContract?.address,
      data: encodedDataForSend,
      value: `0x${value.toString(16)}`,
      gas: `0x${estimatedGas.toString(16)}`,
      nonce: `0x${nonceBigInt.toString(16)}`,
      type: "0x0",
      // legacy tx
      chainId: `0x${client.chain.id.toString(16)}`,
      ...gasPriceHex ? { gasPrice: gasPriceHex } : {}
    };
    const evmTxHash = await client.request({
      method: "eth_sendTransaction",
      params: [formattedRequest]
    });
    if (client.chain.isStudio) {
      return evmTxHash;
    }
    const externalReceipt = await publicClient.waitForTransactionReceipt({ hash: evmTxHash });
    if (externalReceipt.status === "reverted") {
      throw new Error(`Transaction reverted: EVM tx ${evmTxHash} to consensus contract ${client.chain.consensusMainContract?.address} was reverted.`);
    }
    const externalTxId = extractTxIdFromLogs(client, externalReceipt.logs);
    if (!externalTxId) {
      throw new Error(
        `Transaction not processed by consensus: EVM tx ${evmTxHash} succeeded but no NewTransaction or CreatedTransaction event was found in the receipt logs.`
      );
    }
    return externalTxId;
  };
  try {
    return await sendWithEncodedData(encodedData);
  } catch (error) {
    if (!fallbackEncodedData || !isAddTransactionAbiMismatchError(error)) {
      throw error;
    }
    return await sendWithEncodedData(fallbackEncodedData);
  }
};

// src/config/transactions.ts
var transactionsConfig = {
  waitInterval: 3e3,
  retries: 10
};

// src/utils/async.ts
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// src/transactions/actions.ts
import { keccak256, concat, stringToBytes, toBytes } from "viem";

// src/transactions/decoders.ts
import { fromRlp, fromHex as fromHex2 } from "viem";
var FIELDS_TO_REMOVE = [
  "raw",
  "contract_state",
  "base64",
  "consensus_history",
  "tx_data",
  "eq_blocks_outputs",
  "r",
  "s",
  "v",
  "created_timestamp",
  "current_timestamp",
  "tx_execution_hash",
  "random_seed",
  "states",
  "contract_code",
  "appeal_failed",
  "appeal_leader_timeout",
  "appeal_processing_time",
  "appeal_undetermined",
  "appealed",
  "timestamp_appeal",
  "config_rotation_rounds",
  "rotation_count",
  "queue_position",
  "queue_type",
  "leader_timeout_validators",
  "triggered_by",
  "num_of_initial_validators",
  "timestamp_awaiting_finalization",
  "last_vote_timestamp",
  "read_state_block_range",
  "tx_slot",
  "blockHash",
  "blockNumber",
  "to",
  "transactionIndex"
];
var FIELD_NAME_MAPPINGS = {
  statusName: "status_name",
  typeHex: "type"
};
var decodeInputData = (rlpEncodedAppData, recipient) => {
  if (!rlpEncodedAppData || rlpEncodedAppData === "0x" || rlpEncodedAppData.length <= 2) {
    return null;
  }
  try {
    const rlpDecodedArray = fromRlp(rlpEncodedAppData);
    if (rlpDecodedArray.length === 3) {
      return {
        code: fromHex2(rlpDecodedArray[0], "string"),
        constructorArgs: rlpDecodedArray[1] && rlpDecodedArray[1] !== "0x" ? decode(fromHex2(rlpDecodedArray[1], "bytes")) : null,
        leaderOnly: rlpDecodedArray[2] === "0x01",
        type: "deploy",
        contractAddress: recipient
      };
    } else if (rlpDecodedArray.length === 2) {
      return {
        callData: rlpDecodedArray[0] && rlpDecodedArray[0] !== "0x" ? decode(fromHex2(rlpDecodedArray[0], "bytes")) : null,
        leaderOnly: rlpDecodedArray[1] === "0x01",
        type: "call"
      };
    } else {
      console.warn(
        "[decodeInputData] WRITE: Unexpected RLP array length:",
        rlpDecodedArray.length,
        rlpDecodedArray
      );
      return null;
    }
  } catch (e) {
    console.error(
      "[decodeInputData] Error during comprehensive decoding:",
      e,
      "Raw RLP App Data:",
      rlpEncodedAppData
    );
    return null;
  }
};
var decodeTransaction = (tx) => {
  const txData = tx.txData ?? tx.txCalldata;
  const numOfInitialValidators = tx.numOfInitialValidators ?? tx.initialRotations;
  const txDataDecoded = decodeInputData(txData, tx.recipient);
  const decodedTx = {
    ...tx,
    txData,
    txDataDecoded,
    currentTimestamp: tx.currentTimestamp.toString(),
    numOfInitialValidators: numOfInitialValidators?.toString() ?? "0",
    txSlot: tx.txSlot.toString(),
    createdTimestamp: tx.createdTimestamp.toString(),
    lastVoteTimestamp: tx.lastVoteTimestamp.toString(),
    queuePosition: tx.queuePosition.toString(),
    numOfRounds: tx.numOfRounds.toString(),
    readStateBlockRange: {
      ...tx.readStateBlockRange,
      activationBlock: tx.readStateBlockRange?.activationBlock?.toString() ?? "0",
      processingBlock: tx.readStateBlockRange?.processingBlock?.toString() ?? "0",
      proposalBlock: tx.readStateBlockRange?.proposalBlock?.toString() ?? "0"
    },
    statusName: transactionsStatusNumberToName[String(tx.status)],
    resultName: transactionResultNumberToName[String(tx.result)],
    txExecutionResult: tx.txExecutionResult !== void 0 ? Number(tx.txExecutionResult) : void 0,
    txExecutionResultName: tx.txExecutionResult !== void 0 ? executionResultNumberToName[String(tx.txExecutionResult)] : void 0,
    lastRound: {
      ...tx.lastRound,
      round: tx.lastRound?.round?.toString() ?? "0",
      leaderIndex: tx.lastRound?.leaderIndex?.toString() ?? "0",
      votesCommitted: tx.lastRound?.votesCommitted?.toString() ?? "0",
      votesRevealed: tx.lastRound?.votesRevealed?.toString() ?? "0",
      appealBond: tx.lastRound?.appealBond?.toString() ?? "0",
      rotationsLeft: tx.lastRound?.rotationsLeft?.toString() ?? "0",
      validatorVotesName: (tx.lastRound?.validatorVotes ?? []).map(
        (vote) => voteTypeNumberToName[String(vote)]
      )
    }
  };
  return decodedTx;
};
var simplifyTransactionReceipt = (tx) => {
  const simplifyObject = (obj, path = "") => {
    if (obj === null || obj === void 0) return obj;
    if (typeof obj !== "object") return obj;
    if (Array.isArray(obj)) {
      return obj.map((item) => simplifyObject(item, path)).filter((item) => item !== void 0);
    }
    if (typeof obj === "object") {
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        if (FIELDS_TO_REMOVE.includes(key)) {
          continue;
        }
        if (key === "node_config" && !path.includes("consensus_data")) {
          continue;
        }
        if (key === "consensus_data" && typeof value === "object" && value !== null) {
          const simplifiedConsensus = {};
          if ("votes" in value) {
            simplifiedConsensus.votes = value.votes;
          }
          if ("leader_receipt" in value && Array.isArray(value.leader_receipt)) {
            simplifiedConsensus.leader_receipt = value.leader_receipt.map((receipt) => {
              const simplifiedReceipt = {};
              ["execution_result", "genvm_result", "mode", "vote", "node_config"].forEach((field) => {
                if (field in receipt) {
                  simplifiedReceipt[field] = receipt[field];
                }
              });
              if (receipt.calldata && typeof receipt.calldata === "object" && "readable" in receipt.calldata) {
                simplifiedReceipt.calldata = { readable: receipt.calldata.readable };
              }
              if (receipt.eq_outputs) {
                simplifiedReceipt.eq_outputs = simplifyObject(receipt.eq_outputs, currentPath);
              }
              if (receipt.result !== void 0) {
                simplifiedReceipt.result = simplifyObject(receipt.result, currentPath);
              }
              return simplifiedReceipt;
            });
          }
          if ("validators" in value && Array.isArray(value.validators)) {
            const simplifiedValidators = value.validators.map((validator) => {
              const simplifiedValidator = {};
              ["execution_result", "genvm_result", "mode", "vote", "node_config"].forEach((field) => {
                if (field in validator) {
                  simplifiedValidator[field] = validator[field];
                }
              });
              return simplifiedValidator;
            }).filter((validator) => Object.keys(validator).length > 0);
            if (simplifiedValidators.length > 0) {
              simplifiedConsensus.validators = simplifiedValidators;
            }
          }
          result[key] = simplifiedConsensus;
          continue;
        }
        const simplifiedValue = simplifyObject(value, currentPath);
        const shouldInclude = simplifiedValue !== void 0 && !(typeof simplifiedValue === "object" && simplifiedValue !== null && Object.keys(simplifiedValue).length === 0);
        if (shouldInclude || simplifiedValue === 0) {
          const mappedKey = FIELD_NAME_MAPPINGS[key] || key;
          result[mappedKey] = simplifiedValue;
        }
      }
      return result;
    }
    return obj;
  };
  return simplifyObject({ ...tx });
};
var decodeLocalnetTransaction = (tx) => {
  if (!tx.data) return tx;
  try {
    const leaderReceipt = tx.consensus_data?.leader_receipt;
    if (leaderReceipt) {
      const receipts = Array.isArray(leaderReceipt) ? leaderReceipt : [leaderReceipt];
      receipts.forEach((receipt) => {
        if (receipt.result && typeof receipt.result === "string") {
          receipt.result = resultToUserFriendlyJson(receipt.result);
        }
        if (receipt.calldata && typeof receipt.calldata === "string") {
          receipt.calldata = {
            base64: receipt.calldata,
            ...calldataToUserFriendlyJson(b64ToArray(receipt.calldata))
          };
        }
        if (receipt.eq_outputs) {
          const decodedOutputs = {};
          for (const [key, value] of Object.entries(receipt.eq_outputs)) {
            if (typeof value === "object" && value !== null) {
              decodedOutputs[key] = value;
            } else {
              try {
                decodedOutputs[key] = resultToUserFriendlyJson(value);
              } catch (e) {
                console.warn(`Error decoding eq_output ${key}: ${e}`);
                decodedOutputs[key] = value;
              }
            }
          }
          receipt.eq_outputs = decodedOutputs;
        }
      });
    }
    if (tx.data?.calldata && typeof tx.data.calldata === "string") {
      tx.data.calldata = {
        base64: tx.data.calldata,
        ...calldataToUserFriendlyJson(b64ToArray(tx.data.calldata))
      };
    }
  } catch (e) {
    console.error("Error in decodeLocalnetTransaction:", e);
  }
  return tx;
};

// src/transactions/actions.ts
var receiptActions = (client, publicClient) => ({
  /** Polls until a transaction reaches the specified status. Returns the transaction receipt. */
  waitForTransactionReceipt: async ({
    hash,
    status = "ACCEPTED" /* ACCEPTED */,
    interval = transactionsConfig.waitInterval,
    retries = transactionsConfig.retries,
    fullTransaction = false
  }) => {
    const transaction = await client.getTransaction({
      hash
    });
    if (!transaction) {
      throw new Error(`Transaction not found: ${hash}`);
    }
    const transactionStatusString = String(transaction.status);
    const requestedStatus = transactionsStatusNameToNumber[status];
    if (transactionStatusString === requestedStatus || status === "ACCEPTED" /* ACCEPTED */ && isDecidedState(transactionStatusString)) {
      let finalTransaction = transaction;
      if (client.chain.isStudio) {
        finalTransaction = decodeLocalnetTransaction(transaction);
      }
      if (!fullTransaction) {
        return simplifyTransactionReceipt(finalTransaction);
      }
      return finalTransaction;
    }
    if (retries === 0) {
      throw new Error(`Timed out waiting for transaction ${hash} to reach status "${status}" (current status: ${transactionStatusString}).`);
    }
    await sleep(interval);
    return receiptActions(client, publicClient).waitForTransactionReceipt({
      hash,
      status,
      interval,
      retries: retries - 1,
      fullTransaction
    });
  }
});
var transactionActions = (client, publicClient) => ({
  /** Fetches transaction data including status, execution result, and consensus details. */
  getTransaction: async ({ hash }) => {
    if (client.chain.isStudio) {
      const transaction2 = await client.getTransaction({ hash });
      const localnetStatus = transaction2.status === "ACTIVATED" ? "PENDING" /* PENDING */ : transaction2.status;
      transaction2.status = Number(transactionsStatusNameToNumber[localnetStatus]);
      transaction2.statusName = localnetStatus;
      return decodeLocalnetTransaction(transaction2);
    }
    const contractAddress = client.chain.consensusDataContract?.address;
    const contractAbi = client.chain.consensusDataContract?.abi;
    const [txDataRaw, allDataRaw] = await Promise.all([
      publicClient.readContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "getTransactionData",
        args: [hash, Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3)]
      }),
      publicClient.readContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "getTransactionAllData",
        args: [hash]
      })
    ]);
    const txData = txDataRaw;
    const [txAllData, _roundsData] = allDataRaw;
    const transaction = {
      ...txData,
      txExecutionResult: Number(txAllData.txExecutionResult)
    };
    return decodeTransaction(transaction);
  },
  /** Returns transaction IDs of child transactions created from emitted messages. */
  getTriggeredTransactionIds: async ({ hash }) => {
    if (client.chain.isStudio) {
      const tx2 = await client.getTransaction({ hash });
      return tx2.triggered_transactions ?? [];
    }
    const tx = await transactionActions(client, publicClient).getTransaction({ hash });
    const proposalBlock = BigInt(tx.readStateBlockRange?.proposalBlock ?? "0");
    if (proposalBlock === BigInt(0)) return [];
    const scanRange = BigInt(100);
    const latestBlock = await publicClient.getBlockNumber();
    const toBlock = proposalBlock + scanRange < latestBlock ? proposalBlock + scanRange : latestBlock;
    const consensusAddress = client.chain.consensusMainContract?.address;
    const internalMessageProcessedTopic = keccak256(stringToBytes("InternalMessageProcessed(bytes32,address,address)"));
    const logs = await publicClient.getLogs({
      address: consensusAddress,
      event: void 0,
      fromBlock: proposalBlock,
      toBlock,
      topics: [internalMessageProcessedTopic, hash]
    });
    return logs.map((log) => log.topics[1]).filter(Boolean);
  },
  /** Fetches the full execution trace including return data, stdout, stderr, and GenVM logs. */
  debugTraceTransaction: async ({ hash, round = 0 }) => {
    const result = await client.request({
      method: "gen_dbg_traceTransaction",
      params: [{ txID: hash, round }]
    });
    return result;
  },
  /** Cancels a pending transaction. Studio networks only. */
  cancelTransaction: async ({ hash }) => {
    if (!client.chain.isStudio) {
      throw new Error("cancelTransaction is only available on studio-based chains (localnet/studionet)");
    }
    if (!client.account) {
      throw new Error("No account set. Configure the client with an account to cancel transactions.");
    }
    const messageHash = keccak256(concat([stringToBytes("cancel_transaction"), toBytes(hash)]));
    let signature;
    if (typeof client.account === "object" && "signMessage" in client.account) {
      signature = await client.account.signMessage({ message: { raw: messageHash } });
    } else {
      const provider = typeof window !== "undefined" ? window.ethereum : void 0;
      if (!provider) {
        throw new Error("No provider available for signing. Use a private key account or ensure a wallet is connected.");
      }
      const address = typeof client.account === "string" ? client.account : client.account.address;
      signature = await provider.request({
        method: "personal_sign",
        params: [messageHash, address]
      });
    }
    return client.request({
      method: "sim_cancelTransaction",
      params: [hash, signature]
    });
  },
  /** Returns the queue slot position of a transaction in the pending queue. */
  getTransactionQueuePosition: async ({ hash }) => {
    const consensusAddress = client.chain.consensusMainContract?.address;
    const consensusAbi = client.chain.consensusMainContract?.abi;
    const queuesAddress = await publicClient.readContract({
      address: consensusAddress,
      abi: consensusAbi,
      functionName: "queues"
    });
    const QUEUES_ABI = [
      {
        inputs: [{ internalType: "bytes32", name: "txId", type: "bytes32" }],
        name: "getTransactionQueuePosition",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      }
    ];
    const position = await publicClient.readContract({
      address: queuesAddress,
      abi: QUEUES_ABI,
      functionName: "getTransactionQueuePosition",
      args: [hash]
    });
    return Number(position);
  },
  /** Estimates gas required for a transaction. */
  estimateTransactionGas: async (transactionParams) => {
    const formattedParams = {
      from: transactionParams.from || client.account?.address,
      to: transactionParams.to,
      data: transactionParams.data || "0x",
      value: transactionParams.value ? `0x${transactionParams.value.toString(16)}` : "0x0"
    };
    const gasHex = await client.request({
      method: "eth_estimateGas",
      params: [formattedParams]
    });
    return BigInt(gasHex);
  }
});

// src/config/snapID.ts
var snapID = {
  local: "local:http://localhost:8081",
  npm: "npm:genlayer-wallet-plugin"
};

// src/wallet/connect.ts
var networks = {
  localnet,
  studionet,
  testnetAsimov,
  testnetBradbury
};
var connect = async (client, network = "studionet", snapSource = "npm") => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed.");
  }
  if (network === "mainnet") {
    throw new Error(`${network} is not available yet. Please use localnet.`);
  }
  const selectedNetwork = networks[network];
  if (!selectedNetwork) {
    throw new Error(`Network configuration for '${network}' is not available.`);
  }
  const chainIdHex = `0x${selectedNetwork.id.toString(16)}`;
  const chainParams = {
    chainId: chainIdHex,
    chainName: selectedNetwork.name,
    rpcUrls: selectedNetwork.rpcUrls.default.http,
    nativeCurrency: selectedNetwork.nativeCurrency,
    blockExplorerUrls: [selectedNetwork.blockExplorers?.default.url]
  };
  const currentChainId = await window.ethereum.request({ method: "eth_chainId" });
  if (currentChainId !== chainIdHex) {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [chainParams]
    });
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }]
    });
  }
  const id = snapSource === "local" ? snapID.local : snapID.npm;
  const installedSnaps = await window.ethereum.request({ method: "wallet_getSnaps" });
  const isGenLayerSnapInstalled = Object.values(installedSnaps).some((snap) => snap.id === id);
  if (!isGenLayerSnapInstalled) {
    await window.ethereum.request({
      method: "wallet_requestSnaps",
      params: {
        [id]: {}
      }
    });
  }
  client.chain = selectedNetwork;
};

// src/wallet/metamaskClient.ts
var metamaskClient = async (snapSource = "npm") => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask is not installed.");
  }
  const isFlask = async () => {
    try {
      const clientVersion = await window.ethereum?.request({
        method: "web3_clientVersion"
      });
      return clientVersion?.includes("flask");
    } catch (error) {
      console.error("Error detecting Flask:", error);
      return false;
    }
  };
  const installedSnaps = async () => {
    try {
      return await window.ethereum?.request({
        method: "wallet_getSnaps"
      });
    } catch (error) {
      console.error("Error getting installed snaps:", error);
      return {};
    }
  };
  const isGenLayerSnapInstalled = async () => {
    const id = snapSource === "local" ? snapID.local : snapID.npm;
    const snaps = await installedSnaps();
    return Object.values(snaps).some((snap) => snap.id === id);
  };
  const flaskDetected = await isFlask();
  const snapsList = await installedSnaps();
  const genLayerSnapInstalled = await isGenLayerSnapInstalled();
  return {
    isFlask: flaskDetected,
    installedSnaps: snapsList,
    isGenLayerSnapInstalled: genLayerSnapInstalled
  };
};

// src/wallet/actions.ts
function walletActions(client) {
  return {
    connect: (network, snapSource) => connect(client, network, snapSource),
    metamaskClient: (snapSource = "npm") => metamaskClient(snapSource)
  };
}

// src/staking/actions.ts
import { getContract, decodeEventLog, toHex as toHex4, encodeFunctionData as encodeFunctionData2, BaseError, ContractFunctionRevertedError, decodeErrorResult, RawContractError } from "viem";

// src/staking/utils.ts
import { parseEther, formatEther } from "viem";
function parseStakingAmount(amount) {
  if (typeof amount === "bigint") return amount;
  const trimmed = amount.trim();
  const lower = trimmed.toLowerCase();
  if (lower.endsWith("gen")) {
    return parseEther(lower.slice(0, -3).trim());
  }
  return BigInt(trimmed);
}
function formatStakingAmount(amount) {
  return `${formatEther(amount)} GEN`;
}

// src/staking/actions.ts
var FALLBACK_GAS = 1000000n;
var GAS_BUFFER_MULTIPLIER = 2n;
var COMBINED_ERROR_ABI = [...STAKING_ABI, ...VALIDATOR_WALLET_ABI];
function extractRevertReason(err) {
  if (err instanceof BaseError) {
    const rawError = err.walk((e) => e instanceof RawContractError);
    if (rawError instanceof RawContractError && rawError.data && typeof rawError.data === "string") {
      try {
        const decoded = decodeErrorResult({
          abi: COMBINED_ERROR_ABI,
          data: rawError.data
        });
        return decoded.errorName;
      } catch {
      }
    }
    let current = err;
    while (current) {
      if (current && typeof current === "object") {
        const obj = current;
        if (obj.data && typeof obj.data === "string" && obj.data.startsWith("0x")) {
          try {
            const decoded = decodeErrorResult({
              abi: COMBINED_ERROR_ABI,
              data: obj.data
            });
            return decoded.errorName;
          } catch {
          }
        }
        current = obj.cause;
      } else {
        break;
      }
    }
    const revertError = err.walk((e) => e instanceof ContractFunctionRevertedError);
    if (revertError instanceof ContractFunctionRevertedError) {
      if (revertError.data?.errorName) {
        return revertError.data.errorName;
      }
      return revertError.reason || "Unknown reason";
    }
    if (err.shortMessage) return err.shortMessage;
  }
  if (err instanceof Error) return err.message;
  return "Unknown reason";
}
var stakingActions = (client, publicClient) => {
  const executeWrite = async (options) => {
    if (!client.account) {
      throw new Error("Account is required for write operations. Initialize client with a wallet account.");
    }
    const account = client.account;
    try {
      await publicClient.call({
        account,
        to: options.to,
        data: options.data,
        value: options.value
      });
    } catch (err) {
      const revertReason = extractRevertReason(err);
      throw new Error(`Transaction would revert: ${revertReason}`);
    }
    let gasLimit = options.gas;
    if (!gasLimit) {
      try {
        const estimated = await publicClient.estimateGas({
          account,
          to: options.to,
          data: options.data,
          value: options.value
        });
        gasLimit = estimated * GAS_BUFFER_MULTIPLIER;
      } catch {
        gasLimit = FALLBACK_GAS;
      }
    }
    const nonce = await publicClient.getTransactionCount({ address: account.address });
    const txRequest = await publicClient.prepareTransactionRequest({
      account,
      to: options.to,
      data: options.data,
      value: options.value,
      type: "legacy",
      nonce,
      gas: gasLimit,
      chain: client.chain
    });
    const signTransaction = account.signTransaction;
    if (!signTransaction) {
      throw new Error("Account does not support signing transactions");
    }
    const serializedTx = await signTransaction(txRequest);
    const hash = await publicClient.sendRawTransaction({ serializedTransaction: serializedTx });
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    if (receipt.status === "reverted") {
      let revertReason = "Unknown reason";
      try {
        await publicClient.call({
          account,
          to: options.to,
          data: options.data,
          value: options.value,
          blockNumber: receipt.blockNumber
        });
        const gasUsed = receipt.gasUsed;
        if (gasUsed >= gasLimit - 1000n) {
          revertReason = `Out of gas (used ${gasUsed}, limit ${gasLimit})`;
        } else {
          revertReason = `Unknown (simulation passes but tx reverts). Gas: ${gasUsed}/${gasLimit}`;
        }
      } catch (err) {
        revertReason = extractRevertReason(err);
      }
      throw new Error(`Transaction reverted: ${revertReason} (tx: ${hash})`);
    }
    return {
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed
    };
  };
  const getStakingAddress = () => {
    const stakingConfig = client.chain.stakingContract;
    if (!stakingConfig?.address || stakingConfig.address === "0x0000000000000000000000000000000000000000") {
      throw new Error("Staking is not supported on studio-based networks. Use testnet-asimov for staking operations.");
    }
    return stakingConfig.address;
  };
  const getStakingContract = () => {
    const address = getStakingAddress();
    return getContract({
      address,
      abi: STAKING_ABI,
      client: { public: publicClient, wallet: client }
    });
  };
  const getReadOnlyStakingContract = () => {
    const address = getStakingAddress();
    return getContract({
      address,
      abi: STAKING_ABI,
      client: publicClient
    });
  };
  return {
    /** Joins as a validator with the specified stake amount. */
    validatorJoin: async (options) => {
      const amount = parseStakingAmount(options.amount);
      const stakingAddress = getStakingAddress();
      const data = options.operator ? encodeFunctionData2({
        abi: STAKING_ABI,
        functionName: "validatorJoin",
        args: [options.operator]
      }) : encodeFunctionData2({
        abi: STAKING_ABI,
        functionName: "validatorJoin"
      });
      const result = await executeWrite({ to: stakingAddress, data, value: amount });
      const receipt = await publicClient.getTransactionReceipt({ hash: result.transactionHash });
      let validatorWallet;
      let eventFound = false;
      for (const log of receipt.logs) {
        try {
          const decoded = decodeEventLog({ abi: STAKING_ABI, data: log.data, topics: log.topics });
          if (decoded.eventName === "ValidatorJoin") {
            validatorWallet = decoded.args.validator;
            eventFound = true;
            break;
          }
        } catch {
        }
      }
      if (!eventFound) {
        throw new Error(
          `ValidatorJoin event not found in transaction ${result.transactionHash}. Transaction succeeded but validator wallet address could not be determined.`
        );
      }
      return {
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed,
        validatorWallet,
        operator: options.operator || client.account.address,
        amount: formatStakingAmount(amount),
        amountRaw: amount
      };
    },
    /**
     * Adds additional self-stake to an active validator position. The
     * underlying Staking contract requires msg.sender == ValidatorWallet,
     * so the call is routed through the wallet's own validatorDeposit
     * forwarder (which re-enters Staking with the correct sender).
     */
    validatorDeposit: async (options) => {
      const amount = parseStakingAmount(options.amount);
      const data = encodeFunctionData2({
        abi: VALIDATOR_WALLET_ABI,
        functionName: "validatorDeposit"
      });
      return executeWrite({ to: options.validator, data, value: amount });
    },
    /**
     * Exits a validator position by burning the specified shares. Same
     * msg.sender constraint as validatorDeposit — routed via the wallet.
     */
    validatorExit: async (options) => {
      const shares = typeof options.shares === "string" ? BigInt(options.shares) : options.shares;
      const data = encodeFunctionData2({
        abi: VALIDATOR_WALLET_ABI,
        functionName: "validatorExit",
        args: [shares]
      });
      return executeWrite({ to: options.validator, data });
    },
    /** Claims pending validator withdrawals. */
    validatorClaim: async (options) => {
      if (!options?.validator && !client.account) {
        throw new Error("Either provide validator address or initialize client with an account");
      }
      const validatorAddress = options?.validator || client.account.address;
      const data = encodeFunctionData2({
        abi: STAKING_ABI,
        functionName: "validatorClaim",
        args: [validatorAddress]
      });
      const result = await executeWrite({ to: getStakingAddress(), data });
      return { ...result, claimedAmount: 0n };
    },
    /** Primes a validator for participation in the next epoch. */
    validatorPrime: async (options) => {
      const data = encodeFunctionData2({
        abi: STAKING_ABI,
        functionName: "validatorPrime",
        args: [options.validator]
      });
      return executeWrite({ to: getStakingAddress(), data });
    },
    /** Sets the operator address for a validator wallet. */
    setOperator: async (options) => {
      const data = encodeFunctionData2({
        abi: VALIDATOR_WALLET_ABI,
        functionName: "setOperator",
        args: [options.operator]
      });
      return executeWrite({ to: options.validator, data });
    },
    /** Sets validator identity information (name, website, social links). */
    setIdentity: async (options) => {
      let extraCidBytes = "0x";
      if (options.extraCid) {
        if (options.extraCid.startsWith("0x")) {
          extraCidBytes = options.extraCid;
        } else {
          extraCidBytes = toHex4(new TextEncoder().encode(options.extraCid));
        }
      }
      const data = encodeFunctionData2({
        abi: VALIDATOR_WALLET_ABI,
        functionName: "setIdentity",
        args: [
          options.moniker,
          options.logoUri || "",
          options.website || "",
          options.description || "",
          options.email || "",
          options.twitter || "",
          options.telegram || "",
          options.github || "",
          extraCidBytes
        ]
      });
      return executeWrite({ to: options.validator, data });
    },
    /** Delegates stake to a validator. */
    delegatorJoin: async (options) => {
      const amount = parseStakingAmount(options.amount);
      const data = encodeFunctionData2({
        abi: STAKING_ABI,
        functionName: "delegatorJoin",
        args: [options.validator]
      });
      const result = await executeWrite({ to: getStakingAddress(), data, value: amount });
      return {
        ...result,
        validator: options.validator,
        delegator: client.account.address,
        amount: formatStakingAmount(amount),
        amountRaw: amount
      };
    },
    /** Exits a delegation by burning the specified shares. */
    delegatorExit: async (options) => {
      const shares = typeof options.shares === "string" ? BigInt(options.shares) : options.shares;
      const data = encodeFunctionData2({
        abi: STAKING_ABI,
        functionName: "delegatorExit",
        args: [options.validator, shares]
      });
      return executeWrite({ to: getStakingAddress(), data });
    },
    /** Claims pending delegator withdrawals. */
    delegatorClaim: async (options) => {
      if (!options.delegator && !client.account) {
        throw new Error("Either provide delegator address or initialize client with an account");
      }
      const delegatorAddress = options.delegator || client.account.address;
      const data = encodeFunctionData2({
        abi: STAKING_ABI,
        functionName: "delegatorClaim",
        args: [delegatorAddress, options.validator]
      });
      return executeWrite({ to: getStakingAddress(), data });
    },
    /** Checks if an address is an active validator. */
    isValidator: async (address) => {
      const contract = getReadOnlyStakingContract();
      return contract.read.isValidator([address]);
    },
    /** Returns comprehensive information about a validator including stake, identity, and status. */
    getValidatorInfo: async (validator) => {
      const contract = getReadOnlyStakingContract();
      const isVal = await contract.read.isValidator([validator]);
      if (!isVal) {
        throw new Error(`Address ${validator} is not a validator`);
      }
      const walletContract = getContract({
        address: validator,
        abi: VALIDATOR_WALLET_ABI,
        client: publicClient
      });
      const [view, owner, operator, identityRaw, currentEpoch] = await Promise.all([
        contract.read.validatorView([validator]),
        walletContract.read.owner(),
        walletContract.read.operator(),
        walletContract.read.getIdentity().catch(() => null),
        contract.read.epoch()
      ]);
      let identity;
      if (identityRaw && identityRaw.moniker) {
        identity = {
          moniker: identityRaw.moniker,
          logoUri: identityRaw.logoUri,
          website: identityRaw.website,
          description: identityRaw.description,
          email: identityRaw.email,
          twitter: identityRaw.twitter,
          telegram: identityRaw.telegram,
          github: identityRaw.github,
          extraCid: identityRaw.extraCid ? toHex4(identityRaw.extraCid) : ""
        };
      }
      const needsPriming = currentEpoch > 0n && view.ePrimed < currentEpoch - 1n;
      const depositLen = await contract.read.validatorDepositLen([validator]);
      const pendingDeposits = [];
      for (let i = 0n; i < depositLen; i++) {
        const [epoch, commit] = await contract.read.validatorDeposit([validator, i]);
        pendingDeposits.push({
          epoch,
          stake: formatStakingAmount(commit.input),
          stakeRaw: commit.input,
          shares: commit.output
        });
      }
      const withdrawalLen = await contract.read.validatorWithdrawalLen([validator]);
      const pendingWithdrawals = [];
      for (let i = 0n; i < withdrawalLen; i++) {
        const [epoch, commit] = await contract.read.validatorWithdrawal([validator, i]);
        pendingWithdrawals.push({
          epoch,
          shares: commit.input,
          stake: formatStakingAmount(commit.output),
          stakeRaw: commit.output
        });
      }
      return {
        address: validator,
        owner,
        operator,
        vStake: formatStakingAmount(view.vStake),
        vStakeRaw: view.vStake,
        vShares: view.vShares,
        dStake: formatStakingAmount(view.dStake),
        dStakeRaw: view.dStake,
        dShares: view.dShares,
        vDeposit: formatStakingAmount(view.vDeposit),
        vDepositRaw: view.vDeposit,
        vWithdrawal: formatStakingAmount(view.vWithdrawal),
        vWithdrawalRaw: view.vWithdrawal,
        ePrimed: view.ePrimed,
        live: view.live,
        banned: view.eBanned > 0n,
        bannedEpoch: view.eBanned > 0n ? view.eBanned : void 0,
        needsPriming,
        identity,
        pendingDeposits,
        pendingWithdrawals
      };
    },
    /** Returns delegation stake information for a delegator-validator pair. */
    getStakeInfo: async (delegator, validator) => {
      const contract = getReadOnlyStakingContract();
      const shares = await contract.read.sharesOf([delegator, validator]);
      let stake = 0n;
      if (shares > 0n) {
        stake = await contract.read.stakeOf([delegator, validator]);
      }
      const depositLen = await contract.read.delegatorDepositLen([
        delegator,
        validator
      ]);
      const pendingDeposits = [];
      for (let i = 0n; i < depositLen; i++) {
        const [claim, commit] = await contract.read.delegatorDeposit([
          delegator,
          validator,
          i
        ]);
        pendingDeposits.push({
          epoch: commit.epoch,
          stake: formatStakingAmount(commit.input),
          stakeRaw: commit.input,
          shares: claim.quantity
        });
      }
      const withdrawalLen = await contract.read.delegatorWithdrawalLen([
        delegator,
        validator
      ]);
      const pendingWithdrawals = [];
      for (let i = 0n; i < withdrawalLen; i++) {
        const [claim, commit] = await contract.read.delegatorWithdrawal([
          delegator,
          validator,
          i
        ]);
        pendingWithdrawals.push({
          epoch: commit.epoch,
          shares: claim.quantity,
          stake: formatStakingAmount(commit.output),
          stakeRaw: commit.output
        });
      }
      return {
        delegator,
        validator,
        shares,
        stake: formatStakingAmount(stake),
        stakeRaw: stake,
        pendingDeposits,
        pendingWithdrawals
      };
    },
    /** Returns current epoch information including timing, stake requirements, and inflation data. */
    getEpochInfo: async () => {
      const contract = getReadOnlyStakingContract();
      const [
        epoch,
        finalized,
        activeCount,
        epochMinDuration,
        epochZeroMinDuration,
        epochOdd,
        epochEven,
        valMinStake,
        delMinStake
      ] = await Promise.all([
        contract.read.epoch(),
        contract.read.finalized(),
        contract.read.activeValidatorsCount(),
        contract.read.epochMinDuration(),
        contract.read.epochZeroMinDuration(),
        contract.read.epochOdd(),
        contract.read.epochEven(),
        contract.read.validatorMinStake(),
        contract.read.delegatorMinStake()
      ]);
      const raw = epoch % 2n === 0n ? epochEven : epochOdd;
      const currentEpochData = {
        start: raw[0],
        end: raw[1],
        inflation: raw[2],
        weight: raw[3],
        weightDeposit: raw[4],
        weightWithdrawal: raw[5],
        vcount: raw[6],
        claimed: raw[7],
        stakeDeposit: raw[8],
        stakeWithdrawal: raw[9],
        slashed: raw[10]
      };
      const currentEpochEnd = currentEpochData.end > 0n;
      let nextEpochEstimate = null;
      if (!currentEpochEnd) {
        const duration = epoch === 0n ? epochZeroMinDuration : epochMinDuration;
        const estimatedEndMs = Number(currentEpochData.start + duration) * 1e3;
        nextEpochEstimate = new Date(estimatedEndMs);
      }
      return {
        currentEpoch: epoch,
        lastFinalizedEpoch: finalized,
        activeValidatorsCount: activeCount,
        epochMinDuration,
        nextEpochEstimate,
        validatorMinStake: formatStakingAmount(valMinStake),
        validatorMinStakeRaw: valMinStake,
        delegatorMinStake: formatStakingAmount(delMinStake),
        delegatorMinStakeRaw: delMinStake
      };
    },
    /** Returns detailed data for a specific epoch. */
    getEpochData: async (epochNumber) => {
      const contract = getReadOnlyStakingContract();
      const [currentEpoch, epochOdd, epochEven] = await Promise.all([
        contract.read.epoch(),
        contract.read.epochOdd(),
        contract.read.epochEven()
      ]);
      if (epochNumber > currentEpoch) {
        throw new Error(`Epoch ${epochNumber} has not started yet (current: ${currentEpoch})`);
      }
      if (epochNumber < currentEpoch - 1n && currentEpoch > 0n) {
        throw new Error(`Epoch ${epochNumber} data no longer available (only current and previous epoch stored)`);
      }
      const raw = epochNumber % 2n === 0n ? epochEven : epochOdd;
      return {
        start: raw[0],
        end: raw[1],
        inflation: raw[2],
        weight: raw[3],
        weightDeposit: raw[4],
        weightWithdrawal: raw[5],
        vcount: raw[6],
        claimed: raw[7],
        stakeDeposit: raw[8],
        stakeWithdrawal: raw[9],
        slashed: raw[10]
      };
    },
    /** Returns addresses of all currently active validators. */
    getActiveValidators: async () => {
      const contract = getReadOnlyStakingContract();
      const validators = await contract.read.activeValidators();
      return validators.filter((v) => v !== "0x0000000000000000000000000000000000000000");
    },
    /** Returns the count of active validators. */
    getActiveValidatorsCount: async () => {
      const contract = getReadOnlyStakingContract();
      return contract.read.activeValidatorsCount();
    },
    /** Returns addresses of validators currently in quarantine. */
    getQuarantinedValidators: async () => {
      const contract = getReadOnlyStakingContract();
      return contract.read.getValidatorQuarantineList();
    },
    /** Returns banned validators with ban duration and permanent ban status. */
    getBannedValidators: async (startIndex = 0n, size = 100n) => {
      const contract = getReadOnlyStakingContract();
      const result = await contract.read.getAllBannedValidators([startIndex, size]);
      return result.map((v) => ({
        validator: v.validator,
        untilEpoch: v.untilEpochBanned,
        permanentlyBanned: v.permanentlyBanned
      }));
    },
    /** Returns detailed quarantine information with pagination. */
    getQuarantinedValidatorsDetailed: async (startIndex = 0n, size = 100n) => {
      const contract = getReadOnlyStakingContract();
      const result = await contract.read.getAllQuarantinedValidators([startIndex, size]);
      return result.map((v) => ({
        validator: v.validator,
        untilEpoch: v.untilEpochBanned,
        permanentlyBanned: v.permanentlyBanned
      }));
    },
    getStakingContract,
    parseStakingAmount,
    formatStakingAmount
  };
};

// src/chains/actions.ts
function chainActions(_client) {
  return {
    /**
     * @deprecated This method is deprecated and will be removed in a future release.
     * The consensus contract is now resolved from the static chain definition.
     */
    initializeConsensusSmartContract: async (_forceReset = false) => {
      console.warn(
        "[genlayer-js] initializeConsensusSmartContract() is deprecated and will be removed in a future release. The consensus contract is now resolved from the static chain definition."
      );
    }
  };
}

// src/client/client.ts
var PROVIDER_METHODS = /* @__PURE__ */ new Set([
  "eth_accounts",
  "eth_requestAccounts",
  "eth_sendTransaction",
  "eth_signTransaction",
  "personal_sign",
  "eth_signTypedData_v4"
]);
var assertChainMatch = async (provider, chainConfig) => {
  if (chainConfig.isStudio) return;
  const expectedChainIdHex = `0x${chainConfig.id.toString(16)}`;
  try {
    const currentChainId = await provider.request({ method: "eth_chainId" });
    if (currentChainId !== expectedChainIdHex) {
      const currentId = parseInt(currentChainId, 16);
      throw new Error(
        `Wallet is on chain ${currentId} but client is configured for chain ${chainConfig.id} (${chainConfig.name}). Call client.connect("${chainConfig.name}") or switch your wallet to the correct network before sending transactions.`
      );
    }
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Wallet is on chain")) throw err;
  }
};
var getCustomTransportConfig = (config, chainConfig) => {
  const isAddress = typeof config.account !== "object";
  return {
    async request({ method, params = [] }) {
      if (PROVIDER_METHODS.has(method) && isAddress) {
        const provider = config.provider || (typeof window !== "undefined" ? window.ethereum : void 0);
        if (provider) {
          try {
            if (method === "eth_sendTransaction" || method === "eth_signTransaction") {
              await assertChainMatch(provider, chainConfig);
            }
            return await provider.request({ method, params });
          } catch (err) {
            console.warn(`Error using provider for method ${method}:`, err);
            throw err;
          }
        }
      }
      try {
        const response = await fetch(chainConfig.rpcUrls.default.http[0], {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: Date.now(),
            method,
            params
          })
        });
        const data = await response.json();
        if (data.error) {
          throw data.error;
        }
        return data.result;
      } catch (err) {
        console.error(`GenLayer RPC error (${method}):`, err.message || err);
        throw err;
      }
    }
  };
};
var createClient = (config = { chain: localnet }) => {
  const chainConfig = config.chain || localnet;
  if (config.endpoint) {
    chainConfig.rpcUrls.default.http = [config.endpoint];
  }
  const customTransport = custom(getCustomTransportConfig(config, chainConfig), { retryCount: 0, retryDelay: 0 });
  const publicClient = createPublicClient(chainConfig, customTransport).extend(
    publicActions
  );
  const baseClient = createViemClient({
    chain: chainConfig,
    transport: customTransport,
    ...config.account ? { account: config.account } : {}
  });
  const clientWithBasicActions = baseClient.extend(publicActions).extend(walletActions2).extend((client) => accountActions(client));
  const clientWithTransactionActions = {
    ...clientWithBasicActions,
    ...transactionActions(clientWithBasicActions, publicClient),
    ...chainActions(clientWithBasicActions),
    ...walletActions(clientWithBasicActions)
  };
  const clientWithAllActions = {
    ...clientWithTransactionActions,
    ...contractActions(clientWithTransactionActions, publicClient)
  };
  const clientWithReceiptActions = {
    ...clientWithAllActions,
    ...receiptActions(clientWithAllActions, publicClient)
  };
  const finalClient = {
    ...clientWithReceiptActions,
    ...stakingActions(clientWithReceiptActions, publicClient)
  };
  return finalClient;
};
var createPublicClient = (chainConfig, customTransport) => {
  return createPublicViemClient({ chain: chainConfig, transport: customTransport });
};

// src/accounts/account.ts
import { generatePrivateKey as _generatePrivateKey, privateKeyToAccount } from "viem/accounts";
var generatePrivateKey = () => _generatePrivateKey();
var createAccount = (accountPrivateKey) => {
  const privateKey = accountPrivateKey || generatePrivateKey();
  const account = privateKeyToAccount(privateKey);
  return account;
};

// src/contracts/schema.ts
function buildGenVmPositionalArgs(options) {
  const { schema, functionName, valuesByParamName, strictTypes = true } = options;
  const method = schema.methods[functionName];
  if (!method) {
    throw new Error(`GenVM schema missing method: ${functionName}`);
  }
  return method.params.map(([name, type], index) => {
    if (!(name in valuesByParamName)) {
      throw new Error(
        `Missing argument "${name}" for ${functionName} (index ${index})`
      );
    }
    const value = valuesByParamName[name];
    if (strictTypes && !validateValueAgainstType(value, type)) {
      throw new Error(
        `Invalid argument "${name}" for ${functionName} (index ${index})`
      );
    }
    return value;
  });
}
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof Map);
}
function validateValueAgainstType(value, type) {
  if (type === "any") return true;
  if (type === "null") return value === null;
  if (type === "bool") return typeof value === "boolean";
  if (type === "string") return typeof value === "string";
  if (type === "bytes") {
    return typeof value === "string" || value instanceof Uint8Array;
  }
  if (type === "address") return typeof value === "string";
  if (type === "int") return typeof value === "number" || typeof value === "bigint";
  if (type === "array") return Array.isArray(value);
  if (type === "dict") return isPlainObject(value) || value instanceof Map;
  if (Array.isArray(type)) {
    if (!Array.isArray(value)) return false;
    if (type.length === 1 && typeof type[0] === "object" && type[0] !== null && "$rep" in type[0]) {
      const elementType = type[0].$rep;
      return value.every((v) => validateValueAgainstType(v, elementType));
    }
    return true;
  }
  if (isPlainObject(type)) {
    const orTypes = type.$or;
    if (Array.isArray(orTypes)) {
      return orTypes.some(
        (t) => validateValueAgainstType(value, t)
      );
    }
    if ("$dict" in type) {
      const dictType = type.$dict;
      if (value instanceof Map) {
        for (const v of value.values()) {
          if (!validateValueAgainstType(v, dictType)) return false;
        }
        return true;
      }
      if (!isPlainObject(value)) return false;
      return Object.values(value).every(
        (v) => validateValueAgainstType(v, dictType)
      );
    }
    if (isPlainObject(value)) {
      return Object.entries(type).every(([key, keyType]) => {
        if (!(key in value)) return true;
        return validateValueAgainstType(
          value[key],
          keyType
        );
      });
    }
  }
  return true;
}
export {
  abi_exports as abi,
  buildGenVmPositionalArgs,
  chains_exports as chains,
  createAccount,
  createClient,
  decodeInputData,
  decodeLocalnetTransaction,
  decodeTransaction,
  formatStakingAmount,
  generatePrivateKey,
  parseStakingAmount,
  simplifyTransactionReceipt
};
