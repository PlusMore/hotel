Meteor.methods({
  removeUserFromGroup: function(userId, groupId) {
    check(userId, String);
    check(groupId, String);

    Groups.update(groupId, {
      $pull: {
        memberIds: userId
      }
    });

    return {
      userName: Meteor.users.findOne(userId).fullName(),
      groupName: Groups.findOne(groupId).name
    };
  }
});
