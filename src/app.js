/**
 * 职径导航 - 主应用逻辑
 * 前端主逻辑，AI推荐通过Vercel Function调用（当前为规则兜底）
 */

// ==================== 全局状态管理 ====================
const AppState = {
    currentPage: 'home',
    userProfile: null,
    recommendations: null,
    selectedJobId: null
};

// ==================== 页面导航函数 ====================

/**
 * 导航到首页
 */
function navigateToHome() {
    showPage('home');
}

/**
 * 导航到画像收集页
 */
function navigateToProfile() {
    showPage('profile');
    trackEvent('click_start');
}

/**
 * 导航到推荐结果页
 */
function navigateToResult() {
    showPage('result');
}

/**
 * 导航到岗位详情页
 * @param {string} jobId - 岗位ID
 */
function navigateToDetail(jobId) {
    AppState.selectedJobId = jobId;
    renderJobDetail(jobId);
    showPage('detail');
    trackEvent('click_job_detail', { jobId });
}

/**
 * 显示指定页面
 * @param {string} pageName - 页面名称
 */
function showPage(pageName) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
        targetPage.classList.add('active');
        AppState.currentPage = pageName;
    }
}

// ==================== 首页Tab切换功能 ====================

/**
 * 切换首页Tab
 * @param {string} tabName - Tab名称 ('planning' 或 'library')
 */
function switchHomeTab(tabName) {
    // 更新Tab按钮状态
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // 更新Tab内容显示
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    if (tabName === 'planning') {
        document.getElementById('tab-planning').classList.add('active');
    } else if (tabName === 'library') {
        document.getElementById('tab-library').classList.add('active');
        // 首次加载岗位库时渲染
        if (!document.getElementById('jobs-library-grid').hasChildNodes()) {
            renderJobLibrary();
        }
    }
    
    // 埋点
    trackEvent('switch_home_tab', { tab: tabName });
}

/**
 * 渲染岗位库
 * @param {string} category - 分类筛选 (可选)
 * @param {string} searchQuery - 搜索关键词 (可选)
 */
function renderJobLibrary(category = 'all', searchQuery = '') {
    const grid = document.getElementById('jobs-library-grid');
    
    // 获取所有岗位数据
    let jobs = window.JOBS_DATA || [];
    
    // 分类筛选
    if (category !== 'all') {
        jobs = jobs.filter(job => job.category === category);
    }
    
    // 搜索筛选
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        jobs = jobs.filter(job => 
            job.jobName.toLowerCase().includes(query) ||
            job.oneLiner.toLowerCase().includes(query) ||
            (job.coreSkills && job.coreSkills.some(skill => 
                skill.toLowerCase().includes(query)
            ))
        );
    }
    
    // 清空现有内容
    grid.innerHTML = '';
    
    // 如果没有结果
    if (jobs.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--color-text-muted);">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto 1rem; opacity: 0.3;">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p style="font-size: 1.125rem;">未找到相关岗位</p>
            </div>
        `;
        return;
    }
    
    // 渲染岗位卡片
    jobs.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-library-card';
        card.onclick = () => navigateToDetail(job.jobId);
        
        // 分类标签文本映射
        const categoryLabels = {
            'eng': '技术',
            'pm': '产品',
            'ops': '运营',
            'data': '数据',
            'design': '设计',
            'marketing': '市场',
            'sales': '销售'
        };
        
        // 显示前3个核心技能
        const skillsHTML = job.coreSkills && job.coreSkills.length > 0
            ? job.coreSkills.slice(0, 3).map(skill => 
                `<span class="skill-tag">${skill}</span>`
              ).join('')
            : '';
        
        card.innerHTML = `
            <div class="job-card-category">${categoryLabels[job.category] || job.category}</div>
            <h3 class="job-card-title">${job.jobName}</h3>
            <p class="job-card-oneliner">${job.oneLiner}</p>
            ${skillsHTML ? `<div class="job-card-skills">${skillsHTML}</div>` : ''}
        `;
        
        grid.appendChild(card);
    });
    
    // 埋点
    trackEvent('view_job_library', { category, searchQuery, resultCount: jobs.length });
}

/**
 * 初始化岗位库交互
 */
function initJobLibrary() {
    // 分类筛选按钮
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新按钮状态
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 获取分类和搜索词
            const category = this.dataset.category;
            const searchQuery = document.getElementById('job-search-input').value;
            
            // 重新渲染
            renderJobLibrary(category, searchQuery);
        });
    });
    
    // 搜索框
    const searchInput = document.getElementById('job-search-input');
    if (searchInput) {
        // 防抖搜索
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const category = document.querySelector('.category-btn.active').dataset.category;
                renderJobLibrary(category, this.value);
            }, 300);
        });
    }
}

// ==================== 表单处理 ====================

/**
 * 初始化表单监听器
 */
function initFormListeners() {
    const form = document.getElementById('profile-form');
    if (!form) return;
    
    // 兴趣标签数量限制
    const interestCheckboxes = document.querySelectorAll('input[name="interestTags"]');
    const interestCount = document.getElementById('interest-count');

    interestCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checked = document.querySelectorAll('input[name="interestTags"]:checked');
            interestCount.textContent = `已选择 ${checked.length}/5`;

            // 超过5个时禁用未选中的
            if (checked.length >= 5) {
                interestCheckboxes.forEach(cb => {
                    if (!cb.checked) {
                        cb.disabled = true;
                        cb.parentElement.style.opacity = '0.5';
                    }
                });
            } else {
                interestCheckboxes.forEach(cb => {
                    cb.disabled = false;
                    cb.parentElement.style.opacity = '1';
                });
            }
        });
    });

    // 学历选择器值同步
    const educationSelect = document.querySelector('select[name="educationTier"]');
    if (educationSelect) {
        educationSelect.addEventListener('change', function() {
            const hiddenInput = document.getElementById('educationTierValue');
            if (hiddenInput) {
                hiddenInput.value = this.value;
            }
        });
    }
    
    // 表单提交
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleProfileSubmit();
    });
}

/**
 * 处理画像表单提交
 */
function handleProfileSubmit() {
    const form = document.getElementById('profile-form');
    const formData = new FormData(form);
    
    // 构建用户画像对象
    const userProfile = {
        identity: formData.get('identity'),
        educationTier: formData.get('educationTier'),
        major: formData.get('major'),
        currentExperience: formData.get('currentExperience') || '无',
        trackPreference: formData.get('trackPreference'),
        interestTags: formData.getAll('interestTags'),
        mbti: formData.get('mbti') || 'unknown'
    };
    
    // 验证必填项
    if (!userProfile.identity || !userProfile.educationTier || !userProfile.major || 
        !userProfile.trackPreference || userProfile.interestTags.length === 0) {
        alert('请完成所有必填项');
        return;
    }
    
    // 验证兴趣标签数量
    if (userProfile.interestTags.length > 5) {
        alert('兴趣标签最多选择5个');
        return;
    }
    
    // 保存到全局状态
    AppState.userProfile = userProfile;
    
    // 埋点
    trackEvent('submit_profile', userProfile);
    
    // 生成推荐
    generateRecommendation(userProfile);
}

/**
 * 生成推荐结果(调用Vercel API或规则兜底)
 * @param {Object} userProfile - 用户画像
 */
async function generateRecommendation(userProfile) {
    try {
        showLoading('正在生成推荐...');
        
        // 获取API端点(支持本地开发和生产环境)
        const apiEndpoint = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:3000/api/recommend'  // 本地开发
            : '/api/recommend';  // 生产环境(相对路径)
        
        try {
            // 调用Vercel Serverless Function
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userProfile: userProfile,
                    jobsData: window.JOBS_DATA || []
                })
            });
            
            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.success) {
                const recommendations = result.data;
                AppState.recommendations = recommendations;
                
                // 如果有通知信息(如限流提示),显示给用户
                if (result.notice) {
                    console.log('提示:', result.notice);
                }
                
                // 如果是缓存结果,添加标记
                if (result.cached) {
                    recommendations._cached = true;
                }
                
                hideLoading();
                renderRecommendations(recommendations);
                navigateToResult();
                
                trackEvent('ai_success', { 
                    method: recommendations.method || 'unknown',
                    cached: result.cached || false,
                    fallback: result.fallback || false
                });
            } else {
                throw new Error(result.error || '推荐生成失败');
            }
            
        } catch (apiError) {
            console.error('API调用失败,使用本地规则兜底:', apiError);
            
            // API失败时使用本地规则兜底
            const recommendations = generateRuleBasedRecommendation(userProfile);
            AppState.recommendations = recommendations;
            
            hideLoading();
            renderRecommendations(recommendations);
            navigateToResult();
            
            // 显示降级提示
            showFallbackNotice();
            
            trackEvent('ai_fail', { 
                error: apiError.message,
                fallback: 'local_rule' 
            });
        }
        
    } catch (error) {
        console.error('推荐生成错误:', error);
        hideLoading();
        alert('推荐生成失败,请重试');
        trackEvent('ai_fail', { error: error.message });
    }
}

/**
 * 显示降级提示
 */
function showFallbackNotice() {
    const notice = document.getElementById('confidence-notice');
    if (notice) {
        const originalHTML = notice.innerHTML;
        notice.innerHTML = `
            <svg class="notice-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>当前为基础推荐(AI服务暂时不可用),推荐结果仅供参考</p>
        `;
        
        // 3秒后恢复原始内容
        setTimeout(() => {
            notice.innerHTML = originalHTML;
        }, 5000);
    }
}

/**
 * 基于规则的推荐算法(兜底方案)
 * @param {Object} userProfile - 用户画像
 * @returns {Object} - 推荐结果
 */
function generateRuleBasedRecommendation(userProfile) {
    const jobs = window.JOBS_DATA || [];
    const trackPreference = userProfile.trackPreference;
    
    // 按方向筛选匹配岗位
    const matchedJobs = jobs.filter(job => {
        return job.suitableTracks && job.suitableTracks.includes(trackPreference);
    });
    
    // 如果匹配数不足,补充同分类岗位
    if (matchedJobs.length < 3) {
        const additionalJobs = jobs.filter(job => 
            job.category === trackPreference && !matchedJobs.includes(job)
        );
        matchedJobs.push(...additionalJobs);
    }
    
    // 取前3个
    const topJobs = matchedJobs.slice(0, 3).map((job, index) => ({
        jobId: job.jobId,
        jobName: job.jobName,
        fitScore: 85 - (index * 5), // 简单评分
        reasons: [
            `与你的${trackPreference}方向偏好匹配`,
            `适合${userProfile.identity === 'graduate' ? '应届生' : '1-3年经验'}`,
            `发展路径清晰可行`
        ],
        riskHint: job.educationNotes ? job.educationNotes[userProfile.educationTier] : null
    }));
    
    return {
        topJobs,
        summary: `基于你的背景和偏好,为你推荐以下${topJobs.length}个岗位`,
        confidence: 'medium',
        nextAction: '建议先查看第一个岗位的详细路径'
    };
}

/**
 * 渲染推荐结果
 * @param {Object} recommendations - 推荐结果
 */
function renderRecommendations(recommendations) {
    const container = document.getElementById('job-cards-container');
    const summaryText = document.getElementById('result-summary-text');
    
    // 更新摘要
    if (summaryText) {
        summaryText.textContent = recommendations.summary;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 渲染Top3岗位卡片
    recommendations.topJobs.forEach((rec, index) => {
        const job = window.JOBS_DATA.find(j => j.jobId === rec.jobId);
        if (!job) return;
        
        const card = document.createElement('div');
        card.className = 'job-card';
        
        const reasonsHTML = rec.reasons.map(reason => 
            `<li class="reason-item">${reason}</li>`
        ).join('');
        
        const riskHTML = rec.riskHint 
            ? `<div class="risk-hint">⚠️ ${rec.riskHint}</div>`
            : '';
        
        card.innerHTML = `
            <div class="job-rank">Top ${index + 1}</div>
            <h3 class="job-card-name">${job.jobName}</h3>
            <p class="job-card-desc">${job.oneLiner}</p>
            <div class="match-score">匹配度: ${rec.fitScore}%</div>
            <div class="reasons-list">
                <h4>推荐理由</h4>
                <ul>${reasonsHTML}</ul>
            </div>
            ${riskHTML}
            <button class="btn-secondary btn-full" onclick="navigateToDetail('${rec.jobId}')">
                查看路径地图
                <svg class="btn-icon-right" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        `;
        
        container.appendChild(card);
    });
    
    trackEvent('view_result', { jobCount: recommendations.topJobs.length });
}

/**
 * 重新生成推荐
 */
function regenerateRecommendation() {
    if (!AppState.userProfile) {
        alert('请先完成画像填写');
        navigateToProfile();
        return;
    }
    
    // TODO: 实现冷却时间检查
    generateRecommendation(AppState.userProfile);
}

/**
 * 渲染岗位详情
 * @param {string} jobId - 岗位ID
 */
function renderJobDetail(jobId) {
    const job = window.JOBS_DATA.find(j => j.jobId === jobId);
    if (!job) {
        alert('岗位信息不存在');
        return;
    }
    
    const container = document.getElementById('detail-content');
    const navTitle = document.getElementById('detail-nav-title');
    
    // 更新导航标题
    if (navTitle) {
        navTitle.textContent = job.jobName;
    }
    
    // 分类标签映射
    const categoryLabels = {
        'eng': { name: '技术', icon: '💻', color: '#6366F1' },
        'pm': { name: '产品', icon: '📱', color: '#818CF8' },
        'ops': { name: '运营', icon: '📊', color: '#10B981' },
        'data': { name: '数据', icon: '📈', color: '#F59E0B' },
        'design': { name: '设计', icon: '🎨', color: '#EC4899' },
        'marketing': { name: '市场', icon: '📢', color: '#8B5CF6' },
        'sales': { name: '销售', icon: '🤝', color: '#14B8A6' }
    };
    
    const category = categoryLabels[job.category] || { name: job.category, icon: '💼', color: '#64748B' };
    
    // 渲染详情内容
    container.innerHTML = `
        <!-- 岗位头部卡片 -->
        <div class="detail-hero-card">
            <div class="detail-hero-bg"></div>
            <div class="detail-hero-content">
                <div class="job-category-badge" style="background: ${category.color}20; color: ${category.color};">
                    <span class="category-icon">${category.icon}</span>
                    <span>${category.name}</span>
                </div>
                <h1 class="detail-job-title">${job.jobName}</h1>
                <p class="detail-job-subtitle">${job.oneLiner}</p>
            </div>
        </div>
        
        <!-- 核心技能卡片 -->
        <div class="detail-card">
            <h3 class="card-title">
                <svg class="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.663 17H12L13 13.5L15.996 8L17 12.5H20M2 8.5H11M4 19.5H17M14 5.5L17 3M10 5.5L7 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                核心技能
            </h3>
            <div class="skills-grid-modern">
                ${job.coreSkills.map((skill, index) => `
                    <div class="skill-card-modern">
                        <div class="skill-icon-box">${['🔧', '⚡', '🎯', '🚀', '💡', '⭐'][index % 6]}</div>
                        <div class="skill-info">
                            <div class="skill-name">${skill}</div>
                            <div class="skill-level-bar">
                                <div class="skill-level-fill" style="width: ${85 - index * 5}%"></div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- 职业发展路径 -->
        ${job.milestones ? `
        <div class="detail-card">
            <h3 class="card-title">
                <svg class="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                职业发展路径
            </h3>
            <div class="timeline-container">
                ${job.milestones.map((milestone, index) => `
                    <div class="timeline-item">
                        <div class="timeline-marker">
                            <div class="timeline-dot">${index + 1}</div>
                            ${index < job.milestones.length - 1 ? '<div class="timeline-line"></div>' : ''}
                        </div>
                        <div class="timeline-content">
                            <div class="timeline-header">
                                <h4 class="timeline-title">${milestone.name}</h4>
                                <span class="timeline-duration">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    ${milestone.duration}
                                </span>
                            </div>
                            <p class="timeline-desc">${milestone.outputs}</p>
                            ${milestone.skills && milestone.skills.length > 0 ? `
                            <div class="timeline-skills">
                                ${milestone.skills.map(skill => `
                                    <span class="timeline-skill-tag">${skill}</span>
                                `).join('')}
                            </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        <!-- 薪资区间 -->
        ${job.salaryBands ? `
        <div class="detail-card">
            <h3 class="card-title">
                <svg class="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                薪资参考
            </h3>
            <div class="salary-cards-grid">
                <div class="salary-card">
                    <div class="salary-card-icon">🌱</div>
                    <div class="salary-card-content">
                        <div class="salary-card-label">入门级</div>
                        <div class="salary-card-value">${job.salaryBands.entry}</div>
                        <div class="salary-card-desc">0-1年经验</div>
                    </div>
                </div>
                <div class="salary-card">
                    <div class="salary-card-icon">🌿</div>
                    <div class="salary-card-content">
                        <div class="salary-card-label">初中级</div>
                        <div class="salary-card-value">${job.salaryBands.junior}</div>
                        <div class="salary-card-desc">1-3年经验</div>
                    </div>
                </div>
                <div class="salary-card">
                    <div class="salary-card-icon">🌳</div>
                    <div class="salary-card-content">
                        <div class="salary-card-label">中高级</div>
                        <div class="salary-card-value">${job.salaryBands.mid}</div>
                        <div class="salary-card-desc">3-5年经验</div>
                    </div>
                </div>
            </div>
            <div class="salary-disclaimer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>薪资仅供参考，实际薪资因公司、地区、个人能力而异</span>
            </div>
        </div>
        ` : ''}
        
        <!-- 学历建议 -->
        ${job.educationNotes && AppState.userProfile ? `
        <div class="detail-card education-card">
            <h3 class="card-title">
                <svg class="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 14L21 9L12 4L3 9L12 14ZM12 14L18.16 10.94C18.71 12.16 19 13.54 19 15C19 15.79 18.9 16.56 18.72 17.29M12 14V21.5M6 11.5V16C6 17.66 8.69 19 12 19C13.04 19 14 18.91 14.82 18.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                学历建议
            </h3>
            <div class="education-notice-modern">
                <div class="education-icon">🎓</div>
                <p>${job.educationNotes[AppState.userProfile.educationTier] || '该岗位对学历要求相对灵活'}</p>
            </div>
        </div>
        ` : ''}
        
        <!-- 公司机会分析 -->
        ${AppState.userProfile && window.COMPANIES_DATA ? `
        <div class="detail-card company-opportunity-card">
            <h3 class="card-title">
                <svg class="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21H21M3 7V21M7 7V21M11 7V21M15 7V21M19 7V21M12 3L20 7H4L12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                公司机会分析
            </h3>
            ${(() => {
                const opportunity = getCompanyOpportunity(AppState.userProfile.educationTier);
                const opportunityLevelMap = {
                    'high': { label: '机会较高', color: '#10B981', icon: '✓', bgColor: '#10B98110' },
                    'medium': { label: '有一定机会', color: '#F59E0B', icon: '○', bgColor: '#F59E0B10' },
                    'low': { label: '机会较低', color: '#64748B', icon: '△', bgColor: '#64748B10' }
                };
                
                const bigLevel = opportunityLevelMap[opportunity.bigCompany];
                const mediumLevel = opportunityLevelMap[opportunity.mediumCompany];
                const smallLevel = opportunityLevelMap[opportunity.smallCompany];
                
                return `
                    <div class="opportunity-summary">
                        <div class="opportunity-desc">${opportunity.description}</div>
                    </div>
                    
                    <div class="opportunity-levels-grid">
                        <div class="opportunity-level-card">
                            <div class="opportunity-level-header">
                                <span class="opportunity-level-title">大厂</span>
                                <span class="opportunity-badge" style="background: ${bigLevel.bgColor}; color: ${bigLevel.color};">
                                    ${bigLevel.icon} ${bigLevel.label}
                                </span>
                            </div>
                            <div class="opportunity-level-hint">BAT、字节、美团、京东等</div>
                        </div>
                        
                        <div class="opportunity-level-card">
                            <div class="opportunity-level-header">
                                <span class="opportunity-level-title">中厂</span>
                                <span class="opportunity-badge" style="background: ${mediumLevel.bgColor}; color: ${mediumLevel.color};">
                                    ${mediumLevel.icon} ${mediumLevel.label}
                                </span>
                            </div>
                            <div class="opportunity-level-hint">小红书、B站、快手、携程等</div>
                        </div>
                        
                        <div class="opportunity-level-card">
                            <div class="opportunity-level-header">
                                <span class="opportunity-level-title">小厂</span>
                                <span class="opportunity-badge" style="background: ${smallLevel.bgColor}; color: ${smallLevel.color};">
                                    ${smallLevel.icon} ${smallLevel.label}
                                </span>
                            </div>
                            <div class="opportunity-level-hint">其他互联网公司</div>
                        </div>
                    </div>
                    
                    <div class="companies-list-section">
                        <h4 class="companies-section-title">北上广深互联网公司参考</h4>
                        <div class="cities-grid">
                            ${Object.entries(window.COMPANIES_DATA).map(([cityKey, cityData]) => {
                                const cityNames = {
                                    'beijing': '北京',
                                    'shanghai': '上海',
                                    'guangzhou': '广州',
                                    'shenzhen': '深圳'
                                };
                                return `
                                    <div class="city-companies-card">
                                        <div class="city-name">${cityNames[cityKey]}</div>
                                        <div class="company-tier-section">
                                            <div class="company-tier-label">大厂</div>
                                            <div class="company-tags">
                                                ${cityData.big.slice(0, 6).map(company => 
                                                    `<span class="company-tag company-tag-big">${company}</span>`
                                                ).join('')}
                                                ${cityData.big.length > 6 ? `<span class="company-tag-more">+${cityData.big.length - 6}</span>` : ''}
                                            </div>
                                        </div>
                                        <div class="company-tier-section">
                                            <div class="company-tier-label">中厂</div>
                                            <div class="company-tags">
                                                ${cityData.medium.slice(0, 6).map(company => 
                                                    `<span class="company-tag company-tag-medium">${company}</span>`
                                                ).join('')}
                                                ${cityData.medium.length > 6 ? `<span class="company-tag-more">+${cityData.medium.length - 6}</span>` : ''}
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            })()}
        </div>
        ` : ''}
        
        <!-- 分级薪资参考 -->
        ${job.salaryBands ? `
        <div class="detail-card tiered-salary-card">
            <h3 class="card-title">
                <svg class="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 7H21M13 12H21M13 17H21M6 20V16.5L8.5 14L6 11.5V8L9 11L12 8V11.5L9.5 14L12 16.5V20L9 17L6 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                分级薪资参考
            </h3>
            ${(() => {
                const tieredSalary = calculateTieredSalary(job.salaryBands);
                return `
                    <div class="tiered-salary-grid">
                        <!-- 大厂薪资 -->
                        <div class="salary-tier-card salary-tier-big">
                            <div class="salary-tier-header">
                                <svg class="salary-tier-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 21H21M3 7V21M7 7V21M11 7V21M15 7V21M19 7V21M12 3L20 7H4L12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span class="salary-tier-title">大厂薪资</span>
                                <span class="salary-tier-badge">+30%</span>
                            </div>
                            <div class="salary-tier-levels">
                                <div class="salary-tier-row">
                                    <span class="salary-tier-label">入门级</span>
                                    <span class="salary-tier-value">${tieredSalary.big.entry}</span>
                                </div>
                                <div class="salary-tier-row">
                                    <span class="salary-tier-label">初中级</span>
                                    <span class="salary-tier-value">${tieredSalary.big.junior}</span>
                                </div>
                                <div class="salary-tier-row">
                                    <span class="salary-tier-label">中高级</span>
                                    <span class="salary-tier-value">${tieredSalary.big.mid}</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 中厂薪资 -->
                        <div class="salary-tier-card salary-tier-medium">
                            <div class="salary-tier-header">
                                <svg class="salary-tier-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 21H21M5 21V7L13 3V21M13 7L19 10V21M9 9V9.01M9 12V12.01M9 15V15.01M9 18V18.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span class="salary-tier-title">中厂薪资</span>
                                <span class="salary-tier-badge salary-tier-badge-base">基准</span>
                            </div>
                            <div class="salary-tier-levels">
                                <div class="salary-tier-row">
                                    <span class="salary-tier-label">入门级</span>
                                    <span class="salary-tier-value">${tieredSalary.medium.entry}</span>
                                </div>
                                <div class="salary-tier-row">
                                    <span class="salary-tier-label">初中级</span>
                                    <span class="salary-tier-value">${tieredSalary.medium.junior}</span>
                                </div>
                                <div class="salary-tier-row">
                                    <span class="salary-tier-label">中高级</span>
                                    <span class="salary-tier-value">${tieredSalary.medium.mid}</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 小厂薪资 -->
                        <div class="salary-tier-card salary-tier-small">
                            <div class="salary-tier-header">
                                <svg class="salary-tier-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 21H21M4 7H20M6 21V7M10 21V7M14 21V7M18 21V7M8 4L12 2L16 4M9 12H11M13 12H15M9 16H11M13 16H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span class="salary-tier-title">小厂薪资</span>
                                <span class="salary-tier-badge salary-tier-badge-low">-20%</span>
                            </div>
                            <div class="salary-tier-levels">
                                <div class="salary-tier-row">
                                    <span class="salary-tier-label">入门级</span>
                                    <span class="salary-tier-value">${tieredSalary.small.entry}</span>
                                </div>
                                <div class="salary-tier-row">
                                    <span class="salary-tier-label">初中级</span>
                                    <span class="salary-tier-value">${tieredSalary.small.junior}</span>
                                </div>
                                <div class="salary-tier-row">
                                    <span class="salary-tier-label">中高级</span>
                                    <span class="salary-tier-value">${tieredSalary.small.mid}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="salary-disclaimer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>薪资因公司规模、地区、个人能力而异，仅供参考</span>
                    </div>
                `;
            })()}
        </div>
        ` : ''}
        
        <!-- 底部CTA -->
        <div class="detail-cta-card">
            <div class="cta-content">
                <h3>准备好开始这条职业路径了吗？</h3>
                <p>根据上述路径规划，制定你的学习计划并付诸行动</p>
            </div>
            <button class="btn-primary" onclick="navigateToResult()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 19L4 12L11 5M4 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                返回其他推荐
            </button>
        </div>
    `;
}

// ==================== UI辅助函数 ====================

/**
 * 显示加载状态
 * @param {string} message - 加载提示文字
 */
function showLoading(message = '加载中...') {
    const overlay = document.getElementById('loading-overlay');
    const text = overlay.querySelector('.loading-text');
    if (text) text.textContent = message;
    overlay.style.display = 'flex';
}

/**
 * 隐藏加载状态
 */
function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    overlay.style.display = 'none';
}

/**
 * 根据学历判断进入不同等级公司的机会
 * @param {string} educationTier - 学历层级 (985/211/doubleFirstClass/other)
 * @returns {Object} 公司机会对象 {bigCompany, mediumCompany, smallCompany}
 */
function getCompanyOpportunity(educationTier) {
    // 学历机会判断规则
    const opportunityRules = {
        '985': {
            bigCompany: 'high',
            mediumCompany: 'high',
            smallCompany: 'high',
            description: '985高校背景在互联网行业具有很强的竞争力，大厂、中厂、小厂都有较高的录用机会'
        },
        '211': {
            bigCompany: 'medium',
            mediumCompany: 'high',
            smallCompany: 'high',
            description: '211高校背景有较好的竞争力，中厂和小厂机会较高，大厂需要优秀的项目和技能加持'
        },
        'doubleFirstClass': {
            bigCompany: 'low',
            mediumCompany: 'medium',
            smallCompany: 'high',
            description: '双一流高校背景在中小厂有不错的机会，进入大厂需要特别优秀的作品集和实习经历'
        },
        'other': {
            bigCompany: 'low',
            mediumCompany: 'low',
            smallCompany: 'medium',
            description: '建议从中小厂起步，通过项目经验和能力积累逐步向大厂发展'
        }
    };
    
    return opportunityRules[educationTier] || opportunityRules['other'];
}

/**
 * 计算分级薪资（大厂/中厂/小厂）
 * @param {Object} baseSalaryBands - 基准薪资对象 {entry, junior, mid}
 * @returns {Object} 分级薪资对象 {big, medium, small}
 */
function calculateTieredSalary(baseSalaryBands) {
    /**
     * 解析薪资字符串，提取数字范围并计算
     * @param {string} salaryStr - 薪资字符串，如 "8-15K" 或 "15-25K"
     * @param {number} multiplier - 乘数系数
     * @returns {string} 计算后的薪资字符串
     */
    function adjustSalary(salaryStr, multiplier) {
        if (!salaryStr) return '-';
        
        // 提取数字，支持格式: "8-15K", "15-25K", "30-50K"
        const match = salaryStr.match(/(\d+)-(\d+)K?/);
        if (!match) return salaryStr;
        
        const [_, min, max] = match;
        const adjustedMin = Math.round(parseInt(min) * multiplier);
        const adjustedMax = Math.round(parseInt(max) * multiplier);
        
        return `${adjustedMin}-${adjustedMax}K`;
    }
    
    // 计算三个等级的薪资
    return {
        big: {
            entry: adjustSalary(baseSalaryBands.entry, 1.3),
            junior: adjustSalary(baseSalaryBands.junior, 1.3),
            mid: adjustSalary(baseSalaryBands.mid, 1.3)
        },
        medium: {
            entry: baseSalaryBands.entry,
            junior: baseSalaryBands.junior,
            mid: baseSalaryBands.mid
        },
        small: {
            entry: adjustSalary(baseSalaryBands.entry, 0.8),
            junior: adjustSalary(baseSalaryBands.junior, 0.8),
            mid: adjustSalary(baseSalaryBands.mid, 0.8)
        }
    };
}

/**
 * 埋点统计
 * @param {string} eventName - 事件名称
 * @param {Object} data - 事件数据
 */
function trackEvent(eventName, data = {}) {
    // 实际项目中这里会调用埋点SDK
    console.log('[埋点]', eventName, data);
    
    // 可以使用Google Analytics、百度统计等
    // 例如: gtag('event', eventName, data);
}

// ==================== 应用初始化 ====================

/**
 * 初始化应用
 */
function initApp() {
    // 初始化表单监听
    initFormListeners();
    
    // 初始化岗位库功能
    initJobLibrary();
    
    // 显示首页
    showPage('home');
    
    // 埋点:进入产品
    trackEvent('pv_entry');
    
    console.log('职径导航应用已启动');
    console.log('岗位数据:', window.JOBS_DATA ? window.JOBS_DATA.length : 0, '个');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initApp);
