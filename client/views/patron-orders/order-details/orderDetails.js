Template.orderDetails.helpers({
	validOrderSelected: function() {
    if (Orders.findOne(Session.get('detailsOrderId'))) {
      return true;
    }
    return false;
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
  orderStatus: function() {
    switch (this.status) {
      case 'requested':
        return 'Requested';
      case 'pending': 
        return 'In-Progress';
      case 'completed': 
        return 'Completed';
      case 'cancelled': 
        return 'Cancelled';
      default: 
        return '';
    }
  },
  requestedWhen: function() {
    return moment(this.requestedDate).calendar();
  },
  closedWhen: function() {
    if (this.cancelledDate){
      return moment(this.cancelledDate).calendar();
    }
    return moment(this.completedDate).calendar();
  },
  closedBy: function() {
    if (this.cancelledBy) {
      var user = Meteor.users.findOne(this.cancelledBy);
      if (Roles.userIsInRole(this.cancelledBy, ['hotel-manager', 'hotel-staff', 'admin'])) {
        return user.profile.firstName;
      }
      return 'Guest';
    } else {
      return Meteor.users.findOne(this.completedBy).profile.firstName;
    }
  },
  guestName: function() {
    return Meteor.users.findOne(this.userId).profile.lastName;
  },
  receivedBy: function () {
    return Meteor.users.findOne(this.receivedBy).profile.firstName;
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