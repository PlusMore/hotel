Meteor.methods({
  removeGroup: function(groupId) {
    check(groupId, String);

    Groups.remove(groupId);
  }
});
