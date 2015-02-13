Template.requestedTimeAgoCell.helpers({
	requestedDateTimeAgo: function() {
		var now = Session.get('currentTime') || new Date();
		return moment(this.requestedDate).fromNow();
	},
	requestedWhen: function() {
		var when = moment(this.requestedDate).utcOffset(this.requestedZone);
    return when.format('MM/DD/YYYY, h:mm a');
	}
});

Template.orderTypeCell.helpers({
	friendlyServiceType: function() {
		return HotelServices.friendlyServiceType(this.service.type);
	}
});

Template.reservationCell.helpers({
	guestName: function() {
		var user = Meteor.users.findOne(this.userId);
    return user.profile.lastName;
	},
	deviceLocation: function() {
		var device = Devices.findOne(this.deviceId);
		if (device) {
      return '(' + device.location + ')';
    }
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
	isPending: function() {
    return this.status === 'pending';
  },
  receivedWhen: function() {
  	var when = moment(this.receivedDate).utcOffset(this.requestedZone);
    return '(' + when.format('MM/DD/YYYY, h:mm a') + ')';
  },
  receivedBy: function() {
  	var user = Meteor.users.findOne(this.receivedBy);
  	if (user.kiosk) {
      return user.kiosk.name;
    }
    return "{0} {1}".format(user.profile.firstName, user.profile.lastName);
  }
});