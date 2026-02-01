## JSON Contracts（输出契约）

### 原则
- **只输出JSON**：禁止Markdown代码块、禁止额外解释文字\n
- **字段固定**：便于前端直接渲染与缓存\n
- **长度可控**：避免大段自然语言\n

---

## 1) 推荐结果页（Recommendation）
```json
{
  "summary": "一句话总结（<=80字）",
  "confidence": "low|medium|high",
  "nextAction": "下一步建议（短句）",
  "topJobs": [
    {
      "jobId": "eng_frontend",
      "fitScore": 0.0,
      "reasons": ["理由1","理由2","理由3"],
      "riskHint": "风险提示（<=20字，可空）"
    }
  ]
}
```

约束：\n
- `topJobs` 必须恰好3个\n
- `reasons` 每岗最多3条，每条<=20字\n

---

## 2) 岗位详情页（JobDetailPage）
```json
{
  "jobId": "eng_frontend",
  "overview": "岗位概览（短）",
  "educationHint": "学历提示语（中性表达）",
  "steps": [
    {
      "name": "阶段名",
      "duration": "建议时长",
      "outputs": ["可执行产出1"],
      "skills": ["技能1","技能2"]
    }
  ],
  "skillGroups": {
    "hard": ["硬技能1"],
    "soft": ["软技能1"],
    "portfolio": ["作品集/项目要求1"]
  },
  "salaryBands": {
    "entry": "区间",
    "year1to3": "区间",
    "year3to5": "区间",
    "note": "仅供参考，来源待补"
  },
  "entryRoles": ["入门岗位1","入门岗位2"],
  "risks": ["风险1","风险2"],
  "resourcesPlaceholder": ["待补：课程/书单/社区/项目练习"]
}
```

约束：\n
- `steps` 必须 3-5步\n
- 每步 `outputs` 至少1条\n
- 薪资只允许“区间表达”，禁止具体平台/报告引用（除非你后续补齐来源字段）\n

