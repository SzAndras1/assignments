var express = require('express');
var app = express();
var usersRouter = require('./routes/users');

app.use('/api/v1/user', usersRouter);

module.exports = app;
