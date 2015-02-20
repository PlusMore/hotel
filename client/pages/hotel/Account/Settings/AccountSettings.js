Template.AccountSettings.helpers({
	user: function() {
		return Meteor.users.findOne(Meteor.userId());
	}
});

Template.AccountSettings.events({
  'click .btn-change-avatar': function(e, experienceTemplate) {
    e.preventDefault();

    filepicker.pick(function(InkBlob) {
      Meteor.call('changeAccountAvatar', InkBlob);
    });
  }
});