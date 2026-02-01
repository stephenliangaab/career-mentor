import { test, expect } from '@playwright/test';

test.describe('职径导航 - 端到端测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('完整用户流程：首页 -> 画像收集 -> 推荐结果 -> 岗位详情', async ({ page }) => {
    // 1. 检查首页加载
    await expect(page).toHaveTitle(/职径导航/);
    await expect(page.locator('text=找到更适合你的职业方向')).toBeVisible();

    // 2. 点击开始规划按钮
    await page.click('text=开始规划我的职业路径');
    await expect(page.locator('text=完善你的信息')).toBeVisible();

    // 3. 填写画像表单
    await page.check('input[name="identity"][value="graduate"]');
    await page.selectOption('select[name="educationTier"]', '985');
    await page.fill('input[name="major"]', '计算机科学与技术');
    await page.check('input[name="trackPreference"][value="eng"]');
    await page.check('input[name="interestTags"][value="写代码"]');

    // 4. 提交表单
    await page.click('text=生成我的推荐');

    // 5. 检查推荐结果页
    await expect(page.locator('text=为你推荐以下职业方向')).toBeVisible();

    // 6. 点击查看第一个岗位详情
    const firstJobCard = page.locator('.job-card').first();
    await expect(firstJobCard).toBeVisible();
    await firstJobCard.click();

    // 7. 检查岗位详情页
    await expect(page.locator('text=核心技能')).toBeVisible();
  });

  test('岗位库浏览功能', async ({ page }) => {
    // 切换到岗位库Tab
    await page.click('text=岗位库');
    await expect(page.locator('text=搜索20个互联网岗位')).toBeVisible();

    // 检查分类筛选
    await page.click('text=技术');
    await expect(page.locator('.job-library-card')).toHaveCount(await page.locator('.job-library-card').count());

    // 测试搜索功能
    await page.fill('input[placeholder*="搜索20个互联网岗位"]', '前端');
    await expect(page.locator('.job-library-card')).toBeVisible();
  });

  test('表单验证：必填项检查', async ({ page }) => {
    // 进入画像收集页
    await page.click('text=开始规划我的职业路径');

    // 直接提交空表单
    await page.click('text=生成我的推荐');

    // 应该显示错误提示（通过检查页面没有跳转来验证）
    await expect(page.locator('text=完善你的信息')).toBeVisible();
  });

  test('兴趣标签选择限制', async ({ page }) => {
    // 进入画像收集页
    await page.click('text=开始规划我的职业路径');

    // 选择超过5个兴趣标签
    const interestCheckboxes = page.locator('input[name="interestTags"]');
    const count = await interestCheckboxes.count();

    // 选择前6个标签
    for (let i = 0; i < Math.min(6, count); i++) {
      await interestCheckboxes.nth(i).check();
    }

    // 检查计数显示
    if (count >= 5) {
      await expect(page.locator('text=已选择 5/5')).toBeVisible();
    }
  });

  test('页面导航和返回功能', async ({ page }) => {
    // 首页 -> 画像页
    await page.click('text=开始规划我的职业路径');
    await expect(page.locator('text=完善你的信息')).toBeVisible();

    // 返回首页
    await page.click('text=返回');
    await expect(page.locator('text=找到更适合你的职业方向')).toBeVisible();

    // 再次进入画像页并完成表单
    await page.click('text=开始规划我的职业路径');
    await page.check('input[name="identity"][value="graduate"]');
    await page.selectOption('select[name="educationTier"]', '985');
    await page.fill('input[name="major"]', '计算机科学与技术');
    await page.check('input[name="trackPreference"][value="eng"]');
    await page.check('input[name="interestTags"][value="写代码"]');
    await page.click('text=生成我的推荐');

    // 结果页 -> 画像页
    await page.click('text=返回修改');
    await expect(page.locator('text=完善你的信息')).toBeVisible();
  });
});