Meteor.publish('hotelServices', function(hotelId) {
  var userId = this.userId,
    user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;

  return HotelServices.find({
    hotelId: hotelId
  });
});

Meteor.startup(function () {
  HotelServices._ensureIndex({hotelId: 1, serviceType: 1}, {background: true});
});
