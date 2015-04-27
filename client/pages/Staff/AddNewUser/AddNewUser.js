Template.AddNewUser.helpers({
  addHotelStaffSchema: function() {
    return Schema.HotelStaff;
  },
  hotelId: function() {
    return Meteor.user().hotelId || Session.get('hotelId');
  }
});

AutoForm.hooks({
  addHotelStaffForm: {
    onSuccess: function(operation, result) {
      Messages.success('User Added Successfully!');
      Router.go('Staff.View');
    },
    onError: function(operation, error) {
      console.log(error);
      if (error.message && error.message === 'form failed validation') {
        // autoform takes care of these
      } else {
        Messages.error(error.message);
      }
    }
  }
});
