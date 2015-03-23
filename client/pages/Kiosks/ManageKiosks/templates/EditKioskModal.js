Template.EditKioskModal.helpers({
  updateKioskSchema: function() {
    return Schema.HotelKiosk;
  },
  hotelId: function() {
    return Session.get('hotelId');
  },
  kiosk: function() {
    return HotelKiosks.findOne(Session.get('editKioskId'));
  }
});

AutoForm.hooks({
  updateKioskForm: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result, template) {
      Messages.success('Successfully updated Kiosk!');
      BootstrapModalPrompt.dismiss();
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "submit", or the method name.
    onError: function(operation, error, template) {
      if (operation !== "validation") {
        Messages.error(error.message);
      }
    },
  }
});
