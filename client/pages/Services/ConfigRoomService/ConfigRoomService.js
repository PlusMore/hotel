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
    return Schema.ServiceConfiguration;
  },
  assignServiceToGroupSchema: function() {
    return Schema.AssignServiceToGroup;
  },
  groupOptions: function() {
    var unassignedCursor = Groups.find({
      hotelId: Session.get('hotelId'),
      servicesHandled: {
        $ne: 'roomService'
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

Template.ConfigRoomService.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var hotel = Session.get('hotelId');
    self.subscribe('hotelService', 'roomService', hotel);
    self.subscribe('hotelMenu', hotel);
    self.subscribe('groups', hotel);
  });
});

Template.roomServiceTimepicker.onRendered(function() {
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
    Meteor.call('resetServiceAvailability', this._id, function(err, res) {
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
  },
  'click #unassign-group': function(e) {
    e.preventDefault();
    var hotelId = Session.get('hotelId');
    var hotelService = HotelServices.findOne({
      hotelId: hotelId,
      type: 'roomService'
    });
    Meteor.call('unassignGroupServiceId', this._id, hotelService._id, function(err, res) {
      if (err) {
        Messages.error(err);
      } else {
        Messages.success('Successfully unassigned group');
      }
    });
  }
});
