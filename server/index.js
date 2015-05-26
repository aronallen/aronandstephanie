'use strict';
//require modules modules start with $$
var $$express = require('express');
var $$morgan = require('morgan');
//require constants
var port = require('./port');
var request = require('request');
var path = require('path');
//include gulp runner
require('./gulp-runner');


var publicDir = path.resolve(__dirname + '/../public');
var app = $$express();
var httpProxy = require('http-proxy');



app.use($$morgan('combined'));
//api proxy
app.use('/api', function (req, res) {
  var url;
  if (req.headers['x-development']) {
    url = 'http://dev.yousee.tv/rest' + req.url;
    delete req.headers['x-development'];
  } else {
    url = 'http://api.yousee.tv/rest' + req.url;
  }
	req.on('error', function (e) {
    res.status(500).send(e);
  }).pipe(request(url)).on('error', function (e) {
    res.status(500).send(e);
  }).pipe(res);
});

app.use('/xmpp-http', function (req, res) {
  var url;
  if (req.headers['x-development']) {
    url = 'http://t-xmpp.yousee.tv:5280/' + req.url;
    delete req.headers['x-development'];
  } else {
    url = 'http://p-xmpp.yousee.tv:5280/' + req.url;
  }
  req.on('error', function (e) {
    res.status(500).send(e);
  }).pipe(request(url)).on('error', function (e) {
    res.status(500).send('api proxi error'  + e);
  }).pipe(res);
});



app.use($$express.static(publicDir));
app.use('/*', function (req, res) {
  res.sendFile(publicDir + '/index.html');
});
app.listen(port);
