Template.newMenuCategoryModal.helpers({
  isVisible: function() {
    if (Session.get('showNewMenuCategoryModal')) {
      return true;
    } else {
      return false;
    }
  }, 
  isVisibleClass: function() {
    if (Session.get('showNewMenuCategoryModal')) {
      return 'show in';
    } else {
      return 'hidden';
    }
  }, 
  hotelId: function() {
    return Session.get('hotelId');
  }
});

Template.newMenuCategoryModal.events({
  'click [data-dismiss="modal"]':function(){
    Session.set('showNewMenuCategoryModal', false);
  }
});

Template.addMenuCategory.events({
  'click #add-menu-category': function () {
    Session.set('showNewMenuCategoryModal', true);
  }
});

AutoForm.hooks({
  newMenuCategory: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "remove", or the method name.
    onSuccess: function(operation, result, template) {
      console.log('success');
      Session.set('showNewMenuCategoryModal', false);
    }, 

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error, template) {
      if (operation !== 'validation') {
        Errors.throw(error.message);
        console.log('error');
      }
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