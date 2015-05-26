var Bacon = require('baconjs');
var $ = require('zepto');
var _ = require('lodash');
var data = {};

data.locales = ['da', 'en', 'fr'];

data.property = Bacon.fromBinder(function (sink) {
  data.setter = function (locale) {
    if (_.contains(data.locales, locale)) {
      sink(locale);
    } else {

    }
  };
  return function () {
    data.setter = function () {};
  };
})
.toProperty('en')
.log('locale')
.map(function (locale) {
  return '/locales/' + locale + '.json';
}).flatMap(function (url) {
  return Bacon.fromPromise($.ajax({url : url}).promise());
});

module.exports = data;
