Template.HotelInformationSettings.helpers({
  editHotelSchema: function() {
    return Schema.HotelInfo;
  }
});

Template.HotelInformationSettings.onRendered(function() {
  this.$progressButton = this.$('.progress-button');
  this.$progressButton.progressInitialize();
});

AutoForm.hooks({
  updateHotelInfo: {
    before: {
      method: function(doc) {
        this.template.findParentTemplate('HotelInformationSettings').$progressButton.progressStart();
        return doc;
      }
    },
    onSuccess: function(operation, result) {
      Messages.success('Changes Saved!');
      this.template.findParentTemplate('HotelInformationSettings').$progressButton.progressFinish();
    },
    onError: function(operation, error) {
      console.log(error);
      if (error.message && error.message === 'form failed validation') {
        // autoform takes care of these
      } else {
        Messages.error(error.message);
      }
      this.template.findParentTemplate('HotelInformationSettings').$progressButton.progressError();
    }
  }
});
