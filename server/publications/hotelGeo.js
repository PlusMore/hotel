Meteor.publish('hotelGeo', function(hotelId) {
  return Hotels.find({
    _id: hotelId
  }, {
    fields: {
      geo: 1
    }
  });
});
