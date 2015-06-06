var React = require('react');
var Event = React.createClass({
  render : function () {
    var data = this.props.data;
    return (
      <div className="event">
        <h5>{data.title}</h5>
        <h6>{data.city}</h6>
        
      </div>
    );
  }
});
module.exports = Event;
