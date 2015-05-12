Meteor.methods({
  removeRoom: function(roomId) {
    check(roomId, String);

    var user = Meteor.user();

    if (!Roles.userIsInRole(user, ['hotel-manager', 'admin'])) {
      throw new Meteor.Error(403, 'You do not have the required permissions');
    } else {
      Rooms.remove(roomId);
    }
  }
});
