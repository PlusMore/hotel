Template.ConfigHouseKeeping.helpers({
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

Template.ConfigHouseKeeping.events({
  'change #toggle-housekeeping-switch': function(e, tmpl) {
    if (tmpl.$(e.currentTarget).prop('checked')) {
      Meteor.call('activateHotelService', 'houseKeeping', Session.get('hotelId'), function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success('Housekeeping Enabled!');
        }
      });
    } else {
      Meteor.call('deactivateHotelService', 'houseKeeping', Session.get('hotelId'), function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.error('Housekeeping Disabled');
        }
      });
    }
  }
});

Template.houseKeepingTimepicker.rendered = function() {
  this.$('.timepicker').pickatime({
    container: $("#main-wrapper"),
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
