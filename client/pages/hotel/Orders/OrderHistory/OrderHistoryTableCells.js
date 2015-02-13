Template.orderHistoryRequestedCell.helpers({
	requestedWhen: function() {
		var when = moment(this.requestedDate).utcOffset(this.requestedZone);
    return when.format('MM/DD/YYYY, h:mm a');
	},
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

Template.orderHistoryTypeCell.helpers({
	friendlyServiceType: function() {
		return HotelServices.friendlyServiceType(this.service.type);
	}
});

Template.orderHistoryStatusCell.helpers({
	orderStatus: function() {
		switch (this.status) {
    case 'completed': 
      return 'Completed';
    case 'cancelled': 
      return 'Cancelled';
    default: 
      return '';
  	}
	},
	closedBy: function() {
		if (this.status == 'completed'){
			var user = Meteor.users.findOne(this.completedBy);
		} else {
			var user = Meteor.users.findOne(this.cancelledBy);
			if (!Roles.userIsInRole(user, ['admin', 'hotel-staff', 'hotel-manager'])) {
				return "Guest";
			}
		}
		if (user.kiosk) {
			return user.kiosk.name;
		}
		return "{0} {1}".format(user.profile.firstName, user.profile.lastName);
	},
	closedWhen: function() {
		if (this.status == 'completed') {
			var when = moment(this.completedDate).utcOffset(this.requestedZone);
		} else {
			var when = moment(this.cancelledDate).utcOffset(this.requestedZone);
		}
		return when.format('MM/DD/YYYY, h:mm a');
	}
});