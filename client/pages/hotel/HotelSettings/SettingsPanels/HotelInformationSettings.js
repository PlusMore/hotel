Template.HotelInformationSettings.helpers({
  editHotelSchema: function() {
    return Schema.HotelInfo;
  }
});

Template.HotelInformationSettings.onRendered(function() {
  this.$('.progress-button').progressInitialize();
});

AutoForm.hooks({
  updateHotelInfo: {
    before: {
      method: function(doc) {
        this.template.$('.progress-button').progressStart();
        return doc;
      }
    },
    onSuccess: function(operation, result) {
      Messages.success('Changes Saved!');
      this.template.$('.progress-button').progressFinish();
    },
    onError: function(operation, error) {
      console.log(error);
      if (error.message && error.message === 'form failed validation') {
        // autoform takes care of these
      } else {
        Messages.error(error.message);
      }
      this.template.$('.progress-button').progressError();
    }
  }
});
