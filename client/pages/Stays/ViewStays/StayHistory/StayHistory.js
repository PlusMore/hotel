Template.StayHistory.helpers({
  selector: function() {
    var hotelId = Session.get('hotelId');
    var now = Session.get('currentTime');

    return {
      hotelId: hotelId,
      checkoutDate: {
        $lte: now
      },
      zone: {
        $exists: true
      }
    };
  }
});
