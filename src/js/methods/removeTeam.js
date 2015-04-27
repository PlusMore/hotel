Meteor.methods({
  removeTeam: function(teamId) {
    check(teamId, String);

    Teams.remove(teamId);
  }
});
