Template.TeamDetailsModal.helpers({
  team: function() {
    return Teams.findOne(Session.get('viewTeamId'));
  }
});

Template.TeamDetailsModal.created = function() {

  var instance = this;

  instance.autorun(function() {
    var userSub = Meteor.subscribe('usersForTeamId', Session.get('viewTeamId'));
    var teamSub = Meteor.subscribe('teamDetails', Session.get('viewTeamId'));
  });
};
