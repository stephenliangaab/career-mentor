## 绑定到“职径导航”（本项目落地口径）

### 目标
把“渐进式披露”从原则变成可实现的工程拆分：\n
- 哪些字段进Stage1\n
- Stage2/Stage3怎么扩展\n
- 输出怎么对齐前端渲染\n

---

## 1) 用户画像（UserProfile）最小集合
用于推荐与缓存的字段（建议与PRD一致）：\n
- identity：graduate / junior\n
- educationTier：985 / 211 / doubleFirstClass / other\n
- major：专业（短文本）\n
- currentExperience：经历概述（短文本，可空）\n
- trackPreference：eng/pm/ops/data/design/marketing/sales\n
- interestTags：标签数组（最多5）\n
- mbti：16型或unknown\n

---

## 2) 候选岗位包（Candidate Pack）分层

### L0（Stage1用）
每个岗位只保留：\n
- jobId\n
- jobName\n
- category\n
- oneLiner\n
- coreSkills（最多5）\n
- educationNotesSummary（一句话）\n

### L1（Stage2用，仅TopN）
在L0基础上增加：\n
- milestonesSummary（只给步骤名，3-5条）\n
- entryRoles（3-5个）\n
- salaryBandsSummary（区间短句）\n
- riskTags（最多3）\n

### L2（Stage3用，仅当前岗位）
完整：\n
- steps（3-5步，含duration/outputs/skills）\n
- skillGroups（hard/soft/portfolio）\n
- salaryBands（entry/1-3/3-5 + note）\n

---

## 3) 与前端渲染的输出契约
- 结果页：Recommendation（见 `references/json_contracts.md`）\n
- 详情页：JobDetailPage（见 `references/json_contracts.md`）\n

