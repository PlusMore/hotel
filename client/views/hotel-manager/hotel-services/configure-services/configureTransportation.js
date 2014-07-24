Template.configureTransportation.helpers({
  isActivatedClass: function () {
    // if not configured, return inactive
    if (!this.configuration) {
      return 'inactive';
    } else {
      return this.configuration.active ? 'active' : 'inactive';
    }
  },
  isChecked: function() {
    // sets property 'checked' of input checkbox to 'checked' or ''
    // if not configured, return ''
    if (!this.configuration) {
      return '';
    } else {
      return this.configuration.active ? 'checked' : '';
    }
  }
});

Template.configureTransportation.events({
  'change #service-switch': function (e, tmpl) {
    if (tmpl.$(e.currentTarget).prop('checked')) {
      console.log('on');
      Meteor.call('activateHotelService', 'transportation', Session.get('hotelId'));
    } else {
      console.log('off');
      Meteor.call('deactivateHotelService', 'transportation', Session.get('hotelId'));
    }
  }
});