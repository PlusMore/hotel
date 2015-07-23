Meteor.methods({
  removeAmenity: function(amenityId) {
    check(amenityId, String);

    return [
      HotelAmenities.remove(amenityId),
      AmenityDetails.remove({
        amenityId: amenityId
      })
    ];
  }
});
