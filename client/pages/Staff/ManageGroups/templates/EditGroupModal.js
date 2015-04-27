Template.EditGroupModal.helpers({
  updateGroupSchema: function() {
    return Schema.Group;
  },
  hotelId: function() {
    return Session.get('hotelId');
  },
  group: function() {
    return Groups.findOne(Session.get('updateGroupId'));
  }
});

AutoForm.hooks({
  updateGroupForm: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result, template) {
      Messages.success('Successfully updated group!');
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
