/* eslint no-console: 0 */
const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const app = express();
const webpackConfig = require('./webpack.config.development');

const isDevelopment = (process.env.NODE_ENV !== 'production');
const staticPath = path.join(__dirname, 'dist');

if (isDevelopment) {
  fs.copySync(
    path.join(__dirname, 'config/server-dev.js'),
    path.join(__dirname, 'config/server.js')
  );
  console.log('Copied server-dev.js to config/server.js');

  const bundler = webpack(webpackConfig);

  /**
   * Run Browsersync and use middleware for Hot Module Replacement
   */
  browserSync({
    server: {
      baseDir: 'dist',
      middleware: [
        webpackDevMiddleware(bundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: webpackConfig.output.publicPath,
          stats: {
            colors: true,
            noInfo: true,
          },
          // for other settings, see http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        webpackHotMiddleware(bundler),
        historyApiFallback(),
      ],
    },

    // no need to watch `*.{js, jsx}` here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      './dist/css/*.css',
      './dist/*.html',
    ],
  });
} else {
  app.use(express.static(staticPath)).get('*', (req, res) => {
    res.sendFile('index.html', {
      root: staticPath,
    });
  }).listen(process.env.PORT || 8000, (err) => {
    if (err) { console.error(err); }

    console.log('Listening at localhost:8000');
  });
}
