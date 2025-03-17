module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^react-router-dom$': '<rootDir>/node_modules/react-router-dom/dist/index.js'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/'
  ]
};