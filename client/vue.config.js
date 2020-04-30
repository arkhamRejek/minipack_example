const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  devServer: {
    host: 'localhost',
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  configureWebpack: (config) => {
    config.plugins = config.plugins.concat(
      new WebpackAssetsManifest({
        entrypoints: true,
        writeToDisk: true,
      }),
    );
  },
  chainWebpack: (config) => {
    // this path is specific to my project
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
  },
};
