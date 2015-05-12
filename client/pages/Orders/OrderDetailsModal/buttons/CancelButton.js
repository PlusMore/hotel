Template.CancelButton.events({
  'click .btn-cancel-order': function(e) {
    if (confirm("Are you sure you want to cancel this order?")) {
      BootstrapModalPrompt.dismiss();
      Meteor.call('cancelPatronRequest', this._id, function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success('Order Successfully Cancelled');
        }
      });
    }
  }
});
