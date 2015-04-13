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

AutoForm.hooks({
  preregisterStayForm: {
    before: {
      method: function(doc, template) {
        //return doc; (synchronous)
        //return false; (synchronous, cancel)
        //this.result(doc); (asynchronous)
        //this.result(false); (asynchronous, cancel)
        if (doc.preReg.endDate <= doc.preReg.startDate) {
          Messages.error('Check-out date must be after Check-in date');
          return false;
        }
        return doc;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Successfully pre-registered stay!');
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "submit", or the method name.
    onError: function(operation, error) {
      if (operation !== "validation") {
        Messages.error(error.message);
      }
    },
  }
});
