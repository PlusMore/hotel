Meteor.publish('dashboardWidgetInfo', function(hotelId) {
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
    noReady: true,
    nonReactive: true
  });

  Counts.publish(this, 'open-orders', Orders.find({
    hotelId: hotelId,
    open: true,
    handledBy: 'hotel'
  }), {
    noReady: true
  });

  return Hotels.find({
    _id: hotelId
  }, {
    fields: {
      geo: 1
    }
  });

});
