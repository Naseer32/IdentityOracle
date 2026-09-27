# Testing evidence

All tests below were run live on GenLayer Studio (studionet) against the
deployed contract `0x2ac254Ae9b6Fc9F7A1B120f3574D0DE6F0e7BcfF`, from the
same requester wallet (`0xBD6D84fC12AE3b9b3110FCc9efF91DDf5d59Aa01`)
unless noted otherwise. Every write below finalized with **Consensus
Result: Accepted**.

## Test 1 — single source, TRUE case
- Input: `("Elon Musk", "CEO of Tesla", "twitter:@elonmusk", "https://en.wikipedia.org/wiki/Elon_Musk")`
- Result: `verdict: true, confidence: high, confirmed_count: 1, total_sources: 1`
- Tx: `0x520d4905f0bfbe76490b1125b170be0c6ff4fce4f15c5e27750b14b733712724` (prior deployment `0x6b6f25e323B43F32602405FEFddD339e292720aa`)

## Test 2 — single source, FALSE case
- Input: same as Test 1 but `claimed_affiliation = "CEO of Microsoft"`
- Result: `verdict: false, confidence: low, confirmed_count: 0, total_sources: 1`
- Tx: `0xb32350679cc5dd26bcea97f290e048760b44cb0c547b9ac6f02f8107a9b419f9`

## Test 3 — unreachable source, no crash
- Input: `evidence_urls = "https://this-domain-does-not-exist-xyz123abc.com"`
- Result: `verdict: false, confidence: low, confirmed_count: 0, total_sources: 1` — handled cleanly via the `[UNREACHABLE]` fallback in `judge_one`, no execution error
- Tx: `0x796a37c915fbeb39ba48a0f52fd653b9355221bcd533a26924b1affba0016da5`

## Test 4 — two sources, unanimous requirement
- Input: `evidence_urls = "https://en.wikipedia.org/wiki/Elon_Musk, https://en.wikipedia.org/wiki/Tesla,_Inc."`
- Result: `verdict: true, confidence: high, confirmed_count: 2, total_sources: 2`
- Also confirms the comma-in-URL fix: the literal comma inside the Tesla
  Wikipedia URL is not mistaken for a source separator
- Tx: `0x71e08626a085a6e9ca9d5214244796937b037a5a1a07a57e1c128580613cea15` (current deployment `0x2ac254Ae9b6Fc9F7A1B120f3574D0DE6F0e7BcfF`)

## Test 5 — three sources, majority rule
- Input: `evidence_urls = "https://en.wikipedia.org/wiki/Elon_Musk, https://en.wikipedia.org/wiki/Tesla,_Inc., https://en.wikipedia.org/wiki/SpaceX"`
- Result: `verdict: true, confidence: medium (2 of 3, not unanimous), confirmed_count: 2, total_sources: 3`
- Confirms the majority-of-3 rule and the high→medium confidence downgrade when not unanimous
- Tx: `0xace7bb05c54d2052a18dc6bddaf35a3fb74dde72aa92986f3abee63c61dbb547`

## Test 6 — input validation (rejection)
- Input: `claimed_name = ""` (empty)
- Result: execution `ERROR` / `Rollback`, error message `"claimed_name and claimed_affiliation are required"` — no record created
- Tx: `0xfd8e6a0792be2f54633ef17078f3c2ba74a24dcb4e28ae4407f57bbc9d325667`

## View checks
- `get_verification(1)` through `get_verification(3)` — each returned a
  record matching its corresponding write above exactly (fields checked:
  claimed_name, claimed_affiliation, verdict, confidence,
  confirmed_count, total_sources)
- `get_verification_count()` → `3` (only the 3 successful writes on this
  deployment count; the rejected Test 6 call correctly added nothing)
- `get_verifications_by_requester("0xBD6D84fC12AE3b9b3110FCc9efF91DDf5d59Aa01")` → `[1, 2, 3]`

## Bugs found and fixed during this testing pass

These are documented for transparency, since they reflect real GenVM
behavior that isn't always obvious from tutorials:

1. **Manual `DynArray` instantiation in `__init__`** — GenVM
   auto-initializes storage arrays; calling `DynArray[T]()` yourself
   raises `TypeError: this class can't be instantiated by user`.
2. **Missing `__init__` entirely** breaks Studio's schema/deploy-form
   introspection ("Could not load contract schema") — an empty
   `def __init__(self): pass` is required even when there's nothing to
   initialize manually.
3. **`@allow_storage` classes need an explicit `__init__`** — without
   one, constructing a record with keyword arguments
   (`Verification(id=..., ...)`) fails with
   `TypeError: object.__init__() takes exactly one argument`.
4. **`gl.nondet.exec_prompt(..., response_format="json")` can return an
   already-parsed `dict`**, not always a raw string — calling
   `json.loads()` on it silently raises `TypeError`, which is easy to
   swallow into a misleading "unparseable output" fallback.
5. **Custom `validator_fn` for `gl.vm.run_nondet_unsafe` takes exactly
   one argument** (the leader's result) — it must independently
   re-execute the non-deterministic logic itself and compare, not
   receive a second "my_result" parameter.
6. **`gl.eq_principle.strict_eq(fn)`** is a simpler, more reliable
   alternative to hand-rolling `run_nondet_unsafe` + a custom
   `validator_fn` — GenVM handles the leader/validator exact-equality
   check internally. Switching to it resolved persistent
   `Consensus Result: Undetermined` outcomes.
7. **Comma-splitting a comma-separated URL list breaks on URLs that
   themselves contain a comma** (e.g. Wikipedia's `Tesla,_Inc.` page).
   Fixed by splitting only on a comma immediately followed by
   `http(s)://`.
