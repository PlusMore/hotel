Template.ConfigRoomService.helpers({
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

Template.ConfigRoomService.rendered = function() {
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

Template.ConfigRoomService.events({
  'change #toggle-roomservice-switch': function(e, tmpl) {
    if (tmpl.$(e.currentTarget).prop('checked')) {
      Meteor.call('activateHotelService', 'roomService', Session.get('hotelId'), function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success('Room Service Enabled!');
        }
      });
    } else {
      Meteor.call('deactivateHotelService', 'roomService', Session.get('hotelId'), function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.error('Room Service Disabled');
        }
      });
    }
  },
  'click .btn-reset': function(e, tmpl) {
    Meteor.call('resetServiceAvailability', that._id, function(err, res) {
      if (err) {
        Messages.error(err);
      } else {
        Messages.success('Availability Reset');
      }
    });
  },
  'click #add-menu-category': function(e) {
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.AddMenuCategoryModal
    });
  }
});
