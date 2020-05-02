const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: isDev ? '':'dist/',
  filenameHashing: false,
  productionSourceMap: false,
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
    config.plugins = config.plugins.concat(
      new WebpackAssetsManifest({
        entrypoints: true,
        writeToDisk: true,
        output: isDev ? 'manifest.json' : path.resolve(__dirname, '../public/assets/manifests/manifest.json')
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
        // options.fallback.options.name =  '../dist/[name].[hash:8].[ext]';
        return options;
      });
  },
};
