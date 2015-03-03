Template.ConfigureDevices.helpers({
  hotel: function() {
    var hotelId = Session.get('hotelId');
    if (hotelId) {
      var hotel = Hotels.findOne(hotelId);
      if (hotel) {
        return hotel;
      }
    }
  }
});
