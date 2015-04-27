Meteor.publish('hotelService', function(serviceType, hotelId) {
  var userId = this.userId,
    user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;
  if (Roles.userIsInRole(this.userId, ['hotel-manager', 'admin'])) {
    return HotelServices.find({
      hotelId: hotelId,
      type: serviceType
    });
  }
});
