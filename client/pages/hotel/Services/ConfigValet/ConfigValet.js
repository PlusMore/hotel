Template.ConfigValet.rendered = function () {
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

Template.ConfigValet.helpers({
  isChecked: function() {
    // sets property 'checked' of input checkbox to 'checked' or ''
    // if not configured, return ''
    if (!this.configuration) {
      return '';
    } else {
      return this.configuration.active ? 'checked' : '';
    }
  },
  configureServiceSchema: function() {
    return Schema.configureService;
  }
});

Template.ConfigValet.events({
  'change #toggle-valet-switch': function (e, tmpl) {
    if (tmpl.$(e.currentTarget).prop('checked')) {
      console.log('on');
      Meteor.call('activateHotelService', 'valetServices', Session.get('hotelId'));
    } else {
      console.log('off');
      Meteor.call('deactivateHotelService', 'valetServices', Session.get('hotelId'));
    }
  }
});