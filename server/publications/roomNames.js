Meteor.publish('roomNames', function(hotelId) {
  return Rooms.find({
    hotelId: hotelId
  }, {
    fields: {
      _id: 1,
      hotelId: 1,
      name: 1
    }
  });
});
