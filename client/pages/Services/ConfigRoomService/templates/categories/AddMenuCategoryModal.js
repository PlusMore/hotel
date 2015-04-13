Template.AddMenuCategoryModal.helpers({
  hotelId: function() {
    return Session.get('hotelId');
  },
  menuCategorySchema: function() {
    return Schema.MenuCategory;
  }
});

AutoForm.hooks({
  newMenuCategory: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "remove", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Created New Category');
      BootstrapModalPrompt.dismiss();
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error) {
      if (operation !== 'validation') {
        Messages.error(error.message);
      }
    },
  }
});
