const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');
require('dotenv').config()

module.exports = merge(commonConfig,{
  devServer:{
      contentBase: path.resolve(__dirname, "./public/assets/media"),
      stats: 'errors-only', //log only errors on console
      open: true, //open browser on running server
      port: process.env.PORT || 3000, //server on port
      compress: true, //enable gzip compression
    },
    devtool: 'inline-source-map',
});
