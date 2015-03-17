Template.CheckIn.helpers({
  guestCheckInSchema: function() {
    return Schema.GuestCheckIn;
  },
  hotelId: function() {
    return Session.get('hotelId');
  },
  roomOptions: function() {
    var roomsCursor = Rooms.find({}, {$sort: {name: 1}});
    var stays = Stays.find();
    var rooms = roomsCursor.fetch();
    var roomOptions = [];
    if (rooms) {
      _.each(rooms, function(room) {
        var active = '';
        if (room.stay() && room.stay().isActive()) {
          active = ' (has active stay)';
        }
        roomOptions.push({
          label: room.name + active,
          value: room._id
        });
      });
      return roomOptions;
    }
  }
});

Template.CheckIn.rendered = function() {
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
  guestCheckInForm: {
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
      Messages.success('Guest successfully checked in to ' + result);
      Session.set('checkoutDate', undefined);
      Router.go('Dashboard');
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
