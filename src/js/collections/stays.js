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
  stayCheckInDate: function() {
    var checkin = moment(this.checkInDate).utcOffset(this.zone);
    return checkin.format('MM/DD/YYYY');
  },
  stayCheckOutDate: function() {
    var checkout = moment(this.checkoutDate).utcOffset(this.zone);
    return checkout.format('MM/DD/YYYY');
  },
  stayCheckInTime: function() {
    var checkin = moment(this.checkInDate).utcOffset(this.zone);
    return checkin.format('(h:mm a)');
  },
  stayCheckOutTime: function() {
    var checkout = moment(this.checkoutDate).utcOffset(this.zone);
    return checkout.format('(h:mm a)');
  }
});