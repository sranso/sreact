module.exports = {
  entry: './test/index.js',
  output: {
    path: './',
    filename: './test/test.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};
