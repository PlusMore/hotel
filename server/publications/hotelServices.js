Meteor.publish('hotelServices', function(hotelId) {
  var userId = this.userId,
    user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;

  return HotelServices.find({
    hotelId: hotelId
  });
});
