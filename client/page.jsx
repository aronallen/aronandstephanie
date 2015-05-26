var React = require('react');
var moment = require('moment');
var _ = require('lodash');
var LanguageMenu = require('./language-menu.jsx');
var Event = React.createClass({
  render : function () {
    var data = this.props.data;
    return (
      <div className="event">
        <h3>{data.title}</h3>
        <p>{data.description}</p>
        <h4>{data.city} | {data.datetime}</h4>
      </div>
    );
  }
});

var Page = React.createClass({

  render : function () {

    var content = this.props.content;
    var setter = this.props.data.setter;
    return (
      <div className="page" onClick={this.setLocale}>
        <LanguageMenu {...this.props} />
        {content.heading.map(function (s, i, a) {
          if (a.length > 2) {
            if ((i % 2) === 0) {
              return <h1>{s}</h1>;
            } else {
              return <h2>{s}</h2>;
            }
          } else {
            return <h1>{s}</h1>;
          }
        })}
        {content.events.map(function (o, i, a) {
          return <Event data={o} />;
        })}
      </div>
    );
  }
});

module.exports = Page;
