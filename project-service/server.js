require('rootpath')();
const express = require('express');
const uuid = require('uuid/v4')
const session = require('express-session');
const FileStore  = require('session-file-store')(session);

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
module.exports = app;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//store session
app.use(session({
    genid: (req) => {
      return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);
// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
