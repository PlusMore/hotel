Meteor.methods({
  addUserToGroup: function(doc) {
    check(doc.groupId, String);
    check(doc.userId, String);

    Groups.update({
      _id: doc.groupId
    }, {
      $push: {
        memberIds: doc.userId
      }
    });

    return Meteor.users.findOne(doc.userId).fullName();
  }
});
