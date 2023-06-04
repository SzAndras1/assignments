var express = require('express');
var app = express();
var usersRouter = require('./routes/users');
var resumesRouter = require('./routes/resumes');


app.use('/api/v1/user', usersRouter);
app.use('/api/v1/resume', resumesRouter);


module.exports = app;
