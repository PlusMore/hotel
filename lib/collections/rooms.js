Rooms = new Meteor.Collection('rooms');

// Allow/Deny

Rooms.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  update: function(userId, doc, fieldNames, modifier) {
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  remove: function(userId, doc) {
    return false;
  }
});

Rooms.helpers({
  roomHasActiveStay: function() {
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
  roomGetStay: function() {
    return Stays.findOne(this.stayId);
  }
});

Schema.Room = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  hotelId: {
    type: String
  },
  stayId: {
    type: String,
    optional: true
  }
});

Rooms.attachSchema(Schema.Room);


Meteor.methods({
  insertMultipleRooms: function(doc) {
    check(doc.startNum, Number);
    check(doc.endNum, Number);
    check(doc.hotelId, String);

    var roomRange = _.range(doc.startNum, doc.endNum + 1);

    _.each(roomRange, function(i) {
      var room = "Room " + i;

      // upsert doesn't overwrite room if it already exists
      Rooms.update({
        hotelId: doc.hotelId,
        name: room
      }, {
        $set: {
          hotelId: doc.hotelId,
          name: room
        }
      }, {
        upsert: true
      });
    });
  },
  editRoom: function(doc) {
    check(doc.name, String);
    check(doc.hotelId, String);
    check(doc.roomId, String);

    Rooms.update({
      _id: doc.roomId
    }, {
      $set: {
        name: doc.name
      }
    });
  },
  removeRoom: function(roomId) {
    check(roomId, String);

    var user = Meteor.user();

    if (!Roles.userIsInRole(user, ['hotel-manager', 'admin'])) {
      throw new Meteor.Error('You do not have permission to do that');
    } else {
      Rooms.remove(roomId);
    }
  }
});