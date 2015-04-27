Template.RoomHasDeviceCell.helpers({
  roomHasDevice: function() {
    return Devices.find({
      roomId: this._id
    }).count() > 0;
  }
});

Template.RoomActiveStayCell.events({
  'click #view-stay-details': function(e) {
    e.preventDefault();
    var room = Rooms.findOne(this._id);
    Session.set('viewStayId', this.stayId);
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.StayDetailsModal
    });
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
});
