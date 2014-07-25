Template.manageHotelUsers.helpers({
  canAddUsers: function () {
    return Roles.userIsInRole(Meteor.user(), ['hotel-manager', 'admin']);
  }
});