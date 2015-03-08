Devices = new Meteor.Collection('devices');

// Allow/Deny

Devices.allow({
  insert: function(userId, doc) {
    return false;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return false;
  },
  remove: function(userId, doc) {
    return false;
  }
});

Devices.helpers({
  deviceHasActiveStay: function() {
    var stay = Stays.findOne(this.stayId);
    if (stay) {
      var now = Session.get('currentTime') || new Date();
      var checkin = moment(stay.checkInDate).utcOffset(stay.zone);
      var checkout = moment(stay.checkoutDate).utcOffset(stay.zone);
      if (checkin <= now && now <= checkout) {
        return true;
      }
    }
    return false;
  },
  deviceStay: function() {
    return Stays.findOne(this.stayId);
  }
});