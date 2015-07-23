Template.configServiceTimepicker.onRendered(function() {
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

Template.ConfigService.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var hotelId = Session.get('hotelId');
    self.subscribe('groups', hotelId);
  });
});

Template.ConfigService.helpers({
  isChecked: function() {
    // sets property 'checked' of input checkbox to 'checked' or ''
    // if not configured, return ''
    return this.active ? 'checked' : '';
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
        $ne: this.type
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

Template.ConfigService.events({
  'change #toggle-service-switch': function(e, tmpl) {
    var hotelService = tmpl.data.hotelService;
    if (tmpl.$(e.currentTarget).prop('checked')) {
      Meteor.call('activateHotelService', hotelService.type, Session.get('hotelId'), function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success(hotelService.friendlyServiceType() + ' Enabled!');
        }
      });
    } else {
      Meteor.call('deactivateHotelService', hotelService.type, Session.get('hotelId'), function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.error(hotelService.friendlyServiceType() + ' Disabled');
        }
      });
    }
  },
  'click #unassign-group': function(e, tmpl) {
    e.preventDefault();
    var hotelId = Session.get('hotelId');
    var hotelService = tmpl.data.hotelService;
    Meteor.call('unassignGroupServiceId', this._id, hotelService._id, function(err, res) {
      if (err) {
        Messages.error(err);
      } else {
        Messages.success('Successfully unassigned group');
      }
    });
  }
});
