Template.AddMenuCategoryModal.helpers({
  hotelId: function() {
    return Session.get('hotelId');
  },
  menuCategorySchema: function() {
    return Schema.MenuCategory;
  }
});

Template.AddMenuCategoryModal.onRendered(function() {
  this.$progressButton = this.$('.progress-button');
  this.$progressButton.progressInitialize();
});

AutoForm.hooks({
  newMenuCategory: {
    before: {
      insert: function(doc) {
        this.template.findParentTemplate('AddMenuCategoryModal').$progressButton.progressStart();
        return doc;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "remove", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Created New Category');
      this.template.findParentTemplate('AddMenuCategoryModal').$progressButton.progressFinish();
      BootstrapModalPrompt.dismiss();
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error) {
      if (operation !== "pre-submit validation") {
        Messages.error(error.message);
      }
      this.template.findParentTemplate('AddMenuCategoryModal').$progressButton.progressError();
    },
  }
});
