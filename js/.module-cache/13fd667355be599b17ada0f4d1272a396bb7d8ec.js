
var ReactBootstrap = require('react-bootstrap')
  , OverlayMixin = ReactBootstrap.OverlayMixin
  , Button = ReactBootstrap.Button
  , ButtonGroup = ReactBootstrap.ButtonGroup
  , Glyphicon = ReactBootstrap.Glyphicon

var React = require('react');


module.exports = NewPostModalButton = React.createClass({displayName: "NewPostModalButton",
  mixins: [OverlayMixin,SetIntervalMixin,SafeStateChangeMixin],
  getInitialState() {
    return {
      isModalOpen: false
    };
  },
  handleToggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },
  handleNewPost: function (e) {
    e.preventDefault();
    console.log(e)
    var msg = e.target[0].value;
    if (!msg) {
      return;
    }
    
    alert(msg);
    
    React.findDOMNode(this.refs.msg).value = '';
    return;
  },
  render: function() {
    return (
        React.createElement(Button, {onClick: this.handleToggle, className: "pull-right fullytight_all", bsStyle: "link"}, 
          React.createElement(Glyphicon, {glyph: "pencil"})
        )
    );
  }, 
  renderOverlay: function() {
  
    if (!this.state.isModalOpen) {
      return React.createElement("span", null);
    }
    
    return (
      React.createElement(Modal, {bsStyle: "primary", title: React.createElement(Glyphicon, {glyph: "pencil"})}, 
        React.createElement("div", {className: "modal-body"}, 
          React.createElement("form", {onSubmit: this.handleNewPost}, 
            React.createElement(Input, {type: "textarea", label: "Text Area", placeholder: "textarea", ref: "msg"}), 
            React.createElement(Input, {type: "submit", value: "Submit button", "data-dismiss": "modal"})
          )
        )
      )
    );
  
  }
});