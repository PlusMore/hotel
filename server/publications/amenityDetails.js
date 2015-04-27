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
