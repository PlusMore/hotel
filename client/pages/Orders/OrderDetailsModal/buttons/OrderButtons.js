Template.OrderButtons.onCreated(function() {
  // this should probably only subscribe to users in groups that manage the service type
  this.subscribe('hotelUsers', Session.get('hotelId'));
});
