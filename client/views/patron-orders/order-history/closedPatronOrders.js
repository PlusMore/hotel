Template.closedPatronOrders.helpers({
	selector: function() {
		var user = Meteor.user();
		var hotelId = Session.get('hotelId') || user.hotelId;
		return {hotelId: hotelId, open: false, handledBy: 'hotel'};
	}
});

Template.closedPatronOrders.events({
	'click tr': function(event) {
		var dataTable = $(event.target).closest('table').DataTable();
		var order = dataTable.row(event.currentTarget).data();
		Session.set('detailsOrderId', order._id);
	}
});