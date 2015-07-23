Template.CompleteButton.helpers({
  buttonDisabled: function() {
    return this.isUnassigned() ? 'disabled' : ''; // collection helper
  }
});

Template.CompleteButton.events({
  'click .btn-complete-order': function(e) {
    e.preventDefault();
    console.log('pressed');
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
