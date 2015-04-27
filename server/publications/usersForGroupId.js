Meteor.publish('usersForGroupId', function(groupId) {
  var group = Groups.findOne(groupId);

  if (group && group.membersId && group.membersId.length > 0) {
    return Meteor.users.find({
      _id: {
        $in: group.memberIds
      }
    });
  }
});
