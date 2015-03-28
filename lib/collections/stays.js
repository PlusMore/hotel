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
  formattedCheckInTime: function() {
    var checkin = moment(this.checkInDate).zone(this.zone);
    return checkin.format('(h:mm a)');
  },
  formattedCheckOutTime: function() {
    var checkout = moment(this.checkoutDate).zone(this.zone);
    return checkout.format('(h:mm a)');
  },
  formattedStartDate: function() {
    var startDate = moment(this.preReg.startDate).zone(this.zone);
    return startDate.format('dddd MM/DD (h:mm a)');
  },
  formattedEndDate: function() {
    var endDate = moment(this.preReg.endDate).zone(this.zone);
    return endDate.format('dddd MM/DD (h:mm a)');
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
    var checkin = moment(this.checkInDate).utcOffset(this.zone);
    var checkout = moment(this.checkoutDate).utcOffset(this.zone);
    if (checkin <= now && now <= checkout) {
      return true;
    }
    return false;
  },
  isPrereg: function() {
    var now = Session.get('currentTime') || new Date();
    return this.preReg && !this.active && now <= this.preReg.startDate;
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

Meteor.methods({
  preregisterStay: function(doc) {
    check(doc,Schema.PreregisteredStay);
    doc.zone = moment(doc.preReg.endDate).zone();
    var hotel = Hotels.findOne(doc.hotelId);
    doc.preReg.startDate.setMinutes(hotel.arrivalMinutes());
    doc.preReg.endDate.setMinutes(hotel.departureMinutes());
    doc.active = false;
    Stays.insert(doc);
  }
});
