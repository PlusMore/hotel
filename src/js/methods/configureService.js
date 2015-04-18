Meteor.methods({
  configureService: function(serviceConfiguration) {
    check(serviceConfiguration, Schema.configureService);

    return HotelServices.update(serviceConfiguration._id, {
      $set: _.omit(serviceConfiguration, '_id')
    });
  }
});
