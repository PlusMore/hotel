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
    noReady: true,
    nonReactive: true
  });

  Counts.publish(this, 'total-rooms', Rooms.find({
    hotelId: hotelId
  }), {
    nonReactive: true
  });
});
