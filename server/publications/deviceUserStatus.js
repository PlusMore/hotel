Meteor.publish('deviceUserStatus', function(deviceId) {
  return [
    Devices.find(deviceId),
    Meteor.users.find({
      deviceId: deviceId
    }, {
      fields: {
        emails: 1,
        deviceId: 1,
        profile: 1,
        status: 1
      }
    })
  ];
});
