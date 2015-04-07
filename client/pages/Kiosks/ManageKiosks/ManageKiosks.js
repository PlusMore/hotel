Template.ManageKiosks.helpers({
  kiosks: function() {
    return HotelKiosks.find();
  }
});

Template.ManageKiosks.events({
	'click #create-new-kiosk': function(e) {
		e.preventDefault();
		BootstrapModalPrompt.prompt({
      dialogTemplate: Template.CreateKioskModal
    });
	}
});
