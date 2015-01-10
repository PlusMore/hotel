Template.customizeHotelInformation.helpers({
	hotel: function () {
	    var hotelId = Session.get('hotelId');
	    if (hotelId) {
	      	var hotel = Hotels.findOne(hotelId);
	      	if (hotel) {
	        	return hotel;
	      	}
	    } 
	},
	editHotelSchema: function () {
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
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "remove", or the method name.
    onSuccess: function(operation, result, template) {
      console.log('success');
    }, 

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error, template) {
      if (operation !== 'validation') {
        Errors.throw(error.message);
        console.log(error.message);
        console.log('error');
      }
    },

    // Called at the beginning and end of submission, respectively.
    // This is the place to disable/enable buttons or the form,
    // show/hide a "Please wait" message, etc. If these hooks are
    // not defined, then by default the submit button is disabled
    // during submission.
    beginSubmit: function(formId, template) {
      // disable button
      // change text to 'submitting'
      console.log('begin submit');
    },
    endSubmit: function(formId, template) {
      // enable button
      console.log('end submit');
    }
  }
});