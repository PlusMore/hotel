Template.EditMenuCategory.helpers({
  menuCategoryAvailabilitySchema: function() {
    return Schema.MenuCategoryAvailability;
  },
  menuCategoryDescriptionSchema: function() {
    return Schema.MenuCategoryDescription;
  },
  isChecked: function() {
    // sets property 'checked' of input checkbox to 'checked' or ''
    // if not configured, return ''
    return this.active ? 'checked' : '';
  }
});

Template.EditMenuCategory.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var hotel = Session.get('hotelId');
    self.subscribe('hotelService', 'roomService', hotel);
    self.subscribe('hotelMenu', hotel);
  });
});

Template.EditMenuCategory.events({
  'change #toggle-category-switch': function(e, tmpl) {

    if (tmpl.$(e.currentTarget).prop('checked')) {
      Meteor.call('activateMenuCategory', this._id, function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success('Category Enabled!');
        }
      });
    } else {
      Meteor.call('deactivateMenuCategory', this._id, function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.error('Category Disabled');
        }
      });
    }
  },
  'click .btn-reset-availability': function(e, tmpl) {
    Meteor.call('resetCategoryAvailability', this._id, function(err, res) {
      if (err) {
        Messages.error(err);
      } else {
        Messages.success('Availability Reset!');
      }
    });
  },
  'click #add-menu-item': function(e) {
    e.preventDefault();
    Session.set('editMenuCategoryId', this._id);
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.AddMenuItemModal
    });
  }
});

Template.EditMenuCategoryTimepicker.rendered = function() {
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
    container: $("#main-wrapper"),
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

AutoForm.hooks({
  editMenuCategory: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "remove", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Changes Saved!')
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error) {
      if (operation !== 'validation') {
        Messages.error(error.message);
      }
    },
    beginSubmit: function() {
      this.template.$("#edit-category-submit").prop('disabled', true);
    },
    endSubmit: function() {
      this.template.$("#edit-category-submit").prop('disabled', false);
    }
  },
  configureMenuCategoryAvailability: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "remove", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Availability Set!')
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error) {
      if (operation !== 'validation') {
        Messages.error(error.message);
      }
    },
    beginSubmit: function() {
      this.template.$("#update-availability-submit").prop('disabled', true);
    },
    endSubmit: function() {
      this.template.$("#update-availability-submit").prop('disabled', false);
    }
  }
});
