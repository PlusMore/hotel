Template.requestedTimeAgoCell.helpers({
  requestedDateTimeAgo: function() {
    var now = Session.get('currentTime') || new Date();
    return moment(this.requestedDate).fromNow();
  }
});

Template.viewDetailsCell.events({
	'click #view-order-details': function(e) {
		Session.set('orderDetailsId', this._id);
		BootstrapModalPrompt.prompt({
      dialogTemplate: Template.OrderDetailsModal
    });
	}
});