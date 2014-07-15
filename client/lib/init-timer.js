Meteor.startup(function() {
  Session.set('currentTime', new Date());
  Meteor.setInterval(function() {
    Session.set('currentTime', new Date());
  }, 60 * 1000);
});