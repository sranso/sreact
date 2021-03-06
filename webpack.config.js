module.exports = {
  entry: './src/index.js',
  output: {
    path: './build',
    filename: 'index.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules|other-examples/,
      loader: 'babel-loader'
    }]
  }
};
