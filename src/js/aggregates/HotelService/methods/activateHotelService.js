Meteor.methods({
  activateHotelService: function(serviceType, hotelId) {
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
      return HotelServices.upsert({
        type: serviceType,
        hotelId: hotelId
      }, {
        $set: {
          type: serviceType,
          hotelId: hotelId,
          active: true
        }
      });
    } else {
      throw new Meteor.Error(500, 'Not a valid hotel.');
    }
  }
});
