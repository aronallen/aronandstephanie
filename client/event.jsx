var React = require('react');
var Event = React.createClass({
  render : function () {
    var data = this.props.data;
    return (
      <div className="event">
      <div className="event__heading">
        <h3>{data.title}</h3>
      </div>
        <p>{data.description}</p>
        <h4>{data.city} | {data.datetime}</h4>
      </div>
    );
  }
});
module.exports = Event;
