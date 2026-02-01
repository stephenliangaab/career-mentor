## Cache & Fallback（缓存与兜底）

### 目标
- **省token**：同画像直接命中缓存，不再调用LLM\n
- **控成本**：把“重新生成”变成有限资源\n
- **保闭环**：任何失败都能回退到规则模板\n

---

## 缓存Key策略

### 精确Key（同画像强命中）
- `profileHash = sha256(normalizedUserProfileJson)`
- 适用：同一用户反复进入、或同样画像再次访问\n
- TTL建议：7天\n

### 粗粒度Key（提高命中率，个性化下降）
- `coarseKey = identity:educationTier:trackPreference:mbti`\n
- 适用：低成本优先、冷启动阶段\n
- TTL建议：7天\n

脚本参考：`scripts/profile_fingerprint.py`

---

## 限流建议（配合serverless proxy）
- **会话冷却**：同会话“重新生成” 30-60秒\n
- **单IP/单用户**：5次/天（可配置）\n
- **日总量**：50次/天（可配置）\n
- **月预算口径**：1,000次/月（达到后强制走规则兜底）\n

---

## 失败兜底（必须实现）
触发条件（任一成立就兜底）：\n
- LLM超时\n
- LLM返回非JSON/解析失败\n
- serverless返回429/5xx\n
- 预算/限流触发\n

兜底策略：\n
- 用 `trackPreference` 选 2 个同类岗位 + 1 个相邻岗位\n
- 理由用固定模板（oneLiner + coreSkills 组合）\n
- UI提示“当前为基础推荐（非AI），可稍后重试”\n

