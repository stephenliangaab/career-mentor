# 项目结构说明

## 📁 目录结构

```
牛马选槽/
│
├── 📄 index.html                      # 主HTML文件(包含所有4个页面)
│
├── 📁 src/                           # 前端源代码
│   ├── 📁 assets/
│   │   └── styles.css                # 全局CSS样式
│   ├── 📁 components/                # 组件目录(暂为空,预留)
│   ├── 📁 data/
│   │   ├── jobs-data.js              # 岗位数据库(31个岗位)
│   │   └── companies-data.js         # 公司数据(北上广深大厂中厂列表)
│   ├── 📁 pages/                     # 页面目录(暂为空,预留)
│   └── app.js                        # 主应用逻辑
│
├── 📁 api/                           # Serverless Functions ✅
│   ├── recommend.js                  # AI推荐接口
│   └── README.md                     # API文档
│
├── 📁 design-system/                 # 设计系统
│   └── 职径导航/
│       ├── MASTER.md                 # 设计系统主文档
│       └── pages/                    # 页面设计说明
│
├── 📁 node_modules/                  # 依赖包(npm install后生成)
│
├── 📄 package.json                   # 项目依赖和脚本 ✅
├── 📄 package-lock.json              # 依赖锁定文件
├── 📄 vercel.json                    # Vercel部署配置 ✅
├── 📄 .gitignore                     # Git忽略文件 ✅
├── 📄 env.example.txt                # 环境变量示例 ✅
├── 📄 test-api.js                    # API测试脚本 ✅
│
├── 📄 README.md                      # 项目主文档
├── 📄 PRD.md                         # 产品需求文档
├── 📄 BRD.md                         # 商业需求文档
├── 📄 AGENTS.md                      # Agent配置文档
├── 📄 DEPLOY.md                      # 部署指南 ✅
├── 📄 BACKEND_IMPLEMENTATION.md      # 后端实现报告 ✅
├── 📄 PROJECT_STRUCTURE.md           # 本文件 ✅
├── 📄 快速开始.md                     # 快速开始指南
├── 📄 技术执行方案.md                 # 技术方案
├── 📄 岗位库v1.md                     # 岗位库清单
├── 📄 文档修改记录.md                 # 文档变更记录
├── 📄 测试样例.md                     # 测试用例
└── 📄 项目完成说明.md                 # 项目说明
```

## 📝 文件分类

### 🎨 前端文件 (用户可见部分)

#### HTML
- `index.html` - 单页应用主文件,包含4个页面:
  - P0: 首页/引导页
  - P1: 画像收集页
  - P2: 推荐结果页
  - P3: 岗位详情页

#### CSS
- `src/assets/styles.css` - 全局样式表
  - CSS变量定义(颜色、间距、阴影)
  - 页面布局
  - 组件样式
  - 响应式设计

#### JavaScript
- `src/app.js` - 主应用逻辑 (650行)
  - 页面导航
  - 表单处理
  - 推荐生成
  - 数据渲染
  - 事件监听

- `src/data/jobs-data.js` - 岗位数据 (1100+行)
  - 31个互联网岗位完整数据
  - 职业路径、技能、薪资等
  - 前端直接引用

- `src/data/companies-data.js` - 公司数据 (新增)
  - 北上广深四个城市的互联网大厂和中厂列表
  - 支持公司机会分析功能
  - 前端直接引用

---

### 🔧 后端文件 (Serverless)

#### API接口
- `api/recommend.js` - AI推荐接口 (600行)
  - OpenAI集成
  - 限流中间件
  - 缓存机制
  - 规则兜底引擎
  - 错误处理

---

### 📦 配置文件

#### 部署配置
- `vercel.json` - Vercel部署配置
  - Functions配置
  - 路由规则
  - CORS设置
  - 环境变量引用

- `package.json` - 项目依赖
  - 依赖包: `@vercel/kv`, `openai`
  - 脚本命令
  - Node版本要求

#### 环境配置
- `env.example.txt` - 环境变量示例
  - OPENAI_API_KEY配置说明
  - KV存储说明
  - 可选配置项

- `.gitignore` - Git忽略规则
  - node_modules/
  - .env.local
  - .vercel/

---

### 📚 文档文件

#### 核心文档
- **README.md** (290行)
  - 项目概述
  - 技术特点
  - 使用方式
  - 后端说明

- **PRD.md** (286行)
  - 产品需求
  - 功能说明
  - 数据模型
  - 验收标准

- **BRD.md** (96行)
  - 商业逻辑
  - 用户画像
  - 增长策略
  - 变现模式

#### 技术文档
- **技术执行方案.md** (420行)
  - 技术架构
  - 实现方案
  - 成本分析
  - 风险对策

- **DEPLOY.md** (新增 ✅)
  - 详细部署步骤
  - 环境配置
  - 监控方案
  - 问题排查

- **BACKEND_IMPLEMENTATION.md** (新增 ✅)
  - 后端实现总结
  - 技术架构
  - 验收报告
  - 优化建议

- **api/README.md** (新增 ✅)
  - API接口文档
  - 请求响应格式
  - 测试示例
  - 技术实现

#### 内容文档
- **岗位库v1.md**
  - 31个岗位清单
  - 岗位模板
  - 填写说明

- **快速开始.md**
  - 5分钟上手
  - 本地开发
  - 设计说明
  - 常见问题

#### 设计文档
- **design-system/职径导航/MASTER.md**
  - 设计系统
  - 配色方案
  - 组件规范

---

### 🧪 测试文件

- **test-api.js** (新增 ✅)
  - API自动化测试
  - 3个测试用例
  - 统计接口测试

- **测试样例.md**
  - 测试场景
  - 预期结果

---

### 📋 其他文件

- **AGENTS.md** - Agent配置
- **文档修改记录.md** - 变更日志
- **项目完成说明.md** - 项目总结

---

## 🎯 核心文件说明

### 前端核心 (3个文件)

#### 1. index.html (437行)
**功能**: 单页应用HTML结构
- 包含4个页面的完整HTML
- 使用 `.page` class管理显示/隐藏
- 响应式meta标签
- Google Fonts引入

**页面结构**:
```html
<div id="app">
  <div id="page-home" class="page active">...</div>
  <div id="page-profile" class="page">...</div>
  <div id="page-result" class="page">...</div>
  <div id="page-detail" class="page">...</div>
  <div id="loading-overlay">...</div>
</div>
```

#### 2. src/assets/styles.css (约2000行)
**功能**: 全局样式表
- CSS变量系统(颜色、间距、阴影)
- 基础样式重置
- 布局系统
- 组件样式
- 响应式断点

**CSS变量示例**:
```css
:root {
  --color-primary: #6366F1;
  --color-cta: #10B981;
  --space-4: 1rem;
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
}
```

#### 3. src/app.js (599行)
**功能**: 应用主逻辑
- 页面导航管理
- 表单处理和验证
- API调用
- 数据渲染
- 事件监听
- 埋点统计

**核心函数**:
```javascript
- navigateToXXX()         // 页面导航
- generateRecommendation() // 生成推荐
- renderRecommendations()  // 渲染结果
- renderJobDetail()        // 渲染详情
```

---

### 后端核心 (1个文件)

#### api/recommend.js (约600行)
**功能**: AI推荐Serverless Function

**模块划分**:
```javascript
1. 配置常量 (CONFIG)
2. 限流函数 (checkRateLimit, incrementRateLimit)
3. 缓存函数 (getCached, setCached, generateKey)
4. OpenAI调用 (generateAIRecommendation, buildPrompt)
5. 规则引擎 (generateRuleBasedRecommendation)
6. 主处理器 (handler)
7. 统计接口 (statsHandler)
```

**处理流程**:
```
请求 → 限流检查 → 缓存查询 → 候选筛选 
     → AI调用 → 缓存存储 → 限流计数 → 响应
```

---

### 数据文件 (1个文件)

#### src/data/jobs-data.js (约800行)
**功能**: 岗位数据库

**数据结构**:
```javascript
{
  jobId: 'eng_frontend',
  jobName: '前端工程师',
  category: 'eng',
  oneLiner: '用代码把产品体验做出来',
  suitableTracks: ['eng'],
  coreSkills: [...],
  milestones: [...],
  salaryBands: {...},
  educationNotes: {...},
  entryRoles: [...],
  risks: [...]
}
```

**包含岗位** (31个):
- 技术: 6个
- 产品: 5个（新增PMO项目管理、产品运营）
- 运营: 11个（新增行业运营、UG客户增长、内容新媒体运营、策略运营等）
- 数据: 3个（新增战略商分）
- 设计: 2个
- 市场: 3个（新增营销策划）
- 销售: 3个（新增大客户销售）

---

## 🔄 文件依赖关系

### 前端依赖
```
index.html
  ├─> src/assets/styles.css     (样式)
  ├─> src/data/jobs-data.js     (数据)
  └─> src/app.js                (逻辑)
       └─> /api/recommend        (API调用)
```

### 后端依赖
```
api/recommend.js
  ├─> @vercel/kv               (缓存/限流)
  ├─> openai                   (AI服务)
  └─> crypto                   (hash生成)
```

### 部署依赖
```
vercel.json
  ├─> api/recommend.js         (Functions)
  └─> env variables            (环境变量)
```

---

## 📊 代码统计

### 前端
- HTML: ~450行
- CSS: ~2000行
- JavaScript: ~650行 (app.js)
- 数据: ~800行 (jobs-data.js)

### 后端
- API: ~600行 (recommend.js)

### 文档
- 核心文档: ~1500行
- 技术文档: ~1000行
- API文档: ~500行

### 总计
- **代码**: ~4500行
- **文档**: ~3000行
- **总计**: ~7500行

---

## 🚀 启动流程

### 本地开发
```bash
# 1. 仅前端
python3 -m http.server 8000

# 2. 全栈(含API)
npm install
npx vercel dev
```

### 生产部署
```bash
# 部署到Vercel
vercel --prod

# 配置环境变量
vercel env add OPENAI_API_KEY

# 启用KV存储(在Dashboard)
```

---

## 📖 文档导航

### 🎯 快速开始
1. 先看: **快速开始.md**
2. 部署: **DEPLOY.md**
3. 理解: **README.md**

### 📋 产品需求
1. 产品: **PRD.md**
2. 商业: **BRD.md**
3. 内容: **岗位库v1.md**

### 💻 技术实现
1. 方案: **技术执行方案.md**
2. 后端: **BACKEND_IMPLEMENTATION.md**
3. API: **api/README.md**

### 🎨 设计系统
1. 主文档: **design-system/职径导航/MASTER.md**
2. 样式: **src/assets/styles.css**

---

## ✅ 完成度总览

### 前端
- ✅ HTML结构完整
- ✅ CSS样式完整
- ✅ JavaScript逻辑完整
- ✅ 岗位数据完整(31个)
- ✅ 响应式设计
- ✅ 交互体验完整

### 后端
- ✅ AI推荐接口
- ✅ 限流机制
- ✅ 缓存机制
- ✅ 规则兜底
- ✅ 错误处理
- ✅ 统计接口

### 部署
- ✅ Vercel配置
- ✅ 环境变量
- ✅ 部署文档
- ✅ 测试脚本

### 文档
- ✅ 产品文档
- ✅ 技术文档
- ✅ API文档
- ✅ 部署文档
- ✅ 设计文档

---

**项目结构完整,可以直接使用!** 🎉
