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
