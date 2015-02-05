Template.requestedTimeAgoCell.helpers({
	requestedDateTimeAgo: function () {
		var now = Session.get('currentTime');
    return moment(this.requestedDate).fromNow();
	},
	attention: function() {
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
		var user = Meteor.users.findOne({_id: this.claimedBy});
		return "{0} {1}".format(user.profile.firstName, user.profile.lastName);
	},
	claimedDate: function() {
		var when = moment(this.receivedDate).zone(this.requestedZone);
    when = when.format('MMMM Do YYYY, h:mm a') + " (" + when.calendar() + ")";
    return when;
	}
});