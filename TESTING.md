# Testing evidence

All tests below were run live on GenLayer Bradbury testnet (Phase 1) against the
deployed contract `0xe49B18B010226e797C38693FccE8e82D219Bc8C1`, from the same
requester wallet (`0x53b20BeADADe01b46a3fb5bdbC85D3A7B0f12A96`) unless noted
otherwise. Every write below finalized with Live consensus status: **Accepted**,
except the appeal recheck (see "Open issue" below).

### Test 1 — owner check
Call: `get_owner()`
Result: `0x53b20BeADADe01b46a3fb5bdbC85D3A7B0f12A96` — matches the deployer address

### Test 2 — empty state
Call: `get_verification_count()`
Result: `0`

### Test 3 — domain validation (rejection)
Input: `register_org("bitget", "https://bitget.com")`
Result: execution ERROR — domains must be bare hostnames, not URLs; no domain stored
Confirmed via follow-up `get_org_domains("bitget")` → `""`

### Test 4 — org registration
Input: `register_org("bitget", "bitget.com")`
Result: accepted, no execution error
Tx: `0xa55b7c8947ef437b5342d77226144721a9b95dd8086e1e2e6504ef0dc0199b27`

### Test 5 — case-insensitive lookup
Call: `get_org_domains("Bitget")`
Result: `"bitget.com"` — confirms org keys are normalized to lowercase

### Test 6 — single source, TRUE case, unbound org
Input: `("Gracy Chen", "CEO", org="", contact="", "https://en.wikipedia.org/wiki/Bitget")`
Result: `verdict: true, confidence: medium, confirmed_count: 1, total_sources: 1, domain_bound: false`
Confidence is `medium` not `high` because the org wasn't domain-bound for this call

### Test 7 — domain binding blocks off-domain evidence
Input: same as Test 6 but `org="bitget"` (now bound to bitget.com; evidence is a Wikipedia URL)
Result: `verdict: false, confidence: low, reasoning: "S1:offdomain; ...; no_official_source"` — evidence never reaches the LLM once domain binding rejects the host

### Test 8 — name gate blocks fabricated identity before the LLM call
Input: fake claimed_name, org blank, same Wikipedia URL
Result: `verdict: false, reasoning: "S1:name_absent; ..."`, `evidence_digests: ""` — no digest recorded because the name-gate check short-circuits before any excerpt is hashed

### Test 9 — real name, fabricated role
Input: real claimed_name, wrong claimed_affiliation, org blank
Result: `verdict: false, reasoning: "S1:not_confirmed; ..."` — digest *is* present (the name was on the page, so the LLM was asked and correctly said no)

### Test 10 — contact binding, matching handle
Input: real name/role, `contact_channel="telegram:@bitget"` (present on the page), org blank
Result: `verdict: true, contact_status: matched`

### Test 11 — contact binding, non-matching handle ("real person, fake account")
Input: real name/role (LLM would confirm), `contact_channel="telegram:@gracy_fake_9931"` (not on the page)
Result: `verdict: false, contact_status: not_listed, reasoning: "...; contact_blocked"` — confirms the core impersonation defense: a correct name/role claim is still rejected if the contact handle isn't attested on the source page

### Test 12 — unreachable source, no crash
Input: `evidence_urls = "https://this-site-does-not-exist-91827.com/about"`
Result: `verdict: false, reasoning: "S1:unreachable; ..."`, `evidence_digests: ""` — handled cleanly, no execution error

### View checks
- `get_verification(1)` through `get_verification(8)` — each matches its corresponding write above exactly (all fields)
- `get_verification_count()` → `8`
- `get_verifications_by_requester("0x53b20BeADADe01b46a3fb5bdbC85D3A7B0f12A96")` → `[1,2,3,4,5,6,7,8]`
- `get_verification(999)` → execution error (out-of-range id), no record returned
- `is_verified("Gracy Chen", "")` → reflects the **latest** matching record (id 8, rejected), not the best one — see "Known limitation" below
- `is_verified("Wani Bogi", "")` → `reason: not_found, verification_id: 0`

### recheck — self re-check, no new evidence
Input: `recheck(1, "")` from the original requester
Result: accepted; `status` stayed `valid`, `recheck_count` incremented from 0→1, `last_checked_at` and `expires_at` refreshed, `created_at` unchanged

### recheck — appeal with new evidence
Input: `recheck(8, "https://en.wikipedia.org/wiki/Bitget")` from the original requester, on a record that was previously rejected for an unreachable URL
Result: **stuck at `validators_timeout` / `pending`, never reached Accepted** — see "Open issue" below

## Known limitation
`is_verified()` looks at the *latest* record for a given `claimed_name` + `org`
pair, not the highest-confidence or best one. A later failed attempt (wrong
role, unreachable page, etc.) shadows an earlier valid verification until
someone rechecks or appeals it. Worth revisiting before this contract is used
for automated trust decisions by other contracts.

## Open issue — recheck stuck at validators_timeout
Repeated attempts to re-run the appeal test above returned
`validators_timeout` or `pending`, coinciding with the Studio's Validators
panel showing **0 validators** for an extended period — after 17 prior calls
(including writes using the identical `_run_judgement` code path) had all
gone through cleanly with Accepted status shortly before. This points to a
Studio/testnet-side validator availability issue at the time of testing
rather than a bug in `recheck` itself: no contract state was corrupted by the
stuck transactions, and they can be safely resubmitted once validators are
available again.
