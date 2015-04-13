Template.ConfigureRooms.helpers({
  multipleRoomSchema: function() {
    return Schema.multipleRoomSchema;
  },
  singleRoomSchema: function() {
    return Schema.Room;
  },
  hotelId: function() {
    return Session.get('hotelId');
  }
});

Schema.multipleRoomSchema = new SimpleSchema({
  startNum: {
    type: Number,
    label: "Starting Room Number",
    min: 0
  },
  endNum: {
    type: Number,
    label: "Ending Room Number",
    min: 1
  },
  hotelId: {
    type: String
  }
});

AutoForm.hooks({
  multipleRoomForm: {
    before: {
      method: function(doc) {
        if (doc.startNum > doc.endNum) {
          Messages.error('The starting room number must be less than the ending room number');
          return false;
        }
        return doc;
      }
    },
    after: {
      method: function(error, result) {
        if (error) {
          Messages.error(error);
        } else {
          Messages.success('You have successfully created Rooms!');
        }
      }
    },
    beginSubmit: function(formId) {
      document.getElementById("multi-room-submit").disabled = true;
    },
    endSubmit: function(formId) {
      document.getElementById("multi-room-submit").disabled = false;
    }
  },
  singleRoomForm: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Created room successfully!');
    }
  }
});
