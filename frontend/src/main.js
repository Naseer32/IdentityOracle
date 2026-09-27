import {
  connectWallet,
  getConnectedAccount,
  verifyIdentity,
  getVerification,
  getVerificationsByRequester,
} from "./genlayer.js";

const connectBtn = document.getElementById("connect-btn");
const walletStatus = document.getElementById("wallet-status");
const form = document.getElementById("verify-form");
const submitBtn = document.getElementById("submit-btn");
const submitStatus = document.getElementById("submit-status");
const resultPanel = document.getElementById("result-panel");
const historyPanel = document.getElementById("history-panel");
const refreshHistoryBtn = document.getElementById("refresh-history-btn");

function renderVerification(v) {
  const badge = v.verdict ? "✅ CONFIRMED" : "❌ NOT CONFIRMED";
  const confClass = `conf-${v.confidence}`;
  return `
    <div class="verification-card">
      <div class="verification-header">
        <span class="badge ${v.verdict ? "badge-true" : "badge-false"}">${badge}</span>
        <span class="confidence ${confClass}">confidence: ${v.confidence}</span>
      </div>
      <p><strong>${escapeHtml(v.claimed_name)}</strong> — ${escapeHtml(v.claimed_affiliation)}</p>
      <p class="muted">Contact: ${escapeHtml(v.contact_channel || "—")}</p>
      <p class="muted">Sources confirmed: ${v.confirmed_count} / ${v.total_sources}</p>
      <p class="muted">Evidence: ${escapeHtml(v.evidence_urls)}</p>
      <p class="reasoning">${escapeHtml(v.reasoning)}</p>
      <p class="muted small">id #${v.id} · requester ${shortAddr(v.requester)}</p>
    </div>
  `;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function shortAddr(addr) {
  if (!addr) return "";
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

async function refreshHistory() {
  const account = getConnectedAccount();
  if (!account) return;
  historyPanel.innerHTML = `<p class="muted">Loading…</p>`;
  try {
    const ids = await getVerificationsByRequester(account);
    if (!ids || ids.length === 0) {
      historyPanel.innerHTML = `<p class="muted">No verifications yet.</p>`;
      return;
    }
    const records = await Promise.all(ids.map((id) => getVerification(id)));
    historyPanel.innerHTML = records
      .slice()
      .reverse()
      .map(renderVerification)
      .join("");
  } catch (err) {
    console.error(err);
    historyPanel.innerHTML = `<p class="error">Failed to load history: ${escapeHtml(err.message)}</p>`;
  }
}

connectBtn.addEventListener("click", async () => {
  connectBtn.disabled = true;
  walletStatus.textContent = "Connecting…";
  try {
    const account = await connectWallet();
    walletStatus.textContent = `Connected: ${shortAddr(account)}`;
    connectBtn.textContent = "Connected";
    await refreshHistory();
  } catch (err) {
    console.error(err);
    walletStatus.textContent = `Error: ${err.message}`;
    connectBtn.disabled = false;
  }
});

refreshHistoryBtn.addEventListener("click", refreshHistory);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!getConnectedAccount()) {
    submitStatus.textContent = "Connect your wallet first.";
    return;
  }

  const claimedName = document.getElementById("claimed_name").value.trim();
  const claimedAffiliation = document.getElementById("claimed_affiliation").value.trim();
  const contactChannel = document.getElementById("contact_channel").value.trim();
  const evidenceUrls = document.getElementById("evidence_urls").value.trim();

  submitBtn.disabled = true;
  submitStatus.textContent = "Submitting — this can take up to ~30s while validators fetch and judge the evidence…";
  resultPanel.innerHTML = `<p class="muted">Waiting for consensus…</p>`;

  try {
    await verifyIdentity({
      claimedName,
      claimedAffiliation,
      contactChannel,
      evidenceUrls,
    });

    // The new record is the highest id belonging to this requester.
    const account = getConnectedAccount();
    const ids = await getVerificationsByRequester(account);
    const newest = await getVerification(ids[ids.length - 1]);

    resultPanel.innerHTML = renderVerification(newest);
    submitStatus.textContent = "Done.";
    form.reset();
    await refreshHistory();
  } catch (err) {
    console.error(err);
    submitStatus.textContent = `Error: ${err.message}`;
    resultPanel.innerHTML = `<p class="error">Verification failed or was rejected: ${escapeHtml(err.message)}</p>`;
  } finally {
    submitBtn.disabled = false;
  }
});
