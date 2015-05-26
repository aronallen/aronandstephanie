var $$express = require('express');
var $$morgan = require('morgan');
var port = require('./port');
var request = require('request');
var path = require('path');
//include gulp runner
require('./gulp-runner');


var publicDir = path.resolve(__dirname + '/../public');
var app = $$express();
var httpProxy = require('http-proxy');



app.use($$morgan('combined'));


app.use($$express.static(publicDir));
app.use('/*', function (req, res) {
  res.sendFile(publicDir + '/index.html');
});
app.listen(port);
