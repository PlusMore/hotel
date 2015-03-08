Template.HotelInformationSettings.helpers({
	editHotelSchema: function () {
		return Schema.hotelInfo;
	}
});

AutoForm.hooks({
  updateHotelInfo: {
    onSuccess: function(operation, result, template) {
      Messages.success('Changes Saved!');
    },
    onError: function(operation, error, template) {
      console.log(error);
      if (error.message && error.message === 'form failed validation') {
        // autoform takes care of these
      } else {
        Messages.error(error.message);
      }
    }
  }
});