Template.openPatronOrders.helpers({
	selector: function() {
		var user = Meteor.user();
		var hotelId = Session.get('hotelId') || user.hotelId;
		return {hotelId: hotelId, open: true, handledBy: 'hotel'};
	}
});

Template.openPatronOrders.events({
	'click tr': function(event) {
		var dataTable = $(event.target).closest('table').DataTable();
		var order = dataTable.row(event.currentTarget).data();
		Session.set('detailsOrderId', order._id);
	}
});