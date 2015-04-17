Template.ViewStays.helpers({
  selector: function() {
    var hotelId = Session.get('hotelId');
    var now = Session.get('currentTime');

    return {
      hotelId: hotelId,
      checkInDate: {
        $lte: now
      },
      checkoutDate: {
        $gte: now
      },
      zone: {
        $exists: true
      }
    };
  }
});
