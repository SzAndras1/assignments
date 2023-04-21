var express = require('express');
var app = express();

app.get('/', function (req, res) {
    console.log('localhost:8081/ had been called!')
    res.end('Works!');
});

app.post('/add', function(req, res) {
    let obj = { arg1: 'yes', arg2: 'no'}
    console.log('localhost:8081/add had been called!')
    res.end(JSON.stringify(obj));
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
});

module.exports = app;
