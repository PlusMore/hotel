Meteor.methods({
  resetServiceAvailability: function(serviceId) {
    check(serviceId, String);

    return HotelServices.update(
      serviceId, {
        $set: {
          startTime: undefined,
          endTime: undefined,
          startMinutes: undefined,
          endMinutes: undefined
        }
      }
    );
  }
});
