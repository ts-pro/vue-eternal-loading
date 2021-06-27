// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

const config = {
  configureWebpack: (config) => {
    config.plugins.some((plugin, index) => {
      // Get rid of useless `demo.html`
      // from here `./node_modules/@vue/cli-service/lib/commands/build/resolveLibConfig.js`
      // Issue: https://github.com/vuejs/vue-cli/issues/3291
      return (plugin.options || {}).filename === 'demo.html'
        ? config.plugins.splice(index, 1)
        : false;
    });

    return {
      output: {
        library: '',
      },
    };
  },

  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const pkg = require('./package.json');
      const banner = `
        ${pkg.name} v${pkg.version}
        (c) ${new Date().getFullYear()} ${pkg.author}
        ${pkg.license} License
      `;
      config.plugin('webpack-banner').use(webpack.BannerPlugin, [banner]);
    }
  },
};

if (process.env.NODE_ENV === 'development') {
  config.devServer = {
    open: true,
    port: 8822,
    host: 'localhost',
    https: true,
    disableHostCheck: true,
  };
}

module.exports = config;
