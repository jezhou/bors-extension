const path = require('path');

module.exports = {
  entry: {
    content: './src/content.js',
    options: './src/options_entry.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'extension_dist/dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
