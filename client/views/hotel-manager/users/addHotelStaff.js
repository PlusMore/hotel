Template.addHotelStaff.helpers({
  addHotelStaffSchema: function() {
    return Schema.addHotelStaff;
  },
  hotelId: function() {
    return this._id;
  }
});

AutoForm.hooks({
  addHotelStaffForm: {
    onSuccess: function(operation, result, template) {
      Router.go('manageHotelUsers');
    },
    onError: function(operation, error, template) {
      Errors.throw(error);
    }
  }
});