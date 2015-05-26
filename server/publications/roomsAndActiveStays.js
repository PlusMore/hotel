Meteor.publish('roomsAndActiveStays', function(hotelId, currentTime) {
  var staysPub = new SimplePublication({
    subHandle: this,
    collection: Stays,
    selector: {
      checkInDate: {
        $lte: currentTime
      },
      checkoutDate: {
        $gte: currentTime
      }
    },
    foreignKey: 'stayId',
    inverted: true
  });

  var publication = new SimplePublication({
    subHandle: this,
    collection: Rooms,
    selector: {
      hotelId: hotelId
    },
    dependant: [
      staysPub
    ]
  }).start();
});

Meteor.startup(function () {
  Stays._ensureIndex({hotelId: 1, checkInDate: -1, checkoutDate: 1}, {background: true});
});

Meteor.startup(function () {
  Rooms._ensureIndex({hotelId: 1, name: 1}, {background: true});
});
