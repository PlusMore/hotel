Template.GuestCheckInModal.helpers({
	guestCheckInSchema: function() {
		return Schema.GuestCheckIn;
	},
	hotelId: function() {
		return Session.get('hotelId');
	},
	roomOptions: function() {
    var rooms = Rooms.find().fetch();
    var roomOptions = [];
    if (rooms) {
      _.each(rooms, function(room) {
      	var active = '';
      	if (room.roomHasActiveStay()) {
      		active = ' (has active stay)';
      	}
        roomOptions.push({
          label: room.name + active,
          value: room._id
        })
      })
      return roomOptions;
    }
  },
});

Template.GuestCheckInModal.rendered = function () {
  // Set up datepicker
  this.$('[name=checkoutDate]').pickadate({
    clear: false,
    min: moment({hour: 12, minute: 0}).add(1, 'days').toDate(),
    onSet: function(date) {
      if (date.select) {
        var selectedDate = moment(date.select).hour(12).minute(0).second(0).toDate();
        Session.set('checkoutDate', {
          date: selectedDate,
          zone: moment(selectedDate).zone()
        });
      }
    }
  });
};

AutoForm.hooks({
  guestCheckInModalForm: {
  	before: {
      checkInGuest: function(doc, template) {
        //return doc; (synchronous)
        //return false; (synchronous, cancel)
        //this.result(doc); (asynchronous)
        //this.result(false); (asynchronous, cancel)
        var checkoutDate = Session.get('checkoutDate');
        doc.checkoutDate = checkoutDate.date;
        doc.zone = checkoutDate.zone;
        console.log(doc.checkoutDate);
        console.log(doc.zone);
        return doc;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result, template) {
      BootstrapModalPrompt.dismiss();
    	Messages.success('Guest successfully checked in to ' + result);
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "submit", or the method name.
    onError: function(operation, error, template) {
    	if (operation !== "validation"){
    		Messages.error(error.message);
    	}
    },
  }
});