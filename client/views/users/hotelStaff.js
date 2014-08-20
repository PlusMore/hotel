Template.hotelStaff.helpers({
  hotelStaff: function () {
    return Meteor.users.find({hotelId: Session.get('hotelId'), roles:'hotel-staff'});
  }
});

Template.hotelStaffItem.helpers({
  emailAddress: function() {
    return this.emails[0].address;
  },
  role: function() {
    if (Roles.userIsInRole(this, ['hotel-staff'])) {
      if (Roles.userIsInRole(this, ['hotel-manager'])) {
        return 'Manager';
      } else {
        return 'Staff';
      }
    } else {
      return 'Invalid';
    }
  }
});