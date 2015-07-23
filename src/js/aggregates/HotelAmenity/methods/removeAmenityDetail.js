Meteor.methods({
  removeAmenityDetail: function(detailId) {
    return AmenityDetails.remove(detailId);
  }
});
