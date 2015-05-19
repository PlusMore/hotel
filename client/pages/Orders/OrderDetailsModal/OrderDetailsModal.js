Template.OrderDetailsModal.helpers({
  order: function() {
    return Orders.findOne(Session.get('orderDetailsId'));
  },
  typeDetailsTemplate: function() {
    switch (this.service.type) {
      case 'transportation':
        return 'TransportationServiceDetails';
      case 'roomService':
        return 'RoomServiceDetails';
      case 'valetServices':
        return 'ValetServiceDetails';
      default:
        return 'GenericServiceDetails';
    }
  },
  statusButtonClass: function() {
    if (this.status === 'requested') {
      return 'btn btn-primary btn-claim-order';
    }
    if (this.status === 'pending') {
      return 'btn btn-success btn-complete-order';
    }
  },
  statusButtonText: function() {
    if (this.status === 'requested') {
      return 'Claim Order';
    }
    if (this.status === 'pending') {
      return 'Mark Complete';
    }
  }
});

Template.OrderDetailsModal.events({
  'click .btn-claim-order': function(e) {
    Meteor.call('claimPatronRequest', this._id, function(err, res) {
      if (err) {
        Messages.error(err);
      } else {
        Messages.success('You have claimed this order!');
      }
    });
  },
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
