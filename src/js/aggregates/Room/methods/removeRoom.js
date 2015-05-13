Meteor.methods({
  removeRoom: function(roomId) {
    check(roomId, String);

    Rooms.remove(roomId);
  }
});
