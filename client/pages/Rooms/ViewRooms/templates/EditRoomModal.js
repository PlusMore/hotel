Template.EditRoomModal.helpers({
  room: function() {
    return Rooms.findOne(Session.get('editRoomId'));
  },
  editRoomSchema: function() {
    return Schema.editRoomSchema;
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

Schema.editRoomSchema = new SimpleSchema({
  roomId: {
    type: String
  },
  name: {
    type: String,
    label: "Name"
  },
  hotelId: {
    type: String
  }
});

AutoForm.hooks({
  editRoomForm: {
    onSuccess: function(operation, result, template) {
      Messages.success('Updated room successfully!');
      BootstrapModalPrompt.dismiss();
    },
    onError: function(operation, error, template) {
      Messages.error(error.message);
    }
  }
});
