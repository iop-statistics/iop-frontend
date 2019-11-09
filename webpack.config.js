const path = require('path')
// const webpack = require('webpack') //enable hot 2step

const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// --mode=development;

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
  mode: 'development',
  /******************************/
  // mode: 'production',
  devtool: 'cheap-module-source-map',
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },

  //not recommendeed
  // devServer: {
  //   // --open --port 3000 --contentBase sr --hot
  //   open: true,
  //   port: 3000,
  //   contentBase: 'src',
  //   hot: true, // enable hot 1step
  // },
  plugins: [
    // new webpack.HotModuleReplacementPlugin() //enable hot 3 step
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html', //file in the RAM
      inject: true,
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
    }),
    new BundleAnalyzerPlugin(),
    /******************************/
    // new MiniCssExtractPlugin({
    //   filename: "[name].[contenthash].css",
    //   chunkFilename: "[name].[contenthash].css"
    // }),
    new OptimizeCSSAssetsPlugin()
  ],
  module: {
    rules: [
      // the loader will be loaded in the order from right to left(from the last of array to the first), when reaching the first loader, the result will be transfered to the webpack to perform the packaging.
      { test: /\.css$/, use: ['vue-style-loader', 'style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['vue-style-loader', 'style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader'] },

      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use:
        {
          loader: 'url-loader',
          options: {
            limit: 10000,  //the image will not be converted into BASE64 string  if its capcity is smaller than the limit property
            // name: utils.assetsPath('img/[name].[hash:7].[ext]'),
            name: '[hash:7]-[name].[ext]' //avoid same name overwriting
          }
        }

      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: 'url-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      }
    ]
  },
  resolve: {
    alias: {
      // 'vue$': 'vue/dist/vue.js' // set the preference when importing the package
    }
  },
  /******************************/
  // externals: {
  //   'vue': 'Vue',
  //   'vuex': 'Vuex',
  //   'vue2-datepicker': 'DatePicker',
  //   'vue-router': 'VueRouter',
  //   'jquery': 'jQuery',
  //   'vue-i18n': 'VueI18n',
  //   'bootstrap': 'jQuery'
  // }
};