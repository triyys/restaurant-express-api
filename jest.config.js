module.exports = {
    moduleNameMapper: {
        "@/(.*)$": "<rootDir>/app/$1",
        "@root/(.*)$": "<rootDir>/$1",
    },
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/tests/matchers/initMatchers.js'],
};
