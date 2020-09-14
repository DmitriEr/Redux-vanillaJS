const past = require('path');
const HTMLWebpackPLugin = require('html-webpack-plugin');
const { pathToFileURL } = require('url');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: '.index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPLugin({
      template: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  devServer: {
    port: 3000
  }
}