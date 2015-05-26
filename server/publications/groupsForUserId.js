Meteor.publish('groupsForUserId', function(userId) {
  return Groups.find({
    memberIds: userId
  });
});
