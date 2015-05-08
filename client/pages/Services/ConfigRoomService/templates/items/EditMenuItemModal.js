Template.EditMenuItemModal.helpers({
  isChecked: function() {
    // sets property 'checked' of input checkbox to 'checked' or ''
    // if not configured, return ''
    return this.active ? 'checked' : '';
  },
  menuItem: function() {
    return MenuItems.findOne(Session.get('editMenuItemId'));
  }
});

Template.EditMenuItemModal.events({
  'change #toggle-item-switch': function(e, tmpl) {
    if (tmpl.$(e.currentTarget).prop('checked')) {
      Meteor.call('activateMenuItem', this._id, function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success('Menu Item Enabled!');
        }
      });
    } else {
      Meteor.call('deactivateMenuItem', this._id, function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.error('Menu Item Disabled');
        }
      });
    }
  }
});

AutoForm.hooks({
  editMenuItem: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "remove", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Item Edited!');
      BootstrapModalPrompt.dismiss();
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error) {
      if (operation !== "pre-submit validation") {
        Messages.error(error.message);
      }
    }
  }
});
