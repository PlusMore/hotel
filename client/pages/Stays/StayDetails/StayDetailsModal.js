Template.StayDetailsModal.helpers({
	stay: function() {
		return Stays.findOne(Session.get('viewStayId'));
	}
});