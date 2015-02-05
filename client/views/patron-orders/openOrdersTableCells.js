Template.requestedTimeAgoCell.helpers({
	requestedDateTimeAgo: function () {
		var now = Session.get('currentTime');
    return moment(this.requestedDate).fromNow();
	},
	attention: function() {
    if (this.status == 'pending'){
      return 'info';
    }
    var now = Session.get('currentTime') || new Date();
    var requestedDate = moment(this.requestedDate);
    if (requestedDate.isBefore(moment(now).subtract(20, 'minutes'))) {
      return 'danger';
    }
    if (requestedDate.isBefore(moment(now).subtract(10, 'minutes'))) {
      return 'warning';
    }
    return 'success';
  }
});

Template.orderTypeCell.helpers({
  friendlyOrderType: function() {
    var order = Orders.findOne(this._id);
    return HotelServices.friendlyServiceType(order.service.type);
  }
});

Template.patronReservationCell.helpers({
	deviceLocation: function() {
		var order = Orders.findOne(this._id);
		var device = Devices.findOne(order.deviceId);
		return device.location;
	},
	guestName: function() {
    var order = Orders.findOne(this._id);
		var user = Meteor.users.findOne(order.userId);
    return user.profile.lastName;
	}
});

Template.orderStatusCell.helpers({
	orderStatus: function() {
		switch (this.status) {
    case 'requested':
      return 'Requested';
    case 'pending': 
      return 'Pending';
    case 'completed': 
      return 'Completed';
    case 'cancelled': 
      return 'Cancelled';
    default: 
      return '';
  	}
	},
	claimedName: function() {
		var order = Orders.findOne(this._id);
    var user = Meteor.users.findOne(order.userId);
		return "{0} {1}".format(user.profile.firstName, user.profile.lastName);
	},
	claimedDate: function() {
    var order = Orders.findOne(this._id);
		var when = moment(order.receivedDate).zone(order.requestedZone);
    when = when.format('MMMM Do YYYY, h:mm a') + " (" + when.calendar() + ")";
    return when;
	},
  isPending: function() {
    return this.status === 'pending';
  }
});

Template.orderStatusButtonsCell.helpers({
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

Template.orderStatusButtonsCell.events({
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