Template.openPatronOrders.helpers({
	hasOrders: function() {
		return Orders.find({}).count() > 0;
	},
	selector: function() {
		var user = Meteor.user();
		var hotelId = Session.get('hotelId') || user.hotelId;
		return {hotelId: hotelId, open: true, handledBy: 'hotel'};
	}
});