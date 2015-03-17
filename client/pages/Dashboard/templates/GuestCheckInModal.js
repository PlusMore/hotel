Template.GuestCheckInModal.helpers({
  guestCheckInSchema: function() {
    return Schema.GuestCheckIn;
  },
  hotelId: function() {
    return Session.get('hotelId');
  },
  roomOptions: function () {
    return Rooms.find({}, {$sort: {name: 1}}).map(function (room) {
      var active = '';
      if (room.stay() && room.stay().isActive()) {
        active = ' (has active stay)';
      }
      return {label: room.name + active, value: room._id};
    });
  }
});

Template.GuestCheckInModal.rendered = function() {
  Session.set('checkoutDate', undefined);
  // Set up datepicker
  this.$('[name=checkoutDate]').pickadate({
    clear: false,
    min: moment({
      hour: 12,
      minute: 0
    }).add(1, 'days').toDate(),
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
        if (!Session.get('checkoutDate')) {
          Messages.error('Please select a check out date');
          return false;
        }
        var room = Rooms.findOne(doc.roomId);
        if (room.stay() && room.stay().isActive() && confirm('This room has an active stay. Are you sure you want to check a guest in to this room?')) {
          var checkoutDate = Session.get('checkoutDate');
          doc.checkoutDate = checkoutDate.date;
          doc.zone = checkoutDate.zone;
          return doc;
        } else if (!room.stay() || !room.stay().isActive()) {
          var checkoutDate = Session.get('checkoutDate');
          doc.checkoutDate = checkoutDate.date;
          doc.zone = checkoutDate.zone;
          return doc;
        }
        return false;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result, template) {
      BootstrapModalPrompt.dismiss();
      Session.set('checkoutDate', undefined);
      Messages.success('Guest successfully checked in to ' + result);
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "submit", or the method name.
    onError: function(operation, error, template) {
      if (operation !== "validation") {
        Messages.error(error.message);
      }
    },
  }
});
