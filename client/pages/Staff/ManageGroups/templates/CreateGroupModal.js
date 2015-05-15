Template.CreateGroupModal.helpers({
  createNewGroupSchema: function() {
      return Schema.Group;
  },
  hotelId: function() {
    return Session.get('hotelId');
  }
});

AutoForm.hooks({
  addNewGroupForm: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result, template) {
      Messages.success('Successfully created group!');
      BootstrapModalPrompt.dismiss();
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "submit", or the method name.
    onError: function(operation, error, template) {
      if (operation !== "pre-submit validation") {
        Messages.error(error.message);
      }
    },
    beginSubmit: function() {
      this.template.$("#add-group-submit").prop('disabled', true);
    },
    endSubmit: function() {
      this.template.$("#add-group-submit").prop('disabled', false);
    }
  }
});
