Template.AddMenuItemModal.helpers({
	menuCategoryId: function() {
    return Session.get('editMenuCategoryId');
  }
});

AutoForm.hooks({
  newMenuItem: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "remove", or the method name.
    onSuccess: function(operation, result, template) {
      Messages.success('Created New Menu Item!');
      BootstrapModalPrompt.dismiss();
    }, 

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error, template) {
      if (operation !== 'validation') {
        Messages.error(error.message);
      }
    },
  }
});