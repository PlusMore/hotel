Template.MenuCategory.helpers({
	isChecked: function() {
    // sets property 'checked' of input checkbox to 'checked' or ''
    // if not configured, return ''
    return this.active ? 'checked' : '';
  }
});

Template.MenuCategory.events({
	'change #toggle-category-switch': function (e, tmpl) {

    if (tmpl.$(e.currentTarget).prop('checked')) {
      console.log('on');
      Meteor.call('activateMenuCategory', this._id);
    } else {
      console.log('off');
      Meteor.call('deactivateMenuCategory', this._id);
    }
  },
  'click #edit-menu-category': function(e) {
    Session.set('editMenuCategoryId', this._id);
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.EditMenuCategoryModal
    });
  }
});