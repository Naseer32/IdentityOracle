import { createClient } from "genlayer-js";
import { studionet, testnetBradbury } from "genlayer-js/chains";

// Which network the deployed contract lives on: "bradbury" or "studio".
export const NETWORK = "bradbury";
export const CONTRACT_ADDRESS = "0xe49B18B010226e797C38693FccE8e82D219Bc8C1";

const CHAIN = NETWORK === "bradbury" ? testnetBradbury : studionet;

let client = null;
let connectedAccount = null;

function assertConfigured() {
  if (!/^0x[0-9a-fA-F]{40}$/.test(CONTRACT_ADDRESS)) {
    throw new Error("Set CONTRACT_ADDRESS in src/genlayer.js to your deployed v2 contract address.");
  }
}

function toChainParams(chain) {
  // Derived from the chain object so it never drifts from genlayer-js.
  return {
    chainId: "0x" + chain.id.toString(16),
    chainName: chain.name,
    rpcUrls: chain.rpcUrls.default.http,
    nativeCurrency: chain.nativeCurrency,
    blockExplorerUrls: chain.blockExplorers ? [chain.blockExplorers.default.url] : undefined,
  };
}

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("No wallet found. Open this page in a wallet browser (Rabby, MetaMask).");
  }
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  connectedAccount = accounts[0];
  // Adds the chain if missing, switches to it if present.
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [toChainParams(CHAIN)],
  });
  client = createClient({
    chain: CHAIN,
    endpoint: CHAIN.rpcUrls.default.http[0],
    account: connectedAccount,
    transport: window.ethereum,
  });
  return connectedAccount;
}

export function getConnectedAccount() {
  return connectedAccount;
}

function need() {
  if (!client) throw new Error("Wallet not connected");
  assertConfigured();
}

async function write(functionName, args) {
  need();
  const hash = await client.writeContract({ address: CONTRACT_ADDRESS, functionName, args });
  // ACCEPTED is enough for the new state to be readable; FINALIZED can lag.
  const receipt = await client.waitForTransactionReceipt({
    hash,
    status: "ACCEPTED",
    retries: 120,
    interval: 3000,
  });
  return { hash, receipt };
}

function read(functionName, args = []) {
  need();
  return client.readContract({ address: CONTRACT_ADDRESS, functionName, args });
}

export const verifyIdentity = ({ claimedName, claimedAffiliation, org, contactChannel, evidenceUrls }) => {
  const args = [claimedName, claimedAffiliation, org, contactChannel, evidenceUrls]
    .map((v) => String(v ?? "").trim());
  if (!args[2]) throw new Error("Organization is required");
  return write("verify_identity", args);
};

export const recheck = (id, newEvidenceUrls = "") => write("recheck", [id, newEvidenceUrls]);
export const registerOrg = (org, domains) => write("register_org", [org, domains]);

export const getVerification = (id) => read("get_verification", [id]);
export const getVerificationsByRequester = (addr) => read("get_verifications_by_requester", [addr]);
export const getOrgDomains = (org) => read("get_org_domains", [org]);
export const getOwner = () => read("get_owner");
export const transferOwner = (newOwner) => write("transfer_owner", [newOwner]);
export const isVerified = (name, org) => read("is_verified", [name, org]);
      
