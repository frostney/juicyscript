module.exports = {
  presets: [
    [
      "@babel/env",
      {
        loose: true
      }
    ],
    "@babel/typescript"
  ],
  plugins: [
    [
      "@babel/proposal-pipeline-operator",
      {
        proposal: "minimal"
      }
    ]
  ]
};
