const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },

      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
        ],
      },

      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 12000,
            },
          },
        ],
      },

    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      favicon: './src/favicon.ico',
      filename: "./index.html"
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
    })	
  ],

  devServer: {
   contentBase: path.join(__dirname, 'src'),
   open: true,
  },
}