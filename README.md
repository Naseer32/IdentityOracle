# IdentityVerificationOracle

An anti-impersonation / social-engineering-defense intelligent contract for
GenLayer. It verifies a claimed identity (name + role/affiliation at an
organization) against live web evidence, using layered deterministic checks
plus a single narrow LLM question per source.

## Why

Crypto teams are frequently targeted by impersonation attacks (e.g. compromised
or fake "journalist"/"partner" accounts, Lazarus-Group-style social
engineering). This contract lets anyone request a verification of a claimed
identity, and lets other contracts/apps check `is_verified()` before trusting
a claim.

## How it works

1. **Domain binding** — an on-chain registry (`register_org`) maps an
   organization to its official domain(s). If an org is bound, evidence from
   any other host is ignored (`offdomain`), never even reaching the LLM.
2. **Name gate** — the claimed name must literally appear on the page
   (checked in code) before the LLM is asked anything.
3. **Contact binding** — if a contact handle is supplied, it must appear on a
   confirming page or the record is rejected (`contact_blocked`), even if the
   name/role are confirmed. This is what stops "real person, fake account"
   attacks.
4. **Injection guard** — pages containing known prompt-injection markers are
   rejected outright; all page text is passed to the LLM as untrusted data.
5. **Digest pinning** — a SHA-256 of the evidence excerpt is included in the
   consensus output, so validators must have seen the same content.
6. **Lifecycle** — verifications expire after 30 days, can be re-checked by
   anyone (`recheck`, downgrade-only for non-requesters), and can be appealed
   by the original requester with new evidence (can upgrade).

Only one question ever goes to the LLM per source: `{"confirms": true|false}`
— whether the page states that the exact named person holds the claimed role.
Everything else (domain matching, name presence, contact matching, injection
detection, thresholds) is plain deterministic Python, which keeps validator
consensus reliable via `gl.eq_principle.strict_eq`.

## Deployment

- **Network:** GenLayer Bradbury testnet (Phase 1)
- **Contract address:** `0xe49B18B010226e797C38693FccE8e82D219Bc8C1`
- **Deploy tx:** `0x2e45db9b8f5faf55ab0c217b06f6ecfb321243b0e09f692da223adf6a128bce5`
- **File:** `identity_verification_oracle.py` (~19.4 KB, comments/docstrings
  stripped from the original dev copy to fit under the size limit — no logic
  changed)

## Public methods

| Method | Type | Notes |
|---|---|---|
| `register_org(org, domains)` | write | owner-only; `domains` must be bare hostnames, comma/space separated |
| `get_org_domains(org)` | view | returns stored domains for an org, or `""` |
| `get_owner()` | view | |
| `transfer_owner(new_owner)` | write | owner-only |
| `verify_identity(claimed_name, claimed_affiliation, org, contact_channel, evidence_urls)` | write | up to 3 evidence URLs, comma-separated |
| `recheck(verification_id, new_evidence_urls)` | write | anyone may re-check with stored evidence (downgrade-only); original requester may pass new evidence to appeal (can upgrade) |
| `get_verification(id)` | view | full record |
| `get_verification_count()` | view | |
| `get_verifications_by_requester(address)` | view | list of ids |
| `is_verified(claimed_name, org)` | view | reports on the **latest** record matching name+org |

## Known limitation

`is_verified()` looks at the *latest* record for a given `claimed_name` + `org`
pair, not the best/highest-confidence one. A later failed attempt (e.g. wrong
role, unreachable page) will shadow an earlier valid verification until it's
rechecked or appealed. Worth revisiting if this contract is used for automated
trust decisions by other contracts.

## Test log (Bradbury Studio)

All tests below were run against the deployed contract on 2026-09-28.
Reasoning codes: `confirmed`, `not_confirmed`, `name_absent`, `offdomain`,
`unreachable`, `injection`.

| # | Call | Result |
|---|---|---|
| 1 | `get_owner()` | matches deployer address ✅ |
| 2 | `get_verification_count()` | `0` ✅ |
| 3 | `register_org("bitget", "https://bitget.com")` | rejected — not a bare hostname ✅ |
| 4 | `register_org("bitget", "bitget.com")` | accepted ✅ |
| 5 | `get_org_domains("Bitget")` | `"bitget.com"` (case-insensitive) ✅ |
| 6 | `verify_identity` — real name/role, org blank, Wikipedia URL | `verdict: true`, `confidence: medium`, `bound: false` ✅ |
| 7 | same, but `org: "bitget"` (Wikipedia isn't on bitget.com) | `verdict: false`, `S1:offdomain`, `no_official_source` ✅ |
| 8 | fake name, org blank | `verdict: false`, `S1:name_absent` ✅ |
| 9 | real name, fake role, org blank | `verdict: false`, `S1:not_confirmed` (digest present — name was on page) ✅ |
| 10 | real name/role + matching contact handle | `verdict: true`, `contact_status: matched` ✅ |
| 11 | real name/role + non-matching contact handle | `verdict: false`, `contact_status: not_listed`, `contact_blocked` — confirms the "real person, fake account" defense ✅ |
| 12 | unreachable URL | `verdict: false`, `S1:unreachable` ✅ |
| 13 | `is_verified()` on a name whose *latest* record is rejected | correctly reflects the latest record, not the best one (see Known limitation) ✅ |
| 14 | `is_verified()` on an unknown name | `reason: not_found` ✅ |
| 15 | `get_verifications_by_requester(address)` | correct id list ✅ |
| 16 | `get_verification(999)` | rejected (out-of-range id) ✅ |
| 17 | `recheck(1, "")` (self re-check, no new evidence) | `recheck_count` incremented, stayed `valid` ✅ |
| 18 | `recheck(8, new_url)` (appeal with new evidence) | stuck at `validators_timeout` / `pending` — see below |

### Open issue: recheck stuck at validators_timeout / pending

Attempts to re-run test 18 repeatedly returned `validators_timeout` or
`pending`, and the Studio's Validators panel showed **0 validators** for an
extended period (tests 1–17 had gone through fine with "accepted" status
shortly before this). This looks like a Studio/testnet-side validator
availability issue rather than a contract bug — `recheck` calls the same
`_run_judgement` path as `verify_identity`, which had already succeeded
several times with identical shape. No state was corrupted by the stuck
transactions.

**Next step:** retry `recheck` once the Validators panel shows an active set
again. If validators are present and it still times out consistently, that
would point to something recheck-specific worth investigating (e.g. gas/step
cost of re-rendering `en.wikipedia.org/wiki/Bitget`, which had already been
fetched twice successfully).
