HotelAmenities = new Meteor.Collection('hotelAmenities');

HotelAmenities.allow({
  insert: function(userId, doc){
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  update:  function(userId, doc, fieldNames, modifier){
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  remove:  function(userId, doc){
    return false;
  }
});

Schema.Amenity = new SimpleSchema({
  name: {
    type: String,
    label: "Amenity Name",
    max: 200
  },
  description: {
    type: String,
    label: "Description (Optional)",
    optional: true
  },
  hotelId: {
    type: String
  },
  availableAnytime: {
    type: Boolean,
    label: "Available 24/7"
  },
  startTime: {
    type: String,
    label: 'Start Time',
    optional: true
  },
  endTime: {
    type: String,
    label: 'End Time',
    optional: true
  },
  startMinutes: {
    type: Number,
    optional: true
  },
  endMinutes: {
    type: Number,
    optional: true
  }
});

HotelAmenities.attachSchema(Schema.Amenity);

Meteor.methods({
  removeAmenity: function (amenityId) {
    check(amenityId, String);

    return [
      HotelAmenities.remove(amenityId),
      AmenityDetails.remove({amenityId: amenityId})
    ];
  }

});