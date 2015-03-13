Template.AddMenuCategoryModal.helpers({
	hotelId: function() {
		return Session.get('hotelId');
	}
});

AutoForm.hooks({
  newMenuCategory: {
    before: {
      insert: function(doc) {
        doc.active = false;
        return doc;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "remove", or the method name.
    onSuccess: function(operation, result, template) {
      Messages.success('Created New Category');
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