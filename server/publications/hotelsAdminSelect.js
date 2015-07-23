Meteor.publish('hotelsAdminSelect', function() {
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Hotels.find({}, {
      fields: {
        _id: 1,
        name: 1
      },
      $sort: {
        name: 1
      }
    });
  }
});
