Template.RoomHasDeviceCell.helpers({
  roomHasDevice: function() {
    return Devices.find({roomId: this._id}).count() > 0;
  }
});

Template.RoomActionsCell.helpers({
  isHotelManager: function() {
    return Roles.userIsInRole(Meteor.userId(), ['hotel-manager', 'admin']);
  }
});

Template.RoomActionsCell.events({
  'click #edit-room': function(e) {
    Session.set('editRoomId', this._id);
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.EditRoomModal
    });
  },
  'click #delete-room': function(e) {
    if (confirm("Are you sure you'd like to delete this room?")) {
      Meteor.call('removeRoom', this._id);
      Messages.success(this.name + ' Deleted');
    }
  }
});
