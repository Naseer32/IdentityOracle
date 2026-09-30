import { createClient } from "genlayer-js";
import { testnetBradbury } from "genlayer-js/chains";

const ADDRESS = "0xe49B18B010226e797C38693FccE8e82D219Bc8C1";
const chain = testnetBradbury;

// [sunan parameter, nau'i]  nau'i: "str" ko "int"
const READ = [
  { name: "get_org_domains", args: [["org", "str"]] },
  { name: "get_owner", args: [] },
  { name: "get_verification", args: [["id", "int"]] },
  { name: "get_verification_count", args: [] },
  { name: "get_verifications_by_requester", args: [["requester", "str"]] },
  { name: "is_verified", args: [["name", "str"], ["org", "str"]] },
];
const WRITE = [
  { name: "recheck", args: [["id", "int"]] },
  { name: "register_org", args: [["org", "str"], ["domains", "str"]] },
  { name: "transfer_owner", args: [["new_owner", "str"]] },
  { name: "verify_identity", args: [["name", "str"], ["role", "str"], ["org", "str"], ["contact", "str"], ["evidence_urls", "str"]] },
];

const css = `
#methods{margin:16px 0;font-family:system-ui,sans-serif}
#methods h3{margin:18px 0 8px;font-size:16px}
.m-card{border:1px solid #8884;border-radius:10px;margin-bottom:8px;overflow:hidden}
.m-head{width:100%;text-align:left;padding:14px;font-size:15px;font-family:monospace;
  background:#8881;border:0;color:inherit;display:flex;justify-content:space-between}
.m-body{display:none;padding:12px}
.m-card.open .m-body{display:block}
.m-card.open .m-head .arr{transform:rotate(180deg)}
.m-body label{display:block;font-size:12px;opacity:.7;margin:8px 0 3px}
.m-body input{width:100%;box-sizing:border-box;padding:10px;font-size:15px;border-radius:8px;
  border:1px solid #8886;background:transparent;color:inherit}
.m-run{margin-top:12px;padding:10px 16px;font-size:15px;border:0;border-radius:8px;
  background:#4f46e5;color:#fff}
.m-out{margin-top:10px;padding:10px;font-size:12px;white-space:pre-wrap;word-break:break-all;
  background:#8881;border-radius:8px;display:none}
#m-connect{padding:10px 16px;border:0;border-radius:8px;background:#4f46e5;color:#fff;font-size:15px}
`;
document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

const plain = (v) =>
  JSON.stringify(
    v,
    (k, x) => (typeof x === "bigint" ? x.toString() : x instanceof Map ? Object.fromEntries(x) : x),
    2
  );

const readClient = createClient({ chain });

async function getAccount() {
  const accs = await window.ethereum.request({ method: "eth_accounts" });
  if (!accs.length) throw new Error("Da farko danna 'Connect Wallet' a saman shafi.");
  return accs[0];
}

function parseArgs(m, body) {
  return m.args.map(([n, t], i) => {
    const v = body.querySelectorAll("input")[i].value.trim();
    return t === "int" ? BigInt(v) : v;
  });
}

function card(m, isWrite) {
  const el = document.createElement("div");
  el.className = "m-card";
  el.innerHTML = `
    <button class="m-head"><span>${m.name}</span><span class="arr">▾</span></button>
    <div class="m-body">
      ${m.args.map(([n, t]) => `<label>${n} (${t})</label><input placeholder="${n}">`).join("")}
      <button class="m-run">${isWrite ? "Send transaction" : "Call"}</button>
      <div class="m-out"></div>
    </div>`;
  const body = el.querySelector(".m-body");
  const out = el.querySelector(".m-out");
  el.querySelector(".m-head").onclick = () => el.classList.toggle("open");
  el.querySelector(".m-run").onclick = async () => {
    out.style.display = "block";
    out.textContent = "Ana aiki...";
    try {
      const args = parseArgs(m, body);
      if (!isWrite) {
        const r = await readClient.readContract({ address: ADDRESS, functionName: m.name, args });
        out.textContent = plain(r);
      } else {
        const account = await getAccount();
        const wc = createClient({ chain, account });
        const hash = await wc.writeContract({ address: ADDRESS, functionName: m.name, args, value: 0n });
        out.textContent = "Tx: " + hash + "\nAna jira ACCEPTED...";
        await wc.waitForTransactionReceipt({ hash, status: "ACCEPTED", retries: 120, interval: 3000 });
        out.textContent = "An yi nasara ✔\nTx: " + hash;
      }
    } catch (e) {
      out.textContent = "Kuskure: " + (e.message || e);
    }
  };
  return el;
}

const root = document.getElementById("methods");
root.innerHTML = `<h3>Read Methods</h3><div id="m-read"></div>
  <h3>Write Methods</h3><div id="m-write"></div>`;
READ.forEach((m) => document.getElementById("m-read").append(card(m, false)));
WRITE.forEach((m) => document.getElementById("m-write").append(card(m, true)));
