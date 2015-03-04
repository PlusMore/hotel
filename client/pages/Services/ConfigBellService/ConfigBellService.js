Template.ConfigBellService.rendered = function () {
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

Template.ConfigBellService.helpers({
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

Template.ConfigBellService.events({
  'change #toggle-bellservice-switch': function (e, tmpl) {
    if (tmpl.$(e.currentTarget).prop('checked')) {
      Meteor.call('activateHotelService', 'bellService', Session.get('hotelId'), function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success('Bell Service Enabled!');
        }
      });
    } else {
      Meteor.call('deactivateHotelService', 'bellService', Session.get('hotelId'), function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.error('Bell Service Disabled');
        }
      });
    }
  }
});