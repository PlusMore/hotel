Template.editMenuCategory.rendered = function () {
  var roomServiceConfiguartion = this.data.serviceConfiguration;

  var startTime = moment().startOf('day');
  if (roomServiceConfiguartion.startMinutes) {
    startTime = startTime.minutes(roomServiceConfiguartion.startMinutes);
  }
  var endTime = moment().endOf('day');
  if (roomServiceConfiguartion.endMinutes) {
    endTime = moment().startOf('day').minutes(roomServiceConfiguartion.endMinutes);
  }

  this.$('.timepicker').pickatime({
    container: '#edit-menu-category',
    min: startTime.toDate(),
    max: endTime.toDate(),
    onSet: function(selection) {
      var minutes = selection.select;
      var controlName = this.$node.attr('name');
      var $form = this.$node.closest('form');
      if (controlName === 'startTime') {
        $form.find('[name=startMinutes]').val(minutes);
      } else if (controlName === 'endTime') {
        $form.find('[name=endMinutes]').val(minutes);
      }
    }
  });
};

Template.editMenuCategory.helpers({
  menuCategoryAvailabilitySchema: function() {
    return Schema.menuCategoryAvailability;
  },
  menuCategoryDescriptionSchema: function() {
    return Schema.menuCategoryDescriptionSchema;
  },
  isChecked: function() {
    // sets property 'checked' of input checkbox to 'checked' or ''
    // if not configured, return ''
    return this.active ? 'checked' : '';
  }
});


Template.editMenuCategory.events({
  'change #category-switch': function (e, tmpl) {
    if (tmpl.$(e.currentTarget).prop('checked')) {
      console.log('on');
      Meteor.call('activateMenuCategory', this._id);
    } else {
      console.log('off');
      Meteor.call('deactivateMenuCategory', this._id);
    }
  },
  'click .btn-reset-availability': function(e, tmpl) {
    var that = this;
    
    bootbox.dialog({
      message: "This will reset the availibilty of this category to it's default settings of anytime that room service is available.",
      title: "Reset Availability",
      buttons: {
        cancel: {
          label: "Cancel",
          className: "btn-cancel"
        },
        main: {
          label: "Reset Availability",
          className: "btn-default",
          callback: function() {
            Meteor.call('resetCategoryAvailability', that._id);
          }
        }
      }
    }); 
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
      if (operation !== 'validation') {
        Errors.throw(error.message);
      }
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
      if (operation !== 'validation') {
        Errors.throw(error.message);
      }
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