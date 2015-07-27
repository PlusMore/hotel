Template.GuestCheckInPanelForm.helpers({
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
    }, {
      sort: {
        'preReg.guestLastName': 1
      }
    });
  }
});

Template.CheckIn.onCreated(function() {
  var self = this;
  var now = Session.get('currentTime');

  self.autorun(function() {
    var hotel = Session.get('hotelId');
    self.subscribe('preregisteredStaysForToday', hotel);
    self.subscribe('roomsAndActiveStays', hotel, now);
  });
})

Template.GuestCheckInPanelForm.onRendered(function() {
  this.$progressButton = this.$('.progress-button');
  this.$progressButton.progressInitialize();
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
});

Template.GuestCheckInPanelForm.events({
  'change #select-prereg-stay': function(e, tmpl) {
    e.preventDefault();
    if (tmpl.$(e.currentTarget).val() != "none") {
      //preregistered stay selected, load stay details
      var stayId = tmpl.$(e.currentTarget).val();
      var stay = Stays.findOne(stayId);
      tmpl.$('#preregId').val(stayId);
      tmpl.$('#guestLastName').val(stay.preReg.guestLastName);
      tmpl.$('#guestFirstName').val(stay.preReg.guestFirstName);
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
      tmpl.$('#guestFirstName').val('');
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
          // because checkoutdate is set in this hook, using autoform validation results
          // in an error message that will not disappear when a date is selected
          Messages.error('Please select a check out date');
          return false;
        }
        if (!AutoForm.validateField(this.formId, 'roomId')) {
          return false;
        }
        var checkoutDate = Session.get('checkoutDate');
        doc.checkoutDate = checkoutDate.date;
        doc.zone = checkoutDate.zone;
        var room = Rooms.findOne(doc.roomId);
        if (room.stay() && room.stay().isActive()) {
          if (confirm('This room has an active stay. Are you sure you want to check a guest in to this room?')) {
            doc.currentStayId = room.stayId;
          } else {
            return false;
          }
        }
        this.template.findParentTemplate('GuestCheckInPanelForm').$progressButton.progressStart();
        return doc;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result) {
      this.template.findParentTemplate('GuestCheckInPanelForm').$progressButton.progressFinish();
      Messages.success('Guest successfully checked in to ' + result);
      Session.set('checkoutDate', undefined);
      Router.go('Dashboard');
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "submit", or the method name.
    onError: function(operation, error) {
      if (operation !== "pre-submit validation") {
        Messages.error(error.message);
      }
      this.template.findParentTemplate('GuestCheckInPanelForm').$progressButton.progressError();
    }
  }
});
