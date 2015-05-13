Meteor.methods({
  setHotelArrivalAndDepartureTimes: function(doc) {
    check(doc._id, String);
    check(doc.arrivalTime, String);
    check(doc.arrivalMinutes, Number);
    check(doc.departureTime, String);
    check(doc.departureMinutes, Number);

    var settings = {
      arrivalTime: doc.arrivalTime,
      arrivalMinutes: doc.arrivalMinutes,
      departureTime: doc.departureTime,
      departureMinutes: doc.departureMinutes
    };

    Hotels.update({
      _id: doc._id
    }, {
      $set: {
        settings: settings
      }
    });
  }
});
