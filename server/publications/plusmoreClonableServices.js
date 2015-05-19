Meteor.publish('plusmoreClonableServices', function() {
  return HotelServices.clonableServices();
});
