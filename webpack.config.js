const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'widgetReMarked.min.js',
    library: {
      name: 'WidgetReMarked',
      type: 'umd',
      export: 'default',
    },
    clean: true
  },
  devServer: {
    open: true,
    port: 3015,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'widgetReMarked.min.css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(), 
    ],
    minimize: true,
  }
};