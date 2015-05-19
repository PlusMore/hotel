Template.EditHotelAmenityModal.helpers({
  hotelId: function() {
    return Session.get('hotelId');
  },
  amenity: function() {
    var amenityId = Session.get('editAmenityId');
    return HotelAmenities.findOne(amenityId);
  }
});

Template.EditHotelAmenityModal.onRendered(function() {
  this.$progressButton = this.$('.progress-button');
  this.$progressButton.progressInitialize();
});

Template.editAmenityTimePicker.onRendered(function() {
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
  editAmenity: {
    before: {
      update: function(doc) {
        this.template.findParentTemplate('EditHotelAmenityModal').$progressButton.progressStart();
        return doc;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "remove", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Changes Saved');
      this.template.findParentTemplate('EditHotelAmenityModal').$progressButton.progressFinish();
      BootstrapModalPrompt.dismiss();
    },
    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error) {
      if (operation !== "pre-submit validation") {
        Messages.error(error.message);
      }
      this.template.findParentTemplate('EditHotelAmenityModal').$progressButton.progressError();
    },
  }
});
