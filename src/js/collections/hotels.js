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
