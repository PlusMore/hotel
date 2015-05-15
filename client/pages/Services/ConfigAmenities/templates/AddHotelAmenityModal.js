Template.AddHotelAmenityModal.helpers({
  hotelId: function() {
    return Session.get('hotelId');
  }
});

Template.amenityTimePicker.rendered = function() {
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
};

AutoForm.hooks({
  newAmenity: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "remove", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Amenity Created');
      BootstrapModalPrompt.dismiss();
    },
    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error) {
      if (operation !== "pre-submit validation") {
        Messages.error(error.message);
      }
    },
    beginSubmit: function() {
      this.template.$("#add-amenity-submit").prop('disabled', true);
    },
    endSubmit: function() {
      this.template.$("#add-amenity-submit").prop('disabled', false);
    }
  }
});
