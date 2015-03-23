Template.Account.helpers({
  user: function() {
    return Meteor.user();
  }
});

Template.Account.created = function() {

  var instance = this;

  instance.autorun(function() {
    var teamSub = Meteor.subscribe('teams', Session.get('hotelId'));
  });
};
