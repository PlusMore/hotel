Template.viewDevicesCheckinCell.helpers({
  isActive: function() {
    var stay = Stays.findOne(this.stayId);
    if (stay) {
      var now = Session.get('currentTime') || new Date();
      var checkin = moment(stay.checkInDate).utcOffset(stay.zone);
      var checkout = moment(stay.checkoutDate).utcOffset(stay.zone);
      if (checkin <= now && now <= checkout) {
        return true;
      }
    }
    return false;
  },
  checkInDate: function() {
    var stay = Stays.findOne(this.stayId);
    var now = Session.get('currentTime') || new Date();
    var checkin = moment(stay.checkInDate).utcOffset(stay.zone);
    var checkout = moment(stay.checkoutDate).utcOffset(stay.zone);
    if (checkin <= now && now <= checkout) {
      return checkin.format('MM/DD/YYYY');
    }
  },
  checkInTime: function() {
    var stay = Stays.findOne(this.stayId);
    var now = Session.get('currentTime') || new Date();
    var checkin = moment(stay.checkInDate).utcOffset(stay.zone);
    var checkout = moment(stay.checkoutDate).utcOffset(stay.zone);
    if (checkin <= now && now <= checkout) {
      return checkin.format('(h:mm a)');
    }
  }
});

Template.viewDevicesCheckoutCell.helpers({
  isActive: function() {
    var stay = Stays.findOne(this.stayId);
    if (stay) {
      var now = Session.get('currentTime') || new Date();
      var checkin = moment(stay.checkInDate).utcOffset(stay.zone);
      var checkout = moment(stay.checkoutDate).utcOffset(stay.zone);
      if (checkin <= now && now <= checkout) {
        return true;
      }
    }
    return false;
  },
  checkOutDate: function() {
    var stay = Stays.findOne(this.stayId);
    var now = Session.get('currentTime') || new Date();
    var checkin = moment(stay.checkInDate).utcOffset(stay.zone);
    var checkout = moment(stay.checkoutDate).utcOffset(stay.zone);
    if (checkin <= now && now <= checkout) {
      return checkout.format('MM/DD/YYYY');
    }
  },
  checkOutTime: function() {
    var stay = Stays.findOne(this.stayId);
    var now = Session.get('currentTime') || new Date();
    var checkin = moment(stay.checkInDate).utcOffset(stay.zone);
    var checkout = moment(stay.checkoutDate).utcOffset(stay.zone);
    if (checkin <= now && now <= checkout) {
      return checkout.format('(h:mm a)');
    }
  }
});

Template.viewDevicesActionCell.helpers({
  isHotelManager: function() {
    return Roles.userIsInRole(Meteor.user(), ['hotel-manager', 'admin']);
  }
});

Template.viewDevicesActionCell.events({
  'click .del-device': function(e) {
    e.preventDefault();
    if (confirm("Are you sure you'd like to delete this device?")) {
      Meteor.call('removeDevice', this._id);
      return true;
    }
    return false;
  }
});
