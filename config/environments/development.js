/* eslint no-console: 0 */

const path = require('path');
const logger = require('morgan');
const PrettyError = require('pretty-error');

// Webpack middleware
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const pdf = require('html-pdf');
const config = require('../webpack/webpack.config.dev');

const indexPath = path.join(process.cwd(), 'dist/index.html');

module.exports = (app) => {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler);

  app.use(middleware);

  app.post('/download-pdf', (req, res) => {
    pdf.create(req.body.html, {}).toFile('./report.pdf', (err, generatedPDF) => {
      if (err) return res.json({ error: err });
      console.log(generatedPDF); // { filename: '/app/businesscard.pdf' }
      return res.json({ success: true });
    });
  });

  app.get('/*', (req, res) => res.sendFile(path.join(process.cwd(), 'dist', 'index.html')));

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
