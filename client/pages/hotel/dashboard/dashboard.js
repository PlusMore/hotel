Template.dashboard.helpers({
	hotelName: function() {
		return Session.get('hotelName') || "Your hotel";
	}
});
