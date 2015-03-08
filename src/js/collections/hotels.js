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
  hotelPhotoSrc: function() {
    return this.photoUrl || '';
  }
});

Schema.hotelInfo = new SimpleSchema({
  hotelId: {
    type: String,
    optional: false
  },
  name: {
    type: String,
    label: "Hotel Name",
    max: 50,
    optional: false
  },
  phone: {
    type: String,
    label: "Phone Number",
    max: 20,
    optional: false
  },
  description: {
    type: String,
    label: "About Us",
    max: 2000,
    optional: true
  }
});