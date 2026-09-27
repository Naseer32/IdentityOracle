import { createClient, studionet } from "genlayer-js";

// Update this after each redeploy.
export const CONTRACT_ADDRESS = "0x2ac254Ae9b6Fc9F7A1B120f3574D0DE6F0e7BcfF";

let client = null;
let connectedAccount = null;

function toChainParams(chain) {
  // Derive chain params directly from the imported chain object at
  // runtime instead of hardcoding them, so they never drift if the
  // genlayer-js chain definition changes.
  return {
    chainId: "0x" + chain.id.toString(16),
    chainName: chain.name,
    rpcUrls: chain.rpcUrls.default.http,
    nativeCurrency: chain.nativeCurrency,
    blockExplorerUrls: chain.blockExplorers
      ? [chain.blockExplorers.default.url]
      : undefined,
  };
}

async function ensureCorrectChain() {
  const params = toChainParams(studionet);
  try {
    // wallet_addEthereumChain switches to the chain if it's already
    // added, or adds + switches if it isn't — simpler and more
    // reliable across mobile wallets than trying switch-then-add.
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [params],
    });
  } catch (err) {
    console.error("Failed to switch/add chain:", err);
    throw err;
  }
}

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("No wallet found. Open this page in a wallet browser (e.g. Rabby, MetaMask).");
  }
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  connectedAccount = accounts[0];
  await ensureCorrectChain();

  client = createClient({
    chain: studionet,
    endpoint: studionet.rpcUrls.default.http[0],
    account: connectedAccount,
    transport: window.ethereum,
  });

  return connectedAccount;
}

export function getConnectedAccount() {
  return connectedAccount;
}

export async function verifyIdentity({ claimedName, claimedAffiliation, contactChannel, evidenceUrls }) {
  if (!client) throw new Error("Wallet not connected");

  const txHash = await client.writeContract({
    address: CONTRACT_ADDRESS,
    functionName: "verify_identity",
    args: [claimedName, claimedAffiliation, contactChannel, evidenceUrls],
  });

  const receipt = await client.waitForTransactionReceipt({
    hash: txHash,
    status: "FINALIZED",
  });

  return { txHash, receipt };
}

export async function getVerificationCount() {
  if (!client) throw new Error("Wallet not connected");
  return client.readContract({
    address: CONTRACT_ADDRESS,
    functionName: "get_verification_count",
    args: [],
  });
}

export async function getVerification(id) {
  if (!client) throw new Error("Wallet not connected");
  return client.readContract({
    address: CONTRACT_ADDRESS,
    functionName: "get_verification",
    args: [id],
  });
}

export async function getVerificationsByRequester(address) {
  if (!client) throw new Error("Wallet not connected");
  return client.readContract({
    address: CONTRACT_ADDRESS,
    functionName: "get_verifications_by_requester",
    args: [address],
  });
}
