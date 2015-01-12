Template.configureHotelAmenities.helpers({
  amenities: function () {
    return HotelAmenities.find({hotelId: Session.get('hotelId')});
  }
});