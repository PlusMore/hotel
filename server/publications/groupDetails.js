Meteor.publish('groupDetails', function(groupId) {
  return Groups.find({
    _id: groupId
  });
});
