Template.orderHistoryViewCell.events({
  'click #view-order-details': function(e) {
    Session.set('orderDetailsId', this._id);
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.OrderDetailsModal
    });
  }
});
