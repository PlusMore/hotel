Meteor.publish('activeStaysWidget', function(hotelId) {
  var now = new Date();

  Counts.publish(this, 'total-active-stays', Stays.find({
    hotelId: hotelId,
    checkInDate: {
      $lte: now
    },
    checkoutDate: {
      $gte: now
    },
    zone: {
      $exists: true
    }
  }), {
    noReady: true
  });

  Counts.publish(this, 'total-rooms', Rooms.find({
    hotelId: hotelId
  }));
});

Meteor.startup(function () {
  Stays._ensureIndex({hotelId: 1, checkInDate: -1, checkoutDate: 1}, {background: true});
});

Meteor.startup(function () {
  Rooms._ensureIndex({hotelId: 1}, {background: true});
});
