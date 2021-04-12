
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: "production",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js"
  },
  plugins: [new HtmlWebpackPlugin({
    template: './index.html'
  })],
  module: {
    rules: [
      { 
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }
          }
        ] 
      },
      {
        test: /\.(html)$/,
        exclude: [/node_modules/, require.resolve('./index.html')],
        loader: 'html-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  }
}