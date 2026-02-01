# 职径导航 - 部署指南

## 📋 部署前准备

### 1. 账号注册

- **Vercel账号**: [https://vercel.com](https://vercel.com) (使用GitHub登录)
- **OpenAI账号**: [https://platform.openai.com](https://platform.openai.com)

### 2. 获取API密钥

#### OpenAI API Key
1. 访问 [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. 点击 "Create new secret key"
3. 复制生成的密钥(以`sk-`开头)
4. **重要**: 保存好密钥,之后无法再次查看

#### 预算设置(避免费用失控)
1. 访问 [https://platform.openai.com/account/billing/limits](https://platform.openai.com/account/billing/limits)
2. 设置月度预算上限(建议$10-20)
3. 启用邮件通知

---

## 🚀 部署到Vercel

### 方式1: 使用Vercel CLI(推荐)

#### 安装Vercel CLI
```bash
npm install -g vercel
```

#### 登录Vercel
```bash
vercel login
```

#### 首次部署
```bash
# 在项目根目录执行
vercel

# 按提示操作:
# - Set up and deploy? Yes
# - Which scope? 选择你的账号
# - Link to existing project? No
# - Project name? career-navigator (或自定义)
# - In which directory? ./ 
# - Override settings? No
```

#### 配置环境变量
```bash
# 添加OpenAI API Key
vercel env add OPENAI_API_KEY

# 选择环境: Production (生产)
# 粘贴你的API Key: sk-xxxxx
```

#### 启用Vercel KV存储
1. 访问 [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. 进入你的项目
3. 点击 "Storage" 标签
4. 点击 "Create Database" → 选择 "KV"
5. 数据库名称: `career-navigator-kv`
6. 区域: 选择离目标用户最近的(如香港/新加坡)
7. 点击 "Create"
8. Vercel会自动注入KV环境变量到项目

#### 生产部署
```bash
# 部署到生产环境
vercel --prod
```

部署成功后会得到一个URL,例如: `https://career-navigator.vercel.app`

---

### 方式2: 使用Vercel Dashboard(图形界面)

#### 1. 上传代码到GitHub
```bash
# 初始化Git仓库(如果还没有)
git init
git add .
git commit -m "Initial commit"

# 创建GitHub仓库并推送
# 在GitHub上创建新仓库: career-navigator
git remote add origin https://github.com/你的用户名/career-navigator.git
git branch -M main
git push -u origin main
```

#### 2. 在Vercel中导入项目
1. 访问 [https://vercel.com/new](https://vercel.com/new)
2. 选择 "Import Git Repository"
3. 选择你的GitHub仓库
4. 点击 "Import"

#### 3. 配置项目
- **Framework Preset**: Other
- **Root Directory**: ./
- **Build Command**: (留空)
- **Output Directory**: (留空)

#### 4. 添加环境变量
在 "Environment Variables" 部分:
- Name: `OPENAI_API_KEY`
- Value: `sk-your-openai-api-key`
- Environment: Production

#### 5. 部署
点击 "Deploy" 按钮,等待部署完成(约1-2分钟)

#### 6. 启用KV存储
参考方式1中的"启用Vercel KV存储"步骤

---

## 🔧 本地开发与测试

### 安装依赖
```bash
npm install
```

### 本地开发环境

#### 1. 创建环境变量文件
```bash
cp .env.example .env.local
```

#### 2. 编辑`.env.local`,填入你的API Key
```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

#### 3. 启动Vercel开发服务器
```bash
# 这会启动本地API服务器(模拟Vercel Functions)
npx vercel dev

# 访问: http://localhost:3000
```

#### 4. 测试API接口
```bash
# 测试推荐接口
curl -X POST http://localhost:3000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "userProfile": {
      "identity": "graduate",
      "educationTier": "985",
      "major": "计算机科学",
      "trackPreference": "eng",
      "interestTags": ["写代码", "做数据分析"],
      "mbti": "INTJ"
    },
    "jobsData": []
  }'
```

---

## 📊 监控与维护

### 查看API使用统计
访问: `https://your-domain.vercel.app/api/recommend/stats`

返回示例:
```json
{
  "month": {
    "current": 145,
    "limit": 1000,
    "remaining": 855
  },
  "day": {
    "current": 12,
    "limit": 50,
    "remaining": 38
  }
}
```

### Vercel Dashboard监控
1. 访问 [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. 进入项目 → Analytics标签
3. 查看:
   - 请求次数
   - 响应时间
   - 错误率
   - 带宽使用

### OpenAI使用监控
1. 访问 [https://platform.openai.com/usage](https://platform.openai.com/usage)
2. 查看:
   - 每日Token使用量
   - 费用统计
   - API调用次数

---

## 🎯 前端部署(GitHub Pages)

### 1. 创建GitHub Pages
```bash
# 在GitHub仓库的Settings中:
# - Pages → Source → Deploy from a branch
# - Branch → main → /root
# - Save
```

### 2. 访问地址
- GitHub Pages: `https://你的用户名.github.io/career-navigator/`
- Vercel API: `https://career-navigator.vercel.app/api/recommend`

### 3. 配置API端点
前端代码会自动检测环境:
- 本地开发: `http://localhost:3000/api/recommend`
- 生产环境: `/api/recommend` (相对路径,会调用Vercel API)

如果前端和API不在同一域名,需要更新`src/app.js`:
```javascript
const apiEndpoint = 'https://your-vercel-domain.vercel.app/api/recommend';
```

---

## 🔒 安全检查清单

- [ ] `.env.local`已添加到`.gitignore`
- [ ] 没有在代码中硬编码API Key
- [ ] OpenAI API设置了月度预算上限
- [ ] Vercel KV存储已启用
- [ ] 限流机制正常工作
- [ ] 前端页面可正常访问
- [ ] API接口返回正确

---

## 💰 成本估算

### 免费额度
- **Vercel**: 
  - Serverless Functions: 125k次调用/月
  - KV存储: 256MB
  - 带宽: 100GB/月
  
- **OpenAI API** (按使用付费):
  - GPT-3.5-turbo: $0.0015/1K tokens
  - 平均每次推荐: ~1000 tokens
  - 1000次推荐约: $1.50

### 月度预算(假设1000次AI调用)
- Vercel: $0 (免费额度内)
- OpenAI: $1.50
- **总计**: ~$2/月

### 成本优化建议
1. 充分利用缓存(7天TTL)
2. 限流保护(月1000次上限)
3. 超额自动降级到规则推荐
4. 监控OpenAI Usage,及时调整

---

## 🐛 常见问题

### 1. API返回500错误
**原因**: OpenAI API Key未配置或无效
**解决**:
```bash
# 重新设置环境变量
vercel env rm OPENAI_API_KEY
vercel env add OPENAI_API_KEY
# 重新部署
vercel --prod
```

### 2. KV存储连接失败
**原因**: 未启用Vercel KV或环境变量未注入
**解决**: 
1. 在Vercel Dashboard中检查KV数据库状态
2. 确保KV数据库已连接到项目
3. 重新部署项目

### 3. CORS错误
**原因**: 跨域配置问题
**解决**: 检查`vercel.json`中的headers配置是否正确

### 4. 限流不生效
**原因**: KV存储未连接
**解决**: 启用KV存储后,限流会自动生效。未启用时会跳过限流检查

### 5. OpenAI超时
**原因**: 网络问题或OpenAI服务异常
**解决**: 系统会自动降级到规则推荐,无需干预

---

## 📞 技术支持

- **Vercel文档**: [https://vercel.com/docs](https://vercel.com/docs)
- **OpenAI文档**: [https://platform.openai.com/docs](https://platform.openai.com/docs)
- **项目Issues**: 在GitHub仓库提交Issue

---

## 🔄 更新部署

### 更新代码
```bash
# 提交代码变更
git add .
git commit -m "Update features"
git push

# Vercel会自动重新部署
# 或手动部署:
vercel --prod
```

### 更新环境变量
```bash
# 更新已有环境变量
vercel env rm OPENAI_API_KEY
vercel env add OPENAI_API_KEY

# 重新部署
vercel --prod
```

---

**祝部署顺利! 🎉**
