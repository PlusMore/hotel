Orders = new Meteor.Collection('orders');

// Allow/Deny

Orders.allow({
  insert: function(userId, doc) {
    return false;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return Roles.userIsInRole(userId, ['admin', 'hotel-staff', 'hotel-manager']);
  },
  remove: function(userId, doc) {
    return false;
  }
});

Orders.helpers({
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
  orderServiceType: function() {
    if (this.type === 'service') {
      return HotelServices.friendlyServiceType(this.service.type);
    }
  },
  orderHasRequestedForDate: function() {
    return this.type === 'service' && this.service.date;
  },
  orderRequestedForWhen: function() {
    var when = moment(this.service.date).zone(this.service.zone);
    return when.format('MM/DD/YYYY, h:mm a');
  },
  orderGuestName: function() {
    var user = Meteor.users.findOne(this.userId);
    if (user) {
      return user.profile.lastName;
    }
  },
  orderDeviceLocation: function() {
    var device = Devices.findOne(this.deviceId);
    if (device) {
      return '(' + device.location + ')';
    }
  },
  orderReservationColumn: function() {
    var res = '';
    var device = Devices.findOne(this.deviceId);
    if (device) {
      res += device.location;
    }
    var user = Meteor.users.findOne(this.userId);
    if (user) {
      res += user.profile.lastName;
    }
    return res;
  },
  orderIsPending: function() {
    return this.status === 'pending';
  },
  orderIsClosed: function() {
    return this.open === true;
  },
  orderIsCompleted: function() {
    return this.status === 'completed';
  },
  orderIsCancelled: function() {
    return this.status === 'cancelled';
  },
  orderReceivedBy: function() {
    var user = Meteor.users.findOne(this.receivedBy);
    if (user) {
      return "{0} {1}".format(user.profile.firstName, user.profile.lastName);
    } else {
      return 'n/a';
    }
  },
  orderClosedBy: function() {
    if (this.status == 'completed') {
      var user = Meteor.users.findOne(this.completedBy);
    } else {
      var user = Meteor.users.findOne(this.cancelledBy);
    }
    if (Roles.userIsInRole(user, 'device')) {
      return "Guest";
    }
    if (user) {
      return "{0} {1}".format(user.profile.firstName, user.profile.lastName);
    }
  },
  orderClosedWhen: function() {
    if (this.status == 'completed') {
      var when = moment(this.completedDate).zone(this.requestedZone);
    } else {
      var when = moment(this.cancelledDate).zone(this.requestedZone);
    }
    return when.format('MM/DD/YYYY, h:mm a');
  },
  orderReceivedWhen: function() {
    if(this.receivedDate){
      var when = moment(this.receivedDate).zone(this.requestedZone);
      if (when) {
        return when.format('MM/DD/YYYY, h:mm a');
      }
    } else {
      return 'n/a';
    }
  },
  orderRequestedWhen: function() {
    var when = moment(this.requestedDate).zone(this.requestedZone);
    if (when) {
      return when.format('MM/DD/YYYY, h:mm a');
    }
  },
  orderCompletedWhen: function() {
    var when = moment(this.completedDate).zone(this.requestedZone);
    if (when) {
      return when.format('MM/DD/YYYY, h:mm a');
    }
  },
  orderCancelledWhen: function() {
    var when = moment(this.cancelledDate).zone(this.requestedZone);
    if (when) {
      return when.format('MM/DD/YYYY, h:mm a');
    }
  }
});