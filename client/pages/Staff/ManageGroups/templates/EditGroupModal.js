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

Template.EditGroupModal.onRendered(function() {
  this.$('.progress-button').progressInitialize();
});

AutoForm.hooks({
  updateGroupForm: {
    before: {
      update: function(doc) {
        this.template.$('.progress-button').progressStart();
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Successfully updated group!');
      this.template.$('.progress-button').progressFinish();
      BootstrapModalPrompt.dismiss();
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "submit", or the method name.
    onError: function(operation, error) {
      if (operation !== "pre-submit validation") {
        Messages.error(error.message);
      }
      this.template.$('.progress-button').progressError();
    },
  }
});
