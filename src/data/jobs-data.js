/**
 * 岗位数据库 - 互联网行业20个核心岗位
 * 数据结构遵循PRD定义的Job模型
 */

const JOBS_DATABASE = [
    // ==================== 技术类 (eng) ====================
    {
        jobId: 'eng_frontend',
        jobName: '前端工程师',
        category: 'eng',
        oneLiner: '用代码把产品体验做出来',
        suitableTracks: ['eng'],
        coreSkills: ['HTML/CSS', 'JavaScript', 'Vue/React', '响应式设计'],
        milestones: [
            {
                name: '学习基础技术栈',
                duration: '3-6个月',
                outputs: ['完成个人项目网站', '掌握HTML/CSS/JS基础'],
                skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Git版本控制']
            },
            {
                name: '框架实战与作品集',
                duration: '6-12个月',
                outputs: ['3-5个完整项目作品', '开源贡献经历'],
                skills: ['React/Vue', '状态管理', 'TypeScript', '前端工程化']
            },
            {
                name: '求职与实习',
                duration: '3-6个月',
                outputs: ['获得前端实习offer', '积累真实项目经验'],
                skills: ['团队协作', '代码规范', '性能优化', '移动端适配']
            }
        ],
        salaryBands: {
            entry: '8-15K',
            junior: '15-25K',
            mid: '25-40K'
        },
        entryRoles: ['前端实习生', '初级前端工程师', 'Web开发助理'],
        educationNotes: {
            '985': '大厂直通车,重点关注算法和系统设计',
            '211': '有竞争力,需要优秀作品集加持',
            'doubleFirstClass': '注重作品质量,多参加开源项目',
            'other': '作品集最重要,建议从小公司或外包起步积累经验'
        },
        risks: ['技术更新快,需要持续学习', '竞争激烈']
    },
    {
        jobId: 'eng_backend',
        jobName: '后端工程师',
        category: 'eng',
        oneLiner: '构建稳定可靠的服务端系统',
        suitableTracks: ['eng'],
        coreSkills: ['Java/Python/Go', '数据库', 'API设计', '分布式系统'],
        milestones: [
            {
                name: '掌握后端语言与数据库',
                duration: '4-6个月',
                outputs: ['完成CRUD项目', '理解数据库设计'],
                skills: ['Java/Python', 'MySQL/PostgreSQL', 'RESTful API', 'Linux基础']
            },
            {
                name: '框架学习与项目实战',
                duration: '6-12个月',
                outputs: ['完整后端项目3个', '部署上线经验'],
                skills: ['Spring Boot/Django', 'Redis', 'Docker', '消息队列']
            },
            {
                name: '进阶与求职',
                duration: '3-6个月',
                outputs: ['系统设计能力', '获得后端offer'],
                skills: ['微服务架构', '高并发处理', '性能优化', '系统设计']
            }
        ],
        salaryBands: {
            entry: '10-18K',
            junior: '18-30K',
            mid: '30-50K'
        },
        entryRoles: ['后端实习生', '初级后端工程师', 'Java开发工程师'],
        educationNotes: {
            '985': '大厂核心部门优先考虑,注重算法和系统设计',
            '211': '有优势,需要扎实的计算机基础',
            'doubleFirstClass': '补充项目经验和开源贡献',
            'other': '从中小公司起步,注重基础扎实和项目经验'
        },
        risks: ['需要扎实的计算机基础', '学习曲线较陡']
    },
    {
        jobId: 'eng_mobile',
        jobName: '移动端开发工程师',
        category: 'eng',
        oneLiner: '打造流畅的移动应用体验',
        suitableTracks: ['eng'],
        coreSkills: ['iOS/Android', 'Flutter/React Native', '移动端优化', 'UI适配'],
        milestones: [
            {
                name: '选择技术方向',
                duration: '1-3个月',
                outputs: ['确定iOS/Android/跨平台方向', '完成入门教程'],
                skills: ['Swift/Kotlin', 'React Native/Flutter', '移动开发基础']
            },
            {
                name: '项目实战',
                duration: '6-12个月',
                outputs: ['上架2-3个App', '积累用户反馈'],
                skills: ['界面开发', '网络请求', '数据存储', '性能优化']
            },
            {
                name: '求职准备',
                duration: '3-6个月',
                outputs: ['完善作品集', '获得移动端offer'],
                skills: ['跨平台开发', '原生交互', '调试技巧', '版本发布']
            }
        ],
        salaryBands: {
            entry: '9-16K',
            junior: '16-28K',
            mid: '28-45K'
        },
        entryRoles: ['iOS开发实习生', 'Android开发实习生', '移动端开发助理'],
        educationNotes: {
            '985': '大厂移动端团队青睐',
            '211': '有竞争力,作品集很重要',
            'doubleFirstClass': '注重App Store/应用市场作品展示',
            'other': '独立开发者路线或从小公司起步'
        },
        risks: ['iOS需要Mac设备', 'Android碎片化适配复杂']
    },
    {
        jobId: 'eng_test',
        jobName: '测试工程师',
        category: 'eng',
        oneLiner: '保障产品质量的最后一道防线',
        suitableTracks: ['eng'],
        coreSkills: ['测试用例设计', '自动化测试', 'Bug管理', '性能测试'],
        milestones: [
            {
                name: '测试基础与手工测试',
                duration: '2-4个月',
                outputs: ['理解测试流程', '编写测试用例'],
                skills: ['测试理论', '用例设计', 'Bug提交', '测试工具']
            },
            {
                name: '自动化测试学习',
                duration: '4-8个月',
                outputs: ['搭建自动化测试框架', '编写自动化脚本'],
                skills: ['Python/Java', 'Selenium', '接口测试', '性能测试']
            },
            {
                name: '测试进阶与求职',
                duration: '3-6个月',
                outputs: ['测试方案设计能力', '获得测试offer'],
                skills: ['测试左移', '持续集成', '测试策略', '质量体系']
            }
        ],
        salaryBands: {
            entry: '7-12K',
            junior: '12-20K',
            mid: '20-35K'
        },
        entryRoles: ['测试实习生', '初级测试工程师', 'QA工程师'],
        educationNotes: {
            '985': '可进入测试开发岗位,薪资更高',
            '211': '有优势,建议往自动化测试方向发展',
            'doubleFirstClass': '入门门槛相对较低,重点是技能深度',
            'other': '最易入门的技术岗位,建议学习编程和自动化'
        },
        risks: ['需要学习编程', '职业天花板相对较低']
    },
    {
        jobId: 'eng_devops',
        jobName: 'DevOps/运维开发',
        category: 'eng',
        oneLiner: '让系统稳定运行的幕后英雄',
        suitableTracks: ['eng'],
        coreSkills: ['Linux', 'Docker/K8s', 'CI/CD', '监控告警'],
        milestones: [
            {
                name: 'Linux与脚本基础',
                duration: '3-6个月',
                outputs: ['熟练Linux命令', '编写Shell脚本'],
                skills: ['Linux系统', 'Shell编程', '网络基础', 'Git']
            },
            {
                name: '容器化与自动化',
                duration: '6-12个月',
                outputs: ['搭建CI/CD流水线', '容器化部署项目'],
                skills: ['Docker', 'Kubernetes', 'Jenkins', 'Ansible']
            },
            {
                name: '云平台与求职',
                duration: '3-6个月',
                outputs: ['云平台实战经验', '获得DevOps offer'],
                skills: ['AWS/阿里云', '监控系统', '日志分析', '故障排查']
            }
        ],
        salaryBands: {
            entry: '9-15K',
            junior: '15-28K',
            mid: '28-45K'
        },
        entryRoles: ['运维实习生', '初级DevOps工程师', '系统运维工程师'],
        educationNotes: {
            '985': '大厂基础架构团队优先',
            '211': '有竞争力,需要扎实的Linux基础',
            'doubleFirstClass': '注重实际操作经验',
            'other': '入门门槛适中,实战经验最重要'
        },
        risks: ['需要7x24小时待命', '学习内容广泛']
    },
    {
        jobId: 'eng_data',
        jobName: '数据开发工程师',
        category: 'eng',
        oneLiner: '构建数据处理的基础设施',
        suitableTracks: ['eng', 'data'],
        coreSkills: ['SQL', 'Python', '数据仓库', 'ETL'],
        milestones: [
            {
                name: 'SQL与数据基础',
                duration: '2-4个月',
                outputs: ['熟练SQL查询', '理解数据模型'],
                skills: ['SQL高级查询', 'Python基础', '数据库设计', 'Excel']
            },
            {
                name: '大数据技术栈',
                duration: '6-12个月',
                outputs: ['搭建数据处理流程', '数据仓库建设'],
                skills: ['Hive/Spark', '数据仓库', 'ETL工具', 'Linux']
            },
            {
                name: '数据平台与求职',
                duration: '3-6个月',
                outputs: ['数据平台搭建经验', '获得数据开发offer'],
                skills: ['Flink实时计算', '调度系统', '数据治理', '性能优化']
            }
        ],
        salaryBands: {
            entry: '10-16K',
            junior: '16-28K',
            mid: '28-45K'
        },
        entryRoles: ['数据开发实习生', '初级数据工程师', 'ETL开发工程师'],
        educationNotes: {
            '985': '大厂数据中台优先考虑',
            '211': '有优势,需要扎实的编程和SQL能力',
            'doubleFirstClass': '注重项目经验和技术深度',
            'other': '入门门槛适中,SQL和Python是关键'
        },
        risks: ['需要理解业务', '技术栈较复杂']
    },

    // ==================== 产品类 (pm) ====================
    {
        jobId: 'pm_general',
        jobName: '产品经理',
        category: 'pm',
        oneLiner: '定义产品方向,连接用户与技术',
        suitableTracks: ['pm'],
        coreSkills: ['需求分析', '原型设计', '项目管理', '用户研究'],
        milestones: [
            {
                name: '产品基础认知',
                duration: '2-4个月',
                outputs: ['理解产品全流程', '学会画原型'],
                skills: ['Axure/Figma', '需求文档', '竞品分析', '用户故事']
            },
            {
                name: '项目实战与作品集',
                duration: '6-12个月',
                outputs: ['2-3个完整产品方案', '参与真实项目'],
                skills: ['PRD编写', '需求评审', '敏捷开发', '数据分析']
            },
            {
                name: '面试准备与求职',
                duration: '3-6个月',
                outputs: ['完善作品集', '获得产品offer'],
                skills: ['产品思维', '案例分析', '沟通表达', '商业理解']
            }
        ],
        salaryBands: {
            entry: '8-15K',
            junior: '15-25K',
            mid: '25-40K'
        },
        entryRoles: ['产品实习生', '初级产品经理', '产品助理'],
        educationNotes: {
            '985': '大厂产品岗竞争激烈,需要优秀实习和作品集',
            '211': '有竞争力,需要展示产品sense',
            'doubleFirstClass': '注重实习经历和项目作品',
            'other': '门槛较高,建议从小公司或B端产品起步'
        },
        risks: ['竞争非常激烈', '需要综合能力强']
    },
    {
        jobId: 'pm_growth',
        jobName: '增长产品经理',
        category: 'pm',
        oneLiner: '用数据驱动产品增长',
        suitableTracks: ['pm', 'ops'],
        coreSkills: ['数据分析', 'A/B测试', '用户增长', '转化优化'],
        milestones: [
            {
                name: '产品与数据基础',
                duration: '3-6个月',
                outputs: ['理解增长模型', '学会数据分析'],
                skills: ['产品基础', 'SQL', 'Excel/Python', '增长理论']
            },
            {
                name: '增长实验与实践',
                duration: '6-12个月',
                outputs: ['设计增长实验', '数据驱动决策案例'],
                skills: ['A/B测试', '漏斗分析', '用户分层', '增长策略']
            },
            {
                name: '增长体系与求职',
                duration: '3-6个月',
                outputs: ['搭建增长体系', '获得增长PM offer'],
                skills: ['增长黑客', 'AARRR模型', '用户生命周期', '商业化']
            }
        ],
        salaryBands: {
            entry: '10-18K',
            junior: '18-30K',
            mid: '30-50K'
        },
        entryRoles: ['增长实习生', '初级增长产品', '数据产品助理'],
        educationNotes: {
            '985': '大厂增长团队青睐,需要强数据能力',
            '211': '有优势,数据+产品双能力是关键',
            'doubleFirstClass': '注重数据分析和增长案例',
            'other': '需要扎实的数据能力,建议先做数据分析'
        },
        risks: ['需要较强数据能力', '压力较大']
    },
    {
        jobId: 'pm_commercial',
        jobName: '商业化产品经理',
        category: 'pm',
        oneLiner: '平衡用户体验与商业变现',
        suitableTracks: ['pm'],
        coreSkills: ['商业模式', '广告系统', '收益优化', '策略设计'],
        milestones: [
            {
                name: '产品与商业基础',
                duration: '3-6个月',
                outputs: ['理解商业模式', '学习广告系统'],
                skills: ['产品基础', '商业分析', '广告生态', '数据敏感度']
            },
            {
                name: '商业化项目实战',
                duration: '6-12个月',
                outputs: ['商业化方案设计', '收益提升案例'],
                skills: ['会员体系', '广告策略', 'ROI优化', '竞价机制']
            },
            {
                name: '策略深化与求职',
                duration: '3-6个月',
                outputs: ['商业化体系搭建', '获得商业化PM offer'],
                skills: ['算法策略', '收益模型', '博弈论', '商业判断']
            }
        ],
        salaryBands: {
            entry: '12-20K',
            junior: '20-35K',
            mid: '35-60K'
        },
        entryRoles: ['商业化实习生', '初级商业产品', '广告产品助理'],
        educationNotes: {
            '985': '大厂商业化团队优先,薪资较高',
            '211': '有竞争力,需要商业敏感度',
            'doubleFirstClass': '注重商业理解和数据能力',
            'other': '门槛较高,建议先做普通产品积累经验'
        },
        risks: ['需要平衡商业与体验', '压力较大']
    },

    // ==================== 运营类 (ops) ====================
    {
        jobId: 'ops_user',
        jobName: '用户运营',
        category: 'ops',
        oneLiner: '深入理解用户,提升用户价值',
        suitableTracks: ['ops'],
        coreSkills: ['用户分析', '社群运营', '活动策划', '数据分析'],
        milestones: [
            {
                name: '运营基础与用户理解',
                duration: '2-4个月',
                outputs: ['理解运营框架', '用户画像分析'],
                skills: ['运营理论', '用户研究', '数据分析基础', '文案写作']
            },
            {
                name: '活动与社群实战',
                duration: '6-12个月',
                outputs: ['策划执行5+活动', '运营社群案例'],
                skills: ['活动策划', '社群管理', '用户增长', 'CRM工具']
            },
            {
                name: '用户体系与求职',
                duration: '3-6个月',
                outputs: ['搭建用户运营体系', '获得用户运营offer'],
                skills: ['用户分层', '生命周期管理', '留存策略', 'RFM模型']
            }
        ],
        salaryBands: {
            entry: '6-12K',
            junior: '12-20K',
            mid: '20-35K'
        },
        entryRoles: ['运营实习生', '初级用户运营', '社群运营'],
        educationNotes: {
            '985': '可进入大厂,注重数据分析能力',
            '211': '有竞争力,需要实习和案例',
            'doubleFirstClass': '入门门槛适中,重点是实战经验',
            'other': '最易入门的互联网岗位之一,重点看能力和案例'
        },
        risks: ['工作繁杂琐碎', '需要较强抗压能力']
    },
    {
        jobId: 'ops_content',
        jobName: '内容运营',
        category: 'ops',
        oneLiner: '创造优质内容,吸引用户留存',
        suitableTracks: ['ops'],
        coreSkills: ['内容策划', '文案写作', '内容审核', '数据分析'],
        milestones: [
            {
                name: '内容基础与创作',
                duration: '2-4个月',
                outputs: ['输出20+篇优质内容', '建立个人作品集'],
                skills: ['文案写作', '内容策划', '排版设计', '热点捕捉']
            },
            {
                name: '内容运营与增长',
                duration: '6-12个月',
                outputs: ['策划内容专题', '打造爆款内容'],
                skills: ['内容分发', 'SEO/ASO', '用户引导', '数据分析']
            },
            {
                name: '内容体系与求职',
                duration: '3-6个月',
                outputs: ['搭建内容运营体系', '获得内容运营offer'],
                skills: ['内容策略', 'UGC运营', '内容矩阵', '品牌传播']
            }
        ],
        salaryBands: {
            entry: '6-12K',
            junior: '12-20K',
            mid: '20-30K'
        },
        entryRoles: ['内容运营实习生', '初级内容运营', '新媒体运营'],
        educationNotes: {
            '985': '可进入头部内容平台',
            '211': '有竞争力,作品集很重要',
            'doubleFirstClass': '注重内容作品和创作能力',
            'other': '门槛较低,优秀作品最重要'
        },
        risks: ['需要持续创作', '天花板相对较低']
    },
    {
        jobId: 'ops_activity',
        jobName: '活动运营',
        category: 'ops',
        oneLiner: '策划执行活动,达成运营目标',
        suitableTracks: ['ops'],
        coreSkills: ['活动策划', '项目管理', '资源协调', '数据分析'],
        milestones: [
            {
                name: '活动策划基础',
                duration: '2-4个月',
                outputs: ['独立策划3+活动方案', '理解活动流程'],
                skills: ['方案撰写', '预算管理', '风险控制', '效果评估']
            },
            {
                name: '活动执行与复盘',
                duration: '6-12个月',
                outputs: ['执行5+场活动', '积累完整案例'],
                skills: ['项目管理', '跨部门协作', '应急处理', '数据复盘']
            },
            {
                name: '活动体系与求职',
                duration: '3-6个月',
                outputs: ['搭建活动运营体系', '获得活动运营offer'],
                skills: ['活动矩阵', 'ROI优化', '供应商管理', '品牌活动']
            }
        ],
        salaryBands: {
            entry: '6-12K',
            junior: '12-20K',
            mid: '20-32K'
        },
        entryRoles: ['活动运营实习生', '初级活动运营', '运营专员'],
        educationNotes: {
            '985': '可进入大厂,注重执行力和资源整合',
            '211': '有竞争力,需要完整活动案例',
            'doubleFirstClass': '入门门槛适中,重点看执行力',
            'other': '门槛较低,执行力和案例最重要'
        },
        risks: ['工作压力大', '需要应对突发情况']
    },

    // ==================== 数据类 (data) ====================
    {
        jobId: 'data_analyst',
        jobName: '数据分析师',
        category: 'data',
        oneLiner: '从数据中挖掘洞察,支持决策',
        suitableTracks: ['data'],
        coreSkills: ['SQL', 'Python', 'Excel', '数据可视化'],
        milestones: [
            {
                name: 'SQL与数据基础',
                duration: '2-4个月',
                outputs: ['熟练SQL查询', '完成数据分析报告'],
                skills: ['SQL进阶', 'Excel高级', 'Python基础', '统计学']
            },
            {
                name: '分析工具与实战',
                duration: '6-12个月',
                outputs: ['搭建数据看板', '业务分析案例'],
                skills: ['Python数据分析', 'Tableau/PowerBI', '业务理解', 'A/B测试']
            },
            {
                name: '分析体系与求职',
                duration: '3-6个月',
                outputs: ['搭建分析体系', '获得数据分析offer'],
                skills: ['指标体系', '归因分析', '用户分析', '商业洞察']
            }
        ],
        salaryBands: {
            entry: '8-15K',
            junior: '15-25K',
            mid: '25-40K'
        },
        entryRoles: ['数据分析实习生', '初级数据分析师', '业务分析师'],
        educationNotes: {
            '985': '大厂数据团队优先,薪资较高',
            '211': '有竞争力,需要扎实的SQL和分析能力',
            'doubleFirstClass': '注重业务理解和分析思维',
            'other': '入门门槛适中,SQL和统计是关键'
        },
        risks: ['需要业务理解能力', '可能较为重复']
    },
    {
        jobId: 'data_pm',
        jobName: '数据产品经理',
        category: 'data',
        oneLiner: '设计数据产品,赋能业务决策',
        suitableTracks: ['data', 'pm'],
        coreSkills: ['数据建模', 'SQL', '产品设计', '需求分析'],
        milestones: [
            {
                name: '数据与产品基础',
                duration: '3-6个月',
                outputs: ['理解数据产品', '学会数据建模'],
                skills: ['SQL', '产品基础', '数据仓库', '指标体系']
            },
            {
                name: '数据产品设计',
                duration: '6-12个月',
                outputs: ['设计数据看板', '搭建指标体系'],
                skills: ['BI工具', '元数据管理', '数据治理', '产品设计']
            },
            {
                name: '数据中台与求职',
                duration: '3-6个月',
                outputs: ['数据中台规划', '获得数据PM offer'],
                skills: ['数据架构', '数据资产', '数据安全', '平台产品']
            }
        ],
        salaryBands: {
            entry: '10-18K',
            junior: '18-30K',
            mid: '30-50K'
        },
        entryRoles: ['数据产品实习生', '初级数据产品', 'BI产品经理'],
        educationNotes: {
            '985': '大厂数据中台青睐',
            '211': '有优势,需要数据+产品双能力',
            'doubleFirstClass': '注重数据建模和产品思维',
            'other': '门槛较高,建议先做数据分析积累'
        },
        risks: ['需要技术+产品双能力', '相对小众']
    },

    // ==================== 设计类 (design) ====================
    {
        jobId: 'design_ui',
        jobName: 'UI设计师',
        category: 'design',
        oneLiner: '打造视觉美观的界面设计',
        suitableTracks: ['design'],
        coreSkills: ['Figma/Sketch', '视觉设计', '设计规范', '色彩搭配'],
        milestones: [
            {
                name: '设计工具与基础',
                duration: '2-4个月',
                outputs: ['熟练Figma/Sketch', '完成10+界面设计'],
                skills: ['Figma', '设计规范', '排版布局', '色彩理论']
            },
            {
                name: '作品集与项目实战',
                duration: '6-12个月',
                outputs: ['完整作品集', '真实项目经验'],
                skills: ['移动端设计', 'Web设计', '设计系统', '切图标注']
            },
            {
                name: '设计体系与求职',
                duration: '3-6个月',
                outputs: ['Design System', '获得UI设计offer'],
                skills: ['设计规范', '组件库', '设计走查', '前端协作']
            }
        ],
        salaryBands: {
            entry: '7-13K',
            junior: '13-22K',
            mid: '22-35K'
        },
        entryRoles: ['UI设计实习生', '初级UI设计师', '视觉设计师'],
        educationNotes: {
            '985': '非设计专业需要优秀作品集',
            '211': '作品集质量最重要',
            'doubleFirstClass': '设计专业有优势,注重作品集',
            'other': '作品集决定一切,学历影响相对较小'
        },
        risks: ['作品集要求高', '审美需要天赋']
    },
    {
        jobId: 'design_ux',
        jobName: '交互/UX设计师',
        category: 'design',
        oneLiner: '设计流畅的用户体验流程',
        suitableTracks: ['design'],
        coreSkills: ['用户研究', '交互设计', '原型设计', '可用性测试'],
        milestones: [
            {
                name: '交互基础与工具',
                duration: '3-6个月',
                outputs: ['理解交互原则', '完成交互方案'],
                skills: ['Axure/Figma', '交互设计', '用户研究', '信息架构']
            },
            {
                name: '用户研究与实战',
                duration: '6-12个月',
                outputs: ['用户研究报告', '完整交互案例'],
                skills: ['用户访谈', '可用性测试', '原型设计', '设计评审']
            },
            {
                name: 'UX体系与求职',
                duration: '3-6个月',
                outputs: ['UX设计体系', '获得UX设计offer'],
                skills: ['体验设计', '设计思维', '敏捷设计', '跨部门协作']
            }
        ],
        salaryBands: {
            entry: '8-15K',
            junior: '15-25K',
            mid: '25-40K'
        },
        entryRoles: ['交互设计实习生', '初级UX设计师', '产品设计师'],
        educationNotes: {
            '985': '大厂UX团队优先',
            '211': '有竞争力,需要扎实的用户研究能力',
            'doubleFirstClass': '注重交互思维和案例',
            'other': '门槛适中,思维方式和案例最重要'
        },
        risks: ['需要较强逻辑思维', '竞争激烈']
    },

    // ==================== 市场类 (marketing) ====================
    {
        jobId: 'marketing_brand',
        jobName: '市场营销/品牌',
        category: 'marketing',
        oneLiner: '塑造品牌形象,传递品牌价值',
        suitableTracks: ['marketing'],
        coreSkills: ['品牌策划', '营销策略', '内容营销', '活动策划'],
        milestones: [
            {
                name: '市场基础与策划',
                duration: '2-4个月',
                outputs: ['理解营销框架', '完成营销方案'],
                skills: ['市场理论', '营销策划', '文案写作', '品牌定位']
            },
            {
                name: '营销实战与案例',
                duration: '6-12个月',
                outputs: ['执行营销项目', '积累品牌案例'],
                skills: ['活动策划', '媒体投放', '公关传播', 'KOL合作']
            },
            {
                name: '品牌体系与求职',
                duration: '3-6个月',
                outputs: ['品牌营销体系', '获得市场营销offer'],
                skills: ['品牌管理', '整合营销', '危机公关', 'ROI评估']
            }
        ],
        salaryBands: {
            entry: '6-12K',
            junior: '12-22K',
            mid: '22-38K'
        },
        entryRoles: ['市场营销实习生', '品牌专员', '营销策划'],
        educationNotes: {
            '985': '大厂品牌部门优先,注重创意和执行',
            '211': '有竞争力,需要营销案例',
            'doubleFirstClass': '入门门槛适中,创意很重要',
            'other': '门槛适中,案例和创意最重要'
        },
        risks: ['需要创意和执行力', '预算压力大']
    },
    {
        jobId: 'marketing_growth',
        jobName: '广告投放/增长营销',
        category: 'marketing',
        oneLiner: '精准投放广告,实现高ROI增长',
        suitableTracks: ['marketing', 'ops'],
        coreSkills: ['广告投放', '数据分析', 'ROI优化', '渠道运营'],
        milestones: [
            {
                name: '广告平台与基础',
                duration: '2-4个月',
                outputs: ['熟悉投放平台', '完成投放案例'],
                skills: ['广告平台', '投放策略', '数据分析', 'Excel']
            },
            {
                name: '投放优化与增长',
                duration: '6-12个月',
                outputs: ['优化ROI案例', '增长实验经验'],
                skills: ['A/B测试', '用户定向', '创意优化', '预算分配']
            },
            {
                name: '增长体系与求职',
                duration: '3-6个月',
                outputs: ['搭建投放体系', '获得增长营销offer'],
                skills: ['全渠道投放', '归因模型', '自动化投放', '增长黑客']
            }
        ],
        salaryBands: {
            entry: '7-14K',
            junior: '14-25K',
            mid: '25-42K'
        },
        entryRoles: ['投放优化师', '增长营销实习生', '广告优化师'],
        educationNotes: {
            '985': '大厂增长团队青睐',
            '211': '有竞争力,数据能力很重要',
            'doubleFirstClass': '注重数据分析和投放经验',
            'other': '入门门槛适中,数据敏感度最重要'
        },
        risks: ['KPI压力大', '需要较强数据能力']
    },

    // ==================== 销售类 (sales) ====================
    {
        jobId: 'sales_b2b',
        jobName: 'ToB销售',
        category: 'sales',
        oneLiner: '拓展企业客户,达成销售目标',
        suitableTracks: ['sales'],
        coreSkills: ['客户开发', '商务谈判', '关系维护', '方案呈现'],
        milestones: [
            {
                name: '销售基础与产品',
                duration: '2-4个月',
                outputs: ['理解销售流程', '熟悉产品方案'],
                skills: ['销售理论', '产品知识', '沟通技巧', '客户分析']
            },
            {
                name: '客户拓展与签单',
                duration: '6-12个月',
                outputs: ['拓展客户资源', '完成签单目标'],
                skills: ['客户开发', '需求挖掘', '方案设计', '商务谈判']
            },
            {
                name: '大客户与求职',
                duration: '3-6个月',
                outputs: ['大客户经验', '获得ToB销售offer'],
                skills: ['大客户管理', '关系维护', '渠道合作', '销售管理']
            }
        ],
        salaryBands: {
            entry: '8-15K + 提成',
            junior: '15-25K + 提成',
            mid: '25-40K + 提成'
        },
        entryRoles: ['销售实习生', '初级销售代表', '客户经理'],
        educationNotes: {
            '985': '大厂ToB业务优先,底薪较高',
            '211': '有竞争力,沟通能力很重要',
            'doubleFirstClass': '学历影响相对较小,能力最重要',
            'other': '能力导向,业绩决定收入'
        },
        risks: ['业绩压力大', '需要较强抗压能力']
    },
    {
        jobId: 'sales_presales',
        jobName: '售前/解决方案顾问',
        category: 'sales',
        oneLiner: '提供技术方案,助力销售成单',
        suitableTracks: ['sales', 'eng'],
        coreSkills: ['技术理解', '方案设计', '需求分析', '演讲呈现'],
        milestones: [
            {
                name: '产品与技术基础',
                duration: '3-6个月',
                outputs: ['理解产品架构', '完成方案PPT'],
                skills: ['产品知识', '技术基础', '方案设计', 'PPT制作']
            },
            {
                name: '售前实战与POC',
                duration: '6-12个月',
                outputs: ['完成售前项目', 'POC演示经验'],
                skills: ['需求调研', '方案呈现', 'POC实施', '技术答疑']
            },
            {
                name: '方案架构与求职',
                duration: '3-6个月',
                outputs: ['架构设计能力', '获得售前offer'],
                skills: ['解决方案', '行业理解', '客户沟通', '项目管理']
            }
        ],
        salaryBands: {
            entry: '9-16K',
            junior: '16-28K',
            mid: '28-45K'
        },
        entryRoles: ['售前实习生', '初级售前工程师', '方案顾问'],
        educationNotes: {
            '985': '大厂售前团队优先,技术+商务能力',
            '211': '有优势,需要技术背景',
            'doubleFirstClass': '技术专业有优势',
            'other': '门槛适中,技术理解和沟通能力最重要'
        },
        risks: ['需要技术+商务双能力', '出差较多']
    },

    // ==================== 新增运营类岗位 ====================
    {
        jobId: 'ops_industry',
        jobName: '行业运营',
        category: 'ops',
        oneLiner: '深耕垂直行业,连接平台与商家',
        suitableTracks: ['ops'],
        coreSkills: ['行业理解', '商务拓展', '资源整合', '数据分析'],
        milestones: [
            {
                name: '行业认知与基础',
                duration: '2-4个月',
                outputs: ['理解行业生态', '完成行业调研报告'],
                skills: ['行业分析', '商业模式', '运营基础', '沟通协调']
            },
            {
                name: '商家拓展与运营',
                duration: '6-12个月',
                outputs: ['拓展20+商家', '搭建运营体系'],
                skills: ['商务谈判', '资源整合', '政策设计', '数据分析']
            },
            {
                name: '行业深耕与求职',
                duration: '3-6个月',
                outputs: ['行业运营方案', '获得行业运营offer'],
                skills: ['行业洞察', '生态建设', '项目管理', 'B端运营']
            }
        ],
        salaryBands: {
            entry: '7-14K',
            junior: '14-24K',
            mid: '24-38K'
        },
        entryRoles: ['行业运营实习生', '初级行业运营', '商家运营'],
        educationNotes: {
            '985': '大厂行业团队优先,注重商业理解',
            '211': '有竞争力,需要行业资源和沟通能力',
            'doubleFirstClass': '入门门槛适中,行业经验很重要',
            'other': '能力导向,行业资源和执行力最重要'
        },
        risks: ['需要较强商务能力', '业绩压力较大']
    },
    {
        jobId: 'ops_ug_growth',
        jobName: 'UG客户增长',
        category: 'ops',
        oneLiner: '通过增长策略获取和激活用户',
        suitableTracks: ['ops', 'marketing'],
        coreSkills: ['增长策略', '数据分析', '渠道运营', 'A/B测试'],
        milestones: [
            {
                name: '增长理论与工具',
                duration: '2-4个月',
                outputs: ['理解增长模型', '掌握数据工具'],
                skills: ['增长理论', 'SQL基础', 'Excel/Python', '漏斗分析']
            },
            {
                name: '增长实验与优化',
                duration: '6-12个月',
                outputs: ['设计增长实验', '提升转化率案例'],
                skills: ['A/B测试', '用户分层', '渠道优化', '增长黑客']
            },
            {
                name: '增长体系与求职',
                duration: '3-6个月',
                outputs: ['搭建增长体系', '获得增长运营offer'],
                skills: ['AARRR模型', '增长策略', '数据驱动', '跨部门协作']
            }
        ],
        salaryBands: {
            entry: '8-16K',
            junior: '16-28K',
            mid: '28-45K'
        },
        entryRoles: ['增长运营实习生', '初级增长运营', '用户增长专员'],
        educationNotes: {
            '985': '大厂增长团队青睐,数据能力是关键',
            '211': '有竞争力,需要数据+运营双能力',
            'doubleFirstClass': '注重数据分析和增长案例',
            'other': '需要较强数据能力,建议先做数据分析'
        },
        risks: ['KPI压力大', '需要较强数据能力']
    },
    {
        jobId: 'sales_enterprise',
        jobName: '大客户销售',
        category: 'sales',
        oneLiner: '服务大型企业客户,达成高价值签单',
        suitableTracks: ['sales'],
        coreSkills: ['大客户管理', '商务谈判', '方案设计', '关系维护'],
        milestones: [
            {
                name: '销售基础与产品',
                duration: '3-6个月',
                outputs: ['理解销售流程', '熟悉产品方案'],
                skills: ['销售理论', '产品知识', '商务礼仪', '客户分析']
            },
            {
                name: '大客户开发',
                duration: '6-12个月',
                outputs: ['拓展大客户资源', '完成大单签约'],
                skills: ['大客户开发', '需求挖掘', '方案呈现', '商务谈判']
            },
            {
                name: '客户管理与求职',
                duration: '3-6个月',
                outputs: ['客户关系管理', '获得大客户销售offer'],
                skills: ['关系维护', '续约增购', '渠道合作', '销售管理']
            }
        ],
        salaryBands: {
            entry: '10-18K + 提成',
            junior: '18-30K + 提成',
            mid: '30-50K + 提成'
        },
        entryRoles: ['大客户销售实习生', '初级客户经理', '企业销售代表'],
        educationNotes: {
            '985': '大厂大客户部门优先,底薪和提成都较高',
            '211': '有竞争力,沟通和商务能力很重要',
            'doubleFirstClass': '学历影响相对较小,能力和资源最重要',
            'other': '能力导向,业绩决定收入,天花板高'
        },
        risks: ['业绩压力非常大', '需要较强抗压能力', '销售周期长']
    },
    {
        jobId: 'ops_user_v2',
        jobName: '用户运营',
        category: 'ops',
        oneLiner: '深入理解用户需求,提升用户活跃与留存',
        suitableTracks: ['ops'],
        coreSkills: ['用户分析', '社群运营', '活动策划', '数据分析'],
        milestones: [
            {
                name: '运营基础与用户理解',
                duration: '2-4个月',
                outputs: ['理解运营框架', '用户画像分析'],
                skills: ['运营理论', '用户研究', '数据分析基础', '文案写作']
            },
            {
                name: '活动与社群实战',
                duration: '6-12个月',
                outputs: ['策划执行5+活动', '运营社群案例'],
                skills: ['活动策划', '社群管理', '用户增长', 'CRM工具']
            },
            {
                name: '用户体系与求职',
                duration: '3-6个月',
                outputs: ['搭建用户运营体系', '获得用户运营offer'],
                skills: ['用户分层', '生命周期管理', '留存策略', 'RFM模型']
            }
        ],
        salaryBands: {
            entry: '6-12K',
            junior: '12-20K',
            mid: '20-35K'
        },
        entryRoles: ['用户运营实习生', '初级用户运营', '社群运营'],
        educationNotes: {
            '985': '可进入大厂,注重数据分析能力',
            '211': '有竞争力,需要实习和案例',
            'doubleFirstClass': '入门门槛适中,重点是实战经验',
            'other': '最易入门的互联网岗位之一,重点看能力和案例'
        },
        risks: ['工作繁杂琐碎', '需要较强抗压能力']
    },
    {
        jobId: 'ops_activity_v2',
        jobName: '活动运营',
        category: 'ops',
        oneLiner: '策划执行营销活动,实现运营目标',
        suitableTracks: ['ops'],
        coreSkills: ['活动策划', '项目管理', '资源协调', '效果评估'],
        milestones: [
            {
                name: '活动策划基础',
                duration: '2-4个月',
                outputs: ['独立策划3+活动方案', '理解活动流程'],
                skills: ['方案撰写', '预算管理', '风险控制', '效果评估']
            },
            {
                name: '活动执行与复盘',
                duration: '6-12个月',
                outputs: ['执行5+场活动', '积累完整案例'],
                skills: ['项目管理', '跨部门协作', '应急处理', '数据复盘']
            },
            {
                name: '活动体系与求职',
                duration: '3-6个月',
                outputs: ['搭建活动运营体系', '获得活动运营offer'],
                skills: ['活动矩阵', 'ROI优化', '供应商管理', '品牌活动']
            }
        ],
        salaryBands: {
            entry: '6-12K',
            junior: '12-20K',
            mid: '20-32K'
        },
        entryRoles: ['活动运营实习生', '初级活动运营', '运营专员'],
        educationNotes: {
            '985': '可进入大厂,注重执行力和资源整合',
            '211': '有竞争力,需要完整活动案例',
            'doubleFirstClass': '入门门槛适中,重点看执行力',
            'other': '门槛较低,执行力和案例最重要'
        },
        risks: ['工作压力大', '需要应对突发情况']
    },
    {
        jobId: 'pm_pmo',
        jobName: 'PMO项目管理',
        category: 'pm',
        oneLiner: '协调项目资源,确保项目按时交付',
        suitableTracks: ['pm', 'ops'],
        coreSkills: ['项目管理', '流程优化', '跨部门协作', '风险控制'],
        milestones: [
            {
                name: '项目管理基础',
                duration: '2-4个月',
                outputs: ['理解项目管理流程', '学习PM工具'],
                skills: ['项目管理理论', 'JIRA/Confluence', '敏捷开发', '文档管理']
            },
            {
                name: '项目实战与协调',
                duration: '6-12个月',
                outputs: ['管理3+项目', '建立项目流程'],
                skills: ['进度管理', '资源协调', '风险管理', '会议组织']
            },
            {
                name: 'PMO体系与求职',
                duration: '3-6个月',
                outputs: ['搭建PMO体系', '获得PMO offer'],
                skills: ['流程优化', '项目组合管理', '数据看板', '变更管理']
            }
        ],
        salaryBands: {
            entry: '8-15K',
            junior: '15-25K',
            mid: '25-40K'
        },
        entryRoles: ['PMO实习生', '初级项目协调员', '项目助理'],
        educationNotes: {
            '985': '大厂PMO团队优先,注重协调和流程能力',
            '211': '有竞争力,需要项目管理经验',
            'doubleFirstClass': '入门门槛适中,执行力和沟通能力重要',
            'other': '门槛适中,项目经验和协调能力最重要'
        },
        risks: ['协调工作繁杂', '需要较强沟通能力']
    },
    {
        jobId: 'ops_content_newmedia',
        jobName: '内容新媒体运营',
        category: 'ops',
        oneLiner: '运营新媒体平台,打造品牌影响力',
        suitableTracks: ['ops', 'marketing'],
        coreSkills: ['内容创作', '新媒体运营', '数据分析', '用户运营'],
        milestones: [
            {
                name: '内容创作与平台',
                duration: '2-4个月',
                outputs: ['输出30+篇优质内容', '熟悉各平台规则'],
                skills: ['文案写作', '内容策划', '平台运营', '热点捕捉']
            },
            {
                name: '账号运营与增长',
                duration: '6-12个月',
                outputs: ['运营账号粉丝破万', '打造爆款内容'],
                skills: ['新媒体运营', '用户增长', '数据分析', '私域运营']
            },
            {
                name: '矩阵运营与求职',
                duration: '3-6个月',
                outputs: ['搭建新媒体矩阵', '获得新媒体运营offer'],
                skills: ['矩阵运营', '品牌传播', 'KOL合作', '商业变现']
            }
        ],
        salaryBands: {
            entry: '6-12K',
            junior: '12-22K',
            mid: '22-35K'
        },
        entryRoles: ['新媒体运营实习生', '内容运营', '公众号运营'],
        educationNotes: {
            '985': '可进入头部新媒体团队',
            '211': '有竞争力,内容创作能力很重要',
            'doubleFirstClass': '注重内容作品和运营数据',
            'other': '门槛较低,优秀作品和运营能力最重要'
        },
        risks: ['需要持续创作', '平台规则变化快']
    },
    {
        jobId: 'marketing_planning',
        jobName: '营销策划',
        category: 'marketing',
        oneLiner: '策划创意营销方案,提升品牌影响力',
        suitableTracks: ['marketing', 'ops'],
        coreSkills: ['营销策划', '创意策划', '项目执行', '数据分析'],
        milestones: [
            {
                name: '营销基础与创意',
                duration: '2-4个月',
                outputs: ['理解营销理论', '完成3+营销方案'],
                skills: ['营销理论', '创意策划', '文案写作', '市场分析']
            },
            {
                name: '方案执行与优化',
                duration: '6-12个月',
                outputs: ['执行5+营销项目', '积累成功案例'],
                skills: ['活动策划', '项目管理', '媒体投放', '效果评估']
            },
            {
                name: '营销体系与求职',
                duration: '3-6个月',
                outputs: ['搭建营销体系', '获得营销策划offer'],
                skills: ['整合营销', '品牌策划', 'ROI优化', '创意管理']
            }
        ],
        salaryBands: {
            entry: '7-13K',
            junior: '13-23K',
            mid: '23-38K'
        },
        entryRoles: ['营销策划实习生', '初级策划', '营销专员'],
        educationNotes: {
            '985': '大厂营销部门优先,注重创意和执行',
            '211': '有竞争力,需要营销案例',
            'doubleFirstClass': '入门门槛适中,创意很重要',
            'other': '门槛适中,案例和创意最重要'
        },
        risks: ['需要创意和执行力', '工作压力较大']
    },
    {
        jobId: 'data_strategy_ba',
        jobName: '战略商分',
        category: 'data',
        oneLiner: '通过数据分析支持战略决策',
        suitableTracks: ['data', 'pm'],
        coreSkills: ['数据分析', '商业洞察', '战略思维', '报告撰写'],
        milestones: [
            {
                name: '数据分析与商业基础',
                duration: '3-6个月',
                outputs: ['掌握数据分析工具', '理解商业模式'],
                skills: ['SQL高级', 'Python', 'Excel', '商业分析']
            },
            {
                name: '战略分析与实战',
                duration: '6-12个月',
                outputs: ['完成战略分析报告', '支持决策案例'],
                skills: ['战略分析', '竞品分析', '市场研究', '数据建模']
            },
            {
                name: '战略体系与求职',
                duration: '3-6个月',
                outputs: ['搭建分析体系', '获得战略商分offer'],
                skills: ['战略规划', '商业洞察', '决策支持', '高管汇报']
            }
        ],
        salaryBands: {
            entry: '10-18K',
            junior: '18-32K',
            mid: '32-55K'
        },
        entryRoles: ['战略分析实习生', '商业分析师', '战略助理'],
        educationNotes: {
            '985': '大厂战略部门优先,薪资较高',
            '211': '有竞争力,需要强数据+商业能力',
            'doubleFirstClass': '注重数据分析和商业思维',
            'other': '门槛较高,建议先做数据分析积累'
        },
        risks: ['需要综合能力强', '压力较大']
    },
    {
        jobId: 'ops_strategy',
        jobName: '策略运营',
        category: 'ops',
        oneLiner: '设计运营策略,优化业务效率',
        suitableTracks: ['ops', 'data'],
        coreSkills: ['策略设计', '数据分析', '业务理解', 'A/B测试'],
        milestones: [
            {
                name: '运营与数据基础',
                duration: '2-4个月',
                outputs: ['理解运营框架', '掌握数据分析'],
                skills: ['运营理论', 'SQL', 'Excel/Python', '业务分析']
            },
            {
                name: '策略设计与实验',
                duration: '6-12个月',
                outputs: ['设计运营策略', '优化业务指标'],
                skills: ['策略设计', 'A/B测试', '算法理解', '效果评估']
            },
            {
                name: '策略体系与求职',
                duration: '3-6个月',
                outputs: ['搭建策略体系', '获得策略运营offer'],
                skills: ['策略优化', '算法协同', '数据驱动', '业务增长']
            }
        ],
        salaryBands: {
            entry: '9-16K',
            junior: '16-28K',
            mid: '28-45K'
        },
        entryRoles: ['策略运营实习生', '初级策略运营', '运营策略分析师'],
        educationNotes: {
            '985': '大厂策略团队青睐,数据+运营能力',
            '211': '有竞争力,需要较强数据能力',
            'doubleFirstClass': '注重数据分析和策略思维',
            'other': '门槛较高,需要数据+运营双能力'
        },
        risks: ['需要较强数据能力', '工作相对抽象']
    },
    {
        jobId: 'pm_product_ops',
        jobName: '产品运营',
        category: 'pm',
        oneLiner: '连接产品与用户,推动产品增长',
        suitableTracks: ['pm', 'ops'],
        coreSkills: ['产品理解', '用户运营', '数据分析', '需求洞察'],
        milestones: [
            {
                name: '产品与运营基础',
                duration: '2-4个月',
                outputs: ['理解产品逻辑', '掌握运营方法'],
                skills: ['产品思维', '运营理论', '数据分析', '用户研究']
            },
            {
                name: '产品运营实战',
                duration: '6-12个月',
                outputs: ['提升产品数据', '优化用户体验'],
                skills: ['功能运营', '用户增长', '数据分析', '需求挖掘']
            },
            {
                name: '运营体系与求职',
                duration: '3-6个月',
                outputs: ['搭建产品运营体系', '获得产品运营offer'],
                skills: ['产品策略', '增长运营', '用户洞察', '跨部门协作']
            }
        ],
        salaryBands: {
            entry: '8-15K',
            junior: '15-26K',
            mid: '26-42K'
        },
        entryRoles: ['产品运营实习生', '初级产品运营', '运营专员'],
        educationNotes: {
            '985': '大厂产品运营团队优先',
            '211': '有竞争力,需要产品+运营双能力',
            'doubleFirstClass': '注重产品理解和运营经验',
            'other': '门槛适中,产品sense和运营能力最重要'
        },
        risks: ['需要产品+运营双能力', '工作内容较杂']
    }
];

/**
 * 根据方向获取候选岗位
 * @param {string} track - 方向偏好
 * @returns {Array} - 候选岗位列表
 */
function getCandidateJobsByTrack(track) {
    return JOBS_DATABASE.filter(job => 
        job.suitableTracks.includes(track)
    );
}

/**
 * 根据jobId获取岗位详情
 * @param {string} jobId - 岗位ID
 * @returns {Object} - 岗位详情对象
 */
function getJobById(jobId) {
    return JOBS_DATABASE.find(job => job.jobId === jobId);
}

/**
 * 获取所有岗位
 * @returns {Array} - 所有岗位列表
 */
function getAllJobs() {
    return JOBS_DATABASE;
}

// 将数据导出到全局window对象,供app.js使用
window.JOBS_DATA = JOBS_DATABASE;
