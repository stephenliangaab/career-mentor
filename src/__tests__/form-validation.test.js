/**
 * @jest-environment jsdom
 */

const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');

// Mock alert
global.alert = jest.fn();

describe('表单验证功能测试', () => {
  beforeEach(() => {
    // Setup DOM with profile form
    document.body.innerHTML = `
      <form id="profile-form">
        <!-- 身份选择 -->
        <div class="radio-group">
          <label class="radio-card">
            <input type="radio" name="identity" value="graduate" required>
            <div class="radio-content">应届毕业生</div>
          </label>
          <label class="radio-card">
            <input type="radio" name="identity" value="junior" required>
            <div class="radio-content">在职1-3年</div>
          </label>
        </div>

        <!-- 学历层级 -->
        <select class="form-select" name="educationTier" required>
          <option value="">请选择你的学历层级</option>
          <option value="985">985高校</option>
          <option value="211">211高校</option>
        </select>
        <input type="hidden" id="educationTierValue" value="">

        <!-- 专业 -->
        <input type="text" class="form-input" name="major" placeholder="请输入你的专业" required>

        <!-- 方向偏好 -->
        <div class="radio-grid">
          <label class="radio-tag">
            <input type="radio" name="trackPreference" value="eng" required>
            <span>技术开发</span>
          </label>
          <label class="radio-tag">
            <input type="radio" name="trackPreference" value="pm" required>
            <span>产品</span>
          </label>
        </div>

        <!-- 兴趣标签 -->
        <div class="checkbox-grid">
          <label class="checkbox-tag">
            <input type="checkbox" name="interestTags" value="写代码">
            <span>写代码</span>
          </label>
          <label class="checkbox-tag">
            <input type="checkbox" name="interestTags" value="做产品规划">
            <span>做产品规划</span>
          </label>
          <label class="checkbox-tag">
            <input type="checkbox" name="interestTags" value="与人沟通">
            <span>与人沟通</span>
          </label>
        </div>
        <p id="interest-count">已选择 0/5</p>

        <!-- 提交按钮 -->
        <button type="submit">生成我的推荐</button>
      </form>
    `;

    // Initialize form listeners (simulate app.js behavior)
    initTestFormListeners();
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  describe('必填项验证', () => {
    test('提交空表单应显示错误提示', () => {
      const form = document.getElementById('profile-form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });

      form.dispatchEvent(submitEvent);

      expect(global.alert).toHaveBeenCalledWith('请完成所有必填项');
    });

    test('填写完整表单应通过验证', () => {
      // 填写所有必填项
      const graduateRadio = screen.getByDisplayValue('graduate');
      const educationSelect = document.querySelector('select[name="educationTier"]');
      const majorInput = document.querySelector('input[name="major"]');
      const engRadio = screen.getByDisplayValue('eng');
      const interestCheckbox = screen.getByDisplayValue('写代码');

      fireEvent.click(graduateRadio);
      educationSelect.value = '985';
      fireEvent.change(educationSelect);
      majorInput.value = '计算机科学与技术';
      fireEvent.change(majorInput);
      fireEvent.click(engRadio);
      fireEvent.click(interestCheckbox);

      const form = document.getElementById('profile-form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });

      // Mock preventDefault to check if validation passes
      let validationPassed = false;
      submitEvent.preventDefault = () => { validationPassed = true; };

      form.dispatchEvent(submitEvent);

      // 如果验证通过，不会调用alert
      expect(global.alert).not.toHaveBeenCalled();
    });
  });

  describe('兴趣标签选择限制', () => {
    test('最多只能选择5个兴趣标签', () => {
      // 初始化表单监听器
      initTestFormListeners();

      const interestCount = document.getElementById('interest-count');

      // 创建更多复选框来测试限制
      for (let i = 3; i < 10; i++) {
        const label = document.createElement('label');
        label.className = 'checkbox-tag';
        label.innerHTML = `
          <input type="checkbox" name="interestTags" value="兴趣${i}">
          <span>兴趣${i}</span>
        `;
        document.querySelector('.checkbox-grid').appendChild(label);
      }

      // 重新初始化监听器，因为DOM发生了变化
      initTestFormListeners();

      const allCheckboxes = document.querySelectorAll('input[name="interestTags"]');

      // 选择前5个
      for (let i = 0; i < 5; i++) {
        fireEvent.click(allCheckboxes[i]);
      }

      expect(interestCount.textContent).toBe('已选择 5/5');

      // 第6个应该被禁用
      const sixthCheckbox = allCheckboxes[5];
      expect(sixthCheckbox.disabled).toBe(true);
      expect(sixthCheckbox.parentElement.style.opacity).toBe('0.5');
    });

    test('减少选择后其他标签重新可用', () => {
      const checkboxes = document.querySelectorAll('input[name="interestTags"]');

      // 先选择3个
      for (let i = 0; i < 3; i++) {
        fireEvent.click(checkboxes[i]);
      }

      // 所有标签都应该可用
      checkboxes.forEach(checkbox => {
        expect(checkbox.disabled).toBe(false);
        expect(checkbox.parentElement.style.opacity).toBe('1');
      });
    });
  });

  describe('学历选择器同步', () => {
    test('选择学历后hidden input应更新值', () => {
      const educationSelect = document.querySelector('select[name="educationTier"]');
      const hiddenInput = document.getElementById('educationTierValue');

      educationSelect.value = '985';
      fireEvent.change(educationSelect);

      expect(hiddenInput.value).toBe('985');
    });
  });
});

// Helper function to initialize form listeners for testing
function initTestFormListeners() {
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

  // 表单提交验证
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);

    const userProfile = {
      identity: formData.get('identity'),
      educationTier: formData.get('educationTier') || document.getElementById('educationTierValue').value,
      major: formData.get('major'),
      currentExperience: formData.get('currentExperience') || '无',
      trackPreference: formData.get('trackPreference'),
      interestTags: formData.getAll('interestTags'),
      mbti: formData.get('mbti') || 'unknown'
    };

    // 验证必填项
    if (!userProfile.identity || !userProfile.educationTier || !userProfile.major ||
        !userProfile.trackPreference || userProfile.interestTags.length === 0) {
      global.alert('请完成所有必填项');
      return;
    }

    // 验证兴趣标签数量
    if (userProfile.interestTags.length > 5) {
      global.alert('兴趣标签最多选择5个');
      return;
    }

    // 验证通过，不显示alert
  });
}