Meteor.methods({
  removeRoom: function(roomId) {
    check(roomId, String);

    var user = Meteor.user();

    if (!Roles.userIsInRole(user, ['hotel-manager', 'admin'])) {
      throw new Meteor.Error('You do not have permission to do that');
    } else {
      Rooms.remove(roomId);
    }
  }
});
