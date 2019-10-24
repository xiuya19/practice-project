const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'shopping.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader', //能够将图片转成base64代码直接写在js里面,依赖file-loader，所以在安装的时候不仅要装url-loader还要装file-loader
            options: {
              limit: 1024, //如果文件大小小于1024字节，就会转义成base64,否则仍然是图片
              name: '[name]-aaa.[ext]' //输出文件的名字,name就是原先图片的名字,-aaa是自己家的字段
            }
          }
        ]
      }
    ]
  },
  mode: 'development',
  plugins: [
    new ExtractTextPlugin('shopping.css'),
    new webpack.DefinePlugin({
      'processs.env': {
        NODE_ENV: isDev ? '"development"' : '"production'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin({
      template: './src/template/index.html',
      filename: 'shopping.html'
    })
  ]
}

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8080,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config
