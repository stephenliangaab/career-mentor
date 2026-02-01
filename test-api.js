/**
 * API测试脚本
 * 使用方法: node test-api.js
 */

// 测试配置
const TEST_CONFIG = {
    // 本地测试
    local: 'http://localhost:3000/api/recommend',
    // 生产环境(替换为你的Vercel域名)
    production: 'https://your-domain.vercel.app/api/recommend'
};

// 选择测试环境
const API_ENDPOINT = TEST_CONFIG.local;

// 测试用例
const testCases = [
    {
        name: '测试1: 985应届生-技术方向',
        payload: {
            userProfile: {
                identity: 'graduate',
                educationTier: '985',
                major: '计算机科学与技术',
                currentExperience: '无',
                trackPreference: 'eng',
                interestTags: ['写代码', '做数据分析', '喜欢挑战'],
                mbti: 'INTJ'
            },
            jobsData: [] // 实际使用时需要传入真实数据
        }
    },
    {
        name: '测试2: 普通本科在职-产品方向',
        payload: {
            userProfile: {
                identity: 'junior',
                educationTier: 'other',
                major: '市场营销',
                currentExperience: '运营专员1年',
                trackPreference: 'pm',
                interestTags: ['做产品规划', '与人沟通', '做项目推进'],
                mbti: 'ENFJ'
            },
            jobsData: []
        }
    },
    {
        name: '测试3: 211应届生-设计方向',
        payload: {
            userProfile: {
                identity: 'graduate',
                educationTier: '211',
                major: '视觉传达设计',
                currentExperience: '设计实习3个月',
                trackPreference: 'design',
                interestTags: ['做创意设计', '做内容', '喜欢稳定'],
                mbti: 'ISFP'
            },
            jobsData: []
        }
    }
];

/**
 * 执行单个测试
 */
async function runTest(testCase) {
    console.log('\n' + '='.repeat(60));
    console.log(`📋 ${testCase.name}`);
    console.log('='.repeat(60));
    
    try {
        const startTime = Date.now();
        
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testCase.payload)
        });
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        console.log(`⏱️  响应时间: ${duration}ms`);
        console.log(`📊 状态码: ${response.status}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ 请求失败: ${errorText}`);
            return false;
        }
        
        const result = await response.json();
        
        // 打印结果
        console.log('\n📦 响应数据:');
        console.log(JSON.stringify(result, null, 2));
        
        // 验证结果
        if (result.success && result.data && result.data.topJobs) {
            console.log('\n✅ 测试通过');
            console.log(`   - 推荐岗位数: ${result.data.topJobs.length}`);
            console.log(`   - 推荐方法: ${result.data.method}`);
            console.log(`   - 置信度: ${result.data.confidence}`);
            if (result.cached) {
                console.log('   - 来自缓存: 是');
            }
            if (result.fallback) {
                console.log('   - 降级推荐: 是');
            }
            if (result.notice) {
                console.log(`   - 提示: ${result.notice}`);
            }
            
            // 打印Top3岗位
            console.log('\n🎯 推荐岗位:');
            result.data.topJobs.forEach((job, index) => {
                console.log(`   ${index + 1}. ${job.jobId} (匹配度: ${job.fitScore}%)`);
                if (job.reasons && job.reasons.length > 0) {
                    console.log(`      理由: ${job.reasons.join('; ')}`);
                }
            });
            
            return true;
        } else {
            console.error('❌ 返回数据格式错误');
            return false;
        }
        
    } catch (error) {
        console.error(`❌ 测试失败: ${error.message}`);
        return false;
    }
}

/**
 * 测试统计接口
 */
async function testStatsEndpoint() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 测试统计接口');
    console.log('='.repeat(60));
    
    try {
        const statsUrl = API_ENDPOINT.replace('/recommend', '/recommend/stats');
        const response = await fetch(statsUrl);
        
        if (!response.ok) {
            console.log('⚠️  统计接口不可用(可能未启用KV)');
            return;
        }
        
        const stats = await response.json();
        console.log('\n当前使用统计:');
        console.log(`  本月: ${stats.month.current}/${stats.month.limit} (剩余 ${stats.month.remaining})`);
        console.log(`  今日: ${stats.day.current}/${stats.day.limit} (剩余 ${stats.day.remaining})`);
        
    } catch (error) {
        console.log('⚠️  统计接口测试失败:', error.message);
    }
}

/**
 * 运行所有测试
 */
async function runAllTests() {
    console.log('\n🚀 开始API测试...');
    console.log(`   测试端点: ${API_ENDPOINT}`);
    console.log(`   测试用例数: ${testCases.length}`);
    
    let passCount = 0;
    let failCount = 0;
    
    for (const testCase of testCases) {
        const passed = await runTest(testCase);
        if (passed) {
            passCount++;
        } else {
            failCount++;
        }
        
        // 每个测试间隔1秒
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // 测试统计接口
    await testStatsEndpoint();
    
    // 总结
    console.log('\n' + '='.repeat(60));
    console.log('📈 测试总结');
    console.log('='.repeat(60));
    console.log(`✅ 通过: ${passCount}`);
    console.log(`❌ 失败: ${failCount}`);
    console.log(`📊 总计: ${testCases.length}`);
    
    if (failCount === 0) {
        console.log('\n🎉 所有测试通过!');
    } else {
        console.log('\n⚠️  部分测试失败,请检查错误信息');
    }
}

// 检查是否在Node.js环境中运行
if (typeof fetch === 'undefined') {
    console.error('❌ 错误: 此脚本需要Node.js 18+版本(支持fetch API)');
    console.log('   或安装node-fetch: npm install node-fetch');
    process.exit(1);
}

// 运行测试
runAllTests().catch(error => {
    console.error('💥 测试执行失败:', error);
    process.exit(1);
});
