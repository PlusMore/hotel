Stays = new Meteor.Collection('stays');

Stays.allow({
  insert: function(userId, doc) {
    return false;
  },
  update: function(userId, doc, fields, modifier) {
    return userId === doc.userId;
  },
  remove: function(userId, doc) {
    return false;
  }
});

Stays.helpers({
  stayCheckInDate: function() {
    var checkin = moment(this.checkInDate).utcOffset(this.zone);
    return checkin.format('MM/DD/YYYY');
  },
  stayCheckOutDate: function() {
    var checkout = moment(this.checkoutDate).utcOffset(this.zone);
    return checkout.format('MM/DD/YYYY');
  },
  stayCheckInTime: function() {
    var checkin = moment(this.checkInDate).utcOffset(this.zone);
    return checkin.format('(h:mm a)');
  },
  stayCheckOutTime: function() {
    var checkout = moment(this.checkoutDate).utcOffset(this.zone);
    return checkout.format('(h:mm a)');
  }
});

Meteor.methods({
  stayOver: function(stayId) {
    var stay = Stays.findOne(stayId);

    // if stay is over, end it.
    if (moment().zone(stay.zone) > moment(stay.checkoutDate).zone(stay.zone)) {
      Stays.update(stayId, {
        $set: {
          active: false
        }
      });
      Devices.update(stay.deviceId, {
        $unset: {
          stayId: 1
        }
      });
      if (stay.users && stay.users.length > 0) {
        Meteor.users.update({
          _id: {
            $in: stay.users
          }
        }, {
          $unset: {
            stayId: 1
          }
        });
      }
    }
  }
});
