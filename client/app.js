var $ = require('zepto');
var Page = require('./page.jsx');
var React = require('react');
var data = require('./data.js');
var Bacon = require('baconjs');


function log () {
  console.log(arguments);
}
function error () {
  console.error(arguments);
}


data.property.onValue(function (response) {
  document.title = response.title;
  document.body.lang = response.locale;
  React.render(React.createElement(Page, {content : response, data : data}), document.body);
});
