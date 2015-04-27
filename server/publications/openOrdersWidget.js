Meteor.publish('openOrdersWidget', function(hotelId) {
  Counts.publish(this, 'open-orders', Orders.find({
    hotelId: hotelId,
    open: true,
    handledBy: 'hotel'
  }));
});
