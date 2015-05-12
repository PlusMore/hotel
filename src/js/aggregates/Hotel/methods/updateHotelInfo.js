Meteor.methods({
  updateHotelInfo: function(doc) {
    check(doc, Object);
    var user = Meteor.user();

    if (user && Roles.userIsInRole(user, ['hotel-manager', 'admin'])) {
      Hotels.upsert(doc.hotelId, {
        $set: {
          name: doc.name,
          phone: doc.phone,
          description: doc.description
        }
      });
    } else {
      throw new Meteor.Error(403, 'You do not have the required permissions');
    }
  }
});
