Template.CheckIn.helpers({
  guestCheckInSchema: function() {
    return Schema.GuestCheckIn;
  },
  hotelId: function() {
    return Session.get('hotelId');
  },
  roomOptions: function() {
    var roomsCursor = Rooms.find({}, {
      $sort: {
        name: 1
      }
    });
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
  },
  preregisteredStays: function() {
    var startDay = moment().startOf('day').toDate();
    var endDay = moment().add(1, 'days').toDate();
    return Stays.find({
      active: false,
      preReg: {
        $exists: true
      },
      "preReg.startDate": {
        $gte: startDay,
        $lte: endDay
      }
    });
  }
});

Template.CheckIn.created = function() {
  var instance = this;

  instance.autorun(function() {
    var sub = Meteor.subscribe('preregisteredStaysForToday', Session.get('hotelId'));
  });
};

Template.CheckIn.rendered = function() {
  Session.set('checkoutDate', undefined);
  var hotel = Hotels.findOne(Session.get('hotelId'));
  // Set up datepicker
  this.$('[name=checkoutDate]').pickadate({
    container: $("#main-wrapper"),
    clear: false,
    min: moment().add(1, 'days').toDate(),
    onSet: function(date) {
      if (date.select) {
        var selectedDate = moment(date.select).startOf('day').toDate();
        selectedDate.setMinutes(hotel.departureMinutes());
        Session.set('checkoutDate', {
          date: selectedDate,
          zone: moment(selectedDate).zone()
        });
      }
    }
  });
};

Template.CheckIn.events({
  'change #select-prereg-stay': function(e, tmpl) {
    e.preventDefault();
    if (tmpl.$(e.currentTarget).val() != "none") {
      //preregistered stay selected, load stay details
      var stayId = tmpl.$(e.currentTarget).val();
      var stay = Stays.findOne(stayId);
      tmpl.$('#preregId').val(stayId);
      tmpl.$('#guestLastName').val(stay.preReg.guestLastName);
      tmpl.$('#guestLastName').prop('readonly', true); // disable field
      var setPicker = {
        select: stay.preReg.endDate
      };
      tmpl.$('[name=checkoutDate]').pickadate('set', setPicker);
      if (stay.preReg.guestEmail) {
        tmpl.$('#guestEmail').val(stay.preReg.guestEmail);
      }
      if (stay.preReg.guestPhone) {
        tmpl.$('#guestPhone').val(stay.preReg.guestPhone);
      }
    } else {
      // preregister stay deselected, clear fields
      tmpl.$('#preregId').val('');
      tmpl.$('#guestLastName').val('');
      tmpl.$('#guestLastName').prop('readonly', false);
      tmpl.$('#guestPhone').val('');
      tmpl.$('#guestEmail').val('');
      tmpl.$('[name=checkoutDate]').pickadate('set', 'clear');
      Session.set('checkoutDate', undefined);
    }
  }
});

AutoForm.hooks({
  guestCheckInForm: {
    before: {
      method: function(doc) {
        if (!Session.get('checkoutDate')) {
          Messages.error('Please select a check out date');
          return false;
        }
        var room = Rooms.findOne(doc.roomId);
        if (room.stay() && room.stay().isActive() && confirm('This room has an active stay. Are you sure you want to check a guest in to this room?')) {
          var checkoutDate = Session.get('checkoutDate');
          doc.checkoutDate = checkoutDate.date;
          doc.zone = checkoutDate.zone;
          doc.currentStayId = room.stayId;
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
    onSuccess: function(operation, result) {
      Messages.success('Guest successfully checked in to ' + result);
      Session.set('checkoutDate', undefined);
      Router.go('Dashboard');
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "submit", or the method name.
    onError: function(operation, error) {
      if (operation !== "validation") {
        Messages.error(error.message);
      }
    },
  }
});
