module.exports = {
  entry: './diff.js',
  output: {
    path: './',
    filename: 'test.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};

// TODO
// require all names
// module.exports those names
