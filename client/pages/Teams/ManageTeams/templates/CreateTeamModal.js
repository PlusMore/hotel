Template.CreateTeamModal.helpers({
  createNewTeamSchema: function() {
      return Schema.Team;
  },
  hotelId: function() {
    return Session.get('hotelId');
  }
});

AutoForm.hooks({
  addNewTeamForm: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result, template) {
      Messages.success('Successfully created team!');
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
