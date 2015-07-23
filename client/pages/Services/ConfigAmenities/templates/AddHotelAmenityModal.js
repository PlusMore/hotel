Template.AddHotelAmenityModal.helpers({
  hotelId: function() {
    return Session.get('hotelId');
  }
});

Template.AddHotelAmenityModal.onRendered(function() {
  this.$progressButton = this.$('.progress-button');
  this.$progressButton.progressInitialize();
});

Template.amenityTimePicker.onRendered(function() {
  this.$('.timepicker').pickatime({
    container: $("#main-wrapper"),
    onSet: function(selection) {
      var minutes = selection.select;
      var controlName = this.$node.attr('name');
      var $form = this.$node.closest('form');
      if (controlName === 'startTime') {
        $form.find('[name=startMinutes]').val(minutes);
      } else if (controlName === 'endTime') {
        $form.find('[name=endMinutes]').val(minutes);
      }
    }
  });
});

AutoForm.hooks({
  newAmenity: {
    before: {
      insert: function(doc) {
        this.template.findParentTemplate('AddHotelAmenityModal').$progressButton.progressStart();
        return doc;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "remove", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Amenity Created');
      this.template.findParentTemplate('AddHotelAmenityModal').$progressButton.progressFinish();
      BootstrapModalPrompt.dismiss();
    },
    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error) {
      if (operation !== "pre-submit validation") {
        Messages.error(error.message);
      }
      this.template.findParentTemplate('AddHotelAmenityModal').$progressButton.progressError();
    },
  }
});
