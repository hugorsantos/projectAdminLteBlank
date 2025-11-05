
module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/cypress/'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/app/**/*.ts',
        '!src/app/**/*.spec.ts',
        '!src/app/**/*.module.ts',
        '!src/main.ts',
        '!src/app/mocks/**'
    ],
    moduleNameMapper: {
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@core/(.*)$': '<rootDir>/src/app/core/$1',
        '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
        '^@features/(.*)$': '<rootDir>/src/app/features/$1'
    },
    transform: {
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
                stringifyContentPathRegex: '\.html$'
            }
        ]
    },
};
