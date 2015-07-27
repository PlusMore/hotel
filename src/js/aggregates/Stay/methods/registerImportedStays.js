Meteor.methods({
  'registerImportedStays': function(staysJSON) {
    _.each(staysJSON, function (stay) {
      console.log('Inserting stay: ', stay);
      Stays.insert({
        hotelId: stay.hotelId,
        preReg: {
          guestFirstName: stay.guestFirstName,
          guestLastName: stay.guestLastName,
          startDate: stay.startDate,
          endDate: stay.endDate,
        },
        zone: stay.zone,
        active: stay.active
      });
    });
  }
});
