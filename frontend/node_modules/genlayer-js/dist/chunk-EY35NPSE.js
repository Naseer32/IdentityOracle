// src/types/calldata.ts
var CalldataAddress = class {
  bytes;
  constructor(addr) {
    if (addr.length != 20) {
      throw new Error(`invalid address length ${addr}`);
    }
    this.bytes = addr;
  }
};

// src/types/transactions.ts
var TransactionStatus = /* @__PURE__ */ ((TransactionStatus2) => {
  TransactionStatus2["UNINITIALIZED"] = "UNINITIALIZED";
  TransactionStatus2["PENDING"] = "PENDING";
  TransactionStatus2["PROPOSING"] = "PROPOSING";
  TransactionStatus2["COMMITTING"] = "COMMITTING";
  TransactionStatus2["REVEALING"] = "REVEALING";
  TransactionStatus2["ACCEPTED"] = "ACCEPTED";
  TransactionStatus2["UNDETERMINED"] = "UNDETERMINED";
  TransactionStatus2["FINALIZED"] = "FINALIZED";
  TransactionStatus2["CANCELED"] = "CANCELED";
  TransactionStatus2["APPEAL_REVEALING"] = "APPEAL_REVEALING";
  TransactionStatus2["APPEAL_COMMITTING"] = "APPEAL_COMMITTING";
  TransactionStatus2["READY_TO_FINALIZE"] = "READY_TO_FINALIZE";
  TransactionStatus2["VALIDATORS_TIMEOUT"] = "VALIDATORS_TIMEOUT";
  TransactionStatus2["LEADER_TIMEOUT"] = "LEADER_TIMEOUT";
  return TransactionStatus2;
})(TransactionStatus || {});
var TransactionResult = /* @__PURE__ */ ((TransactionResult2) => {
  TransactionResult2["SUCCESS"] = "SUCCESS";
  TransactionResult2["FAILURE"] = "FAILURE";
  return TransactionResult2;
})(TransactionResult || {});
var TransactionResult = /* @__PURE__ */ ((TransactionResult2) => {
  TransactionResult2["IDLE"] = "IDLE";
  TransactionResult2["AGREE"] = "AGREE";
  TransactionResult2["DISAGREE"] = "DISAGREE";
  TransactionResult2["TIMEOUT"] = "TIMEOUT";
  TransactionResult2["DETERMINISTIC_VIOLATION"] = "DETERMINISTIC_VIOLATION";
  TransactionResult2["NO_MAJORITY"] = "NO_MAJORITY";
  TransactionResult2["MAJORITY_AGREE"] = "MAJORITY_AGREE";
  TransactionResult2["MAJORITY_DISAGREE"] = "MAJORITY_DISAGREE";
  return TransactionResult2;
})(TransactionResult || {});
var transactionsStatusNumberToName = {
  "0": "UNINITIALIZED" /* UNINITIALIZED */,
  "1": "PENDING" /* PENDING */,
  "2": "PROPOSING" /* PROPOSING */,
  "3": "COMMITTING" /* COMMITTING */,
  "4": "REVEALING" /* REVEALING */,
  "5": "ACCEPTED" /* ACCEPTED */,
  "6": "UNDETERMINED" /* UNDETERMINED */,
  "7": "FINALIZED" /* FINALIZED */,
  "8": "CANCELED" /* CANCELED */,
  "9": "APPEAL_REVEALING" /* APPEAL_REVEALING */,
  "10": "APPEAL_COMMITTING" /* APPEAL_COMMITTING */,
  "11": "READY_TO_FINALIZE" /* READY_TO_FINALIZE */,
  "12": "VALIDATORS_TIMEOUT" /* VALIDATORS_TIMEOUT */,
  "13": "LEADER_TIMEOUT" /* LEADER_TIMEOUT */
};
var transactionsStatusNameToNumber = {
  ["UNINITIALIZED" /* UNINITIALIZED */]: "0",
  ["PENDING" /* PENDING */]: "1",
  ["PROPOSING" /* PROPOSING */]: "2",
  ["COMMITTING" /* COMMITTING */]: "3",
  ["REVEALING" /* REVEALING */]: "4",
  ["ACCEPTED" /* ACCEPTED */]: "5",
  ["UNDETERMINED" /* UNDETERMINED */]: "6",
  ["FINALIZED" /* FINALIZED */]: "7",
  ["CANCELED" /* CANCELED */]: "8",
  ["APPEAL_REVEALING" /* APPEAL_REVEALING */]: "9",
  ["APPEAL_COMMITTING" /* APPEAL_COMMITTING */]: "10",
  ["READY_TO_FINALIZE" /* READY_TO_FINALIZE */]: "11",
  ["VALIDATORS_TIMEOUT" /* VALIDATORS_TIMEOUT */]: "12",
  ["LEADER_TIMEOUT" /* LEADER_TIMEOUT */]: "13"
};
var DECIDED_STATES = [
  "ACCEPTED" /* ACCEPTED */,
  "UNDETERMINED" /* UNDETERMINED */,
  "LEADER_TIMEOUT" /* LEADER_TIMEOUT */,
  "VALIDATORS_TIMEOUT" /* VALIDATORS_TIMEOUT */,
  "CANCELED" /* CANCELED */,
  "FINALIZED" /* FINALIZED */
];
function isDecidedState(status) {
  return DECIDED_STATES.some(
    (state) => transactionsStatusNameToNumber[state] === status
  );
}
var transactionResultNumberToName = {
  "0": "IDLE" /* IDLE */,
  "1": "AGREE" /* AGREE */,
  "2": "DISAGREE" /* DISAGREE */,
  "3": "TIMEOUT" /* TIMEOUT */,
  "4": "DETERMINISTIC_VIOLATION" /* DETERMINISTIC_VIOLATION */,
  "5": "NO_MAJORITY" /* NO_MAJORITY */,
  "6": "MAJORITY_AGREE" /* MAJORITY_AGREE */,
  "7": "MAJORITY_DISAGREE" /* MAJORITY_DISAGREE */
};
var TransactionResultNameToNumber = {
  ["IDLE" /* IDLE */]: "0",
  ["AGREE" /* AGREE */]: "1",
  ["DISAGREE" /* DISAGREE */]: "2",
  ["TIMEOUT" /* TIMEOUT */]: "3",
  ["DETERMINISTIC_VIOLATION" /* DETERMINISTIC_VIOLATION */]: "4",
  ["NO_MAJORITY" /* NO_MAJORITY */]: "5",
  ["MAJORITY_AGREE" /* MAJORITY_AGREE */]: "6",
  ["MAJORITY_DISAGREE" /* MAJORITY_DISAGREE */]: "7"
};
var ExecutionResult = /* @__PURE__ */ ((ExecutionResult2) => {
  ExecutionResult2["NOT_VOTED"] = "NOT_VOTED";
  ExecutionResult2["FINISHED_WITH_RETURN"] = "FINISHED_WITH_RETURN";
  ExecutionResult2["FINISHED_WITH_ERROR"] = "FINISHED_WITH_ERROR";
  return ExecutionResult2;
})(ExecutionResult || {});
var executionResultNumberToName = {
  "0": "NOT_VOTED" /* NOT_VOTED */,
  "1": "FINISHED_WITH_RETURN" /* FINISHED_WITH_RETURN */,
  "2": "FINISHED_WITH_ERROR" /* FINISHED_WITH_ERROR */
};
var VoteType = /* @__PURE__ */ ((VoteType2) => {
  VoteType2["NOT_VOTED"] = "NOT_VOTED";
  VoteType2["AGREE"] = "AGREE";
  VoteType2["DISAGREE"] = "DISAGREE";
  VoteType2["TIMEOUT"] = "TIMEOUT";
  VoteType2["DETERMINISTIC_VIOLATION"] = "DETERMINISTIC_VIOLATION";
  return VoteType2;
})(VoteType || {});
var voteTypeNumberToName = {
  "0": "NOT_VOTED" /* NOT_VOTED */,
  "1": "AGREE" /* AGREE */,
  "2": "DISAGREE" /* DISAGREE */,
  "3": "TIMEOUT" /* TIMEOUT */,
  "4": "DETERMINISTIC_VIOLATION" /* DETERMINISTIC_VIOLATION */
};
var voteTypeNameToNumber = {
  ["NOT_VOTED" /* NOT_VOTED */]: "0",
  ["AGREE" /* AGREE */]: "1",
  ["DISAGREE" /* DISAGREE */]: "2",
  ["TIMEOUT" /* TIMEOUT */]: "3",
  ["DETERMINISTIC_VIOLATION" /* DETERMINISTIC_VIOLATION */]: "4"
};
var TransactionHashVariant = /* @__PURE__ */ ((TransactionHashVariant2) => {
  TransactionHashVariant2["LATEST_FINAL"] = "latest-final";
  TransactionHashVariant2["LATEST_NONFINAL"] = "latest-nonfinal";
  return TransactionHashVariant2;
})(TransactionHashVariant || {});

export {
  CalldataAddress,
  TransactionStatus,
  TransactionResult,
  transactionsStatusNumberToName,
  transactionsStatusNameToNumber,
  DECIDED_STATES,
  isDecidedState,
  transactionResultNumberToName,
  TransactionResultNameToNumber,
  ExecutionResult,
  executionResultNumberToName,
  VoteType,
  voteTypeNumberToName,
  voteTypeNameToNumber,
  TransactionHashVariant
};
