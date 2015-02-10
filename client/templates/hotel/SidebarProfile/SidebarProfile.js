Template.SidebarProfile.helpers({
	accountName: function() {
		var user = Meteor.user();
    if (user.kiosk) {
      return user.kiosk.name;
    }
    return "{0} {1}".format(user.profile.firstName, user.profile.lastName);
	},
	accountAvatar: function() {
    var user = Meteor.user();
    return user.profile.avatar || "/img/profile.jpg";
  }
});

Template.SidebarProfile.events({
	'click #logout': function () {
    Meteor.logout();
  }
});