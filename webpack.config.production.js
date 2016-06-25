/* eslint no-console: 0 */
const webpack = require('webpack');
const fs = require('fs-extra');
const path = require('path');
const isProduction = (process.env.NODE_ENV === 'production');

if (isProduction) {
  fs.copySync(
    path.join(__dirname, 'config/server-prod.js'),
    path.join(__dirname, 'config/server.js')
  );
  console.log('Copied server-prod.js to config/server.js');

  // This is quick hack. For now, GenericCheckbox does not work on production.
  // When it is work correctry, remove this.
  fs.copySync(
    path.join(__dirname, 'app/components/ui/GenericCheckbox.prod.jsx'),
    path.join(__dirname, 'app/components/ui/GenericCheckbox.jsx')
  );
  console.log('Copied GenericCheckbox.prod.jsx to GenericCheckbox.jsx');
}

module.exports = {
  entry: [
    './app/index.jsx',
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader',
      },
      {
        include: /\.json$/,
        loaders: ['json-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
  ],
};
