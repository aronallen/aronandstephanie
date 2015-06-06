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
        <div className="page__bike">

          <div className="page__bike__inner">
            <img className="page__bike__spurs page__bike__spurs--left" src="/images/spurs.svg" />
            <img className="page__bike__spurs page__bike__spurs--right" src="/images/spurs.svg" />
            <img className="page__bike__couple" src="/images/bike.svg" />
          </div>
        </div>
        <h3>Save the Dates!</h3>

        <h1>Aron & Stéphanie</h1>
        <h2>ARE</h2>
        <h1>Getting Married</h1>

        <div className="page__events">
        {content.events.map(function (o, i, a) {
          return <Event data={o} />;
        })}
        </div>
        <img src="/images/monogram.svg" className="page__monogram" />
      </div>
    );
  }
});

module.exports = Page;
