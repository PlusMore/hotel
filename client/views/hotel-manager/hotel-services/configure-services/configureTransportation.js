Template.configureTransportation.rendered = function () {
  this.$('.timepicker').pickatime({
    onSet: function(selection) {
      var minutes = selection.select;
      var controlName = this.$node.attr('name');
      var $reservationOptionsEl = this.$node.closest('.reservationOptions')
      if (controlName === 'reservationStartTime') {
        $reservationOptionsEl.find('[name=reservationStartMinutes]').val(minutes);
      } else if (controlName === 'reservationEndTime') {
        $reservationOptionsEl.find('[name=reservationEndMinutes]').val(minutes);
      }
    }
  });
};

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
  },
  configureServiceAvailabiltySchema: function() {
    return Schema.configureServiceAvailabilty;
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