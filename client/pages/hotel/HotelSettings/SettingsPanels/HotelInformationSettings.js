Template.HotelInformationSettings.helpers({
  editHotelSchema: function() {
    return Schema.HotelInfo;
  }
});

AutoForm.hooks({
  updateHotelInfo: {
    onSuccess: function(operation, result) {
      Messages.success('Changes Saved!');
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
