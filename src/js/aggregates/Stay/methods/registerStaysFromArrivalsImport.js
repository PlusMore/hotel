Meteor.methods({
  'registerStaysFromOracleXMLArrivalsImport': function(hotel, resArr) {
    check(hotel._id, String);
    var hotelId = hotel._id;
    var hotelUtcOffset= hotel.utcOffset || -240;

    _.each(resArr, function(res) {
      var startDateMoment = moment(res.ARRIVAL).utcOffset(hotelUtcOffset);
      var startDate = startDateMoment.toDate();

      var endDateMoment = moment(res.DEPARTURE).utcOffset(hotelUtcOffset);
      var endDate = endDateMoment.toDate();

      var name = res.FULL_NAME.split(',');
      var guestFirstName = name[1];
      var guestLastName = name[0];

      var upcomingStay = Stays.findOne({
        hotelId: hotelId,
        "preReg.guestFirstName": guestFirstName,
        "preReg.guestLastName": guestLastName,
        "preReg.startDate": { "$gte": startDate },
        "preReg.endDate": { "$gte": endDate },
        active: false
      });

      if (! upcomingStay) {
        var stayId = Stays.insert({
          hotelId: hotelId,
          preReg: {
            guestFirstName: guestFirstName,
            guestLastName: guestLastName,
            startDate: startDate,
            endDate: endDate,
          },
          utcOffset: hotelUtcOffset,
          active: false
        });

        console.log('new arrival', name, hotelId, stayId);
      } else {
        console.log('duplicate registration', name, hotelId);
      }

    });
  }
});
