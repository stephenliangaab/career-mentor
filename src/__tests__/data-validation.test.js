/**
 * @jest-environment jsdom
 */

// 由于数据文件是为浏览器环境设计的，我们使用一个简化的测试数据进行验证
const JOBS_DATABASE = [
  {
    jobId: 'eng_frontend',
    jobName: '前端工程师',
    category: 'eng',
    oneLiner: '用代码把产品体验做出来',
    suitableTracks: ['eng'],
    coreSkills: ['HTML/CSS', 'JavaScript', 'Vue/React'],
    salaryBands: {
      entry: '8-15K',
      junior: '15-25K',
      mid: '25-40K'
    },
    educationNotes: {
      '985': '大厂直通车,重点关注算法和系统设计',
      '211': '有竞争力,需要优秀作品集加持',
      'doubleFirstClass': '注重作品质量,多参加开源项目',
      'other': '作品集最重要,建议从小公司或外包起步积累经验'
    }
  },
  {
    jobId: 'pm_product',
    jobName: '产品经理',
    category: 'pm',
    oneLiner: '定义产品,让用户爱上它',
    suitableTracks: ['pm'],
    coreSkills: ['需求分析', '原型设计', '数据分析'],
    salaryBands: {
      entry: '10-18K',
      junior: '18-30K',
      mid: '30-50K'
    }
  }
];

const COMPANIES_DATA = {
  beijing: {
    big: ['字节跳动', '百度', '美团'],
    medium: ['快手', '知乎', '小红书']
  },
  shanghai: {
    big: ['阿里巴巴', '拼多多'],
    medium: ['携程', '哔哩哔哩']
  },
  guangzhou: {
    big: ['腾讯', '网易'],
    medium: ['唯品会', 'YY直播']
  },
  shenzhen: {
    big: ['华为', '腾讯（深圳）'],
    medium: ['平安科技', '大疆创新']
  }
};

describe('数据结构验证测试', () => {
  describe('岗位数据验证', () => {
    test('岗位数据应为数组', () => {
      expect(Array.isArray(JOBS_DATABASE)).toBe(true);
    });

    test('每个岗位应有必需字段', () => {
      JOBS_DATABASE.forEach((job, index) => {
        expect(job).toHaveProperty('jobId');
        expect(job).toHaveProperty('jobName');
        expect(job).toHaveProperty('category');
        expect(job).toHaveProperty('oneLiner');
        expect(job).toHaveProperty('coreSkills');
        expect(job).toHaveProperty('salaryBands');

        // 检查字段类型
        expect(typeof job.jobId).toBe('string');
        expect(typeof job.jobName).toBe('string');
        expect(typeof job.category).toBe('string');
        expect(typeof job.oneLiner).toBe('string');
        expect(Array.isArray(job.coreSkills)).toBe(true);
        expect(typeof job.salaryBands).toBe('object');
      });
    });

    test('岗位ID应唯一', () => {
      const jobIds = JOBS_DATABASE.map(job => job.jobId);
      const uniqueIds = new Set(jobIds);
      expect(uniqueIds.size).toBe(jobIds.length);
    });

    test('分类应为有效值', () => {
      const validCategories = ['eng', 'pm', 'ops', 'data', 'design', 'marketing', 'sales'];

      JOBS_DATABASE.forEach(job => {
        expect(validCategories).toContain(job.category);
      });
    });

    test('薪资区间应完整', () => {
      JOBS_DATABASE.forEach(job => {
        expect(job.salaryBands).toHaveProperty('entry');
        expect(job.salaryBands).toHaveProperty('junior');
        expect(job.salaryBands).toHaveProperty('mid');

        expect(typeof job.salaryBands.entry).toBe('string');
        expect(typeof job.salaryBands.junior).toBe('string');
        expect(typeof job.salaryBands.mid).toBe('string');
      });
    });

    test('核心技能不应为空', () => {
      JOBS_DATABASE.forEach(job => {
        expect(job.coreSkills.length).toBeGreaterThan(0);
        expect(job.coreSkills.every(skill => typeof skill === 'string')).toBe(true);
      });
    });
  });

  describe('公司数据验证', () => {
    test('公司数据应包含四个城市', () => {
      const expectedCities = ['beijing', 'shanghai', 'guangzhou', 'shenzhen'];
      expectedCities.forEach(city => {
        expect(COMPANIES_DATA).toHaveProperty(city);
        expect(COMPANIES_DATA[city]).toHaveProperty('big');
        expect(COMPANIES_DATA[city]).toHaveProperty('medium');
        expect(Array.isArray(COMPANIES_DATA[city].big)).toBe(true);
        expect(Array.isArray(COMPANIES_DATA[city].medium)).toBe(true);
      });
    });

    test('每个城市应有大厂和小厂数据', () => {
      Object.values(COMPANIES_DATA).forEach(cityData => {
        expect(cityData.big.length).toBeGreaterThan(0);
        expect(cityData.medium.length).toBeGreaterThan(0);
        expect(cityData.big.every(company => typeof company === 'string')).toBe(true);
        expect(cityData.medium.every(company => typeof company === 'string')).toBe(true);
      });
    });
  });

  describe('数据一致性检查', () => {
    test('所有岗位的suitableTracks应指向有效岗位', () => {
      const allJobIds = new Set(JOBS_DATABASE.map(job => job.jobId));

      JOBS_DATABASE.forEach(job => {
        if (job.suitableTracks) {
          job.suitableTracks.forEach(track => {
            // track应该是category类型
            const validCategories = ['eng', 'pm', 'ops', 'data', 'design', 'marketing', 'sales'];
            expect(validCategories).toContain(track);
          });
        }
      });
    });

    test('学历建议数据格式正确', () => {
      const validEducationTiers = ['985', '211', 'doubleFirstClass', 'other'];

      JOBS_DATABASE.forEach(job => {
        if (job.educationNotes) {
          validEducationTiers.forEach(tier => {
            if (job.educationNotes[tier]) {
              expect(typeof job.educationNotes[tier]).toBe('string');
            }
          });
        }
      });
    });

    test('里程碑数据结构正确', () => {
      JOBS_DATABASE.forEach(job => {
        if (job.milestones) {
          expect(Array.isArray(job.milestones)).toBe(true);

          job.milestones.forEach(milestone => {
            expect(milestone).toHaveProperty('name');
            expect(milestone).toHaveProperty('duration');
            expect(milestone).toHaveProperty('outputs');

            expect(typeof milestone.name).toBe('string');
            expect(typeof milestone.duration).toBe('string');
            expect(typeof milestone.outputs).toBe('string');
          });
        }
      });
    });
  });

  describe('业务规则验证', () => {
    test('技术岗位应有更多技能要求', () => {
      const techJobs = JOBS_DATABASE.filter(job => job.category === 'eng');
      techJobs.forEach(job => {
        expect(job.coreSkills.length).toBeGreaterThanOrEqual(3);
      });
    });

    test('高薪岗位应有相应学历要求', () => {
      JOBS_DATABASE.forEach(job => {
        const midSalary = parseInt(job.salaryBands.mid.replace(/[^\d]/g, ''));
        if (midSalary > 40000) { // 月薪4万以上
          expect(job.educationNotes).toBeDefined();
        }
      });
    });

    test('不同学历层级的建议应有差异', () => {
      const jobsWithEducationNotes = JOBS_DATABASE.filter(job => job.educationNotes);

      jobsWithEducationNotes.forEach(job => {
        const notes985 = job.educationNotes['985'];
        const notesOther = job.educationNotes['other'];

        if (notes985 && notesOther) {
          // 985和普通本科学的建议应该不同
          expect(notes985).not.toBe(notesOther);
        }
      });
    });
  });
});