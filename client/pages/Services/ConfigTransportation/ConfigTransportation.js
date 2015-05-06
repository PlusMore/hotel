Template.transportationTimepicker.onRendered(function() {
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

Template.ConfigTransportation.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var hotel = Session.get('hotelId');
    self.subscribe('hotelService', 'transportation', hotel);
    self.subscribe('groups', hotel);
  });
});

Template.ConfigTransportation.helpers({
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
        $ne: 'transportation'
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

Template.ConfigTransportation.events({
  'change #toggle-transportation-switch': function(e, tmpl) {
    if (tmpl.$(e.currentTarget).prop('checked')) {
      Meteor.call('activateHotelService', 'transportation', Session.get('hotelId'), function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success('Transportation Services Enabled!');
        }
      });
    } else {
      Meteor.call('deactivateHotelService', 'transportation', Session.get('hotelId'), function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.error('Transportation Services Disabled');
        }
      });
    }
  },
  'click #unassign-group': function(e) {
    e.preventDefault();
    Meteor.call('unassignGroupServiceType', this._id, 'transportation', function(err, res) {
      if (err) {
        Messages.error(err);
      } else {
        Messages.success('Successfully unassigned group');
      }
    });
  }
});
