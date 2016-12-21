require('dotenv').config({ silent: true });

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
const envPath = path.join(__dirname, 'environments', env);
const rootPath = path.join(process.cwd());

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Serving assets from public folder
app.use(express.static(path.join(rootPath, 'public')));

// Load environment config
require(envPath)(app);

module.exports = app;
