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
    if (!this) {
      return 'inactive';
    } else {
      return this.active ? 'active' : 'inactive';
    }
  },
  isChecked: function() {
    // sets property 'checked' of input checkbox to 'checked' or ''
    // if not configured, return ''
    if (!this) {
      return '';
    } else {
      return this.active ? 'checked' : '';
    }
  },
  showClass: function() {
    if (!this) {
      return 'hidden';
    } else {
      return this.active ? 'animated fadeIn' : 'hidden';
    }
  },
  configureServiceAvailabilitySchema: function() {
    return Schema.configureServiceAvailability;
  }
});

Template.configureRoomService.events({
  'change #service-switch': function(e, tmpl) {
    if (tmpl.$(e.currentTarget).prop('checked')) {
      Meteor.call('activateHotelService', 'roomService', Session.get('hotelId'));
    } else {
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