module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/en',
        'http://localhost:3000/en/partners',
        'http://localhost:3000/en/compatibility',
        'http://localhost:3000/en/dashboard',
        'http://localhost:3000/my',
        'http://localhost:3000/my/partners'
      ],
      startServerCommand: 'npm run start',
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};