# API文档

## 推荐接口 `/api/recommend`

### 功能描述
根据用户画像数据生成Top3岗位推荐,支持AI生成或规则匹配。

### 请求方法
`POST`

### 请求头
```http
Content-Type: application/json
```

### 请求体
```json
{
  "userProfile": {
    "identity": "graduate",           // 身份: graduate(应届) | junior(1-3年)
    "educationTier": "985",           // 学历: 985 | 211 | doubleFirstClass | other
    "major": "计算机科学与技术",       // 专业
    "currentExperience": "前端实习3个月", // 当前经历(可选)
    "trackPreference": "eng",         // 方向: eng|pm|ops|data|design|marketing|sales
    "interestTags": ["写代码", "做数据分析"], // 兴趣标签(1-5个)
    "mbti": "INTJ"                    // MBTI类型(可选,默认unknown)
  },
  "jobsData": [...]                   // 岗位数据数组(从前端传入)
}
```

### 响应格式

#### 成功响应
```json
{
  "success": true,
  "data": {
    "topJobs": [
      {
        "jobId": "eng_frontend",
        "fitScore": 85,
        "reasons": [
          "与你的技术开发方向偏好匹配",
          "适合应届生起步",
          "发展路径清晰可行"
        ],
        "riskHint": "需要优秀作品集加持"
      }
    ],
    "summary": "基于你的背景和偏好,为你推荐以下3个岗位",
    "confidence": "medium",          // 置信度: high|medium|low
    "nextAction": "建议先查看第一个岗位的详细路径",
    "method": "ai"                   // 方法: ai | rule_based
  },
  "cached": false,                   // 是否来自缓存
  "fallback": false,                 // 是否降级
  "notice": ""                       // 提示信息(如限流提示)
}
```

#### 错误响应
```json
{
  "error": "错误信息",
  "message": "详细错误描述"
}
```

### HTTP状态码
- `200`: 成功
- `400`: 请求参数错误
- `405`: 请求方法不允许
- `429`: 超过限流(会返回规则推荐)
- `500`: 服务器错误(会返回规则推荐)

### 限流规则
- **月度上限**: 1000次/月
- **日上限**: 50次/天
- **单IP上限**: 5次/天
- **冷却时间**: 60秒

超过限流后会自动降级到规则推荐,不会阻断用户。

### 缓存策略
- 相同用户画像的推荐结果会缓存7天
- 缓存key基于用户画像的关键字段(identity/educationTier/trackPreference/interestTags/mbti)生成
- 缓存命中时会在响应中标记`cached: true`

### 降级机制
以下情况会自动降级到规则推荐:
1. OpenAI API调用失败
2. 超过限流额度
3. API响应超时
4. 未配置OPENAI_API_KEY

降级时:
- 响应中会包含`fallback: true`
- 响应中会包含`notice`字段说明原因
- 返回基于规则匹配的推荐结果
- 用户体验不受影响

---

## 统计接口 `/api/recommend/stats`

### 功能描述
查询当前API使用统计(用于监控)

### 请求方法
`GET`

### 响应格式
```json
{
  "month": {
    "current": 145,      // 本月已使用次数
    "limit": 1000,       // 月度上限
    "remaining": 855     // 剩余额度
  },
  "day": {
    "current": 12,       // 今日已使用次数
    "limit": 50,         // 日上限
    "remaining": 38      // 剩余额度
  }
}
```

---

## 测试示例

### 使用cURL测试
```bash
# 本地开发环境
curl -X POST http://localhost:3000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "userProfile": {
      "identity": "graduate",
      "educationTier": "985",
      "major": "计算机科学",
      "currentExperience": "无",
      "trackPreference": "eng",
      "interestTags": ["写代码", "做数据分析"],
      "mbti": "INTJ"
    },
    "jobsData": []
  }'

# 生产环境
curl -X POST https://your-domain.vercel.app/api/recommend \
  -H "Content-Type: application/json" \
  -d @test-payload.json
```

### 使用JavaScript测试
```javascript
async function testRecommendAPI() {
  const response = await fetch('http://localhost:3000/api/recommend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userProfile: {
        identity: 'graduate',
        educationTier: '985',
        major: '计算机科学',
        trackPreference: 'eng',
        interestTags: ['写代码', '做数据分析'],
        mbti: 'INTJ'
      },
      jobsData: [] // 传入实际的岗位数据
    })
  });
  
  const result = await response.json();
  console.log('推荐结果:', result);
}
```

---

## 技术架构

### 技术栈
- **运行环境**: Vercel Serverless Functions (Node.js 18+)
- **AI服务**: OpenAI GPT-3.5-turbo
- **缓存存储**: Vercel KV (基于Redis)
- **限流实现**: Vercel KV计数器

### 流程图
```
用户请求
  ↓
检查限流(月/日/IP) → 超限 → 返回规则推荐
  ↓ 通过
检查缓存 → 命中 → 返回缓存结果
  ↓ 未命中
粗筛候选岗位(按方向)
  ↓
调用OpenAI API → 失败 → 返回规则推荐
  ↓ 成功
存入缓存
  ↓
增加限流计数
  ↓
返回AI推荐结果
```

### 性能指标
- **平均响应时间**: 
  - 缓存命中: <100ms
  - AI调用: 2-5s
  - 规则推荐: <50ms
- **成功率**: >99% (含降级)
- **成本**: ~$2/月 (1000次调用)

---

## 环境变量

### 必需
- `OPENAI_API_KEY`: OpenAI API密钥

### 自动注入(Vercel KV)
- `KV_REST_API_URL`: KV存储API地址
- `KV_REST_API_TOKEN`: KV存储访问令牌
- `KV_REST_API_READ_ONLY_TOKEN`: KV只读令牌

### 可选
- `MONTHLY_LIMIT`: 自定义月度限流(默认1000)
- `DAILY_LIMIT`: 自定义日限流(默认50)
- `IP_DAILY_LIMIT`: 自定义IP限流(默认5)

---

## 安全性

### API Key保护
- API Key仅存储在Vercel环境变量中
- 前端代码无法访问API Key
- 通过Serverless Function代理所有AI请求

### 限流保护
- 多层限流机制(月/日/IP)
- 超限后自动降级,不暴露错误信息
- 防止恶意刷量和成本失控

### 数据隐私
- 不保存用户实名信息
- 推荐结果缓存7天后自动过期
- 限流计数24小时后自动清除

---

## 监控与告警

### 推荐监控方式
1. **Vercel Analytics**: 查看请求量、响应时间、错误率
2. **OpenAI Dashboard**: 监控Token使用量和费用
3. **自定义监控**: 调用`/api/recommend/stats`接口

### 告警建议
- 月度调用量达到800次时提醒
- OpenAI费用超过预算80%时告警
- API错误率>5%时告警
- 响应时间>10s时告警

---

## 故障排查

### 问题1: API返回500错误
**可能原因**:
- OpenAI API Key未配置
- KV存储连接失败
- OpenAI服务异常

**排查步骤**:
1. 检查Vercel环境变量是否配置
2. 查看Vercel函数日志
3. 测试OpenAI API Key是否有效
4. 检查KV存储状态

### 问题2: 所有请求返回规则推荐
**可能原因**:
- 未配置OPENAI_API_KEY
- API Key无效或余额不足
- OpenAI API被墙

**解决方案**:
- 验证API Key配置
- 检查OpenAI账户余额
- 确认网络连通性

### 问题3: 缓存不生效
**可能原因**:
- KV存储未启用
- 环境变量未注入

**解决方案**:
- 在Vercel Dashboard中启用KV
- 重新部署项目

---

## 优化建议

### 成本优化
1. 提高缓存命中率(调整用户画像hash策略)
2. 使用更便宜的模型(如gpt-3.5-turbo-0125)
3. 减少prompt长度
4. 限制max_tokens

### 性能优化
1. 使用Vercel Edge Functions(更低延迟)
2. 优化候选岗位筛选算法
3. 实现分层推荐(先粗筛后精排)
4. 添加请求去重

### 体验优化
1. 前端显示生成进度
2. 降级时给出更友好的提示
3. 提供"查看详细理由"功能
4. 支持推荐结果分享

---

## 更新日志

### v1.0.0 (2026-01-30)
- ✅ 实现基础推荐API
- ✅ 集成OpenAI GPT-3.5-turbo
- ✅ 实现多层限流机制
- ✅ 实现缓存策略
- ✅ 实现自动降级
- ✅ 支持规则推荐兜底
