Meteor.publish('hotelAmenities', function(hotelId) {
  var userId = this.userId,
    user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;
  if (Roles.userIsInRole(this.userId, ['hotel-manager', 'admin'])) {
    return HotelAmenities.find({
      hotelId: hotelId
    });
  }
});

Meteor.startup(function () {
  HotelAmenities._ensureIndex({hotelId: 1}, {background: true});
});
