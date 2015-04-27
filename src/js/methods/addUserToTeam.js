Meteor.methods({
  addUserToTeam: function(doc) {
    check(doc.teamId, String);
    check(doc.userId, String);

    Teams.update({_id: doc.teamId}, {$push: {memberIds: doc.userId}});

    return Meteor.users.findOne(doc.userId).fullName();
  }
});
