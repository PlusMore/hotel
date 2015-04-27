Meteor.publish('roomsAndActiveStays', function(hotelId, currentTime) {
  if (Roles.userIsInRole(this.userId, ['hotel-manager', 'admin'])) {

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

  }
});
