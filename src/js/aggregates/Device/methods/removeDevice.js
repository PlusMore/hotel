Meteor.methods({
  removeDevice: function(deviceId) {
    check(deviceId, String);

    Devices.remove(deviceId);
  }
});
