const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const extractPlugin = new ExtractTextPlugin({ filename: './assets/scss/app.scss' });


module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: './app.js',
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, 'public')
  },
  devServer:{
    contentBase: path.resolve(__dirname, "./public/assets/media"),
    stats: 'errors-only',
    open: true,
    port: 5000,
    compress: true,
  },
  devtool: 'inline-source-map',
  module: {
    noParse: /jquery|lodash/,
    rules:[
      {
        //setup babel compile for es6 & jsx
        test: /\.js$/,
        include: "/src/",
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader",
          options: {
            presets: ['env']
          }
        }
      },
      {
        //setup for creating a new index file on each build
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        //setup for auto compiling and injecting styles in index.html
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
        use: extractPlugin.extract({
          use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ],
            fallback: 'style-loader'
        })
      },
      //file-loader(for images)
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/media/'
            }
          }
        ]
      },
      //file-loader(for fonts)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['plugin']),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    extractPlugin,
  ]
}
