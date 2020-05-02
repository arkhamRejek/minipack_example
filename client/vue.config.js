const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  outputDir: path.resolve(__dirname, '../public/client'),
  devServer: {
    writeToDisk: true,
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
    config.output.filename =  '[name].[hash:8]_v2.js';
    config.output.chunkFilename = '[name].[hash:8]_v2.js';

    config.plugins = config.plugins.concat(
      new WebpackAssetsManifest({
        entrypoints: true,
        writeToDisk: true,
      }),
    );
  },
  chainWebpack: (config) => {
    // we don't need the html
    config.plugins.delete('html');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    // this path is specific to my project
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));

    config.module
      .rule('images')
      .use('url-loader')
      .tap(options => {
        console.log(options)
        options.fallback.options.name =  '../client/[name].[hash:8].[ext]';
        return options;
      });
  },
};
