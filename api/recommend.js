/**
 * 职径导航 - AI推荐接口 (Vercel Serverless Function)
 * 
 * 功能:
 * 1. 接收用户画像数据
 * 2. 执行限流检查(月/日/IP)
 * 3. 检查缓存命中
 * 4. 调用OpenAI API生成推荐
 * 5. 失败时自动降级到规则推荐
 */

// 导入依赖(Vercel会自动处理node_modules)
import { kv } from '@vercel/kv'; // Vercel KV存储
import OpenAI from 'openai'; // OpenAI SDK
import crypto from 'crypto';

// ==================== 配置常量 ====================

const CONFIG = {
    // 限流配置
    LIMITS: {
        MONTHLY_MAX: 1000,      // 月度总调用上限
        DAILY_MAX: 50,          // 日调用上限
        IP_DAILY_MAX: 5,        // 单IP日调用上限
        COOLDOWN_SECONDS: 60    // 重新生成冷却时间
    },
    
    // 缓存配置
    CACHE: {
        TTL_SECONDS: 604800,    // 缓存7天
        KEY_PREFIX: 'recommend' // 缓存key前缀
    },
    
    // OpenAI配置
    OPENAI: {
        MODEL: 'gpt-3.5-turbo',  // 使用低成本模型
        MAX_TOKENS: 800,          // 限制输出token数
        TEMPERATURE: 0.7
    }
};

// ==================== 限流函数 ====================

/**
 * 检查是否超过限流
 * @param {string} ip - 客户端IP
 * @returns {Object} - {allowed: boolean, reason: string}
 */
async function checkRateLimit(ip) {
    try {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
        
        // 检查月度限流
        const monthKey = `ratelimit:month:${currentMonth}`;
        const monthCount = await kv.get(monthKey) || 0;
        
        if (monthCount >= CONFIG.LIMITS.MONTHLY_MAX) {
            return {
                allowed: false,
                reason: '本月推荐额度已用完,请下月再试'
            };
        }
        
        // 检查日限流
        const dayKey = `ratelimit:day:${today}`;
        const dayCount = await kv.get(dayKey) || 0;
        
        if (dayCount >= CONFIG.LIMITS.DAILY_MAX) {
            return {
                allowed: false,
                reason: '今日推荐额度已用完,请明天再试'
            };
        }
        
        // 检查IP限流
        const ipKey = `ratelimit:ip:${ip}:${today}`;
        const ipCount = await kv.get(ipKey) || 0;
        
        if (ipCount >= CONFIG.LIMITS.IP_DAILY_MAX) {
            return {
                allowed: false,
                reason: '您今日已达到使用次数上限,请明天再试'
            };
        }
        
        return { allowed: true };
        
    } catch (error) {
        console.error('限流检查失败:', error);
        // 限流检查失败时允许通过,避免阻断用户
        return { allowed: true };
    }
}

/**
 * 增加限流计数
 * @param {string} ip - 客户端IP
 */
async function incrementRateLimit(ip) {
    try {
        const today = new Date().toISOString().split('T')[0];
        const currentMonth = new Date().toISOString().slice(0, 7);
        
        // 增加月度计数
        const monthKey = `ratelimit:month:${currentMonth}`;
        await kv.incr(monthKey);
        await kv.expire(monthKey, 2592000); // 30天过期
        
        // 增加日计数
        const dayKey = `ratelimit:day:${today}`;
        await kv.incr(dayKey);
        await kv.expire(dayKey, 86400); // 24小时过期
        
        // 增加IP计数
        const ipKey = `ratelimit:ip:${ip}:${today}`;
        await kv.incr(ipKey);
        await kv.expire(ipKey, 86400); // 24小时过期
        
    } catch (error) {
        console.error('限流计数失败:', error);
    }
}

// ==================== 缓存函数 ====================

/**
 * 生成用户画像的缓存key
 * @param {Object} userProfile - 用户画像
 * @returns {string} - 缓存key
 */
function generateCacheKey(userProfile) {
    // 对画像关键字段进行hash
    const keyData = {
        identity: userProfile.identity,
        educationTier: userProfile.educationTier,
        trackPreference: userProfile.trackPreference,
        interestTags: userProfile.interestTags.sort(), // 排序保证一致性
        mbti: userProfile.mbti
    };
    
    const hash = crypto
        .createHash('md5')
        .update(JSON.stringify(keyData))
        .digest('hex');
    
    return `${CONFIG.CACHE.KEY_PREFIX}:${hash}`;
}

/**
 * 从缓存获取推荐结果
 * @param {string} cacheKey - 缓存key
 * @returns {Object|null} - 缓存的推荐结果
 */
async function getCachedRecommendation(cacheKey) {
    try {
        const cached = await kv.get(cacheKey);
        return cached;
    } catch (error) {
        console.error('缓存读取失败:', error);
        return null;
    }
}

/**
 * 将推荐结果存入缓存
 * @param {string} cacheKey - 缓存key
 * @param {Object} recommendation - 推荐结果
 */
async function setCachedRecommendation(cacheKey, recommendation) {
    try {
        await kv.set(cacheKey, recommendation, {
            ex: CONFIG.CACHE.TTL_SECONDS
        });
    } catch (error) {
        console.error('缓存写入失败:', error);
    }
}

// ==================== OpenAI调用函数 ====================

/**
 * 调用OpenAI API生成推荐
 * @param {Object} userProfile - 用户画像
 * @param {Array} candidateJobs - 候选岗位列表
 * @returns {Object} - AI推荐结果
 */
async function generateAIRecommendation(userProfile, candidateJobs) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    
    // 构建prompt
    const prompt = buildPrompt(userProfile, candidateJobs);
    
    try {
        const completion = await openai.chat.completions.create({
            model: CONFIG.OPENAI.MODEL,
            messages: [
                {
                    role: 'system',
                    content: '你是一位专业的职业规划顾问,擅长为中国大学生和职场新人提供精准的互联网岗位推荐。你的回复必须是严格的JSON格式。'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: CONFIG.OPENAI.MAX_TOKENS,
            temperature: CONFIG.OPENAI.TEMPERATURE,
            response_format: { type: "json_object" } // 强制JSON输出
        });
        
        const responseText = completion.choices[0].message.content;
        const result = JSON.parse(responseText);
        
        // 验证返回结构
        if (!result.topJobs || !Array.isArray(result.topJobs)) {
            throw new Error('AI返回格式错误');
        }
        
        return {
            success: true,
            data: result,
            method: 'ai'
        };
        
    } catch (error) {
        console.error('OpenAI调用失败:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * 构建发送给OpenAI的prompt
 * @param {Object} userProfile - 用户画像
 * @param {Array} candidateJobs - 候选岗位
 * @returns {string} - prompt文本
 */
function buildPrompt(userProfile, candidateJobs) {
    const identityMap = {
        'graduate': '应届毕业生',
        'junior': '在职1-3年'
    };
    
    const educationMap = {
        '985': '985高校',
        '211': '211高校',
        'doubleFirstClass': '双一流高校',
        'other': '普通本科'
    };
    
    const trackMap = {
        'eng': '技术开发',
        'pm': '产品',
        'ops': '运营',
        'data': '数据',
        'design': '设计',
        'marketing': '市场',
        'sales': '销售'
    };
    
    // 候选岗位摘要
    const jobsSummary = candidateJobs.slice(0, 8).map(job => ({
        jobId: job.jobId,
        jobName: job.jobName,
        oneLiner: job.oneLiner,
        coreSkills: job.coreSkills.slice(0, 4)
    }));
    
    return `
请基于以下用户画像,从候选岗位中推荐最合适的Top3岗位。

## 用户画像
- 身份: ${identityMap[userProfile.identity] || userProfile.identity}
- 学历: ${educationMap[userProfile.educationTier] || userProfile.educationTier}
- 专业: ${userProfile.major}
- 当前经历: ${userProfile.currentExperience || '无'}
- 方向偏好: ${trackMap[userProfile.trackPreference] || userProfile.trackPreference}
- 兴趣标签: ${userProfile.interestTags.join('、')}
- MBTI: ${userProfile.mbti !== 'unknown' ? userProfile.mbti : '未知'}

## 候选岗位
${JSON.stringify(jobsSummary, null, 2)}

## 输出要求
请严格按照以下JSON格式输出,不要添加任何其他文本:
{
    "topJobs": [
        {
            "jobId": "岗位ID",
            "fitScore": 85,
            "reasons": ["理由1(不超过20字)", "理由2", "理由3"],
            "riskHint": "风险提示(不超过20字,可选)"
        }
    ],
    "summary": "推荐摘要(不超过80字)",
    "confidence": "high|medium|low",
    "nextAction": "下一步建议(不超过30字)"
}

注意事项:
1. topJobs数组必须包含3个岗位
2. reasons每条不超过20字
3. summary不超过80字
4. 考虑用户的学历背景和经验,在riskHint中给出适当提示
5. 整体回复不超过800 tokens
`;
}

// ==================== 规则兜底引擎 ====================

/**
 * 基于规则的推荐算法(兜底方案)
 * @param {Object} userProfile - 用户画像
 * @param {Array} allJobs - 所有岗位数据
 * @returns {Object} - 推荐结果
 */
function generateRuleBasedRecommendation(userProfile, allJobs) {
    const trackPreference = userProfile.trackPreference;
    
    // 1. 按方向筛选匹配岗位
    let matchedJobs = allJobs.filter(job => {
        return job.suitableTracks && job.suitableTracks.includes(trackPreference);
    });
    
    // 2. 按兴趣标签打分
    matchedJobs = matchedJobs.map(job => {
        let score = 80; // 基础分
        
        // 兴趣标签匹配加分
        const interestMatch = userProfile.interestTags.filter(tag => {
            return job.coreSkills.some(skill => 
                skill.includes(tag) || tag.includes(skill)
            );
        }).length;
        score += interestMatch * 3;
        
        // MBTI匹配加分(如果有定义)
        if (userProfile.mbti !== 'unknown' && job.suitableMbti) {
            if (job.suitableMbti.includes(userProfile.mbti)) {
                score += 5;
            }
        }
        
        return { ...job, score };
    });
    
    // 3. 排序并取Top3
    matchedJobs.sort((a, b) => b.score - a.score);
    
    // 如果匹配数不足,补充同分类岗位
    if (matchedJobs.length < 3) {
        const additionalJobs = allJobs
            .filter(job => 
                job.category === trackPreference && 
                !matchedJobs.includes(job)
            )
            .map(job => ({ ...job, score: 75 }));
        
        matchedJobs.push(...additionalJobs);
    }
    
    const topJobs = matchedJobs.slice(0, 3).map(job => ({
        jobId: job.jobId,
        fitScore: Math.min(Math.round(job.score), 95),
        reasons: [
            `与你的方向偏好高度匹配`,
            `适合${userProfile.identity === 'graduate' ? '应届生' : '1-3年经验者'}起步`,
            `发展路径清晰,市场需求稳定`
        ],
        riskHint: job.educationNotes ? job.educationNotes[userProfile.educationTier] : null
    }));
    
    return {
        topJobs,
        summary: `基于你的${userProfile.trackPreference}方向偏好和背景,为你推荐以下${topJobs.length}个岗位`,
        confidence: 'medium',
        nextAction: '建议先查看第一个岗位的详细路径',
        method: 'rule_based'
    };
}

// ==================== 主处理函数 ====================

/**
 * Vercel Serverless Function主入口
 * @param {Object} request - 请求对象
 * @returns {Response} - 响应对象
 */
export default async function handler(request) {
    // 允许浏览器跨域预检请求(Preflight)，避免 OPTIONS 被当成非法方法导致 405
    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204 });
    }

    // 只允许POST请求
    if (request.method !== 'POST') {
        return new Response(
            JSON.stringify({ error: '只支持POST请求' }),
            { 
                status: 405,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
    
    try {
        // 获取客户端IP
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                   request.headers.get('x-real-ip') || 
                   'unknown';
        
        // 解析请求体
        const body = await request.json();
        const { userProfile, jobsData } = body;
        
        // 验证必要参数
        if (!userProfile || !jobsData) {
            return new Response(
                JSON.stringify({ error: '缺少必要参数' }),
                { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
        
        // 1. 检查限流
        const rateLimitCheck = await checkRateLimit(ip);
        if (!rateLimitCheck.allowed) {
            // 超过限流,返回规则推荐
            const fallbackResult = generateRuleBasedRecommendation(userProfile, jobsData);
            
            return new Response(
                JSON.stringify({
                    success: true,
                    data: fallbackResult,
                    notice: rateLimitCheck.reason,
                    fallback: true
                }),
                { 
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
        
        // 2. 检查缓存
        const cacheKey = generateCacheKey(userProfile);
        const cached = await getCachedRecommendation(cacheKey);
        
        if (cached) {
            console.log('缓存命中:', cacheKey);
            return new Response(
                JSON.stringify({
                    success: true,
                    data: cached,
                    cached: true
                }),
                { 
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
        
        // 3. 准备候选岗位(按方向粗筛)
        const candidateJobs = jobsData.filter(job => {
            return job.suitableTracks && 
                   job.suitableTracks.includes(userProfile.trackPreference);
        });
        
        // 如果候选岗位不足,补充同分类岗位
        if (candidateJobs.length < 8) {
            const additionalJobs = jobsData.filter(job => 
                job.category === userProfile.trackPreference &&
                !candidateJobs.includes(job)
            );
            candidateJobs.push(...additionalJobs);
        }
        
        // 4. 调用AI生成推荐
        let result;
        
        if (process.env.OPENAI_API_KEY) {
            // 尝试使用AI
            const aiResult = await generateAIRecommendation(userProfile, candidateJobs);
            
            if (aiResult.success) {
                result = aiResult.data;
                result.method = 'ai';
                
                // 增加限流计数
                await incrementRateLimit(ip);
                
                // 存入缓存
                await setCachedRecommendation(cacheKey, result);
            } else {
                // AI失败,使用规则兜底
                result = generateRuleBasedRecommendation(userProfile, jobsData);
                result.notice = '当前使用基础推荐算法,AI服务暂时不可用';
            }
        } else {
            // 没有配置API Key,直接使用规则推荐
            result = generateRuleBasedRecommendation(userProfile, jobsData);
            result.notice = '当前使用基础推荐算法';
        }
        
        return new Response(
            JSON.stringify({
                success: true,
                data: result
            }),
            { 
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
        
    } catch (error) {
        console.error('推荐生成错误:', error);
        
        // 发生错误时返回规则推荐
        try {
            const body = await request.json();
            const fallbackResult = generateRuleBasedRecommendation(
                body.userProfile, 
                body.jobsData
            );
            
            return new Response(
                JSON.stringify({
                    success: true,
                    data: fallbackResult,
                    notice: '服务暂时异常,已为您提供基础推荐',
                    fallback: true
                }),
                { 
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        } catch (fallbackError) {
            return new Response(
                JSON.stringify({ 
                    error: '推荐生成失败',
                    message: error.message 
                }),
                { 
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }
    }
}

// ==================== 统计接口(可选) ====================

/**
 * 获取当前限流统计(管理用)
 * 访问路径: /api/recommend/stats
 */
export async function statsHandler(request) {
    try {
        const today = new Date().toISOString().split('T')[0];
        const currentMonth = new Date().toISOString().slice(0, 7);
        
        const monthCount = await kv.get(`ratelimit:month:${currentMonth}`) || 0;
        const dayCount = await kv.get(`ratelimit:day:${today}`) || 0;
        
        return new Response(
            JSON.stringify({
                month: {
                    current: monthCount,
                    limit: CONFIG.LIMITS.MONTHLY_MAX,
                    remaining: CONFIG.LIMITS.MONTHLY_MAX - monthCount
                },
                day: {
                    current: dayCount,
                    limit: CONFIG.LIMITS.DAILY_MAX,
                    remaining: CONFIG.LIMITS.DAILY_MAX - dayCount
                }
            }),
            { 
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
