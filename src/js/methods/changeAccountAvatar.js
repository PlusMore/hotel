Meteor.methods({
  changeAccountAvatar: function(InkBlob, userId) {
    check(InkBlob, Object);
    check(userId, String);

    Meteor.users.update(userId, {
      $set: {
        "profile.avatarUrl": InkBlob.url,
        "profile.avatarName": InkBlob.filename,
        "profile.avatarSize": InkBlob.size
      }
    });
  }
});
