Template.Dashboard.helpers({
	hotelName: function() {
		return Session.get('hotelName') || "Your hotel";
	}
});
