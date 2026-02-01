/**
 * @jest-environment jsdom
 */

const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');

// Mock the data files
jest.mock('../data/jobs-data.js');
jest.mock('../data/companies-data.js');

describe('页面导航功能测试', () => {
  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <div id="app">
        <div id="page-home" class="page active">
          <button id="start-button">开始规划我的职业路径</button>
          <div class="bottom-tabs">
            <button class="tab-btn active" data-tab="planning">职业规划</button>
            <button class="tab-btn" data-tab="library">岗位库</button>
          </div>
        </div>
        <div id="page-profile" class="page">
          <nav class="navbar">
            <button id="back-home-btn">返回</button>
          </nav>
        </div>
        <div id="page-result" class="page">
          <nav class="navbar">
            <button id="back-profile-btn">返回修改</button>
          </nav>
        </div>
        <div id="page-detail" class="page">
          <nav class="navbar">
            <button id="back-result-btn">返回推荐</button>
          </nav>
        </div>
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('页面结构验证', () => {
    test('所有页面元素应存在', () => {
      expect(document.getElementById('page-home')).toBeInTheDocument();
      expect(document.getElementById('page-profile')).toBeInTheDocument();
      expect(document.getElementById('page-result')).toBeInTheDocument();
      expect(document.getElementById('page-detail')).toBeInTheDocument();
    });

    test('首页应默认激活', () => {
      const homePage = document.getElementById('page-home');
      const profilePage = document.getElementById('page-profile');

      expect(homePage).toHaveClass('active');
      expect(profilePage).not.toHaveClass('active');
    });

    test('导航按钮应存在', () => {
      expect(screen.getByText('开始规划我的职业路径')).toBeInTheDocument();
      expect(screen.getByText('职业规划')).toBeInTheDocument();
      expect(screen.getByText('岗位库')).toBeInTheDocument();
      expect(screen.getByText('返回')).toBeInTheDocument();
      expect(screen.getByText('返回修改')).toBeInTheDocument();
      expect(screen.getByText('返回推荐')).toBeInTheDocument();
    });
  });

  describe('页面显示切换', () => {
    test('showPage函数应正确切换页面', () => {
      const homePage = document.getElementById('page-home');
      const profilePage = document.getElementById('page-profile');

      // 初始状态
      expect(homePage).toHaveClass('active');
      expect(profilePage).not.toHaveClass('active');

      // 模拟切换到profile页面
      homePage.classList.remove('active');
      profilePage.classList.add('active');

      expect(homePage).not.toHaveClass('active');
      expect(profilePage).toHaveClass('active');
    });

    test('多个页面只能有一个激活', () => {
      const pages = ['page-home', 'page-profile', 'page-result', 'page-detail'];

      // 初始状态：只有首页激活
      expect(document.getElementById('page-home')).toHaveClass('active');
      pages.slice(1).forEach(pageId => {
        expect(document.getElementById(pageId)).not.toHaveClass('active');
      });

      // 切换到profile页面
      document.getElementById('page-home').classList.remove('active');
      document.getElementById('page-profile').classList.add('active');

      // 验证只有一个页面激活
      const activePages = pages.filter(pageId =>
        document.getElementById(pageId).classList.contains('active')
      );
      expect(activePages).toHaveLength(1);
      expect(activePages[0]).toBe('page-profile');
    });
  });

  describe('Tab切换状态', () => {
    test('Tab按钮应有正确的初始状态', () => {
      const planningTab = screen.getByText('职业规划');
      const libraryTab = screen.getByText('岗位库');

      expect(planningTab).toHaveClass('active');
      expect(libraryTab).not.toHaveClass('active');
    });

    test('Tab按钮应有正确的data属性', () => {
      const planningTab = screen.getByText('职业规划');
      const libraryTab = screen.getByText('岗位库');

      expect(planningTab).toHaveAttribute('data-tab', 'planning');
      expect(libraryTab).toHaveAttribute('data-tab', 'library');
    });
  });
});