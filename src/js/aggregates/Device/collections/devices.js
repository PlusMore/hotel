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
  room: function() {
    return Rooms.findOne(this.roomId);
  }
});
