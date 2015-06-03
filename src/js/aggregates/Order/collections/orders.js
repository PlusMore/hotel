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
  friendlyStatus: function() {
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
  friendlyServiceType: function() {
    if (this.type === 'service') {
      return HotelServices.friendlyServiceType(this.service.type);
    }
  },
  hasRequestedForDate: function() {
    return this.type === 'service' && this.service.date;
  },
  requestedForWhen: function() {
    var when = moment(this.service.date).zone(this.service.zone);
    return when.format('MM/DD/YYYY, h:mm a');
  },
  orderedByFullName: function() {
    var user = Meteor.users.findOne(this.userId);
    if (user) {
      return "{0} {1}".format(user.profile.firstName, user.profile.lastName);
    } else {
      return 'n/a';
    }
  },
  device: function() {
    var device = Devices.findOne(this.deviceId);
    if (device) {
      return device;
    }
  },
  room: function() {
    var room = Rooms.findOne(this.roomId);
    if (room) {
      return room;
    }
  },
  isPending: function() {
    return this.status === 'pending';
  },
  receivedByFullName: function() {
    var user = Meteor.users.findOne(this.receivedBy);
    if (user) {
      return "{0} {1}".format(user.profile.firstName, user.profile.lastName);
    } else {
      return 'n/a';
    }
  },
  closedByFullName: function() {
    if (this.status === 'completed') {
      var user = Meteor.users.findOne(this.completedBy);
    } else {
      var user = Meteor.users.findOne(this.cancelledBy);
    }
    if (Roles.userIsInRole(user, 'guest')) {
      return "Guest";
    }
    if (user) {
      return "{0} {1}".format(user.profile.firstName, user.profile.lastName);
    }
  },
  formattedClosedWhen: function() {
    if (this.status === 'completed') {
      var when = moment(this.completedDate).zone(this.requestedZone);
    } else {
      var when = moment(this.cancelledDate).zone(this.requestedZone);
    }
    return when.format('MM/DD/YYYY, h:mm a');
  },
  formattedReceivedWhen: function() {
    if (this.receivedDate) {
      var when = moment(this.receivedDate).zone(this.requestedZone);
      if (when) {
        return when.format('MM/DD/YYYY, h:mm a');
      }
    } else {
      return 'n/a';
    }
  },
  formattedRequestedWhen: function() {
    var when = moment(this.requestedDate).zone(this.requestedZone);
    if (when) {
      return when.format('MM/DD/YYYY, h:mm a');
    }
  },
  isUnassigned: function() {
    return this.status === 'requested';
  },
  groupsAssigned: function() {
    var hotelId = Session.get('hotelId');
    return Groups.find({
      hotelId: hotelId,
      servicesHandled: this.service.serviceId
    }, {
      $sort: {
        name: 1
      }
    });
  }
});
