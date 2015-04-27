Meteor.methods({
  removeUserFromTeam: function(userId, teamId) {
    check(userId, String);
    check(teamId, String);

    Teams.update(teamId, {$pull: {memberIds: userId}});

    return {
      userName: Meteor.users.findOne(userId).fullName(),
      teamName: Teams.findOne(teamId).name
    };
  }
});
