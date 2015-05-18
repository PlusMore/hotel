Template.AddNewUser.helpers({
  addHotelStaffSchema: function() {
    return Schema.HotelStaff;
  },
  hotelId: function() {
    return Meteor.user().hotelId || Session.get('hotelId');
  }
});

Template.AddNewUser.onRendered(function() {
  this.$('.progress-button').progressInitialize();
});

AutoForm.hooks({
  addHotelStaffForm: {
    before: {
      method: function(doc) {
        this.template.$('.progress-button').progressStart();
      }
    },
    onSuccess: function(operation, result) {
      Messages.success('User Added Successfully!');
      this.template.$('.progress-button').progressFinish();
      Router.go('Staff.View');
    },
    onError: function(operation, error) {
      console.log(error);
      if (error.message && error.message === 'form failed validation') {
        // autoform takes care of these
      } else {
        Messages.error(error.message);
      }
      this.template.$('.progress-button').progressError();
    }
  }
});
