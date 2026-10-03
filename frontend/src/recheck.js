import { createClient } from "genlayer-js";
import { testnetBradbury } from "genlayer-js/chains";

const ADDRESS = "0xe49B18B010226e797C38693FccE8e82D219Bc8C1";
const chain = testnetBradbury;
const readClient = createClient({ chain });

document.head.insertAdjacentHTML("beforeend", `<style>
#rc{margin:16px 0;font-family:system-ui,sans-serif;border:1px solid #8884;border-radius:10px;overflow:hidden}
#rc .rc-head{width:100%;text-align:left;padding:16px;font-size:16px;font-weight:600;background:#8881;border:0;color:inherit;display:flex;justify-content:space-between}
#rc .rc-body{display:none;padding:10px}
#rc.open .rc-body{display:block}
#rc.open .arr{transform:rotate(180deg)}
.rc-item{border:1px solid #8884;border-radius:8px;padding:10px;margin-top:8px}
.rc-item pre{margin:6px 0;font-size:12px;white-space:pre-wrap;word-break:break-all}
.rc-btn{padding:9px 14px;font-size:14px;border:0;border-radius:8px;background:#4f46e5;color:#fff}
.rc-st{display:block;margin-top:8px;font-size:13px}
</style>`);

const plain = (v) =>
  JSON.stringify(v, (k, x) => (typeof x === "bigint" ? x.toString() : x instanceof Map ? Object.fromEntries(x) : x), 2);
const toArg = (v) => (/^\d+$/.test(String(v)) ? BigInt(v) : v);
const norm = (r) => {
  if (typeof r === "string") { try { return JSON.parse(r); } catch { return r; } }
  return r instanceof Map ? Object.fromEntries(r) : r;
};

const esc = (x) => String(x ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const root = document.createElement("div");
root.id = "rc";
root.innerHTML = `<button class="rc-head"><span>My verifications & Recheck</span><span class="arr">▾</span></button>
<div class="rc-body"><button class="rc-btn" id="rc-refresh">Refresh</button><div id="rc-list"></div></div>`;
const anchor = document.getElementById("methods");
anchor ? anchor.after(root) : document.body.append(root);
root.querySelector(".rc-head").onclick = () => root.classList.toggle("open");

async function recheck(id, st) {
  try {
    const [account] = await window.ethereum.request({ method: "eth_accounts" });
    if (!account) throw new Error("Please click 'Connect Wallet' at the top of the page first.");
    const wc = createClient({ chain, account });
    st.textContent = "Sending...";
    const hash = await wc.writeContract({ address: ADDRESS, functionName: "recheck", args: [toArg(id)], value: 0n });
    st.textContent = "⏳ Pending — Tx: " + hash;
    await wc.waitForTransactionReceipt({ hash, status: "ACCEPTED", retries: 120, interval: 3000 });
    st.textContent = "✅ Accepted — waiting for Finalized...\nTx: " + hash;
    try {
      await wc.waitForTransactionReceipt({ hash, status: "FINALIZED", retries: 200, interval: 5000 });
      st.textContent = "🔒 Finalized\nTx: " + hash;
    } catch { st.textContent += "\n(Not finalized yet, check again later)"; }
  } catch (e) { st.textContent = "Error: " + (e.message || e); }
}

async function load() {
  const list = root.querySelector("#rc-list");
  list.textContent = "Loading...";
  try {
    const [account] = await window.ethereum.request({ method: "eth_accounts" });
    if (!account) { list.textContent = "Please click 'Connect Wallet' at the top of the page first."; return; }
    let items = norm(await readClient.readContract({ address: ADDRESS, functionName: "get_verifications_by_requester", args: [account] }));
    if (!Array.isArray(items)) items = items && typeof items === "object" ? Object.values(items) : [];
    if (!items.length) { list.textContent = "No verifications yet."; return; }
    list.innerHTML = "";
    for (const it of items) {
      let rec = norm(it);
      let id = rec && typeof rec === "object" ? (rec.id ?? rec.verification_id) : rec;
      if (typeof rec !== "object" || rec === null) {
        rec = norm(await readClient.readContract({ address: ADDRESS, functionName: "get_verification", args: [toArg(id)] }));
        if (rec && typeof rec === "object" && id === undefined) id = rec.id;
      }
      const el = document.createElement("div");
      el.className = "rc-item";
      el.innerHTML = `
        <details>
          <summary style="cursor:pointer;font-weight:600;font-size:16px;color:${rec && rec.verdict === true && rec.status === "valid" ? "#16a34a" : "#dc2626"}">
            ${rec && rec.verdict === true && rec.status === "valid" ? "✅ Verified" : "❌ Not verified"} · ${esc(rec.claimed_name || "-")} <span style="opacity:.6;font-size:12px">#${esc(id)}</span>
          </summary>
          <div style="margin-top:8px">
            <div><b>${esc(rec.claimed_name || "-")}</b> — ${esc(rec.claimed_affiliation || "-")}</div>
            <div>Org: ${esc(rec.org || "—")} ${rec.domain_bound ? "🔗 domain-bound" : "(not domain-bound)"}</div>
            <div>Confidence: ${esc(rec.confidence || "-")} · Sources: ${esc(rec.confirmed_count)}/${esc(rec.total_sources)}</div>
            <div>Expires: ${esc(rec.expires_at ? String(rec.expires_at).slice(0, 10) : "-")} · Rechecks: ${esc(rec.recheck_count)}</div>
            <div style="opacity:.8;font-size:13px;margin-top:4px">${esc(rec.reasoning || "")}</div>
            <details style="margin-top:6px"><summary>Details</summary><pre>${esc(plain(rec))}</pre></details>
            <button class="rc-btn" style="margin-top:8px">Recheck</button><span class="rc-st"></span>
          </div>
        </details>`;
      el.querySelector("button").onclick = () => recheck(id, el.querySelector(".rc-st"));
      list.append(el);
    }
  } catch (e) { list.textContent = "Error: " + (e.message || e); }
}
root.querySelector("#rc-refresh").onclick = load;
