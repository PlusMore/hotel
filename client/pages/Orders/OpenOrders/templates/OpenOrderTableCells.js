Template.requestedTimeAgoCell.helpers({
  requestedDateTimeAgo: function() {
    var now = Session.get('currentTime');
    return moment(this.requestedDate).zone(this.requestedZone).fromNow();
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
