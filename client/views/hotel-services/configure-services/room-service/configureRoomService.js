Template.configureRoomService.rendered = function () {
  this.$('.timepicker').pickatime({
    container: '#configure-room-service',
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

Template.configureRoomService.helpers({
  isActivatedClass: function() {
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
  showClass: function() {
    if (!this.configuration) {
      return 'hidden';
    } else {
      return this.configuration.active ? 'animated fadeIn' : 'hidden';
    }
  },
  configureServiceAvailabilitySchema: function() {
    return Schema.configureServiceAvailability;
  }
});

Template.configureRoomService.events({
  'change #service-switch': function(e, tmpl) {
    if (tmpl.$(e.currentTarget).prop('checked')) {
      console.log('on');
      Meteor.call('activateHotelService', 'roomService', Session.get('hotelId'));
    } else {
      console.log('off');
      Meteor.call('deactivateHotelService', 'roomService', Session.get('hotelId'));
    }
  },
  'click .btn-reset': function(e, tmpl) {
    var that = this;
    
    bootbox.dialog({
      message: "This will reset the availibilty of this service to it's default settings of anytime.",
      title: "Reset Availability",
      buttons: {
        cancel: {
          label: "Cancel",
          className: "btn-cancel"
        },
        main: {
          label: "Reset Availability",
          className: "btn-default",
          callback: function() {
            Meteor.call('resetServiceAvailability', that._id);
          }
        }
      }
    }); 
  }
});