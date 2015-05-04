Template.ConfigureRooms.helpers({
  multipleRoomSchema: function() {
    return Schema.MultipleRooms;
  },
  singleRoomSchema: function() {
    return Schema.Room;
  },
  hotelId: function() {
    return Session.get('hotelId');
  }
});

Template.ConfigureRooms.onCreated(function() {
  var self = this;

  self.autorun(function() {
    var hotel = Session.get('hotelId');
    self.subscribe('roomNames', Session.get('hotelId'));
  })
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
    beginSubmit: function() {
      this.template.$("#multi-room-submit").prop('disabled', true);
    },
    endSubmit: function() {
      this.template.$("#multi-room-submit").prop('disabled', false);
    }
  },
  singleRoomForm: {
    before: {
      insert: function(doc) {
        if (Rooms.find({
            hotelId: doc.hotelId,
            name: doc.name
          }).count() > 0) {
          Messages.error('A room with this name (' + doc.name + ') already exists');
          return false;
        }
        return doc;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Created room successfully!');
    },
    beginSubmit: function() {
      this.template.$("#single-room-submit").prop('disabled', true);
    },
    endSubmit: function() {
      this.template.$("#single-room-submit").prop('disabled', false);
    }
  }
});
