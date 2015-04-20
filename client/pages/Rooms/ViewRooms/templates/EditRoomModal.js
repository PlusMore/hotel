Template.EditRoomModal.helpers({
  room: function() {
    return Rooms.findOne(Session.get('editRoomId'));
  },
  editRoomSchema: function() {
    return Schema.RoomName;
  }
});

Template.EditRoomModal.events({
  'click #delete-room': function(e) {
    if (confirm("Are you sure you'd like to delete this room?")) {
      Meteor.call('removeRoom', Session.get('editRoomId'));
      Messages.success('Room Deleted');
      BootstrapModalPrompt.dismiss();
    }
  }
});

AutoForm.hooks({
  editRoomForm: {
    onSuccess: function(operation, result) {
      Messages.success('Updated room successfully!');
      BootstrapModalPrompt.dismiss();
    },
    onError: function(operation, error) {
      Messages.error(error.message);
    }
  }
});
