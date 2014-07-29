Template.editMenuCategory.helpers({
  menuCategoryAvailabilitySchema: function() {
    return Schema.menuCategoryAvailability;
  },
  menuCategoryDescriptionSchema: function() {
    return Schema.menuCategoryDescriptionSchema;
  }
});




AutoForm.hooks({
  editMenuCategory: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "remove", or the method name.
    onSuccess: function(operation, result, template) {
      console.log('success');
    }, 

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error, template) {
      console.log('error');
    },

    // Called at the beginning and end of submission, respectively.
    // This is the place to disable/enable buttons or the form,
    // show/hide a "Please wait" message, etc. If these hooks are
    // not defined, then by default the submit button is disabled
    // during submission.
    beginSubmit: function(formId, template) {
      // disable button
      // change text to 'submitting'
      console.log('begin submit');
    },
    endSubmit: function(formId, template) {
      // enable button
      console.log('end submit');
    }
  },
  configureMenuCategoryAvailability: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "remove", or the method name.
    onSuccess: function(operation, result, template) {
      console.log('success');
    }, 

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error, template) {
      console.log('error');
    },

    // Called at the beginning and end of submission, respectively.
    // This is the place to disable/enable buttons or the form,
    // show/hide a "Please wait" message, etc. If these hooks are
    // not defined, then by default the submit button is disabled
    // during submission.
    beginSubmit: function(formId, template) {
      // disable button
      // change text to 'submitting'
      console.log('begin submit');
    },
    endSubmit: function(formId, template) {
      // enable button
      console.log('end submit');
    }
  }
});