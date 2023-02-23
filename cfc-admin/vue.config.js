const path = require('path')
// const webpack = require('webpack');

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  publicPath: '/',
  transpileDependencies: ['resize-detector', 'ant-design-vue'],

  // configureWebpack: {
  //   plugins: [
  //     // Ignore all locale files of moment.js
  //     new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  //   ]
  // },

  chainWebpack: config => {
    config.resolve.alias
      .set('public', resolve('public'))
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
  },

  devServer: {
    proxy: {
      '/': { // 匹配所有以'/' 开头的请求路径
        target: 'http://114.67.199.59', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { '^/': '' }
      }
    }
  }
}
