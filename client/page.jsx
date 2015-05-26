var React = require('react');
var moment = require('moment');
var _ = require('lodash');
var LanguageMenu = require('./language-menu.jsx');
var Event = require('./event.jsx');

var Page = React.createClass({

  render : function () {

    var content = this.props.content;
    var setter = this.props.data.setter;
    return (
      <div className="page" onClick={this.setLocale}>
        <div className="page__photo">

          <div className="page__photo__inner">
        <LanguageMenu {...this.props} />
        <div className="page__heading">
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
      </div>
          </div>
        </div>

        <div className="page__events">
        {content.events.map(function (o, i, a) {
          return <Event data={o} />;
        })}
        </div>
      </div>
    );
  }
});

module.exports = Page;
