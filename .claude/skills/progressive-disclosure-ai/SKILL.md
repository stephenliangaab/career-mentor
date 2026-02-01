---
name: progressive-disclosure-ai
description: Design and implement progressive disclosure for LLM features to reduce token usage and cost. Use when building multi-step AI calls (rank then expand then finalize), enforcing structured JSON outputs, applying token budgets, caching, and fallbacks—especially for front-end products like "职径导航" that generate job recommendations and career paths.
---

# Progressive Disclosure AI（渐进式披露省Token）

## Overview

用“先少后多”的方式调用LLM：先让模型在**极小上下文**里做筛选/排序，再只对少数候选做扩展与生成，从而显著降低 token 消耗与失败率，并提升可控性（结构化输出、可缓存、可降级）。

## Workflow Decision Tree

- **你正在做“推荐/排序/分类”** → 走 **Stage1_Rank**（L0候选包）→ 可直接结束，或进入Stage2
- **你需要“解释推荐+输出结构化结果页”** → Stage1_Rank → **Stage2_Finalize**（仅TopN扩展到L1）
- **用户点进某岗位详情，需要更细路径/技能** → **Stage3_ExpandDetail**（按需扩展到L2）
- **成本/稳定性优先** → 缩短输出 + 增加缓存命中 + 失败兜底（规则模板）

> 本技能默认你在做“职径导航”这类：**用户画像 → Top3岗位 → 岗位详情** 的产品闭环。字段与输出契约见 `references/career_navigator_binding.md`。

## Quick Start（最小落地步骤）

### Step 0：先“定契约”再调用AI
- **先定义结构化输出（JSON）**：字段固定、长度限制、失败可解析（参考 `references/json_contracts.md`）
- **先定token预算**：Stage1/Stage2/Stage3分别上限（参考 `references/token_budgeting.md`）

### Step 1：把上下文拆成 L0/L1/L2 三层候选包（Candidate Pack）
- **L0（极简）**：给模型做筛选/排序用（id、名称、大类、oneLiner、coreSkills、educationNotes一句话）
- **L1（中等）**：只给 TopN 扩展（加 milestones 简述、entryRoles、salaryBands简述）
- **L2（详细）**：只在用户点进详情页时按需扩展（完整路径步骤、技能分组、风险提示）

### Step 2：Stage1_Rank（低token筛选TopN）
- 输入：`UserProfile`（归一化后）+ L0候选包（8-12个）
- 输出：Top3（或TopN）+ 简短理由标签（每条<=20字）
- Prompt模板：见 `references/prompt_templates.md#stage1_rank`

### Step 3：Stage2_Finalize（只对TopN扩展、生成结果页JSON）
- 输入：`UserProfile` + TopN的L1扩展包
- 输出：结果页用 `Recommendation` JSON（Top3+summary+confidence+nextAction）
- Prompt模板：见 `references/prompt_templates.md#stage2_finalize`

### Step 4：Stage3_ExpandDetail（按需生成岗位详情）
- 触发：用户点击岗位详情页
- 输入：`UserProfile`（可选）+ 该岗位L2（或L1+再补充）+ 输出契约
- 输出：岗位详情页JSON（路径/技能/薪资/门槛提示）
- Prompt模板：见 `references/prompt_templates.md#stage3_expand_detail`

## Caching & Fallback（省钱与稳定性关键）

- **缓存优先级**：\n  - 同画像hash（精确）缓存 7 天\n  - 粗粒度key（身份+学历+方向+MBTI）缓存 7 天（命中更高但更不个性化）\n  - 推荐结果缓存命中时直接返回（跳过LLM）\n- **失败兜底**：任何解析失败/超时/429，都回退到“规则模板Top3”（保证闭环不断）\n- 细节见：`references/cache_and_fallback.md`（含 key 生成建议）与 `scripts/profile_fingerprint.py`

## Anti-Patterns（常见踩坑）
- **把20个岗位的完整详情一次性塞进prompt**：必然浪费token、增加失败率。
- **让模型自由发挥输出长文本**：不可控且难缓存；必须结构化JSON+长度限制。
- **无缓存/无限制“重新生成”**：会被刷爆预算；必须限流+冷却+缓存。

## Resources

### references/
- `references/prompt_templates.md`：三阶段可复制Prompt模板（Rank/Finalize/ExpandDetail）
- `references/token_budgeting.md`：token预算、长度限制、压缩检查清单
- `references/json_contracts.md`：结果页/详情页的JSON输出契约（字段固定）
- `references/cache_and_fallback.md`：缓存key、TTL、限流、失败兜底策略
- `references/career_navigator_binding.md`：把本技能映射到“职径导航”字段与岗位库结构

### scripts/
- `scripts/profile_fingerprint.py`：生成缓存key（精确hash与粗粒度key）
