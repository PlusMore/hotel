Template.editMenuItem.helpers({
  isChecked: function() {
    // sets property 'checked' of input checkbox to 'checked' or ''
    // if not configured, return ''
    return this.active ? 'checked' : '';
  }
});

Template.editMenuItem.events({
  'change #item-switch': function (e, tmpl) {
    if (tmpl.$(e.currentTarget).prop('checked')) {
      Meteor.call('activateMenuItem', this._id);
    } else {
      Meteor.call('deactivateMenuItem', this._id);
    }
  }
});