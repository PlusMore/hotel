Template.SidebarProfile.helpers({
  user: function() {
    return Meteor.users.findOne(Meteor.userId());
  }
});

Template.SidebarProfile.events({
  'click #logout': function(e) {
    e.preventDefault();
    Meteor.logout();
  }
});
