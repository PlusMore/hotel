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
  this.$progressButton = this.$('.progress-button');
  this.$progressButton.progressInitialize();
});

AutoForm.hooks({
  updateGroupForm: {
    before: {
      update: function(doc) {
        this.template.findParentTemplate('EditGroupModal').$progressButton.progressStart();
        return doc;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Successfully updated group!');
      this.template.findParentTemplate('EditGroupModal').$progressButton.progressFinish();
      BootstrapModalPrompt.dismiss();
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "submit", or the method name.
    onError: function(operation, error) {
      if (operation !== "pre-submit validation") {
        Messages.error(error.message);
      }
      this.template.findParentTemplate('EditGroupModal').$progressButton.progressError();
    },
  }
});
