Stays = new Meteor.Collection('stays');

Stays.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin', 'hotel-staff']);
  },
  update: function(userId, doc, fields, modifier) {
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin', 'hotel-staff']);
  },
  remove: function(userId, doc) {
    return false;
  }
});

// TODO: need to go through all usage of time, and use utcOffset. When the time
// has to do with something happening around the hotel, the hotel's utcOffset should
// be used
// For now, hardcoding to NY (-240)
var utcOffsetForNYC = -240

Stays.helpers({
  formattedCheckInDate: function() {
    var checkin = moment(this.checkInDate).utcOffset(utcOffsetForNYC);
    return checkin.format('MM/DD/YYYY');
  },
  formattedCheckOutDate: function() {
    var checkout = moment(this.checkoutDate).utcOffset(utcOffsetForNYC);
    return checkout.format('MM/DD/YYYY');
  },
  friendlyCheckInDate: function() {
    var checkin = moment(this.checkInDate).utcOffset(utcOffsetForNYC);
    return checkin.format('dddd MM/DD');
  },
  friendlyCheckOutDate: function() {
    var checkout = moment(this.checkoutDate).utcOffset(utcOffsetForNYC);
    return checkout.format('dddd MM/DD');
  },
  formattedCheckInTime: function() {
    var checkin = moment(this.checkInDate).utcOffset(utcOffsetForNYC);
    return checkin.format('(h:mm a)');
  },
  formattedCheckOutTime: function() {
    var checkout = moment(this.checkoutDate).utcOffset(utcOffsetForNYC);
    return checkout.format('(h:mm a)');
  },
  checkInTime: function() {
    var checkin = moment(this.checkInDate).utcOffset(utcOffsetForNYC);
    return checkin.format('h:mm a');
  },
  checkOutTime: function() {
    var checkout = moment(this.checkoutDate).utcOffset(utcOffsetForNYC);
    return checkout.format('h:mm a');
  },
  checkOutMinutes: function() {
    var checkout = moment(this.checkoutDate).utcOffset(utcOffsetForNYC);
    var startOfDay = checkout.clone().startOf('day');
    return checkout.diff(startOfDay, 'minutes');
  },
  friendlyStartDate: function() {
    var startDate = moment(this.preReg.startDate).utcOffset(utcOffsetForNYC);
    return startDate.format('dddd MM/DD');
  },
  startTime: function() {
    var startDate = moment(this.preReg.startDate).utcOffset(utcOffsetForNYC);
    return startDate.format('h:mm a');
  },
  friendlyEndDate: function() {
    var endDate = moment(this.preReg.endDate).utcOffset(utcOffsetForNYC);
    return endDate.format('dddd MM/DD');
  },
  endTime: function() {
    var endDate = moment(this.preReg.endDate).utcOffset(utcOffsetForNYC);
    return endDate.format('h:mm a');
  },
  dateRange: function() {
    var checkInWhen = moment(this.checkInDate).utcOffset(utcOffsetForNYC);
    var checkOutWhen = moment(this.checkoutDate).utcOffset(utcOffsetForNYC);
    return checkInWhen.format('MM/DD/YYYY') + ' - ' + checkOutWhen.format('MM/DD/YYYY');
  },
  primaryGuest: function() {
    return Meteor.users.findOne(this.guestId);
  },
  isActive: function() {
    var now = Session.get('currentTime') || new Date();
    var checkin = moment(this.checkInDate).utcOffset(utcOffsetForNYC);
    var checkout = moment(this.checkoutDate).utcOffset(utcOffsetForNYC);
    if (checkin <= now && now <= checkout) {
      return true && this.active;
    }
    return false;
  },
  isPrereg: function() {
    return this.preReg && !this.checkInDate;
  }
});
