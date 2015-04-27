Template.OrderHistory.helpers({
  selector: function() {
    var user = Meteor.user();
    var hotelId = Session.get('hotelId') || user.hotelId;
    return {
      hotelId: hotelId,
      open: false,
      handledBy: 'hotel'
    };
  }
});

Template.OrderHistory.onCreated(function() {
  // this prevents weirdness due to tabular's nonreactive selector
  forceReRender();
});
