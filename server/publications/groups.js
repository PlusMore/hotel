Meteor.publish('groups', function(hotelId) {
  return Groups.find({
    hotelId: hotelId
  });
});
