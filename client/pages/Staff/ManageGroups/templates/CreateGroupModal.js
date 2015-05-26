Template.CreateGroupModal.helpers({
  createNewGroupSchema: function() {
    return Schema.Group;
  },
  hotelId: function() {
    return Session.get('hotelId');
  }
});

Template.CreateGroupModal.onRendered(function() {
  this.$progressButton = this.$('.progress-button');
  this.$progressButton.progressInitialize();
});

AutoForm.hooks({
  addNewGroupForm: {
    before: {
      insert: function(doc) {
        this.template.findParentTemplate('CreateGroupModal').$progressButton.progressStart();
        return doc;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result, template) {
      Messages.success('Successfully created group!');
      this.template.findParentTemplate('CreateGroupModal').$progressButton.progressFinish();
      BootstrapModalPrompt.dismiss();
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "submit", or the method name.
    onError: function(operation, error, template) {
      if (operation !== "pre-submit validation") {
        Messages.error(error.message);
      }
      this.template.findParentTemplate('CreateGroupModal').$progressButton.progressError();
    }
  }
});
