Template.hotelStaff.helpers({
  hotelStaff: function () {
    return Meteor.users.find({hotelId: Meteor.user().hotelId});
  }
});

Template.hotelStaffItem.helpers({
  emailAddress: function() {
    return this.emails[0].address;
  },
  role: function() {
    if (Roles.userIsInRole(Meteor.userId(), ['hotel-staff'])) {
      if (Roles.userIsInRole(Meteor.userId(), ['hotel-manager'])) {
        return 'Manager'
      } else {
        return 'Staff'
      }
    } else {
      return 'Invalid'
    }
  }
});