Template.HotelTimeSettings.helpers({
  defaultHotelTimesSchema: function() {
    return Schema.HotelTimes;
  }
});

Template.HotelTimeSettings.onRendered(function() {
  this.$progressButton = this.$('.progress-button');
  this.$progressButton.progressInitialize();
  this.$('.timepicker').pickatime({
    container: $("#main-wrapper"),
    onSet: function(selection) {
      var minutes = selection.select;
      var controlName = this.$node.attr('name');
      var $form = this.$node.closest('form');
      if (controlName === 'arrivalTime') {
        $form.find('[name=arrivalMinutes]').val(minutes);
      } else if (controlName === 'departureTime') {
        $form.find('[name=departureMinutes]').val(minutes);
      }
    }
  });
});

AutoForm.hooks({
  updateHotelTimesForm: {
    before: {
      method: function(doc) {
        this.template.findParentTemplate('HotelTimeSettings').$progressButton.progressStart();
        return doc;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Successfully updated!');
      this.template.findParentTemplate('HotelTimeSettings').$progressButton.progressFinish();
    },
    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "submit", or the method name.
    onError: function(operation, error) {
      if (operation !== "validation") {
        Messages.error(error.message);
      }
      this.template.findParentTemplate('HotelTimeSettings').$progressButton.progressError();
    },
  }
});
