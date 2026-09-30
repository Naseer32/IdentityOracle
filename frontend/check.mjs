import { createClient } from "genlayer-js";
import { testnetBradbury } from "genlayer-js/chains";

const client = createClient({ chain: testnetBradbury });
const ADDR = "0xe49B18B010226e797C38693FccE8e82D219Bc8C1";

try {
  const owner = await client.readContract({ address: ADDR, functionName: "get_owner", args: [] });
  console.log("owner:", owner);
} catch (e) { console.log("read failed:", e.message); }

for (const hash of process.argv.slice(2)) {
  try {
    const tx = await client.getTransaction({ hash });
    console.log(hash, "->", tx.statusName ?? tx.status);
  } catch (e) { console.log(hash, "error:", e.message); }
}
