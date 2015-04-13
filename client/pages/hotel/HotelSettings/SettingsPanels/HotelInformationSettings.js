Template.HotelInformationSettings.helpers({
  editHotelSchema: function() {
    return Schema.hotelInfo;
  }
});

Schema.hotelInfo = new SimpleSchema({
  hotelId: {
    type: String,
    optional: false
  },
  name: {
    type: String,
    label: "Hotel Name",
    max: 50,
    optional: false
  },
  phone: {
    type: String,
    label: "Phone Number",
    max: 20,
    optional: false
  },
  description: {
    type: String,
    label: "About Us",
    max: 2000,
    optional: true
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
