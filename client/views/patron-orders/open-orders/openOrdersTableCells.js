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
    return HotelServices.friendlyServiceType(this.service.type);
  }
});

Template.patronReservationCell.helpers({
	deviceLocation: function() {
    if (this.deviceId) {
      return '(' + Devices.findOne(this.deviceId).location + ')';
    }
	},
	guestName: function() {
		var user = Meteor.users.findOne(this.userId);
    return user.profile.lastName;
	}
});

Template.orderStatusCell.helpers({
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
	claimedName: function() {
    var user = Meteor.users.findOne(this.userId);
		return "{0} {1}".format(user.profile.firstName, user.profile.lastName);
	},
	claimedDate: function() {
		var when = moment(this.receivedDate).zone(this.requestedZone);
    when = when.format('MMMM Do YYYY, h:mm a') + " (" + when.calendar() + ")";
    return when;
	},
  isPending: function() {
    return this.status === 'pending';
  }
});