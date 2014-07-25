Template.configureValetServices.rendered = function () {
  this.$('.timepicker').pickatime({
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

Template.configureValetServices.helpers({
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
  configureServiceAvailabilitySchema: function() {
    return Schema.configureServiceAvailability;
  }
});

Template.configureValetServices.events({
  'change #service-switch': function (e, tmpl) {
    if (tmpl.$(e.currentTarget).prop('checked')) {
      console.log('on');
      Meteor.call('activateHotelService', 'valetServices', Session.get('hotelId'));
    } else {
      console.log('off');
      Meteor.call('deactivateHotelService', 'valetServices', Session.get('hotelId'));
    }
  }
});