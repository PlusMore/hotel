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

Schema.GuestCheckIn = new SimpleSchema({
  hotelId: {
    type: String
  },
  roomId: {
    type: String
  },
  guestFirstName: {
    type: String,
    label: "First Name"
  },
  guestLastName: {
    type: String,
    label: "Last Name"
  },
  checkoutDate: {
    type: Date,
    label: "Check-Out Date"
  },
  zone: {
    type: Number
  }
});

Meteor.methods({
  checkInGuest: function(doc) {
    check(doc, Schema.GuestCheckIn);
    
    var room = Rooms.findOne(doc.roomId);

    if (!room) {
      throw new Meteor.Error(500, 'Not a valid room');
    }

    var checkoutZone = moment(doc.checkoutDate).zone();

    var stay = {
      hotelId: doc.hotelId,
      guestFirstName: doc.guestFirstName,
      guestLastName: doc.guestLastName,
      zone: checkoutZone,
      checkInDate: new Date(),
      checkoutDate: doc.checkoutDate
    }

    var stayId = Stays.insert(stay);

    Rooms.update(room._id, {$set: {stayId: stayId}});

    return room.name;
  }
});
