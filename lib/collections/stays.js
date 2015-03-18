Stays = new Meteor.Collection('stays');

Stays.allow({
  insert: function(userId, doc) {
    return false;
  },
  update: function(userId, doc, fields, modifier) {
    return userId === doc.userId;
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
      return true;
    }
    return false;
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
  }
});

