/* ---------------------------------------------------- +/

## Hotels ##

All code related to the Hotels collection goes here.

/+ ---------------------------------------------------- */

Hotels = new Meteor.Collection('hotels');
// Allow/Deny

Hotels.allow({
  insert: function(userId, doc) {
    return false;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  remove: function(userId, doc) {
    return false;
  }
});

Hotels.helpers({
  photoSrc: function() {
    return this.photoUrl || '';
  },
  arrivalTime: function() {
    if (this.settings && this.settings.arrivalTime) {
      return this.settings.arrivalTime;
    } else {
      // default time is noon
      return "12:00 PM";
    }
  },
  departureTime: function() {
    if (this.settings && this.settings.departureTime) {
      return this.settings.departureTime;
    } else {
      // default time is noon
      return "12:00 PM";
    }
  },
  arrivalMinutes: function() {
    if (this.settings && this.settings.arrivalMinutes) {
      return this.settings.arrivalMinutes;
    } else {
      // default time is noon (720 minutes from start of day)
      return 720;
    }
  },
  departureMinutes: function() {
    if (this.settings && this.settings.departureMinutes) {
      return this.settings.departureMinutes;
    } else {
      // default time is noon (720 minutes from start of day)
      return 720;
    }
  }
});

Meteor.methods({
  changeHotelPhoto: function(InkBlob, hotelId) {
    check(InkBlob, Object);
    var user = Meteor.user();

    if (user && Roles.userIsInRole(user, ['hotel-manager', 'admin'])) {

      if (hotelId) {
        var hotel = Hotels.findOne(hotelId);

        if (!hotel) {
          Errors.throw('No hotel found');
        }

        Hotels.upsert(hotelId, {
          $set: {
            photoUrl: InkBlob.url,
            photoName: InkBlob.filename,
            photoSize: InkBlob.size
          }
        });
      }
    } else {
      Errors.throw('You do not have proper access to this functionality.');
    }
  },
  updateHotelInfo: function(doc) {
    check(doc, Object);
    var user = Meteor.user();

    if (user && Roles.userIsInRole(user, ['hotel-manager', 'admin'])) {
      Hotels.upsert(doc.hotelId, {
        $set: {
          name: doc.name,
          phone: doc.phone,
          description: doc.description
        }
      });
    } else {
      Errors.throw('You do not have proper access to this functionality.');
    }
  },
  setHotelArrivalAndDepartureTimes: function(doc) {
    check(doc._id, String);
    check(doc.arrivalTime, String);
    check(doc.arrivalMinutes, Number);
    check(doc.departureTime, String);
    check(doc.departureMinutes, Number);

    var settings = {
      arrivalTime: doc.arrivalTime,
      arrivalMinutes: doc.arrivalMinutes,
      departureTime: doc.departureTime,
      departureMinutes: doc.departureMinutes
    };

    Hotels.update({
      _id: doc._id
    }, {
      $set: {
        settings: settings
      }
    });
  }
});
