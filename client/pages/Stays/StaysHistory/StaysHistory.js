Template.StaysHistory.helpers({
	selector: function() {
		var user = Meteor.user();
    var hotelId = Session.get('hotelId') || user.hotelId;
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