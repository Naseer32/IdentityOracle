const url = process.env.RPC || "https://rpc.testnet-chain.genlayer.com";
const rpc = async (method, params) => {
  const r = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  return await r.json();
};
console.log("RPC:", url);
const cid = await rpc("eth_chainId", []);
console.log("chainId:", cid.result ?? JSON.stringify(cid.error));
for (const h of process.argv.slice(2)) {
  const tx = await rpc("eth_getTransactionByHash", [h]);
  const rc = await rpc("eth_getTransactionReceipt", [h]);
  console.log(h.slice(0, 12), "| tx:", tx.result ? "found" : "null",
    "| receipt:", rc.result ? "status " + rc.result.status + ", block " + rc.result.blockNumber : "null");
}
