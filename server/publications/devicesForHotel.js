Meteor.publish('devicesForHotel', function(hotelId) {
  var userId = this.userId,
    user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;

  return Devices.find({
    hotelId: hotelId
  }, {
    fields: {
      location: 1,
      hotelId: 1,
      _id: 1
    },
    sort: {
      location: 1
    }
  });
});
