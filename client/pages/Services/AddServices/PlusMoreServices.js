Template.PlusMoreServices.onCreated(function() {
  console.log('subscribing to plusmore clonable services');
  this.subscribe('plusmoreClonableServices');
});

Template.PlusMoreServices.helpers({
  services: function() {
    return HotelServices.clonableServices();
  }
});
