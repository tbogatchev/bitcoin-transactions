// webpack.config.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: "./app-client.js",
  output: {
    path: path.resolve(__dirname, './static'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   mangle: true,
    //   sourcemap: false,
    //   beautify: false,
    //   dead_code: true
    // }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  devtool: "cheap-source-map"
};