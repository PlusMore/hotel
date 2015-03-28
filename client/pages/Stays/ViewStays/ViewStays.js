Session.setDefault('stayView', 'current');

Template.ViewStays.helpers({
  selector: function() {
    var hotelId = Session.get('hotelId');
    var now = Session.get('currentTime');

    switch (Session.get('stayView')) {
      case 'current':
        return {
          hotelId: hotelId,
          checkInDate: {
            $lte: now
          },
          checkoutDate: {
            $gte: now
          },
          zone: {
            $exists: true
          }
        };
      case 'prereg':
        return {
          hotelId: hotelId,
          active: false,
          preReg: {
            $exists: true
          },
          "preReg.startDate": {
            $gte: now
          }
        };
      case 'history':
        return {
          hotelId: hotelId,
          checkoutDate: {
            $lte: now
          },
          zone: {
            $exists: true
          }
        };
    }
  },
  currentStayBtnClass: function() {
    return Session.get('stayView') == 'current' ? 'active' : '';
  },
  preregStayBtnClass: function() {
    return Session.get('stayView') == 'prereg' ? 'active' : '';
  },
  historyStayBtnClass: function() {
    return Session.get('stayView') == 'history' ? 'active' : '';
  }
});

Template.ViewStays.events({
  'click #set-current': function(e) {
    Session.set('stayView', 'current');
  },
  'click #set-prereg': function(e) {
    Session.set('stayView', 'prereg');
  },
  'click #set-history': function(e) {
    Session.set('stayView', 'history');
  },
});
