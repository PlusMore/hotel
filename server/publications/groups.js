Meteor.publish('groups', function(hotelId) {
  return Groups.find({
    hotelId: hotelId
  });
});

Meteor.startup(function () {
  Groups._ensureIndex({hotelId: 1}, {background: true});
});
