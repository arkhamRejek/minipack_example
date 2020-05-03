const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
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

    //change the name of image outputs for manifest
    config.module
      .rule('images')
      .use('url-loader')
      .tap(options => {
        options.fallback.options.name =  'images/[name].[ext]';
        return options;
      });

    config.plugin('copy').tap(([options]) => {
      // copy images to the rails public directory
      // you need this because the images aren't recognized during the transition
      // so i'm adding them to the public folder
      options.push({
        from: path.resolve(__dirname, 'src/assets'),
        to: path.resolve(__dirname, '../public/images'),
        toType: 'dir',
      })
      return [options]
    })
  },
};
