Template.CurrentStays.helpers({
  selector: function() {
    var user = Meteor.user();
    var hotelId = Session.get('hotelId') || user.hotelId;
    var now = Session.get('currentTime');
    return {
      hotelId: hotelId,
      checkInDate: {
        $lte: now
      },
      checkoutDate: {
        $gte: now
      }
    };
  }
});
