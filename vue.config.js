const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const isCore = process.env.TYPE === "core";
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    if (!isCore) {
      config.plugin("monaco").use(new MonacoWebpackPlugin());
    }
  },
});
