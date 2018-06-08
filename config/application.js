require('dotenv').config({ silent: true });

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth');

const env = process.env.NODE_ENV || 'development';
const envPath = path.join(__dirname, 'environments', env);
const rootPath = path.join(process.cwd());

function checkBasicAuth(users) {
  return function authMiddleware(req, res, nextAction) {
    if (!/(AddSearchBot)|(HeadlessChrome)/.test(req.headers['user-agent'])) {
      const user = basicAuth(req);
      let authorized = false;
      if (user && ((user.name === users[0].name && user.pass === users[0].pass))) {
        authorized = true;
      }

      if (!authorized) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
      }
    }
    return nextAction();
  };
}

const app = express();

// Using basic auth in prod mode
const { USERNAME, PASSWORD } = process.env;
if (env === 'production' && ((USERNAME && PASSWORD))) {
  app.use(checkBasicAuth([{
    name: USERNAME,
    pass: PASSWORD
  }]));
}
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Serving assets from public folder
app.use(express.static(path.join(rootPath, 'public')));


// Load environment config
require(envPath)(app);

module.exports = app;
