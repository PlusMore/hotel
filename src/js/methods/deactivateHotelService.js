Meteor.methods({
  deactivateHotelService: function(serviceType, hotelId) {
    // validate service type
    check(serviceType, String);
    HotelServices.validateServiceType(serviceType);

    // validate hotel id
    hotelId = hotelId || Meteor.user().hotelId;
    check(hotelId, String);

    // check to see if valid hotel
    var hotel = Hotels.findOne(hotelId);

    if (hotel) {
      // upsert (insert or update if exists) active hotel service
      var service = HotelServices.findOne({
        type: serviceType,
        hotelId: hotelId
      });

      if (service) {
        return HotelServices.update(service._id, {
          $set: {
            active: false
          }
        });
      } else {
        throw new Meteor.Error(500, 'No service configured for ' + serviceType);
      }

    } else {
      throw new Meteor.Error(500, 'Not a valid hotel.');
    }
  }
});
