# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }
from genlayer import *
import json
import re

MAX_SOURCES = 3

# ---------------------------------------------------------------------------
# Schema-enforcement helpers: different validator models phrase booleans
# loosely, and gl.nondet.exec_prompt(response_format="json") sometimes
# returns an already-parsed dict, sometimes a raw string (possibly wrapped
# in markdown fences). We normalize defensively in every case.
# ---------------------------------------------------------------------------

def _parse_bool_candidate(value) -> bool:
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return bool(value)
    if isinstance(value, str):
        v = value.strip().lower()
        if v in ("true", "yes", "1", "confirmed", "verified"):
            return True
        if v in ("false", "no", "0", "unconfirmed", "unverified"):
            return False
    return False


def _parse_confidence_candidate(value) -> str:
    if isinstance(value, str):
        v = value.strip().lower()
        if v in ("high", "medium", "low"):
            return v
    return "low"


def _extract_json(raw: str) -> str:
    text = raw.strip()
    if text.startswith("```"):
        text = text.strip("`")
        if text.lower().startswith("json"):
            text = text[4:]
        text = text.strip()
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        return text[start:end + 1]
    return text


def _parse_model_json(raw) -> dict:
    """Handles exec_prompt returning either an already-parsed dict or a
    raw string (possibly with markdown fences / stray text around it)."""
    if isinstance(raw, dict):
        return raw
    try:
        return json.loads(_extract_json(raw))
    except (json.JSONDecodeError, TypeError):
        return {}


def _safe_int(value) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        return 0


def compute_verdict(confirms: list) -> tuple:
    """Requires unanimous confirmation for 1-2 sources, and at least a
    majority (2 of 3) for 3 sources. Confidence is 'high' only when every
    provided source independently confirms; otherwise capped at 'medium'."""
    total = len(confirms)
    confirmed_count = sum(1 for c in confirms if c)
    threshold = total if total <= 2 else 2
    verdict = confirmed_count >= threshold and confirmed_count > 0
    if verdict and confirmed_count == total:
        confidence = "high"
    elif verdict:
        confidence = "medium"
    else:
        confidence = "low"
    return verdict, confidence, confirmed_count, total


def _get_field(obj, key, default=None):
    """The value returned by gl.eq_principle.strict_eq should already be a
    plain dict, but this stays defensive in case it's some other
    dict-like/attribute-based object. Try all three access styles."""
    if isinstance(obj, dict):
        return obj.get(key, default)
    if hasattr(obj, key):
        return getattr(obj, key)
    try:
        return obj[key]
    except (TypeError, KeyError, IndexError):
        return default


def normalize_final(result) -> dict:
    return {
        "verdict": _parse_bool_candidate(_get_field(result, "verdict")),
        "confidence": _parse_confidence_candidate(_get_field(result, "confidence")),
        "confirmed_count": _safe_int(_get_field(result, "confirmed_count", 0)),
        "total_sources": _safe_int(_get_field(result, "total_sources", 0)),
        "reasoning": str(_get_field(result, "reasoning", ""))[:500],
    }


@allow_storage
class Verification:
    id: u256
    requester: Address
    claimed_name: str
    claimed_affiliation: str
    contact_channel: str  # e.g. "twitter:@handle", "telegram:@handle", "email:x@y.com"
    evidence_urls: str    # comma-joined, in the order submitted
    verdict: bool          # True = identity/affiliation appears CONFIRMED across sources
    confidence: str        # "high" | "medium" | "low"
    confirmed_count: u256
    total_sources: u256
    reasoning: str
    timestamp: str

    def __init__(
        self,
        id: u256,
        requester: Address,
        claimed_name: str,
        claimed_affiliation: str,
        contact_channel: str,
        evidence_urls: str,
        verdict: bool,
        confidence: str,
        confirmed_count: u256,
        total_sources: u256,
        reasoning: str,
        timestamp: str,
    ):
        self.id = id
        self.requester = requester
        self.claimed_name = claimed_name
        self.claimed_affiliation = claimed_affiliation
        self.contact_channel = contact_channel
        self.evidence_urls = evidence_urls
        self.verdict = verdict
        self.confidence = confidence
        self.confirmed_count = confirmed_count
        self.total_sources = total_sources
        self.reasoning = reasoning
        self.timestamp = timestamp


class IdentityVerificationOracle(gl.Contract):
    verifications: DynArray[Verification]

    def __init__(self):
        pass

    @gl.public.write
    def verify_identity(
        self,
        claimed_name: str,
        claimed_affiliation: str,
        contact_channel: str,
        evidence_urls: str,
    ) -> None:
        urls = [u.strip() for u in re.split(r",(?=\s*https?://)", evidence_urls) if u.strip()]
        if not claimed_name.strip() or not claimed_affiliation.strip():
            raise gl.vm.UserError("claimed_name and claimed_affiliation are required")
        if len(urls) < 1:
            raise gl.vm.UserError("At least one evidence_url is required")
        if len(urls) > MAX_SOURCES:
            urls = urls[:MAX_SOURCES]

        def judge_one(url: str) -> bool:
            try:
                page = gl.nondet.web.render(url, mode="text")
            except Exception:
                page = "[UNREACHABLE]"

            prompt = f"""You are verifying whether a claimed professional identity is
genuine, to help prevent social-engineering / impersonation attacks
(e.g. someone falsely claiming to be a journalist at a known outlet
in order to gain trust before an attack).

Claimed name: {claimed_name}
Claimed affiliation/role: {claimed_affiliation}

Below is the text content of ONE web page submitted as evidence
(e.g. an official staff directory, press page, verified bio,
LinkedIn profile, or newsroom listing). Decide whether this page,
on its own, confirms this specific person genuinely holds the
claimed affiliation/role.

Rules:
- Only answer true if the page names this specific person with this
  specific affiliation/role.
- A page that is unrelated, unreachable ("[UNREACHABLE]"), generic,
  or that only mentions the outlet/company without naming this
  person does NOT confirm.

Page content:
---
{page[:4000]}
---

Respond with ONLY a JSON object, no other text, no markdown fences:
{{"confirms": true or false}}"""

            raw = gl.nondet.exec_prompt(prompt, response_format="json")
            parsed = _parse_model_json(raw)
            return _parse_bool_candidate(parsed.get("confirms"))

        def judge() -> dict:
            confirms = [judge_one(u) for u in urls]
            verdict, confidence, confirmed_count, total = compute_verdict(confirms)
            reasoning = "; ".join(
                f"Source {i + 1} {'confirms' if confirms[i] else 'does not confirm'} the claim"
                for i in range(len(urls))
            )
            return {
                "verdict": verdict,
                "confidence": confidence,
                "confirmed_count": confirmed_count,
                "total_sources": total,
                "reasoning": reasoning[:500],
            }

        result = normalize_final(gl.eq_principle.strict_eq(judge))

        new_id = u256(len(self.verifications) + 1)
        self.verifications.append(
            Verification(
                id=new_id,
                requester=gl.message.sender_address,
                claimed_name=claimed_name,
                claimed_affiliation=claimed_affiliation,
                contact_channel=contact_channel,
                evidence_urls=", ".join(urls),
                verdict=result["verdict"],
                confidence=result["confidence"],
                confirmed_count=u256(result["confirmed_count"]),
                total_sources=u256(result["total_sources"]),
                reasoning=result["reasoning"],
                timestamp=str(gl.message.timestamp) if hasattr(gl.message, "timestamp") else "",
            )
        )

    @gl.public.view
    def get_verification(self, verification_id: int) -> dict:
        for v in self.verifications:
            if int(v.id) == verification_id:
                return {
                    "id": int(v.id),
                    "requester": v.requester.as_hex,
                    "claimed_name": v.claimed_name,
                    "claimed_affiliation": v.claimed_affiliation,
                    "contact_channel": v.contact_channel,
                    "evidence_urls": v.evidence_urls,
                    "verdict": v.verdict,
                    "confidence": v.confidence,
                    "confirmed_count": int(v.confirmed_count),
                    "total_sources": int(v.total_sources),
                    "reasoning": v.reasoning,
                    "timestamp": v.timestamp,
                }
        raise gl.vm.UserError(f"No verification with id {verification_id}")

    @gl.public.view
    def get_verification_count(self) -> int:
        return len(self.verifications)

    @gl.public.view
    def get_verifications_by_requester(self, requester_address: str) -> list:
        out = []
        for v in self.verifications:
            if v.requester.as_hex.lower() == requester_address.lower():
                out.append(int(v.id))
        return out
