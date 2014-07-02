Template.hotelStaff.helpers({
  hotelStaff: function () {
    return Meteor.users.find({hotelId: Meteor.user().hotelId});
  }
});

Template.hotelStaffItem.helpers({
  emailAddress: function() {
    return this.emails[0].address;
  }
});