Template.PreregisterStay.helpers({
  preregisterSchema: function() {
    return Schema.PreregisteredStay;
  },
  hotelId: function() {
    return Session.get('hotelId');
  },
  pickadateOptions: function() {
    return {
      container: $("#main-wrapper"),
      min: new Date()
    };
  }
});

Template.PreregisterStay.onRendered(function() {
  this.$progressButton = this.$('.progress-button');
  this.$progressButton.progressInitialize();
});

AutoForm.hooks({
  preregisterStayForm: {
    before: {
      method: function(doc) {
        //return doc; (synchronous)
        //return false; (synchronous, cancel)
        //this.result(doc); (asynchronous)
        //this.result(false); (asynchronous, cancel)
        if (doc.preReg.endDate <= doc.preReg.startDate) {
          Messages.error('Check-out date must be after Check-in date');
          return false;
        }
        this.template.findParentTemplate('PreregisterStay').$progressButton.progressStart();
        return doc;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Successfully pre-registered stay!');
      this.template.findParentTemplate('PreregisterStay').$progressButton.progressFinish();
      Router.go('Stays.Upcoming');
    },
    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "submit", or the method name.
    onError: function(operation, error) {
      if (operation !== "pre-submit validation") {
        Messages.error(error.message);
      }
      this.template.findParentTemplate('PreregisterStay').$progressButton.progressError();
    },
  }
});
