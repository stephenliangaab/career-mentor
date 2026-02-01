#!/usr/bin/env python3
"""
profile_fingerprint.py (helper)

用途：
- 生成“用户画像”的稳定缓存key，支持：精确hash 与 粗粒度key
- 便于在 serverless proxy 或前端缓存层做“同画像命中缓存”，减少AI调用与token消耗

注意：
- 这是一个“参考实现”，可直接复用逻辑到 TypeScript
- 不依赖第三方库，确保可在多数环境直接运行
"""

import hashlib
import json
import sys
from typing import Any, Dict


def _normalize_value(v: Any) -> Any:
    """将值归一化，确保同语义输入得到相同key。"""
    if v is None:
        return None
    if isinstance(v, str):
        s = v.strip()
        return s if s else None
    if isinstance(v, list):
        # list里通常是tag，做去空、去重、排序
        items = []
        for x in v:
            nx = _normalize_value(x)
            if nx is not None:
                items.append(nx)
        # 转成字符串排序（稳定）
        return sorted(set(map(str, items)))
    return v


def normalize_profile(profile: Dict[str, Any]) -> Dict[str, Any]:
    """
    只保留与推荐强相关、且应参与缓存的字段。
    你可以根据产品口径增删字段，但要保持“稳定性”和“可解释性”。
    """
    allowed = [
        "identity",
        "educationTier",
        "major",
        "currentExperience",
        "trackPreference",
        "interestTags",
        "mbti",
    ]
    out: Dict[str, Any] = {}
    for k in allowed:
        out[k] = _normalize_value(profile.get(k))
    return out


def profile_hash(profile: Dict[str, Any]) -> str:
    """精确hash：适合“同画像”强命中缓存。"""
    normalized = normalize_profile(profile)
    payload = json.dumps(normalized, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def coarse_key(profile: Dict[str, Any]) -> str:
    """
    粗粒度key：适合提高命中率（但个性化会下降）。
    建议用于“兜底缓存”或“低成本优先”模式。
    """
    normalized = normalize_profile(profile)
    identity = normalized.get("identity") or "unknown"
    edu = normalized.get("educationTier") or "unknown"
    track = normalized.get("trackPreference") or "unknown"
    mbti = normalized.get("mbti") or "unknown"
    return f"{identity}:{edu}:{track}:{mbti}"


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: profile_fingerprint.py '<json_profile>'")
        print(
            'Example: profile_fingerprint.py '
            '\'{"identity":"graduate","educationTier":"985","trackPreference":"eng","interestTags":["写代码"],"mbti":"INTJ"}\''
        )
        sys.exit(1)

    profile = json.loads(sys.argv[1])
    print(
        json.dumps(
            {
                "normalized": normalize_profile(profile),
                "hash": profile_hash(profile),
                "coarseKey": coarse_key(profile),
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()

