Template.AddNewUser.helpers({
  addHotelStaffSchema: function() {
    return Schema.addHotelStaff;
  },
  hotelId: function() {
    return Meteor.user().hotelId || Session.get('hotelId');
  }
});

AutoForm.hooks({
  addHotelStaffForm: {
    onSuccess: function(operation, result, template) {
      Router.go('Staff.View');
    },
    onError: function(operation, error, template) {
      console.log(error);
      if (error.message && error.message === 'form failed validation') {
        // autoform takes care of these
      } else {
        Errors.throw(error);
      }
    }
  }
});
