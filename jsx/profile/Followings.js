
var React = require('react/addons');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var MiniProfile = require("../common/MiniProfile.js");
var SetIntervalMixin = require("../common/SetIntervalMixin.js");
var StreamMixin = require("../common/StreamMixin.js");
var SafeStateChangeMixin = require('../common/SafeStateChangeMixin.js');
var EventListenerMixin = require('../common/EventListenerMixin.js');


var ReactBootstrap = require('react-bootstrap')
  , NavItem = ReactBootstrap.NavItem
  , Nav = ReactBootstrap.Nav
  , ListGroup = ReactBootstrap.ListGroup
  , ListGroupItem = ReactBootstrap.ListGroupItem
  , Panel = ReactBootstrap.Panel
  , Glyphicon = ReactBootstrap.Glyphicon
  , Button = ReactBootstrap.Button

module.exports = Home = React.createClass({
    
  mixins: [SetIntervalMixin,SafeStateChangeMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      username: (this.context.router.getCurrentParams().username ? this.context.router.getCurrentParams().username : this.props.activeAccount),
      followings: []
    };
  },
  updateFollowings: function(outdatedLimit) {

    thisComponent=this;
    
    if (!outdatedLimit) {outdatedLimit=this.props.pollInterval/2;}

    Twister.getUser(this.state.username).doFollowings(function(followings){
      
      thisComponent.setStateSafe(function(state){
      
        var newfollowings = [];
        
        for(var i in followings){
            newfollowings.push(followings[i].getUsername());
        }
        
        state.followings = newfollowings;
        
        return state;
        
      });

    },{outdatedLimit: outdatedLimit});

    
  },
  componentDidMount: function() {

    this.updateFollowings(this.props.pollInterval*2);

    this.setInterval(this.updateFollowings, this.props.pollInterval*1000);
      
  },
  render: function() {
    
    var thisComponent = this;
    
    var profiles = this.state.followings.map(function(username, index) {
      return (
        <MiniProfile username={username} key={"miniprofile:"+username} pollIntervalProfile={thisComponent.props.pollIntervalProfile}/>
      );
    });
    return (
      <ListGroup fill>
        <ReactCSSTransitionGroup transitionName="item">
          {profiles}
        </ReactCSSTransitionGroup>
      </ListGroup>
    );
  }
}); 