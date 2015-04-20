Meteor.methods({
  configureService: function(serviceConfiguration) {
    check(serviceConfiguration, Schema.ServiceConfiguration);

    return HotelServices.update(serviceConfiguration._id, {
      $set: _.omit(serviceConfiguration, '_id')
    });
  }
});
