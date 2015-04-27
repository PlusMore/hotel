Template.Account.onCreated(function() {
  this.subscribe('groups', Session.get('hotelId'));
});

Template.Account.events({
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
  },
  'click #edit-account': function(e) {
    e.preventDefault();
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.EditAccountModal
    });
  }
});
