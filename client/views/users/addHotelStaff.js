Template.addHotelStaff.helpers({
  addHotelStaffSchema: function() {
    return Schema.addHotelStaff;
  }
});

AutoForm.hooks({
  addHotelStaffForm: {
    onSuccess: function(operation, result, template) {
      Router.go('manageHotelUsers');      
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