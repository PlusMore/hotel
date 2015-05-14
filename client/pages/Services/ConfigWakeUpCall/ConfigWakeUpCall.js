Template.wakeUpCallTimepicker.onRendered(function() {
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
});

Template.ConfigWakeUpCall.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var hotel = Session.get('hotelId');
    self.subscribe('hotelService', 'wakeUpCall', hotel);
    self.subscribe('wakeUpCall', hotel);
  });
});

Template.ConfigWakeUpCall.helpers({
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
    return Schema.ServiceConfiguration;
  },
  assignServiceToGroupSchema: function() {
    return Schema.AssignServiceToGroup;
  },
  groupOptions: function() {
    var unassignedCursor = Groups.find({
      hotelId: Session.get('hotelId'),
      servicesHandled: {
        $ne: this._id
      }
    });
    var unassigned = unassignedCursor.fetch();
    var unassignedIds = _.pluck(unassigned, '_id');
    var groupOptions = [];
    _.each(unassignedIds, function(groupId) {
      groupOptions.push({
        label: Groups.findOne(groupId).name,
        value: groupId
      });
    });
    return groupOptions;
  }
});

Template.ConfigWakeUpCall.events({
  'change #toggle-wakeupcall-switch': function(e, tmpl) {
    if (tmpl.$(e.currentTarget).prop('checked')) {
      Meteor.call('activateHotelService', 'wakeUpCall', Session.get('hotelId'), function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success('Wake-up Calls Enabled!');
        }
      });
    } else {
      Meteor.call('deactivateHotelService', 'wakeUpCall', Session.get('hotelId'), function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.error('Wake-up Calls Disabled');
        }
      });
    }
  },
  'click #unassign-group': function(e) {
    e.preventDefault();
    var hotelId = Session.get('hotelId');
    var hotelService = HotelServices.findOne({hotelId: hotelId, type: 'wakeUpCall'});
    Meteor.call('unassignGroupServiceId', this._id, hotelService._id, function(err, res) {
      if (err) {
        Messages.error(err);
      } else {
        Messages.success('Successfully unassigned group');
      }
    });
  }
});
