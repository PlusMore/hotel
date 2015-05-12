Template.CompleteButton.events({
  'click .btn-complete-order': function(e) {
    if (confirm("Are you sure you want to close this order?")) {
      Meteor.call('completePatronRequest', this._id, function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success('Order Completed!');
          BootstrapModalPrompt.dismiss();
        }
      });
    }
  }
});
