Template.MenuCategory.helpers({
  isChecked: function() {
    // sets property 'checked' of input checkbox to 'checked' or ''
    // if not configured, return ''
    return this.active ? 'checked' : '';
  }
});

Template.MenuCategory.events({
  'change #toggle-category-switch': function(e, tmpl) {
    if (tmpl.$(e.currentTarget).prop('checked')) {
      Meteor.call('activateMenuCategory', this._id, function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success('Menu Category Enabled!');
        }
      });
    } else {
      Meteor.call('deactivateMenuCategory', this._id, function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.error('Menu Category Disabled');
        }
      });
    }
  }
});
