Template.AccountSettings.helpers({
  user: function() {
    return Meteor.users.findOne(Meteor.userId());
  }
});

Template.AccountSettings.events({
  'click .btn-change-avatar': function(e, experienceTemplate) {
    e.preventDefault();
    var userId = this._id;
    filepicker.pick(function(InkBlob) {
      Meteor.call('changeAccountAvatar', InkBlob, userId, function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success('Avatar updated!');
        }
      });
    });
  }
});
