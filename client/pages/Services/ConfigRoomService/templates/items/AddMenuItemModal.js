Template.AddMenuItemModal.helpers({
  menuCategoryId: function() {
    return Session.get('editMenuCategoryId');
  }
});

Template.AddMenuItemModal.onRendered(function() {
  this.$progressButton = this.$('.progress-button');
  this.$progressButton.progressInitialize();
});

AutoForm.hooks({
  newMenuItem: {
    before: {
      insert: function(doc) {
        this.template.findParentTemplate('AddMenuItemModal').$progressButton.progressStart();
        return doc;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "remove", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Created New Menu Item!');
      this.template.findParentTemplate('AddMenuItemModal').$progressButton.progressFinish();
      BootstrapModalPrompt.dismiss();
    },
    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error) {
      if (operation !== "pre-submit validation") {
        Messages.error(error.message);
      }
      this.template.findParentTemplate('AddMenuItemModal').$progressButton.progressError();
    },
  }
});
