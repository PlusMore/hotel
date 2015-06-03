Template.ConfigAmenities.helpers({
  amenities: function() {
    return HotelAmenities.find({
      hotelId: Session.get('hotelId')
    });
  }
});

Template.ConfigAmenities.onCreated(function() {
  var self = this;

  self.autorun(function() {
    var hotel = Session.get('hotelId');
    self.subscribe('hotelAmenities', hotel);
    self.subscribe('amenityDetails', hotel);
  });
});

Template.ConfigAmenities.events({
  'click #add-new-amenity': function(e) {
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.AddHotelAmenityModal
    });
  }
});
