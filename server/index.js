var $$express = require('express');
var $$morgan = require('morgan');
var port = require('./port');


app.use($$morgan('combined'));
//api proxy

app.use($$express.static(publicDir));
app.use('/*', function (req, res) {
  res.sendFile(publicDir + '/index.html');
});
app.listen(port);
