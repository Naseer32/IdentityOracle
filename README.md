# IdentityVerificationOracle

A GenLayer Intelligent Contract that helps counter social-engineering /
impersonation attacks in crypto — the kind where an attacker fakes a
professional identity (e.g. "journalist at a known outlet") to build
trust before striking. It was directly motivated by Bitget CEO Gracy
Chen's public account of a Lazarus Group attempt: a compromised media
Twitter account, a fake journalist persona, weeks of trust-building over
Telegram, and finally a malicious Zoom "interview."

`IdentityVerificationOracle` gives a PR team, an assistant, or any
individual a way to check a claim like *"this person is a journalist at
Outlet X"* against independent evidence **before** taking a call or
clicking a link — using GenLayer's validator consensus instead of
trusting a single off-chain checker.

## How it works

```
verify_identity(claimed_name, claimed_affiliation, contact_channel, evidence_urls)
```

- `claimed_name` — the name the contact is using (e.g. "Jane Doe")
- `claimed_affiliation` — the role/employer being claimed (e.g. "Journalist at ExampleNews")
- `contact_channel` — how they reached you (e.g. `twitter:@handle`, `telegram:@handle`) — recorded for the record, does not affect the verdict
- `evidence_urls` — one to three URLs, comma-separated (e.g. an official
  staff page, press listing, or LinkedIn profile)

For **each** evidence URL independently, GenLayer validators fetch the
page and an LLM answers a single yes/no question: *does this page, on
its own, name this specific person with this specific role?* No
validator sees or is influenced by the others' answers — GenVM's
`gl.eq_principle.strict_eq` requires every validator to arrive at the
identical structured result before the transaction is accepted.

The contract then combines the per-source answers **deterministically in
code** (not by asking an LLM to reason about "how many sources agree"):

| Sources provided | Required to confirm | Confidence if unanimous | Confidence if not |
|---|---|---|---|
| 1 | 1 of 1 | high | — |
| 2 | 2 of 2 (unanimous) | high | — (verdict false otherwise) |
| 3 | 2 of 3 (majority) | high (if 3/3) | medium (if 2/3) |

This means a single fabricated "staff page" isn't enough on its own to
pass with high confidence when multiple sources are supplied — an
attacker would need to fake several independent, unrelated sources.

## Deployed contract (Studio)

- **Network:** GenLayer Studio (studionet)
- **Address:** `0x2ac254Ae9b6Fc9F7A1B120f3574D0DE6F0e7BcfF`
- Explorer: https://studio.genlayer.com

See `TESTING.md` for the full set of live test transactions and results.

## Views

- `get_verification(verification_id) -> dict` — full record for one verification
- `get_verification_count() -> int` — total verifications recorded
- `get_verifications_by_requester(address) -> list[int]` — ids submitted by a given wallet

## Known limitations

- `timestamp` on stored records is currently an empty string — this
  GenVM runtime's `gl.message` does not expose a timestamp attribute.
  Not a bug in the contract; simply unavailable in this environment.
- `evidence_urls` are split on commas that are followed by `http(s)://`,
  so a comma embedded inside a URL (e.g. Wikipedia's
  `.../wiki/Tesla,_Inc.`) is handled correctly, but URLs must otherwise
  be well-formed and comma-free elsewhere.
- This oracle establishes whether *evidence pages say someone holds a
  claimed role* — it cannot detect a compromised-but-legitimate account,
  or a real employee acting in bad faith. It's one signal to use
  alongside normal caution, not a substitute for it.
  
