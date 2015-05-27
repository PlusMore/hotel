Meteor.publish('amenityDetails', function(hotelId) {
  var userId = this.userId,
    user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;
  if (Roles.userIsInRole(this.userId, ['hotel-manager', 'admin'])) {
    return AmenityDetails.find({
      hotelId: hotelId
    });
  }
});

Meteor.startup(function () {
  AmenityDetails._ensureIndex({hotelId: 1, amenityId: 1}, {background: true});
});
