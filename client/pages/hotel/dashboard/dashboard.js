Template.Dashboard.helpers({
  hotelName: function() {
    return Session.get('hotelName') || "All hotels";
  },
  notAdmin: function() {
    return !Roles.userIsInRole(Meteor.user(), 'admin');
  },
});
