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

Stays.helpers({
  formattedCheckInDate: function() {
    var checkin = moment(this.checkInDate).zone(this.zone);
    return checkin.format('MM/DD/YYYY');
  },
  formattedCheckOutDate: function() {
    var checkout = moment(this.checkoutDate).zone(this.zone);
    return checkout.format('MM/DD/YYYY');
  },
  friendlyCheckInDate: function() {
    var checkin = moment(this.checkInDate).zone(this.zone);
    return checkin.format('dddd MM/DD');
  },
  friendlyCheckOutDate: function() {
    var checkout = moment(this.checkoutDate).zone(this.zone);
    return checkout.format('dddd MM/DD');
  },
  formattedCheckInTime: function() {
    var checkin = moment(this.checkInDate).zone(this.zone);
    return checkin.format('(h:mm a)');
  },
  formattedCheckOutTime: function() {
    var checkout = moment(this.checkoutDate).zone(this.zone);
    return checkout.format('(h:mm a)');
  },
  checkInTime: function() {
    var checkin = moment(this.checkInDate).zone(this.zone);
    return checkin.format('h:mm a');
  },
  checkOutTime: function() {
    var checkout = moment(this.checkoutDate).zone(this.zone);
    return checkout.format('h:mm a');
  },
  checkOutMinutes: function() {
    var checkout = moment(this.checkoutDate).zone(this.zone);
    var startOfDay = checkout.clone().startOf('day');
    return checkout.diff(startOfDay, 'minutes');
  },
  friendlyStartDate: function() {
    var startDate = moment(this.preReg.startDate).zone(this.zone);
    return startDate.format('dddd MM/DD');
  },
  startTime: function() {
    var startDate = moment(this.preReg.startDate).zone(this.zone);
    return startDate.format('h:mm a');
  },
  friendlyEndDate: function() {
    var endDate = moment(this.preReg.endDate).zone(this.zone);
    return endDate.format('dddd MM/DD');
  },
  endTime: function() {
    var endDate = moment(this.preReg.endDate).zone(this.zone);
    return endDate.format('h:mm a');
  },
  dateRange: function() {
    var checkInWhen = moment(this.checkInDate).zone(this.zone);
    var checkOutWhen = moment(this.checkoutDate).zone(this.zone);
    return checkInWhen.format('MM/DD/YYYY') + ' - ' + checkOutWhen.format('MM/DD/YYYY');
  },
  primaryGuest: function() {
    return Meteor.users.findOne(this.guestId);
  },
  isActive: function() {
    var now = Session.get('currentTime') || new Date();
    var checkin = moment(this.checkInDate).zone(this.zone);
    var checkout = moment(this.checkoutDate).zone(this.zone);
    if (checkin <= now && now <= checkout) {
      return true && this.active;
    }
    return false;
  },
  isPrereg: function() {
    return this.preReg && !this.checkInDate;
  }
});

Schema.GuestCheckIn = new SimpleSchema({
  hotelId: {
    type: String
  },
  roomId: {
    type: String
  },
  guestFirstName: {
    type: String,
    label: "First Name"
  },
  guestLastName: {
    type: String,
    label: "Last Name"
  },
  guestEmail: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "Email Address"
  },
  guestPhone: {
    type: String,
    label: "Phone Number (optional)",
    optional: true
  },
  checkoutDate: {
    type: Date,
    label: "Check-Out Date"
  },
  zone: {
    type: Number
  },
  currentStayId: {
    type: String,
    optional: true
  },
  preregId: {
    type: String,
    optional: true
  }
});

Schema.PreregisteredStay = new SimpleSchema({
  hotelId: {
    type: String
  },
  "preReg.guestLastName": {
    type: String,
    label: "Guest's Last Name"
  },
  "preReg.guestEmail": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "Email Address (optional)",
    optional: true
  },
  "preReg.guestPhone": {
    type: String,
    label: "Phone Number (optional)",
    optional: true
  },
  "preReg.startDate": {
    type: Date,
    label: "Check-In Date"
  },
  "preReg.endDate": {
    type: Date,
    label: "Check-Out Date"
  }
});

Schema.ChangeCheckoutDate = new SimpleSchema({
  _id: {
    type: String
  },
  checkoutTime: {
    type: String,
    label: "Checkout Time"
  },
  checkoutMinutes: {
    type: Number
  },
  checkoutDate: {
    type: Date,
    label: "Checkout Date"
  }
});
