/* eslint no-console: 0 */

const path = require('path');
const logger = require('morgan');
const PrettyError = require('pretty-error');

// Webpack middleware
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const config = require('../webpack.config.js');

const rootPath = process.cwd();
const indexPath = path.join(process.cwd(), 'dist/index.html');

const pdf = require('html-pdf');

module.exports = (app) => {
  config.resolve = Object.assign(config.resolve, {
    alias: Object.assign(config.resolve.alias, {
      'aqueduct-components': path.resolve(rootPath, '..', 'aqueduct-components', 'dist')
    })
  });

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);

  app.post('/download-pdf', (req, res) => {
    pdf.create(req.body.html, {}).toFile('./report.pdf', (err, generatedPDF) => {
      if (err) return res.json({ error: err });
      console.log(generatedPDF); // { filename: '/app/businesscard.pdf' }
      return res.json({ success: true });
    });
  });


  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(indexPath));
    res.end();
  });

  // Logs
  app.use(logger('dev'));

  // Error handling
  const pe = new PrettyError();
  pe.skipNodeFiles();
  pe.skipPackage('express');

  app.use((err, req, res, next) => {
    console.log(pe.render(err));
    next();
  });
};
