Meteor.publish('preregisteredStaysForToday', function(hotelId) {
  var startDay = moment().startOf('day').toDate();
  var endDay = moment().add(1, 'days').toDate();
  return Stays.find({
    hotelId: hotelId,
    active: false,
    preReg: {
      $exists: true
    },
    "preReg.startDate": {
      $gte: startDay,
      $lte: endDay
    }
  });
});

Meteor.startup(function () {
  Stays._ensureIndex({hotelId: 1, checkInDate: -1, checkoutDate: 1}, {background: true});
});
