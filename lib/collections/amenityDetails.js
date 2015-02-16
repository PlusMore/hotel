AmenityDetails = new Meteor.Collection('amenityDetails');

AmenityDetails.allow({
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

Schema.AmenityDetail = new SimpleSchema({
  hotelId: {
    type: String
  },
  amenityId: {
    type: String
  },
  detail: {
    type: String,
    max: 100
  }
});

AmenityDetails.attachSchema(Schema.AmenityDetail);

Meteor.methods({
  removeAmenityDetail: function(detailId) {
    return AmenityDetails.remove(detailId);
  }
})
