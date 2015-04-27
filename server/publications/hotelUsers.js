Meteor.publish('hotelUsers', function(hotelId) {
  var userId = this.userId,
    user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;
  return Meteor.users.find({
    hotelId: hotelId,
    roles: 'hotel-staff'
  }, {
    fields: {
      emails: 1,
      roles: 1,
      hotelId: 1,
      profile: 1
    }
  });
});
