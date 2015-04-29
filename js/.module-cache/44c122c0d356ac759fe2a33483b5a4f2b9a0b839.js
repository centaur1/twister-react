
var ReactBootstrap = require('react-bootstrap')
  , NavItem = ReactBootstrap.NavItem
  , Nav = ReactBootstrap.Nav
  , ListGroup = ReactBootstrap.ListGroup
  , ListGroupItem = ReactBootstrap.ListGroupItem
  , Panel = ReactBootstrap.Panel
  , Glyphicon = ReactBootstrap.Glyphicon
  , Button = ReactBootstrap.Button

var React = require('react');

var Post = require("./Post.js");

module.exports = Postboard = React.createClass({displayName: "Postboard",
  render: function() {
    var posts = this.props.data.map(function(post, index) {
      return (
        React.createElement(Post, {post: post, key: post.postid})
      );
    });
    return (
      React.createElement(ListGroup, {fill: true}, 
        React.createElement(ListGroupItem, {bsStyle: "active"}, 
          this.props.header, 
          React.createElement("a", {className: "pull-right fullytight", bsStyle: "link", onclick: ""}, React.createElement(Glyphicon, {glyph: "pencil"}))
        ), 
        posts
      )
    );
  }
}); 