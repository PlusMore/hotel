Template.RoomHasDeviceCell.helpers({
  roomHasDevice: function() {
    return Devices.find({
      roomId: this._id
    }).count() > 0;
  }
});

Template.RoomActiveStayCell.helpers({
  stayOverview: function() {
    var stay = Stays.findOne(this.stayId);
    if (stay) {
      var checkInWhen = moment(stay.checkInDate).zone(stay.zone);
      var checkOutWhen = moment(stay.checkoutDate).zone(stay.zone);
      return checkInWhen.format('MM/DD/YYYY, h:mm a') + ' - ' + checkOutWhen.format('MM/DD/YYYY');
    }
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
