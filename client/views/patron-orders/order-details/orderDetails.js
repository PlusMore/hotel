Template.orderDetails.helpers({
	orderSelected: function() {
		return !!Session.get('detailsOrderId');
	},
	typeDetailsTemplate: function() {
    var orderId = Session.get('detailsOrderId');
    var order = Orders.findOne(orderId);
    switch (order.service.type) {
      case 'transportation': 
        return 'transportationServiceDetails';
      case 'roomService': 
        return 'roomServiceDetails';
      case 'valetServices': 
        return 'valetServiceDetails';
      default:
        return '';
    }
  },
  order: function() {
    var orderId = Session.get('detailsOrderId');
    return Orders.findOne(orderId);
  },
  requestedWhen: function() {
    return moment(this.requestedDate).calendar();
  },
  guestName: function() {
    return Meteor.users.findOne(this.userId).profile.lastName;
  },
  deviceLocation: function() {
    if (this.deviceId) {
      return '(' + Devices.findOne(this.deviceId).location + ')';
    }
  },
  statusButtonClass: function() {
    if (this.status == 'requested'){
      return 'btn btn-primary btn-claim-order';
    }
    if (this.status == 'pending'){
      return 'btn btn-success btn-complete-order';
    }
  },
  statusButtonText: function() {
    if (this.status == 'requested'){
      return 'Claim';
    }
    if (this.status == 'pending'){
      return 'Mark Complete';
    }
  }
});

Template.orderDetails.events({
  'click .btn-claim-order': function(e) {
    Meteor.call('claimPatronRequest', this._id);
  },
  'click .btn-complete-order': function(e) {
    if (confirm("Are you sure you want to close this order?")) {
      Meteor.call('completePatronRequest', this._id);
    }
  },
  'click .btn-cancel-order': function(e) {
    if (confirm("Are you sure you want to cancel this order?")) {
      Meteor.call('cancelPatronRequest', this._id);
    }
  }
});