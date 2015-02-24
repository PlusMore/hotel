Template.ConfigAmenities.helpers({
	amenities: function() {
		return HotelAmenities.find({});
	}
});

Template.ConfigAmenities.events({
	'click #add-new-amenity': function(e) {
		BootstrapModalPrompt.prompt({
      dialogTemplate: Template.AddHotelAmenityModal
    });
	}
});