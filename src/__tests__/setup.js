require('@testing-library/jest-dom');

// Mock window global objects
Object.defineProperty(window, 'JOBS_DATA', {
  writable: true,
  value: []
});

Object.defineProperty(window, 'COMPANIES_DATA', {
  writable: true,
  value: {}
});

// Mock console methods for cleaner test output
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
global.sessionStorage = sessionStorageMock;

// Mock fetch
global.fetch = jest.fn();

// Setup global test utilities
global.testUtils = {
  createMockElement: (tagName = 'div', attributes = {}) => {
    const element = document.createElement(tagName);
    Object.keys(attributes).forEach(key => {
      element.setAttribute(key, attributes[key]);
    });
    return element;
  },

  createMockEvent: (type, properties = {}) => {
    return {
      type,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      ...properties
    };
  }
};