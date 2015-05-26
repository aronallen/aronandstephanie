
var React = require('react');
var _ = require('lodash');
var LanguageMenu = React.createClass({
  render : function () {
    var content = this.props.content;
    var setter = this.props.data.setter;
    return (

      <ul className="language-menu">
        {_.map(content.locales, function (value, key) {
          console.log(content.locale, key);
            return (
              <li className={"language-menu__locale " + ((content.locale === key) ? "language-menu__locale--active" : "")} onClick={function () {
                setter(key);}}>
                {value}
              </li>);
      })}
      </ul>
    );
  }
});

module.exports = LanguageMenu;
